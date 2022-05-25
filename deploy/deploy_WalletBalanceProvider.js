const { saveDeploy, getConfig,getContractAddr,getOracleParamPairs,getQuoteCurrency } = require('../utils');

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const contract = await deploy('WalletBalanceProvider', {
    from: deployer,
    log: true,
  });
  saveDeploy(chainId, 'WalletBalanceProvider', contract.address, contract.receipt);
};
module.exports.tags = ['WalletBalanceProvider'];
