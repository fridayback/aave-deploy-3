const { saveDeploy, getConfig,getContractAddr } = require('../utils');

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const config = getConfig(chainId);
  
  const reserveLogic = await deploy('ReserveLogic', { from: deployer, log: true });
  // console.log('ReserveLogic:',reserveLogic);
  saveDeploy(chainId, 'ReserveLogic', reserveLogic.address, reserveLogic.receipt);

  const genericLogic = await deploy('GenericLogic', {
    from: deployer, log: true,
    libraries: { 'ReserveLogic': reserveLogic.address }
  });
  // console.log('GenericLogic:',genericLogic);
  saveDeploy(chainId, 'GenericLogic', genericLogic.address, genericLogic.receipt);

  const validationLogic = await deploy('ValidationLogic', {
    from: deployer, log: true,
    libraries: {
      'ReserveLogic': reserveLogic.address,
      'GenericLogic': genericLogic.address
    }
  });
  // console.log('ValidationLogic:',validationLogic);
  saveDeploy(chainId, 'ValidationLogic', validationLogic.address, validationLogic.receipt);

  
};

module.exports.tags = ['libs'];
