// const { saveDeploy, getConfig, getContractAddr, getOracleParamPairs } = require('./utils');

const BigNumber = require('bignumber.js');

task('deploy_mock_Token', 'Deploy mock Token')
  .addParam("name", "token name ", "Wrapped AVAX for test")
  .addParam("symbol", "token symbol", "WAVAX")
  .addParam("decimals", "token decimals", 18, types.int)
  .addParam('total', 'token total supply', 10000000, types.int)
  .setAction(async ({ name, symbol, decimals, total }) => {
    const contractName = 'LendingPoolAddressesProvider';
    const chainId = await hre.getChainId();
    console.log('-----------------', name, symbol, decimals, total);

    let MintableERC20 = await hre.ethers.getContractFactory('MintableERC20');
    const token = await MintableERC20.deploy(name, symbol, decimals);
    await token.deployed();
    console.log(`deploy ${name} at`, token.address);
    // await (await token.mint('0x' + new BigNumber(total).shiftedBy(decimals).toString(16))).wait(1);
    await (await token.mintTT('0x' + new BigNumber(total).shiftedBy(decimals).toString(16))).wait(1);

  });