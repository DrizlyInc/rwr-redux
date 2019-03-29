'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _server = require('react-dom/server');

var _reduxStore = require('./redux-store');

var _reduxStore2 = _interopRequireDefault(_reduxStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReduxContainer = function () {
  function ReduxContainer() {
    _classCallCheck(this, ReduxContainer);

    this.containers = {};

    this.registerContainer = this.registerContainer.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.createContainer = this.createContainer.bind(this);
    this.createRootComponent = this.createRootComponent.bind(this);
    this.renderContainer = this.renderContainer.bind(this);
    this.unmountContainer = this.unmountContainer.bind(this);
    this.renderContainerToString = this.renderContainerToString.bind(this);
  }

  _createClass(ReduxContainer, [{
    key: 'registerContainer',
    value: function registerContainer(name, container) {
      this.containers[name] = container;
    }
  }, {
    key: 'getContainer',
    value: function getContainer(name) {
      return this.containers[name];
    }
  }, {
    key: 'createContainer',
    value: function createContainer(name, props) {
      var constructor = this.getContainer(name);
      return (0, _react.createElement)(constructor, props);
    }
  }, {
    key: 'createRootComponent',
    value: function createRootComponent(name, _ref) {
      var props = _ref.props,
          storeName = _ref.storeName;

      var container = this.createContainer(name, props);
      var store = _reduxStore2.default.getStore(storeName);

      return (0, _react.createElement)(_reactRedux.Provider, { store: store }, container);
    }
  }, {
    key: 'renderContainer',
    value: function renderContainer(name, payload, node) {
      var rootComponent = this.createRootComponent(name, payload);
      (0, _reactDom.render)(rootComponent, node);
    }
  }, {
    key: 'unmountContainer',
    value: function unmountContainer(node) {
      (0, _reactDom.unmountComponentAtNode)(node);
    }
  }, {
    key: 'renderContainerToString',
    value: function renderContainerToString(name, payload) {
      var rootComponent = this.createRootComponent(name, payload);
      var result = (0, _server.renderToString)(rootComponent);

      return JSON.stringify({ body: result });
    }
  }, {
    key: 'integrationWrapper',
    get: function get() {
      return {
        mount: function _mount(node, payload) {
          this.renderContainer(payload.name, payload, node);
        }.bind(this),

        unmount: function _unmount(node) {
          this.unmountContainer(node);
        }.bind(this),

        nodeRun: function _prerender(payload) {
          return this.renderContainerToString(payload.name, payload);
        }.bind(this)
      };
    }
  }]);

  return ReduxContainer;
}();

exports.default = new ReduxContainer();