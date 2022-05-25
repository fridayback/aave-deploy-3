const {saveDeploy,getContractAddr} = require('../utils');

module.exports = async (hre) => {
    const {getNamedAccounts, deployments,getChainId} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = await getChainId();


    const contract = await deploy('LendingRateOracle', {
      from: deployer,
      log: true
    });
    saveDeploy(chainId,'LendingRateOracle',contract.address,contract.receipt);
  };
  module.exports.tags = ['LendingRateOracle'];
