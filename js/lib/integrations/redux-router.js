'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _server = require('react-dom/server');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _reduxStore = require('./redux-store');

var _reduxStore2 = _interopRequireDefault(_reduxStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReduxRouter = function () {
  function ReduxRouter() {
    _classCallCheck(this, ReduxRouter);

    this.routes = {};

    this.registerRoutes = this.registerRoutes.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
    this.createRootRouter = this.createRootRouter.bind(this);
    this.unmountRouter = this.unmountRouter.bind(this);
    this.renderRouter = this.renderRouter.bind(this);
    this.renderRouterToString = this.renderRouterToString.bind(this);
  }

  _createClass(ReduxRouter, [{
    key: 'registerRoutes',
    value: function registerRoutes(name, routes) {
      this.routes[name] = routes;
    }
  }, {
    key: 'getRoutes',
    value: function getRoutes(name) {
      return this.routes[name];
    }
  }, {
    key: 'createRootRouter',
    value: function createRootRouter(name, storeName) {
      var routes = this.getRoutes(name);
      var store = _reduxStore2.default.getStore(storeName);
      var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

      return (0, _react.createElement)(_reactRedux.Provider, { store: store }, (0, _react.createElement)(_reactRouter.Router, { history: history }, routes));
    }
  }, {
    key: 'unmountRouter',
    value: function unmountRouter(node) {
      (0, _reactDom.unmountComponentAtNode)(node);
    }
  }, {
    key: 'renderRouter',
    value: function renderRouter(node, name, storeName) {
      var rootRouter = this.createRootRouter(name, storeName);
      (0, _reactDom.render)(rootRouter, node);
    }
  }, {
    key: 'renderRouterToString',
    value: function renderRouterToString(name, storeName, path) {
      var routes = this.getRoutes(name);
      var memoryHistory = (0, _reactRouter.createMemoryHistory)(path);
      var store = _reduxStore2.default.getStore(storeName);
      var history = (0, _reactRouterRedux.syncHistoryWithStore)(memoryHistory, store);

      var result = {
        body: '',
        code: 0
      };

      (0, _reactRouter.match)({ history: history, routes: routes, location: path }, function (error, redirectLocation, renderProps) {
        if (error) {
          throw error;
        } else if (redirectLocation) {
          result.code = 302;
          result.redirectUri = '' + redirectLocation.pathname + redirectLocation.search;
        } else if (renderProps) {
          result.body = (0, _server.renderToString)(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(_reactRouter.RouterContext, renderProps)
          ));
          result.code = 200;
        } else {
          result.code = 404;
        }
      });

      return JSON.stringify(result);
    }
  }, {
    key: 'integrationWrapper',
    get: function get() {
      return {
        mount: function _mount(node, payload) {
          var name = payload.name,
              storeName = payload.storeName;

          this.renderRouter(node, name, storeName);
        }.bind(this),

        unmount: function _unmount(node) {
          this.unmountRouter(node);
        }.bind(this),

        nodeRun: function _nodeRun(payload) {
          var name = payload.name,
              storeName = payload.storeName,
              path = payload.path;

          return this.renderRouterToString(name, storeName, path);
        }.bind(this)
      };
    }
  }]);

  return ReduxRouter;
}();

exports.default = new ReduxRouter();