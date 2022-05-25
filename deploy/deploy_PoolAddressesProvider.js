const { saveDeploy, getContractAddr, getConfig } = require('../utils');

const contractName = 'PoolAddressesProvider';
module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const config = getConfig(chainId);

  const Owner = config.Owner ? config.Owner : deployer;

  const ACLAdmin = config.ACLAdmin ? config.ACLAdmin : deployer;

  const contract = await deploy(contractName, {
    from: deployer,
    args: [config.MarketId, Owner],
    log: true,
  });
  saveDeploy(chainId, contractName, contract.address, contract.receipt);

  let lendingPoolAddressesProviderRegistry = await hre.ethers.getContractFactory('PoolAddressesProviderRegistry');
  lendingPoolAddressesProviderRegistry = await lendingPoolAddressesProviderRegistry.attach(getContractAddr(chainId, 'PoolAddressesProviderRegistry'));
  const oldPoolAddressesProviderAddress= getContractAddr(chainId,contractName);
  console.log(`oldPoolAddressesProviderAddress:${oldPoolAddressesProviderAddress}`);
  if(oldPoolAddressesProviderAddress != contract.address){
    await (await lendingPoolAddressesProviderRegistry.registerAddressesProvider(contract.address, 1)).wait(1);
    console.log(`registerAddressesProvider ${contractName} at:`, contract.address);
  }

  let poolAddressesProvider = await hre.ethers.getContractFactory(contractName);
  poolAddressesProvider = await poolAddressesProvider.attach(contract.address)
  console.log('===== poolAddressesProvider setACLAdmin tobe',ACLAdmin);
  await ( await poolAddressesProvider.setACLAdmin(ACLAdmin)).wait(1);
  console.log('===== poolAddressesProvider ACLAdmin is',await poolAddressesProvider.getACLAdmin());
};
module.exports.tags = [contractName];
