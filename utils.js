#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

module.exports.saveDeploy = function (chainId, contract, address, reciept) {
    let filePath = path.join(process.cwd(), `./${chainId}.json`);
    let data = {};
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath));
    }

    data[contract] = address;
    if (reciept && reciept.blockNumber)
        data[`${contract}-block`] = reciept.blockNumber;
    fs.writeFileSync(filePath, JSON.stringify(data));
}

module.exports.getContractAddr = function (chainId, contract) {
    let filePath = path.join(process.cwd(), `./${chainId}.json`);
    let data = {};
    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath));
    }

    return data[contract];
}


const  AaveConfigMock = require('./markets-config/31337');
const  AaveConfigFuji  = require('./markets-config/43113');

function getConfig(chainId) {
    switch (chainId + '') {
        case '31337': return AaveConfigMock;
        case '43113': return AaveConfigFuji;
    }
}
module.exports.getConfig = getConfig;

module.exports.getOracleParamPairs = function (chainId) {
    let config = getConfig(chainId);
    let asssetsConfig = config.ReserveAssets;
    let chainLinkAggregatorConfig = config.ChainlinkAggregator;
    let assets = [];
    let chainLinkAggregators = [];
    let borrowRates = []
    let keys = {};
    for (const key in asssetsConfig) {
        keys[key] = true;
    }
    for (const key in chainLinkAggregatorConfig) {
        keys[key] = true;
    }

    for (const key in keys) {
        assets.push(asssetsConfig[key]);
        chainLinkAggregators.push(chainLinkAggregatorConfig[key]);
        borrowRates.push(config.LendingRateOracleRatesCommon[key]);
    }

    return { assets, chainLinkAggregators, borrowRates }
}

module.exports.getQuoteCurrency = function (config) {
    // console.log('config.OracleQuoteCurrency',config);
    switch (config.OracleQuoteCurrency) {
        case 'ETH':
        case 'WETH':
            return config.ReservesConfig.WETH.underlying;
        case 'USD':
            return config.ProtocolGlobalParams.UsdAddress;
        default:
            throw `Quote ${config.OracleQuoteCurrency} currency not set. Add a new case to getQuoteCurrency switch`;
    }
};


module.exports.rateStrategyContractName = function(rateStrategy){
    
}