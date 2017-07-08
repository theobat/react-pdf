'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yogaLayout = require('yoga-layout');

var _yogaLayout2 = _interopRequireDefault(_yogaLayout);

var _lodash = require('lodash.topairsin');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isfunction');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.upperfirst');

var _lodash6 = _interopRequireDefault(_lodash5);

var _stylesheet = require('../stylesheet');

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base(root, props) {
    _classCallCheck(this, Base);

    this.parent = null;
    this.children = [];

    this.root = root;

    this.props = _extends({}, this.constructor.defaultProps, Base.defaultProps, props);

    this.style = _stylesheet2.default.resolve(this.props.style);
    this.layout = _yogaLayout2.default.Node.create();

    if (this.props) {
      this.applyProps(this.props);
    }
  }

  _createClass(Base, [{
    key: 'appendChild',
    value: function appendChild(child) {
      child.parent = this;
      this.children.push(child);
      this.layout.insertChild(child.layout, this.layout.getChildCount());
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      var index = this.children.indexOf(child);

      child.parent = null;
      this.children.slice(index, 1);
      this.layout.removeChild(child.layout, index);
    }
  }, {
    key: 'applyProps',
    value: function applyProps(props) {
      var _this = this;

      if (this.style) {
        (0, _lodash2.default)(this.style).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              attribute = _ref2[0],
              value = _ref2[1];

          _this.applyStyle(attribute, value);
        });
      }
    }
  }, {
    key: 'applyStyle',
    value: function applyStyle(attribute, value) {
      var setter = 'set' + (0, _lodash6.default)(attribute);

      switch (attribute) {
        case 'marginTop':
          this.layout.setMargin(_yogaLayout2.default.EDGE_TOP, value);
          break;
        case 'marginRight':
          this.layout.setMargin(_yogaLayout2.default.EDGE_RIGHT, value);
          break;
        case 'marginBottom':
          this.layout.setMargin(_yogaLayout2.default.EDGE_BOTTOM, value);
          break;
        case 'marginLeft':
          this.layout.setMargin(_yogaLayout2.default.EDGE_LEFT, value);
          break;
        case 'paddingTop':
          this.layout.setPadding(_yogaLayout2.default.EDGE_TOP, value);
          break;
        case 'paddingRight':
          this.layout.setPadding(_yogaLayout2.default.EDGE_RIGHT, value);
          break;
        case 'paddingBottom':
          this.layout.setPadding(_yogaLayout2.default.EDGE_BOTTOM, value);
          break;
        case 'paddingLeft':
          this.layout.setPadding(_yogaLayout2.default.EDGE_LEFT, value);
          break;
        default:
          if ((0, _lodash4.default)(this.layout[setter])) {
            this.layout[setter](value);
          }
      }
    }
  }, {
    key: 'recalculateLayout',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var childs;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.all(this.children.map(function (child) {
                  return child.recalculateLayout();
                }));

              case 2:
                childs = _context.sent;
                return _context.abrupt('return', childs);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function recalculateLayout() {
        return _ref3.apply(this, arguments);
      }

      return recalculateLayout;
    }()
  }, {
    key: 'getAbsoluteLayout',
    value: function getAbsoluteLayout() {
      var myLayout = this.layout.getComputedLayout();

      var parentLayout = this.parent.getAbsoluteLayout ? this.parent.getAbsoluteLayout() : { left: 0, top: 0 };

      return {
        left: myLayout.left + parentLayout.left,
        top: myLayout.top + parentLayout.top,
        height: myLayout.height,
        width: myLayout.width
      };
    }
  }, {
    key: 'getComputedPadding',
    value: function getComputedPadding() {
      return {
        top: this.layout.getComputedPadding(_yogaLayout2.default.EDGE_TOP),
        right: this.layout.getComputedPadding(_yogaLayout2.default.EDGE_RIGHT),
        bottom: this.layout.getComputedPadding(_yogaLayout2.default.EDGE_BOTTOM),
        left: this.layout.getComputedPadding(_yogaLayout2.default.EDGE_LEFT)
      };
    }
  }, {
    key: 'drawBackgroundColor',
    value: function drawBackgroundColor() {
      var _getAbsoluteLayout = this.getAbsoluteLayout(),
          left = _getAbsoluteLayout.left,
          top = _getAbsoluteLayout.top,
          width = _getAbsoluteLayout.width,
          height = _getAbsoluteLayout.height;

      var backgroundColor = this.style.backgroundColor;


      if (backgroundColor) {
        this.root.fillColor(backgroundColor).rect(left, top, width, height).fill();
      }
    }
  }, {
    key: 'renderChildren',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < this.children.length)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return this.children[i].render();

              case 4:
                i++;
                _context2.next = 1;
                break;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function renderChildren() {
        return _ref4.apply(this, arguments);
      }

      return renderChildren;
    }()
  }]);

  return Base;
}();

Base.defaultProps = {
  style: {}
};
exports.default = Base;