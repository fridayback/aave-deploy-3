const {saveDeploy,getContractAddr} = require('../utils');

module.exports = async (hre) => {
    const {getNamedAccounts, deployments,getChainId} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = await getChainId();


    const contract = await deploy('AaveProtocolDataProvider', {
      from: deployer,
      log: true,
      args:[getContractAddr(chainId,'PoolAddressesProvider')]
    });
    saveDeploy(chainId,'AaveProtocolDataProvider',contract.address,contract.receipt);
  };
  module.exports.tags = ['AaveProtocolDataProvider'];
