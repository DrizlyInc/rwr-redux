'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validators = require('../utils/validators');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReduxStore = function () {
  function ReduxStore() {
    _classCallCheck(this, ReduxStore);

    this.registeredStores = {};
    this.mountedStores = {};
    this.defaultStore = null;

    this.registerStore = this.registerStore.bind(this);
    this.getStore = this.getStore.bind(this);
    this.mountStore = this.mountStore.bind(this);
  }

  _createClass(ReduxStore, [{
    key: 'registerStore',
    value: function registerStore(name, store) {
      (0, _validators.isFunction)(store, 'Error when registering \'' + name + '\' store: must be a function.');
      this.registeredStores[name] = store;
    }
  }, {
    key: 'mountStore',
    value: function mountStore(name, props) {
      var store = this.registeredStores[name];
      (0, _validators.isFunction)(store, 'Error when mounting \'' + name + '\' store: must be a function.');

      var storeObject = store(props);
      (0, _validators.isReduxStore)(storeObject, 'Error when mounting \'' + name + '\' store: must be a valid Redux store.');
      this.mountedStores[name] = storeObject;
      this.defaultStore = storeObject;
    }
  }, {
    key: 'getStore',
    value: function getStore(name) {
      if (name) {
        return this.mountedStores[name];
      }

      return this.defaultStore;
    }
  }, {
    key: 'integrationWrapper',
    get: function get() {
      return {
        mount: function _mount(_, payload) {
          this.mountStore(payload.name, payload.props);
        }.bind(this),

        nodeRun: function _mount(payload) {
          this.mountStore(payload.name, payload.props);
        }.bind(this)
      };
    }
  }]);

  return ReduxStore;
}();

exports.default = new ReduxStore();