const { saveDeploy, getContractAddr } = require('../utils');

const contractName = 'PoolConfigurator';
module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const ConfiguratorLogic = await deploy('ConfiguratorLogic', {
    from: deployer, log: true,
    // libraries: {
    //   // 'ReserveLogic': ReserveLogic.address,
    //   // 'GenericLogic': GenericLogic.address,
    //   // 'ValidationLogic':ValidationLogic.address,
    // }
  });
  saveDeploy(chainId, 'ConfiguratorLogic', ConfiguratorLogic.address, ConfiguratorLogic.receipt);
  
  const contract = await deploy(contractName, {
    from: deployer,
    log: true,
    libraries:{
      'ConfiguratorLogic': ConfiguratorLogic.address,
    }
  });
  saveDeploy(chainId, `${contractName}-impl`, contract.address, contract.receipt);

  let PoolAddressesProviderAddr = getContractAddr(chainId, 'PoolAddressesProvider');
  let PoolAddressesProvider = await hre.ethers.getContractFactory('PoolAddressesProvider');
  PoolAddressesProvider = await PoolAddressesProvider.attach(PoolAddressesProviderAddr);


  try {
    await (await PoolAddressesProvider.setPoolConfiguratorImpl(contract.address)).wait(1);
    console.log('===== PoolAddressesProvider setPoolConfiguratorImpl', contract.address);
  } catch (error) {
    console.log('===== PoolAddressesProvider setPoolConfiguratorImpl failed', error);
  }

  const PoolConfiguratorProxy = await PoolAddressesProvider.getPoolConfigurator();
  saveDeploy(chainId, contractName, PoolConfiguratorProxy);

};
module.exports.tags = [contractName];
