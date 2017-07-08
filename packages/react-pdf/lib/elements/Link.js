'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Text2 = require('./Text');

var _Text3 = _interopRequireDefault(_Text2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROTOCOL_REGEXP = /^(http|https|ftp|ftps|mailto)\:\/\//i;

var Link = function (_Text) {
  _inherits(Link, _Text);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, [{
    key: 'getSrc',
    value: function getSrc() {
      var src = this.props.src;


      if (typeof src === 'string' && !src.match(PROTOCOL_REGEXP)) {
        src = 'http://' + src;
      }

      return src;
    }
  }, {
    key: 'renderInlineLink',
    value: function renderInlineLink() {
      var _style = this.style,
          _style$fontSize = _style.fontSize,
          fontSize = _style$fontSize === undefined ? 18 : _style$fontSize,
          _style$color = _style.color,
          color = _style$color === undefined ? 'blue' : _style$color,
          _style$textDecoration = _style.textDecoration,
          textDecoration = _style$textDecoration === undefined ? 'underline' : _style$textDecoration;


      this.root.fillColor(color).fontSize(fontSize).text(this.children, {
        link: this.getSrc(),
        continued: true,
        underline: textDecoration === 'underline'
      });
    }
  }, {
    key: 'renderBlockLink',
    value: function renderBlockLink() {
      var _style2 = this.style,
          align = _style2.align,
          _style2$fontSize = _style2.fontSize,
          fontSize = _style2$fontSize === undefined ? 18 : _style2$fontSize,
          _style2$color = _style2.color,
          color = _style2$color === undefined ? 'blue' : _style2$color,
          _style2$textDecoratio = _style2.textDecoration,
          textDecoration = _style2$textDecoratio === undefined ? 'underline' : _style2$textDecoratio;

      var _getAbsoluteLayout = this.getAbsoluteLayout(),
          left = _getAbsoluteLayout.left,
          top = _getAbsoluteLayout.top,
          width = _getAbsoluteLayout.width,
          height = _getAbsoluteLayout.height;

      this.drawBackgroundColor();

      this.root.fillColor(color).fontSize(fontSize).text(this.children, left, top, {
        link: this.getSrc(),
        width: width + 0.1,
        height: height + 0.1,
        align: align,
        underline: textDecoration === 'underline'
      });
    }
  }, {
    key: 'render',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            inline = _ref2.inline;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.loadFont();

              case 2:

                if (inline) {
                  this.renderInlineLink();
                } else {
                  this.renderBlockLink();
                }

              case 3:
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

  return Link;
}(_Text3.default);

exports.default = Link;