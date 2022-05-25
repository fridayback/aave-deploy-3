const BigNumber = require('bignumber.js');
const { oneRay }  = require('../constants');

// BUSD SUSD
module.exports.rateStrategyStableOne = {
  name: "rateStrategyStableOne",
  optimalUtilizationRate: new BigNumber(0.8).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(1).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: '0',
  stableRateSlope2: '0',

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
};

// DAI TUSD
module.exports.rateStrategyStableTwo = {
  name: "rateStrategyStableTwo",
  optimalUtilizationRate: new BigNumber(0.8).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(0.75).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.02).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(0.75).multipliedBy(oneRay).toFixed(),

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
}

// USDC USDT
module.exports.rateStrategyStableThree = {
  name: "rateStrategyStableThree",
  optimalUtilizationRate: new BigNumber(0.9).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(0.60).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.05).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(0.60).multipliedBy(oneRay).toFixed(),

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
}

module.exports.rateStrategyWETH = {
  name: "rateStrategyWETH",
  optimalUtilizationRate: new BigNumber(0.65).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(1).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(1).multipliedBy(oneRay).toFixed(),

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
}

module.exports.rateStrategyWAVAX = {
  name: "rateStrategyWAVAX",
  optimalUtilizationRate: new BigNumber(0.65).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(1).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(1).multipliedBy(oneRay).toFixed(),

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
}

// AAVE
module.exports.rateStrategyAAVE = {
  name: "rateStrategyAAVE",
  optimalUtilizationRate: new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: '0',
  variableRateSlope1: '0',
  variableRateSlope2: '0',
  stableRateSlope1: '0',
  stableRateSlope2: '0',

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
}

// BAT ENJ LINK MANA MKR REN YFI ZRX
module.exports.rateStrategyVolatileOne = {
  name: "rateStrategyVolatileOne",
  optimalUtilizationRate: new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.07).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(3).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(3).multipliedBy(oneRay).toFixed(),

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
}

// KNC WBTC
module.exports.rateStrategyVolatileTwo = {
  name: "rateStrategyVolatileTwo",
  optimalUtilizationRate: new BigNumber(0.65).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(3).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(3).multipliedBy(oneRay).toFixed(),

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
}

// SNX
module.exports.rateStrategyVolatileThree = {
  name: "rateStrategyVolatileThree",
  optimalUtilizationRate: new BigNumber(0.65).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(3).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(3).multipliedBy(oneRay).toFixed(),

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
}


module.exports.rateStrategyVolatileFour = {
  name: "rateStrategyVolatileFour",
  optimalUtilizationRate: new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: '0',
  variableRateSlope1: new BigNumber(0.07).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(3).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: '0',
  stableRateSlope2: '0',

  baseStableRateOffset: new BigNumber(0.01).multipliedBy(oneRay).toFixed(),
  stableRateExcessOffset: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  optimalStableToTotalDebtRatio:  new BigNumber(0.2).multipliedBy(oneRay).toFixed(),
}



