'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var _pageSizes = require('../utils/pageSizes');

var _pageSizes2 = _interopRequireDefault(_pageSizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_Base) {
  _inherits(Page, _Base);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).apply(this, arguments));
  }

  _createClass(Page, [{
    key: 'getSize',
    value: function getSize() {
      var size = this.props.size;


      if (typeof size === 'string') {
        return _pageSizes2.default[size];
      } else if (Array.isArray(size)) {
        return size;
      } else if ((typeof size === 'undefined' ? 'undefined' : _typeof(size)) === 'object' && size.width && size.height) {
        return [size.width, size.height];
      } else {
        throw new Error('Invalid Page size: ' + size);
      }
    }
  }, {
    key: 'applyProps',
    value: function applyProps(props) {
      _get(Page.prototype.__proto__ || Object.getPrototypeOf(Page.prototype), 'applyProps', this).call(this, props);

      if (props.size) {
        var size = this.getSize();

        if (props.orientation === 'landscape') {
          this.layout.setWidth(size[1]);
          this.layout.setHeight(size[0]);
        } else {
          this.layout.setHeight(size[1]);
          this.layout.setWidth(size[0]);
        }
      }
    }
  }, {
    key: 'render',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var orientation;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                orientation = this.props.orientation;

                // Since Text needs it's parent layout,
                // we need to calculate flexbox layout for a first time.

                this.layout.calculateLayout();

                // Then ask each children to recalculate it's layout.
                // This puts all Text nodes in a dirty state
                _context.next = 4;
                return this.recalculateLayout();

              case 4:

                // Finally, calculate flexbox's layout
                // one more time based new widths and heights.
                this.layout.calculateLayout();

                this.root.addPage({ size: this.getSize(), layout: orientation, margin: 0 });

                if (this.style.backgroundColor) {
                  this.root.fillColor(this.style.backgroundColor).rect(0, 0, this.root.page.width, this.root.page.height).fill();
                }

                _context.next = 9;
                return this.renderChildren();

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render() {
        return _ref.apply(this, arguments);
      }

      return render;
    }()
  }]);

  return Page;
}(_Base3.default);

Page.defaultProps = {
  size: 'A4',
  orientation: 'portrait',
  style: {}
};
exports.default = Page;