'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _core = require('@react-pdf/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  render: function render(element, filePath, callback) {
    var _this = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var container, node, output;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              container = (0, _core.createElement)('ROOT');
              node = _core.PDFRenderer.createContainer(container);


              _core.PDFRenderer.updateContainer(element, node, null);

              _context.next = 5;
              return (0, _core.pdf)(container).toBuffer();

            case 5:
              output = _context.sent;

              output.pipe(_fs2.default.createWriteStream(filePath));

              if (callback) {
                callback(output, filePath);
              }

              console.log('\uD83D\uDCDD  PDF successfuly exported on ' + _path2.default.resolve(filePath));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};