const { saveDeploy, getConfig,getContractAddr,getOracleParamPairs,getQuoteCurrency } = require('../utils');

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const config = getConfig(chainId);
  const contract = await deploy('UiPoolDataProviderV3', {
    from: deployer,
    log: true,
    args:[config.ReservesConfig[config.NativeToken].ChainlinkAggregator,config.ReservesConfig[config.NativeToken].ChainlinkAggregator]
  });
  saveDeploy(chainId, 'UiPoolDataProviderV3', contract.address, contract.receipt);
};
module.exports.tags = ['UiPoolDataProviderV3'];
