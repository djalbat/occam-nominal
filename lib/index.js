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
    get contextUtilities () {
        return _context.default;
    },
    get lexersUtilities () {
        return _lexers.default;
    },
    get parsersUtilities () {
        return _parsers.default;
    }
});
require("./preamble");
const _lexers = /*#__PURE__*/ _interop_require_default(require("./utilities/lexers"));
const _parsers = /*#__PURE__*/ _interop_require_default(require("./utilities/parsers"));
const _context = /*#__PURE__*/ _interop_require_default(require("./utilities/context"));
const _nominal = /*#__PURE__*/ _interop_require_default(require("./context/file/nominal"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFwiLi9wcmVhbWJsZVwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIGxleGVyc1V0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9sZXhlcnNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2Vyc1V0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9wYXJzZXJzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNvbnRleHRVdGlsaXRpZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvY29udGV4dFwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIE5vbWluYWxGaWxlQ29udGV4dCB9IGZyb20gXCIuL2NvbnRleHQvZmlsZS9ub21pbmFsXCI7XG4iXSwibmFtZXMiOlsiTm9taW5hbEZpbGVDb250ZXh0IiwiY29udGV4dFV0aWxpdGllcyIsImxleGVyc1V0aWxpdGllcyIsInBhcnNlcnNVdGlsaXRpZXMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQVFvQkE7ZUFBQUEsZ0JBQWtCOztRQUZsQkM7ZUFBQUEsZ0JBQWdCOztRQUZoQkM7ZUFBQUEsZUFBZTs7UUFDZkM7ZUFBQUEsZ0JBQWdCOzs7UUFIN0I7K0RBRW9DO2dFQUNDO2dFQUNBO2dFQUVFIn0=