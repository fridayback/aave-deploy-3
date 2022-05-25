const { Console } = require('console');
const { saveDeploy, getContractAddr, getConfig } = require('../utils');

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const config = getConfig(chainId);
  console.log(config);
  const WrapNativeToken = config.ReservesConfig[config.NativeToken].underlying;
  const WETHGatewayOwner = config.WETHGatewayOwner ? config.WETHGatewayOwner : deployer;

  const contract = await deploy('WETHGateway', {
    from: deployer,
    log: true,
    args: [WrapNativeToken, WETHGatewayOwner]
  });
  saveDeploy(chainId, 'WETHGateway', contract.address, contract.receipt);

  if (deployer == WETHGatewayOwner) {
    let poolAddressesProviderAddr = getContractAddr(chainId, 'PoolAddressesProvider');
    PoolAddressesProvider = await hre.ethers.getContractFactory('PoolAddressesProvider');
    poolAddressesProvider = await PoolAddressesProvider.attach(poolAddressesProviderAddr);

    let poolAddr = await poolAddressesProvider.getPool();

    //authorizeLendingPool
    let wETHGateway = await hre.ethers.getContractFactory('WETHGateway');
    wETHGateway = await wETHGateway.attach(contract.address);
    await (await wETHGateway.authorizePool(poolAddr)).wait(1);
    console.log(`\x1B[36mWETHGateway authorizePool ${poolAddr}.\x1B[0m`);
  } else {
    console.log('\n\n');
    console.log('\x1B[31mWETHGateway has not authorized Pool yet.\x1B[0m');
    console.log('\n\n');
  }

};
module.exports.tags = ['WETHGateway'];
