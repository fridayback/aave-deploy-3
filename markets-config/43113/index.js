const { oneRay, ZERO_ADDRESS } = require('../constants');
const { IAaveConfiguration, eEthereumNetwork } = require('../types');

const { CommonsConfig } = require('./commons');
const strategy = require('./reservesConfigs');

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

module.exports = {
  ...CommonsConfig,
  ReservesConfig: {
    WAVAX: strategy.strategyWAVAX,
    USDT: strategy.strategyUSDT,
    WETH: strategy.strategyWETH,
    UST: strategy.strategyUST,
    DAI: strategy.strategyDAI
  },
  NativeToken:'WAVAX'
};

