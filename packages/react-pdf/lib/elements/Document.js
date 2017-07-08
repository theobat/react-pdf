"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Document = function () {
  function Document(root, props) {
    _classCallCheck(this, Document);

    this.children = [];

    this.root = root;
    this.props = props;
  }

  _createClass(Document, [{
    key: "appendChild",
    value: function appendChild(child) {
      child.parent = this;
      this.children.push(child);
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var index = this.children.indexOf(child);

      child.parent = null;
      this.children.slice(index, 1);
    }
  }, {
    key: "renderChildren",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < this.children.length)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.children[i].render();

              case 4:
                i++;
                _context.next = 1;
                break;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function renderChildren() {
        return _ref.apply(this, arguments);
      }

      return renderChildren;
    }()
  }, {
    key: "render",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.renderChildren();

              case 2:

                this.root.end();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function render() {
        return _ref2.apply(this, arguments);
      }

      return render;
    }()
  }]);

  return Document;
}();

exports.default = Document;