'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

var _reduxStore = require('./integrations/redux-store');

var _reduxStore2 = _interopRequireDefault(_reduxStore);

var _reduxContainer = require('./integrations/redux-container');

var _reduxContainer2 = _interopRequireDefault(_reduxContainer);

var _reduxRouter = require('./integrations/redux-router');

var _reduxRouter2 = _interopRequireDefault(_reduxRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RWRRedux = function RWRRedux() {
  _classCallCheck(this, RWRRedux);

  this.version = _version2.default;

  this.registerStore = _reduxStore2.default.registerStore;
  this.mountStore = _reduxStore2.default.mountStore;
  this.getStore = _reduxStore2.default.getStore;
  this.storeIntegrationWrapper = _reduxStore2.default.integrationWrapper;

  this.registerContainer = _reduxContainer2.default.registerContainer;
  this.getContainer = _reduxContainer2.default.getContainer;
  this.createContainer = _reduxContainer2.default.createContainer;
  this.createRootComponent = _reduxContainer2.default.createRootComponent;
  this.renderContainer = _reduxContainer2.default.renderContainer;
  this.unmountContainer = _reduxContainer2.default.unmountContainer;
  this.renderContainerToString = _reduxContainer2.default.renderContainerToString;
  this.containerIntegrationWrapper = _reduxContainer2.default.integrationWrapper;

  this.registerRoutes = _reduxRouter2.default.registerRoutes;
  this.getRoutes = _reduxRouter2.default.getRoutes;
  this.createRootRouter = _reduxRouter2.default.createRootRouter;
  this.unmountRouter = _reduxRouter2.default.unmountRouter;
  this.renderRouter = _reduxRouter2.default.renderRouter;
  this.renderRouterToString = _reduxRouter2.default.renderRouterToString;
  this.routerIntegrationWrapper = _reduxRouter2.default.integrationWrapper;
};

exports.default = new RWRRedux();