let {
  oneRay,
  ZERO_ADDRESS,
  MOCK_CHAINLINK_AGGREGATORS_PRICES,
  oneEther,
} = require('../constants');

let { eEthereumNetwork } = require('../types');

// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

module.exports.CommonsConfig = {
  MarketId: 'Aave genesis market',
  ATokenNamePrefix: 'Aave interest bearing',
  StableDebtTokenNamePrefix: 'Aave stable debt bearing',
  VariableDebtTokenNamePrefix: 'Aave variable debt bearing',
  SymbolPrefix: '',
  ProviderId: 0, // Overriden in index.ts
  OracleQuoteCurrency: 'USD',
  OracleQuoteUnit: oneEther.toString(),
  ProtocolGlobalParams: {
    TokenDistributorPercentageBase: '10000',
    MockUsdPriceInWei: '5848466240000000',
    UsdAddress: '0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96',
    NilAddress: '0x0000000000000000000000000000000000000000',
    OneAddress: '0x0000000000000000000000000000000000000001',
    AaveReferral: '0',
  },
  Owner: undefined,
  PoolAdmin: undefined,
  EmergencyAdmin: undefined,
  ACLAdmin: undefined,
  RiskAdmin:undefined,
  WETHGatewayOwner:undefined,
  ProviderRegistryOwner: undefined,
  ReserveFactorTreasuryAddress: '0xe26e32F138f9a6f29432D47AfC98ef77b189A8F8',
  FallbackOracle: '0x0000000000000000000000000000000000000000',
  IncentivesController: '0x0000000000000000000000000000000000000000'
};
