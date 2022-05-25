const { saveDeploy, getConfig, getContractAddr } = require('../utils');

const contractName = 'ACLManager';
module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const config = getConfig(chainId);

  const Owner = config.Owner ? config.Owner : deployer;
  const PoolAdmin = config.PoolAdmin ? config.PoolAdmin : deployer;
  const EmergencyAdmin = config.EmergencyAdmin ? config.EmergencyAdmin : deployer;
  const RiskAdmin = config.RiskAdmin ? config.RiskAdmin : deployer;
  const AssetListingAdmin = config.AssetListingAdmin ? config.AssetListingAdmin : deployer;

  let poolAddressesProviderAddr = getContractAddr(chainId, 'PoolAddressesProvider');

  const contract = await deploy(contractName, {
    from: deployer, log: true,
    args: [poolAddressesProviderAddr]
  });

  saveDeploy(chainId, contractName, contract.address, contract.receipt);

  let poolAddressesProvider = await hre.ethers.getContractFactory('PoolAddressesProvider');
  poolAddressesProvider = await poolAddressesProvider.attach(poolAddressesProviderAddr);
  try {
    await (await poolAddressesProvider.setACLManager(contract.address)).wait(1);
    console.log('===== PoolAddressesProvider setACLManager', contract.address);
  } catch (error) {
    console.log('===== PoolAddressesProvider setACLManager failed', error);
  }

  let ACLManager = await hre.ethers.getContractFactory('ACLManager');
  ACLManager = await ACLManager.attach(contract.address);

  await (await ACLManager.addPoolAdmin(PoolAdmin)).wait(1);
  console.log('===== ACLManager addPoolAdmin', PoolAdmin);
  await (await ACLManager.addEmergencyAdmin(EmergencyAdmin)).wait(1);
  console.log('===== ACLManager addEmergencyAdmin', EmergencyAdmin);
  await (await ACLManager.addRiskAdmin(RiskAdmin)).wait(1);
  console.log('===== ACLManager addRiskAdmin', RiskAdmin);
  await (await ACLManager.addAssetListingAdmin(AssetListingAdmin)).wait(1);
  console.log('===== ACLManager addAssetListingAdmin', AssetListingAdmin);

};

module.exports.tags = [contractName];
