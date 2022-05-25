const {saveDeploy,getContractAddr} = require('../utils');

module.exports = async (hre) => {
    const {getNamedAccounts, deployments,getChainId} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = await getChainId();

console.log(getContractAddr(chainId,'LendingPool'),getContractAddr(chainId,'LendingPoolAddressesProvider'))
    const contract = await deploy('StableAndVariableTokensHelper', {
      from: deployer,
      log: true,
      args:[getContractAddr(chainId,'LendingPool'),getContractAddr(chainId,'LendingPoolAddressesProvider')]
    });
    saveDeploy(chainId,'StableAndVariableTokensHelper',contract.address,contract.receipt);
  };
  module.exports.tags = ['StableAndVariableTokensHelper'];
