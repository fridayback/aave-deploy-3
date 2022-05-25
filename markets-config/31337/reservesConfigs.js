const { eContractid } = require('../types');

const rateStrategy  = require('./rateStrategies');
let {
  oneRay,
  ZERO_ADDRESS,
  MOCK_CHAINLINK_AGGREGATORS_PRICES,
  oneEther,
} = require('../constants');

module.exports.strategyUSDC = {
  underlying:'0xe22da380ee6B445bb8273C81944ADEB6E8450422',
  strategy: rateStrategy.rateStrategyStableThree,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '8500',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowingEnabled: true,
  reserveDecimals: '6',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1000',
  borrowCap: 0,
  supplyCap:0,
  borrowRate: oneRay.multipliedBy(0.03).toFixed(),
  ChainlinkAggregator:'0x64EaC61A2DFda2c3Fa04eED49AA33D021AeC8838',
};

module.exports.strategyUSDT = {
  underlying:'0xC0ea7cA002704C87c9d5E7E8e2c8D0D136D61154',
  strategy: rateStrategy.rateStrategyStableThree,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '8500',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowingEnabled: true,
  reserveDecimals: '6',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1000',
  borrowCap: 0,
  supplyCap:0,
  borrowRate: oneRay.multipliedBy(0.03).toFixed(),
  ChainlinkAggregator: '0x7898AcCC83587C3C55116c5230C17a6Cd9C71bad',
};


module.exports.strategyWETH = {
  underlying:'0xeC3aa1D621a7a6b64B75c5D646B7b77005A79F2A',
  strategy: rateStrategy.rateStrategyWETH,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '8250',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowingEnabled: true,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1000',
  borrowCap: 0,
  supplyCap:0,
  borrowRate: oneRay.multipliedBy(0.03).toFixed(),
  ChainlinkAggregator: '0x86d67c3D38D2bCeE722E601025C25a575021c6EA',//TODO liulin
};

module.exports.strategyWAVAX = {
  underlying:'0xbb2eDC71b5b0Ec0eeA892fB821C101E4DB18b550',
  strategy: rateStrategy.rateStrategyWAVAX,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '8250',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowingEnabled: true,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1000',
  borrowCap: 0,
  supplyCap:0,
  borrowRate: oneRay.multipliedBy(0.03).toFixed(),
  ChainlinkAggregator: '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD',
};