"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get NominalFileContext () {
        return _nominal.default;
    },
    get NominalLexer () {
        return _lexer.default;
    },
    get NominalParser () {
        return _parser.default;
    },
    get NominalValue () {
        return _value.default;
    }
});
require("./preamble");
const _value = /*#__PURE__*/ _interop_require_default(require("./value"));
const _lexer = /*#__PURE__*/ _interop_require_default(require("./nominal/lexer"));
const _parser = /*#__PURE__*/ _interop_require_default(require("./nominal/parser"));
const _nominal = /*#__PURE__*/ _interop_require_default(require("./context/file/nominal"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFwiLi9wcmVhbWJsZVwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIE5vbWluYWxWYWx1ZSB9IGZyb20gXCIuL3ZhbHVlXCI7ICAvLy9cbmV4cG9ydCB7IGRlZmF1bHQgYXMgTm9taW5hbExleGVyIH0gZnJvbSBcIi4vbm9taW5hbC9sZXhlclwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBOb21pbmFsUGFyc2VyIH0gZnJvbSBcIi4vbm9taW5hbC9wYXJzZXJcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTm9taW5hbEZpbGVDb250ZXh0IH0gZnJvbSBcIi4vY29udGV4dC9maWxlL25vbWluYWxcIjtcbiJdLCJuYW1lcyI6WyJOb21pbmFsRmlsZUNvbnRleHQiLCJOb21pbmFsTGV4ZXIiLCJOb21pbmFsUGFyc2VyIiwiTm9taW5hbFZhbHVlIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFPb0JBO2VBQUFBLGdCQUFrQjs7UUFGbEJDO2VBQUFBLGNBQVk7O1FBQ1pDO2VBQUFBLGVBQWE7O1FBRmJDO2VBQUFBLGNBQVk7OztRQUZ6Qjs4REFFaUM7OERBQ0E7K0RBQ0M7Z0VBQ0sifQ==