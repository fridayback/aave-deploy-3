const { saveDeploy, getContractAddr } = require('../utils');

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();


  const contract = await deploy('ATokensAndRatesHelper', {
    from: deployer,
    log: true,
    args: [getContractAddr(chainId, 'LendingPool')
      , getContractAddr(chainId, 'LendingPoolAddressesProvider')
      , getContractAddr(chainId, 'LendingPoolConfigurator')]
  });
  saveDeploy(chainId, 'ATokensAndRatesHelper', contract.address, contract.receipt);
};
module.exports.tags = ['ATokensAndRatesHelper'];
