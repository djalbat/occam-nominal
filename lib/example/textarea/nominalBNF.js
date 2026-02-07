"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _easywithstyle = /*#__PURE__*/ _interop_require_default(require("easy-with-style"));
var _textarea = /*#__PURE__*/ _interop_require_default(require("../textarea"));
var _constants = require("../../constants");
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _tagged_template_literal(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
}
function _templateObject() {
    var data = _tagged_template_literal([
        "\n\n  height: 48rem;\n  \n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var NominalBNFTextarea = /*#__PURE__*/ function(Textarea) {
    _inherits(NominalBNFTextarea, Textarea);
    function NominalBNFTextarea() {
        _class_call_check(this, NominalBNFTextarea);
        return _call_super(this, NominalBNFTextarea, arguments);
    }
    _create_class(NominalBNFTextarea, [
        {
            key: "getNominalBNF",
            value: function getNominalBNF() {
                var value = this.getValue(), nominalBNF = value; ///
                return nominalBNF;
            }
        },
        {
            key: "setNominalBNF",
            value: function setNominalBNF(nominalBNF) {
                var value = nominalBNF; ///
                this.setValue(value);
            }
        },
        {
            key: "clearNominalBNF",
            value: function clearNominalBNF() {
                var value = _constants.EMPTY_STRING;
                this.setValue(value);
            }
        },
        {
            key: "parentContext",
            value: function parentContext() {
                var getNominalBNF = this.getNominalBNF.bind(this), setNominalBNF = this.setNominalBNF.bind(this), clearNominalBNF = this.clearNominalBNF.bind(this);
                return {
                    getNominalBNF: getNominalBNF,
                    setNominalBNF: setNominalBNF,
                    clearNominalBNF: clearNominalBNF
                };
            }
        }
    ]);
    return NominalBNFTextarea;
}(_textarea.default);
_define_property(NominalBNFTextarea, "defaultProperties", {
    className: "nominal-bnf",
    spellCheck: "false"
});
var _default = (0, _easywithstyle.default)(NominalBNFTextarea)(_templateObject());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3RleHRhcmVhL25vbWluYWxCTkYuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCBUZXh0YXJlYSBmcm9tIFwiLi4vdGV4dGFyZWFcIjtcblxuaW1wb3J0IHsgRU1QVFlfU1RSSU5HIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuXG5jbGFzcyBOb21pbmFsQk5GVGV4dGFyZWEgZXh0ZW5kcyBUZXh0YXJlYSB7XG4gIGdldE5vbWluYWxCTkYoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCksXG4gICAgICAgICAgbm9taW5hbEJORiA9IHZhbHVlOyAvLy9cblxuICAgIHJldHVybiBub21pbmFsQk5GO1xuICB9XG5cbiAgc2V0Tm9taW5hbEJORihub21pbmFsQk5GKSB7XG4gICAgY29uc3QgdmFsdWUgPSBub21pbmFsQk5GOyAgLy8vXG5cbiAgICB0aGlzLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIGNsZWFyTm9taW5hbEJORigpIHtcbiAgICBjb25zdCB2YWx1ZSA9IEVNUFRZX1NUUklORztcblxuICAgIHRoaXMuc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICBjb25zdCBnZXROb21pbmFsQk5GID0gdGhpcy5nZXROb21pbmFsQk5GLmJpbmQodGhpcyksXG4gICAgICAgICAgc2V0Tm9taW5hbEJORiA9IHRoaXMuc2V0Tm9taW5hbEJORi5iaW5kKHRoaXMpLFxuICAgICAgICAgIGNsZWFyTm9taW5hbEJORiA9IHRoaXMuY2xlYXJOb21pbmFsQk5GLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldE5vbWluYWxCTkYsXG4gICAgICBzZXROb21pbmFsQk5GLFxuICAgICAgY2xlYXJOb21pbmFsQk5GXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcIm5vbWluYWwtYm5mXCIsXG4gICAgc3BlbGxDaGVjazogXCJmYWxzZVwiXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShOb21pbmFsQk5GVGV4dGFyZWEpYFxuXG4gIGhlaWdodDogNDhyZW07XG4gIFxuYDtcbiJdLCJuYW1lcyI6WyJOb21pbmFsQk5GVGV4dGFyZWEiLCJnZXROb21pbmFsQk5GIiwidmFsdWUiLCJnZXRWYWx1ZSIsIm5vbWluYWxCTkYiLCJzZXROb21pbmFsQk5GIiwic2V0VmFsdWUiLCJjbGVhck5vbWluYWxCTkYiLCJFTVBUWV9TVFJJTkciLCJwYXJlbnRDb250ZXh0IiwiYmluZCIsIlRleHRhcmVhIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJzcGVsbENoZWNrIiwid2l0aFN0eWxlIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkE4Q0E7OztlQUFBOzs7b0VBNUNzQjsrREFFRDt5QkFFUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTdCLElBQUEsQUFBTUEsbUNBQU47Y0FBTUE7YUFBQUE7Z0NBQUFBO1FBQU4sT0FBQSxrQkFBTUE7O2tCQUFBQTs7WUFDSkMsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLElBQU1DLFFBQVEsSUFBSSxDQUFDQyxRQUFRLElBQ3JCQyxhQUFhRixPQUFPLEdBQUc7Z0JBRTdCLE9BQU9FO1lBQ1Q7OztZQUVBQyxLQUFBQTttQkFBQUEsU0FBQUEsY0FBY0QsVUFBVTtnQkFDdEIsSUFBTUYsUUFBUUUsWUFBYSxHQUFHO2dCQUU5QixJQUFJLENBQUNFLFFBQVEsQ0FBQ0o7WUFDaEI7OztZQUVBSyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUwsUUFBUU0sdUJBQVk7Z0JBRTFCLElBQUksQ0FBQ0YsUUFBUSxDQUFDSjtZQUNoQjs7O1lBRUFPLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFNUixnQkFBZ0IsSUFBSSxDQUFDQSxhQUFhLENBQUNTLElBQUksQ0FBQyxJQUFJLEdBQzVDTCxnQkFBZ0IsSUFBSSxDQUFDQSxhQUFhLENBQUNLLElBQUksQ0FBQyxJQUFJLEdBQzVDSCxrQkFBa0IsSUFBSSxDQUFDQSxlQUFlLENBQUNHLElBQUksQ0FBQyxJQUFJO2dCQUV0RCxPQUFRO29CQUNOVCxlQUFBQTtvQkFDQUksZUFBQUE7b0JBQ0FFLGlCQUFBQTtnQkFDRjtZQUNGOzs7V0E5QklQO0VBQTJCVyxpQkFBUTtBQWdDdkMsaUJBaENJWCxvQkFnQ0dZLHFCQUFvQjtJQUN6QkMsV0FBVztJQUNYQyxZQUFZO0FBQ2Q7SUFHRixXQUFlQyxJQUFBQSxzQkFBUyxFQUFDZiJ9