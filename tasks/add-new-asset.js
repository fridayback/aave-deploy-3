const { saveDeploy, getConfig, getContractAddr, getOracleParamPairs } = require('../utils');

task('add-new-asset', 'Add a new asset')
    .addParam("atoken", "the aToken name will be deployed")
    .setAction(async ({ atoken }) => {

        const chainId = await hre.getChainId();
        const config = getConfig(chainId);
        const provider = getContractAddr(chainId, 'PoolAddressesProvider');

        let poolAddressesProvider = await hre.ethers.getContractFactory('PoolAddressesProvider');
        poolAddressesProvider = await poolAddressesProvider.attach(provider);

        const poolConfigurator = await poolAddressesProvider.getPoolConfigurator();

        let ReservesSetupHelperAddr = getContractAddr(chainId, 'ReservesSetupHelper');
        let ReservesSetupHelper = await hre.ethers.getContractFactory('ReservesSetupHelper');
        reservesSetupHelper = await ReservesSetupHelper.attach(ReservesSetupHelperAddr);


        let atokens = atoken.split(',');
        let initInputParams = [];
        let cfgs = [];
        let oracleParams = { assets: [], aggregators: [] };

        for (let index = 0; index < atokens.length; index++) {
            const atoken = atokens[index];
            console.log('deploy', atoken);
            const strategy = config.ReservesConfig[atoken];
            // console.log('reserve strategy:\n', strategy);
            const rateStrategy = strategy.strategy;
            let rateStrategyAddr = getContractAddr(chainId, `DefaultReserveInterestRateStrategy_${rateStrategy.name}`);
            console.log('rateStrategyAddr = ', rateStrategyAddr);

            // console.log('rateStrategy = ', rateStrategy);

            if (!rateStrategyAddr) {
                //deploy DefaultReserveInterestRateStrategy
                let DefaultReserveInterestRateStrategy = await hre.ethers.getContractFactory('DefaultReserveInterestRateStrategy');

                const defaultReserveInterestRateStrategy = await DefaultReserveInterestRateStrategy.deploy(
                    provider,
                    rateStrategy.optimalUtilizationRate,
                    rateStrategy.baseVariableBorrowRate,
                    rateStrategy.variableRateSlope1,
                    rateStrategy.variableRateSlope2,
                    rateStrategy.stableRateSlope1,
                    rateStrategy.stableRateSlope2,
                    rateStrategy.baseStableRateOffset,
                    rateStrategy.stableRateExcessOffset,
                    rateStrategy.optimalStableToTotalDebtRatio
                );
                await defaultReserveInterestRateStrategy.deployed();
                console.log('deploy DefaultReserveInterestRateStrategy with rate strategy:\n', rateStrategy.name);
                saveDeploy(chainId, `DefaultReserveInterestRateStrategy_${rateStrategy.name}`, defaultReserveInterestRateStrategy.address);
                rateStrategyAddr = defaultReserveInterestRateStrategy.address;
            }

            //----------------
            let initParam = {
                aTokenImpl: getContractAddr(chainId, strategy.aTokenImpl),
                stableDebtTokenImpl: getContractAddr(chainId, 'StableDebtToken'),
                variableDebtTokenImpl: getContractAddr(chainId, 'VariableDebtToken'),
                underlyingAssetDecimals: strategy.reserveDecimals,
                interestRateStrategyAddress: rateStrategyAddr,
                underlyingAsset: strategy.underlying,
                treasury: config.ReserveFactorTreasuryAddress,
                incentivesController: config.IncentivesController,
                underlyingAssetName: atoken,
                aTokenName: `${config.ATokenNamePrefix} ${atoken}`,
                aTokenSymbol: `a${config.SymbolPrefix}${atoken}`,
                variableDebtTokenName: `${config.VariableDebtTokenNamePrefix} ${config.SymbolPrefix}${atoken}`,
                variableDebtTokenSymbol: `variableDebt${config.SymbolPrefix}${atoken}`,
                stableDebtTokenName: `${config.StableDebtTokenNamePrefix} ${atoken}`,
                stableDebtTokenSymbol: `stableDebt${config.SymbolPrefix}${atoken}`,
                params: '0x00'
            }
            initInputParams.push(initParam);


            //add asset in price oracle
            //setAssetSources
            oracleParams.assets.push(strategy.underlying);
            oracleParams.aggregators.push(strategy.ChainlinkAggregator);

            const cfg = {
                asset: strategy.underlying,
                baseLTV: strategy.baseLTVAsCollateral,
                liquidationThreshold: strategy.liquidationThreshold,
                liquidationBonus: strategy.liquidationBonus,
                reserveFactor: strategy.reserveFactor,
                borrowCap: strategy.borrowCap,
                supplyCap: strategy.supplyCap,
                stableBorrowingEnabled: strategy.stableBorrowingEnabled,
                borrowingEnabled: strategy.borrowingEnabled,
            };

            cfgs.push(cfg);

        }

        // initReserves
        let PoolConfigurator = await hre.ethers.getContractFactory('PoolConfigurator',{
            // signer: hre.namedAccounts(),
            libraries: {
                'ConfiguratorLogic': getContractAddr(chainId,'ConfiguratorLogic'),
            }
          });
        // console.log('2',getContractAddr(chainId,'PoolConfigurator'));
        PoolConfigurator = await PoolConfigurator.attach(poolConfigurator);

        let reciept = await (await PoolConfigurator.initReserves(initInputParams, { gasLimit: 8000000 })).wait(1);
        console.log('reciept:', reciept.status);

        let ACLManagerAddress = getContractAddr(chainId, 'ACLManager');
        let ACLManager = await hre.ethers.getContractFactory('ACLManager');
        ACLManager = await ACLManager.attach(ACLManagerAddress);

        await (await ACLManager.addRiskAdmin(ReservesSetupHelperAddr)).wait(1);
        console.log('===== ACLManager addRiskAdmin', ReservesSetupHelperAddr);


        reciept = await (await reservesSetupHelper.configureReserves(poolConfigurator, cfgs)).wait(1);
        console.log(`\x1B[36mconfigure Reserves ${atoken} status:${reciept.status}\n ${JSON.stringify(cfgs)}\x1B[0m`);

        let aaveOracleAddr = getContractAddr(chainId, 'AaveOracle');
        let aaveOracle = await hre.ethers.getContractFactory('AaveOracle');
        aaveOracle = await aaveOracle.attach(aaveOracleAddr);
        await (await aaveOracle.setAssetSources(oracleParams.assets, oracleParams.aggregators));
        console.log(`\x1B[36madd ${atoken} in price oracle: ${oracleParams.aggregators}\x1B[0m`);


    });