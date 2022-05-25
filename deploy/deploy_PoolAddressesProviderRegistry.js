const {saveDeploy,getConfig} = require('../utils');

const contractName = 'PoolAddressesProviderRegistry';
module.exports = async (hre) => {
    const {getNamedAccounts, deployments,getChainId} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = await getChainId();
    const config = getConfig(chainId);
    const Owner = config.Owner ? config.Owner : deployer;
    const contract = await deploy(contractName, {
      from: deployer,
      args: [Owner],
      log: true,
    });
    saveDeploy(chainId,contractName,contract.address,contract.receipt);
  };
  module.exports.tags = [contractName];
