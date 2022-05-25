const { saveDeploy, getConfig, getContractAddr } = require('../utils');

const contractName = 'Pool';
module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const config = getConfig(chainId);

  const ReserveLogic = await deploy('ReserveLogic', { from: deployer, log: true });
  // console.log('ReserveLogic:',reserveLogic);
  saveDeploy(chainId, 'ReserveLogic', ReserveLogic.address, ReserveLogic.receipt);

  // const GenericLogic = await deploy('GenericLogic', {
  //   from: deployer, log: true,
  //   libraries: { 'ReserveLogic': ReserveLogic.address }
  // });
  // // console.log('GenericLogic:',genericLogic);
  // saveDeploy(chainId, 'GenericLogic', GenericLogic.address, GenericLogic.receipt);

  // const ValidationLogic = await deploy('ValidationLogic', {
  //   from: deployer, log: true,
  //   libraries: {
  //     'ReserveLogic': ReserveLogic.address,
  //     'GenericLogic': GenericLogic.address
  //   }
  // });
  // saveDeploy(chainId, 'ValidationLogic', ValidationLogic.address, ValidationLogic.receipt);

  const IsolationModeLogic = await deploy('IsolationModeLogic', {
    from: deployer, log: true,
    // libraries: {
    //   'ReserveLogic': reserveLogic.address,
    //   'GenericLogic': genericLogic.address
    // }
  });
  saveDeploy(chainId, 'IsolationModeLogic', IsolationModeLogic.address, IsolationModeLogic.receipt);

  const BorrowLogic = await deploy('BorrowLogic', {
    from: deployer, log: true,
    libraries: {
      // 'ReserveLogic': ReserveLogic.address,
      // 'GenericLogic': GenericLogic.address,
      // 'IsolationModeLogic': IsolationModeLogic.address
    }
  });
  saveDeploy(chainId, 'BorrowLogic', BorrowLogic.address, BorrowLogic.receipt);

  const BridgeLogic = await deploy('BridgeLogic', {
    from: deployer, log: true,
    // libraries: {
    //   'ReserveLogic': ReserveLogic.address,
    //   'GenericLogic': GenericLogic.address
    // }
  });
  saveDeploy(chainId, 'BridgeLogic', BridgeLogic.address, BridgeLogic.receipt);

  const CalldataLogic = await deploy('CalldataLogic', {
    from: deployer, log: true,
    // libraries: {
    //   'ReserveLogic': ReserveLogic.address,
    //   'GenericLogic': GenericLogic.address
    // }
  });
  saveDeploy(chainId, 'CalldataLogic', CalldataLogic.address, CalldataLogic.receipt);

  const ConfiguratorLogic = await deploy('ConfiguratorLogic', {
    from: deployer, log: true,
    // libraries: {
    //   'ReserveLogic': ReserveLogic.address,
    //   'GenericLogic': GenericLogic.address
    // }
  });
  saveDeploy(chainId, 'ConfiguratorLogic', ConfiguratorLogic.address, ConfiguratorLogic.receipt);

  const EModeLogic = await deploy('EModeLogic', {
    from: deployer, log: true,
    // libraries: {
    //   'ReserveLogic': ReserveLogic.address,
    //   'ValidationLogic': ValidationLogic.address
    // }
  });
  saveDeploy(chainId, 'EModeLogic', EModeLogic.address, EModeLogic.receipt);

  const FlashLoanLogic = await deploy('FlashLoanLogic', {
    from: deployer, log: true,
    libraries: {
      // 'ReserveLogic': ReserveLogic.address,
      // 'GenericLogic': GenericLogic.address,
      'BorrowLogic': BorrowLogic.address,
      // 'ValidationLogic': ValidationLogic.address
    }
  });
  saveDeploy(chainId, 'FlashLoanLogic', FlashLoanLogic.address, FlashLoanLogic.receipt);

  const LiquidationLogic = await deploy('LiquidationLogic', {
    from: deployer, log: true,
    // libraries: {
    //   // 'ReserveLogic': ReserveLogic.address,
    //   // 'GenericLogic': GenericLogic.address,
    //   'BorrowLogic': BorrowLogic.address,
    //   // 'ValidationLogic': ValidationLogic.address
    // }
  });
  saveDeploy(chainId, 'LiquidationLogic', LiquidationLogic.address, LiquidationLogic.receipt);

  const PoolLogic = await deploy('PoolLogic', {
    from: deployer, log: true,
    // libraries: {
    //   'ReserveLogic': ReserveLogic.address,
    //   'GenericLogic': GenericLogic.address,
    //   'ValidationLogic':ValidationLogic.address,
    // }
  });
  saveDeploy(chainId, 'PoolLogic', PoolLogic.address, PoolLogic.receipt);

  const SupplyLogic = await deploy('SupplyLogic', {
    from: deployer, log: true,
    libraries: {
      // 'ReserveLogic': ReserveLogic.address,
      // 'GenericLogic': GenericLogic.address,
      // 'ValidationLogic':ValidationLogic.address,
    }
  });
  saveDeploy(chainId, 'SupplyLogic', SupplyLogic.address, SupplyLogic.receipt);

  const DataTypes = await deploy('DataTypes', {
    from: deployer, log: true,
    libraries: {
      // 'ReserveLogic': ReserveLogic.address,
      // 'GenericLogic': GenericLogic.address,
      // 'ValidationLogic':ValidationLogic.address,
    }
  });
  saveDeploy(chainId, 'DataTypes', DataTypes.address, DataTypes.receipt);


  console.log('begin deploy',contractName);

  let poolAddressesProviderAddr = getContractAddr(chainId, 'PoolAddressesProvider');

  const contract = await deploy(contractName, {
    from: deployer, log: true,
    args:[poolAddressesProviderAddr],
    libraries: {
      'PoolLogic': PoolLogic.address,
      'ReserveLogic': ReserveLogic.address,
      'EModeLogic': EModeLogic.address,
      'SupplyLogic':SupplyLogic.address,
      'FlashLoanLogic':FlashLoanLogic.address,
      'BorrowLogic': BorrowLogic.address,
      'LiquidationLogic': LiquidationLogic.address,
      'BridgeLogic': BridgeLogic.address,
      
      'IsolationModeLogic': IsolationModeLogic.address,
      // 'GenericLogic': GenericLogic.address,
      // 'DataTypes': DataTypes.address,
    }
  });

  saveDeploy(chainId, `${contractName}-Impl`, contract.address, contract.receipt);

  let poolAddressesProvider = await hre.ethers.getContractFactory('PoolAddressesProvider');
  poolAddressesProvider = await poolAddressesProvider.attach(poolAddressesProviderAddr);
  try {
    await (await poolAddressesProvider.setPoolImpl(contract.address)).wait(1);
    console.log('===== PoolAddressesProvider setPoolImpl', contract.address);
  } catch (error) {
    console.log('===== PoolAddressesProvider setPoolImpl failed', error);
  }

  const poolProxy = await poolAddressesProvider.getPool();
  saveDeploy(chainId, contractName, poolProxy);

};

module.exports.tags = [contractName];
