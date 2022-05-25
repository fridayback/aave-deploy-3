const { saveDeploy, getConfig, getContractAddr, getOracleParamPairs } = require('../utils');

const BigNumber = require('bignumber.js');

task('deploy-staticAT', 'Deploy StaticATokenLM')
  .addParam("token", "token,eg USDT")
//   .addOptionalParam("pool", "Lending Pool address")
  .addOptionalParam("admin", "the proxy admin")
  .setAction(async ({ token,  admin }) => {
    const contractName = 'StaticATokenLM';
    const chainId = await hre.getChainId();
    const config = getConfig(chainId).ReservesConfig[token];
    if(!config) {
        console.log(`${token} is not supported`);
        return;
    }//underlying

    let StaticATokenLM = await hre.ethers.getContractFactory('StaticATokenLM');
    let StaticATokenLMInstacnce = await StaticATokenLM.deploy();
    let tx = await StaticATokenLMInstacnce.deployed();
    
    // console.log(tx.address);
    saveDeploy(chainId,`StaticATokenLMImpl${token}`,tx.address,tx.deployTransaction);

    let lendingPoolProxy = await hre.ethers.getContractFactory('LendingPool',
      {
        // signer: hre.namedAccounts(),
        libraries: {
          'ReserveLogic': getContractAddr(chainId, 'ReserveLogic'),
          // 'GenericLogic': getContractAddr(chainId, 'GenericLogic'),
          'ValidationLogic': getContractAddr(chainId, 'ValidationLogic')
        }
      });
    lendingPoolProxy = await lendingPoolProxy.attach(getContractAddr(chainId, 'LendingPool'));

    let {aTokenAddress} = await lendingPoolProxy.getReserveData(config.underlying);
    // console.log(aTokenAddress);
    let aToken = await hre.ethers.getContractAt('IERC20Detailed',aTokenAddress);
    // aToken = await aToken.attach(aTokenAddress);
    let symbol = await aToken.symbol();

    const args = [getContractAddr(chainId,'LendingPool'),aTokenAddress,`Wrapped ${symbol}`,symbol];

    let proxy = await hre.ethers.getContractFactory('InitializableAdminUpgradeabilityProxy');
    proxy = await proxy.deploy();
    let txProxy = await proxy.deployed();
    
    const encodedInitializedParams = StaticATokenLMInstacnce.interface.encodeFunctionData(
        'initialize',
        [...args]
      );

    await (await StaticATokenLMInstacnce.initialize(...args)).wait(1);

    const accounts = await hre.ethers.getSigners();
    let adminProxy = '';
    if(!admin){
        adminProxy = accounts[0].address;
    }else{
        adminProxy = accounts[admin].address;
    }
    console.log('===>',tx.address,adminProxy);
    await (await proxy['initialize(address,address,bytes)'](tx.address,adminProxy,encodedInitializedParams)).wait(1);

    saveDeploy(chainId,`StaticATokenLM${token}`,txProxy.address,txProxy.deployTransaction);

  });