'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isUrl = require('is-url');

var _isUrl2 = _interopRequireDefault(_isUrl);

var _standard = require('./standard');

var _standard2 = _interopRequireDefault(_standard);

var _font = require('../utils/font');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var fonts = {};

var register = function register(src, _ref) {
  var family = _ref.family,
      otherOptions = _objectWithoutProperties(_ref, ['family']);

  fonts[family] = _extends({
    src: src,
    loaded: false
  }, otherOptions);
};

var getRegisteredFonts = function getRegisteredFonts() {
  return Object.keys(fonts);
};

var load = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(fontFamily, doc) {
    var font, src;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            font = fonts[fontFamily];

            if (!(font && !font.loaded)) {
              _context.next = 12;
              break;
            }

            font.loaded = true;

            if (!(0, _isUrl2.default)(font.src)) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return (0, _font.fetchFont)(font.src);

          case 6:
            _context.t0 = _context.sent;
            _context.next = 10;
            break;

          case 9:
            _context.t0 = font.src;

          case 10:
            src = _context.t0;


            doc.registerFont(fontFamily, src);

          case 12:
            if (!(!font && !_standard2.default.includes(fontFamily))) {
              _context.next = 14;
              break;
            }

            throw new Error('Font familiy not registered: ' + fontFamily + '. Please register it calling Font.register() method.');

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function load(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var clear = function clear() {
  fonts = {};
};

exports.default = {
  register: register,
  getRegisteredFonts: getRegisteredFonts,
  load: load,
  clear: clear
};