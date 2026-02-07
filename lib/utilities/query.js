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
    get nodeQuery () {
        return nodeQuery;
    },
    get nodesQuery () {
        return nodesQuery;
    }
});
var _occamquery = require("occam-query");
function nodeQuery(expressionString) {
    var query = _occamquery.Query.fromExpressionString(expressionString);
    return function(node) {
        var nodes = query.execute(node);
        node = nodes.shift() || null; ///
        return node;
    };
}
function nodesQuery(expressionString) {
    var query = _occamquery.Query.fromExpressionString(expressionString);
    return function(node) {
        var nodes = query.execute(node);
        return nodes;
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvcXVlcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSBcIm9jY2FtLXF1ZXJ5XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlUXVlcnkoZXhwcmVzc2lvblN0cmluZykge1xuICBjb25zdCBxdWVyeSA9IFF1ZXJ5LmZyb21FeHByZXNzaW9uU3RyaW5nKGV4cHJlc3Npb25TdHJpbmcpO1xuXG4gIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBxdWVyeS5leGVjdXRlKG5vZGUpO1xuXG4gICAgbm9kZSA9IG5vZGVzLnNoaWZ0KCkgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGVzUXVlcnkoZXhwcmVzc2lvblN0cmluZykge1xuICBjb25zdCBxdWVyeSA9IFF1ZXJ5LmZyb21FeHByZXNzaW9uU3RyaW5nKGV4cHJlc3Npb25TdHJpbmcpO1xuXG4gIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBxdWVyeS5leGVjdXRlKG5vZGUpO1xuXG4gICAgcmV0dXJuIG5vZGVzO1xuICB9O1xufVxuIl0sIm5hbWVzIjpbIm5vZGVRdWVyeSIsIm5vZGVzUXVlcnkiLCJleHByZXNzaW9uU3RyaW5nIiwicXVlcnkiLCJRdWVyeSIsImZyb21FeHByZXNzaW9uU3RyaW5nIiwibm9kZSIsIm5vZGVzIiwiZXhlY3V0ZSIsInNoaWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFJZ0JBO2VBQUFBOztRQVlBQztlQUFBQTs7OzBCQWRNO0FBRWYsU0FBU0QsVUFBVUUsZ0JBQWdCO0lBQ3hDLElBQU1DLFFBQVFDLGlCQUFLLENBQUNDLG9CQUFvQixDQUFDSDtJQUV6QyxPQUFPLFNBQVNJLElBQUk7UUFDbEIsSUFBTUMsUUFBUUosTUFBTUssT0FBTyxDQUFDRjtRQUU1QkEsT0FBT0MsTUFBTUUsS0FBSyxNQUFNLE1BQU0sR0FBRztRQUVqQyxPQUFPSDtJQUNUO0FBQ0Y7QUFFTyxTQUFTTCxXQUFXQyxnQkFBZ0I7SUFDekMsSUFBTUMsUUFBUUMsaUJBQUssQ0FBQ0Msb0JBQW9CLENBQUNIO0lBRXpDLE9BQU8sU0FBU0ksSUFBSTtRQUNsQixJQUFNQyxRQUFRSixNQUFNSyxPQUFPLENBQUNGO1FBRTVCLE9BQU9DO0lBQ1Q7QUFDRiJ9