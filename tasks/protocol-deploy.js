const { saveDeploy, getConfig, getContractAddr, getOracleParamPairs } = require('../utils');
// const hre = require("hardhat");
task('protocol-deploy', 'Deploy aave protocol')
  .setAction(async (args) => {

    const chainId = await hre.getChainId();
    // const { getNamedAccounts, deployments, getChainId } = hre;
    const { deployer } = await hre.getNamedAccounts();

    const config = getConfig(chainId);

    const Owner = config.Owner ? config.Owner : deployer;
    const PoolAdmin = config.PoolAdmin ? config.PoolAdmin : deployer;
    const EmergencyAdmin = config.EmergencyAdmin ? config.EmergencyAdmin : deployer;
    const RiskAdmin = config.RiskAdmin ? config.RiskAdmin : deployer;
    const AssetListingAdmin = config.AssetListingAdmin ? config.AssetListingAdmin : deployer;

    await run('deploy', { tags: 'PoolAddressesProviderRegistry' });
    await run('deploy', { tags: 'PoolAddressesProvider' });
    await run('deploy', { tags: 'Pool' });
    await run('deploy', { tags: 'PoolConfigurator' });
    await run('deploy', { tags: 'ACLManager' });

    await run('deploy', { tags: 'AaveOracle' });
    await run('deploy', { tags: 'AaveProtocolDataProvider' });
    await run('deploy', { tags: 'WETHGateway' });
    
    // await run('deploy', { tags: 'ATokensAndRatesHelper' });
    await run('deploy', { tags: 'AToken' });
    await run('deploy', { tags: 'DelegationAwareAToken' });
    await run('deploy', { tags: 'VariableDebtToken' });
    await run('deploy', { tags: 'StableDebtToken' });

    await run('deploy', { tags: 'ReservesSetupHelper' });
    
    
    await run('deploy', { tags: 'WalletBalanceProvider' });
    await run('deploy', { tags: 'UiPoolDataProviderV3' });
  });

subtask("deploy:PoolAddressesProviderRegistry", "deploy PoolAddressesProviderRegistry")
  .addParam("owner", "The contract onwer")
  .setAction(async (owner) => {
    const PoolAddressesProviderRegistry = await hre.ethers.getContractFactory("PoolAddressesProviderRegistry");
    const poolAddressesProviderRegistry = await PoolAddressesProviderRegistry.deploy(owner);
    saveDeploy(chainId, 'PoolAddressesProviderRegistry', poolAddressesProviderRegistry.address);
  });

subtask("deploy:PoolAddressesProvider", "deploy PoolAddressesProvider")
  .addParam("marketId", "The marketId")
  .addParam("owner", "The contract onwer")
  .setAction(async (marketId, owner) => {
    const PoolAddressesProvider = await hre.ethers.getContractFactory("PoolAddressesProvider");
    const poolAddressesProvider = await PoolAddressesProvider.deploy(marketId, owner);
    saveDeploy(chainId, 'PoolAddressesProvider', poolAddressesProvider.address);
  });
