const { saveDeploy, getConfig,getContractAddr,getOracleParamPairs,getQuoteCurrency } = require('../utils');

module.exports = async (hre) => {
  const { getNamedAccounts, deployments, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // const {assets,chainLinkAggregators} = getOracleParamPairs(chainId);
  const config = getConfig(chainId);
  // console.log('****&&&&&',chainId,config);
  const {FallbackOracle,OracleQuoteUnit,OracleQuoteCurrency} = config;

  let poolAddressesProviderAddr = getContractAddr(chainId, 'PoolAddressesProvider');
  let poolAddressesProvider = await hre.ethers.getContractFactory('PoolAddressesProvider');
  poolAddressesProvider = await poolAddressesProvider.attach(poolAddressesProviderAddr);

  const contract = await deploy('AaveOracle', {
    from: deployer,
    log: true,
    args: [
      poolAddressesProviderAddr,
      [],
      [],
      FallbackOracle,
      getQuoteCurrency(config),
      OracleQuoteUnit,
    ]
  });
  saveDeploy(chainId, 'AaveOracle', contract.address, contract.receipt);

  try {
    await (await poolAddressesProvider.setPriceOracle(contract.address)).wait(1);
    console.log('===== PoolAddressesProvider setPriceOracle', contract.address);
  } catch (error) {
    console.log('===== PoolAddressesProvider setPriceOracle failed', error);
  }


};
module.exports.tags = ['AaveOracle'];
