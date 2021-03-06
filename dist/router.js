"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouter = exports.navigate = exports.Link = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _history = _interopRequireDefault(require("./history"));

var _scroll = require("./scroll");

var _helper = _interopRequireDefault(require("./helper"));

var _handleHistoryChange = _interopRequireDefault(require("./handleHistoryChange"));

var handleSyncRegistered = false;

var Link = function Link(props) {
  var handleClick = function handleClick(e) {
    e.preventDefault();
    (0, _scroll.setScrollToSessionStorage)();

    _history["default"].push(props.to);
  };

  return /*#__PURE__*/_react["default"].createElement("a", {
    href: props.to,
    className: props.className,
    onClick: handleClick
  }, props.children);
};

exports.Link = Link;

var navigate = function navigate(to) {
  (0, _scroll.setScrollToSessionStorage)();

  _history["default"].push(to);
}; // expects a "prepared" list of routes


exports.navigate = navigate;

var createRouter = function createRouter(routes, store) {
  return function (props) {
    var appState = store ? (0, _react.useContext)(store) : {
      state: props,
      dispatch: false
    };
    var state = appState.state,
        dispatch = appState.dispatch;
    var location = state.location; // register the listener once

    if (!handleSyncRegistered && dispatch) {
      (0, _handleHistoryChange["default"])(dispatch);
      handleSyncRegistered = true;
    }

    var _helper$match = _helper["default"].match(routes, location ? location.split("?", 1)[0] : "/"),
        Component = _helper$match.Component;

    return /*#__PURE__*/_react["default"].createElement(Component, (0, _extends2["default"])({}, state, {
      dispatch: dispatch
    }));
  };
};

exports.createRouter = createRouter;