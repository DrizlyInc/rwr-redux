'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isFunction = isFunction;
exports.isReduxStore = isReduxStore;
function _isFunction(func) {
  return typeof func === 'function';
}

function _isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function _isReduxStore(store) {
  return _isFunction(store.subscribe) && _isFunction(store.dispatch) && _isFunction(store.dispatch);
}

function isFunction(func, errorMsg) {
  if (!_isFunction(func)) throw new Error(errorMsg);
}

function isReduxStore(store, errorMsg) {
  if (!_isObject(store) || !_isReduxStore(store)) throw new Error(errorMsg);
}