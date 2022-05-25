const {saveDeploy,getContractAddr,getConfig} = require('../utils');

module.exports = async (hre) => {
    const {getNamedAccounts, deployments,getChainId} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = await getChainId();

    const wrappedNativeToken = getConfig(chainId).ReservesConfig[config.NativeToken];

    // const contract = await deploy('DefaultReserveInterestRateStrategy', {
    //   from: deployer,
    //   log: true,
    //   args:[WETH]
    // });
    // saveDeploy(chainId,'DefaultReserveInterestRateStrategy',contract.address,contract.receipt);
  };
  module.exports.tags = ['DefaultReserveInterestRateStrategy'];
