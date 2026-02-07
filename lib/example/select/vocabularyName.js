"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return VocabularyNameSelect;
    }
});
var _select = /*#__PURE__*/ _interop_require_default(require("../select"));
var _vocabularyNames = require("../../vocabularyNames");
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
}
var VocabularyNameSelect = /*#__PURE__*/ function(Select) {
    _inherits(VocabularyNameSelect, Select);
    function VocabularyNameSelect() {
        _class_call_check(this, VocabularyNameSelect);
        return _call_super(this, VocabularyNameSelect, arguments);
    }
    _create_class(VocabularyNameSelect, [
        {
            key: "getVocabularyName",
            value: function getVocabularyName() {
                var value = this.getValue(), vocabularyName = value; ///
                return vocabularyName;
            }
        },
        {
            key: "childElements",
            value: function childElements() {
                var vocabularyNames = [
                    _vocabularyNames.TYPE_VOCABULARY_NAME,
                    _vocabularyNames.SYMBOL_VOCABULARY_NAME
                ], options = vocabularyNames.map(function(vocabularyName, index) {
                    var value = vocabularyName, selected = index === 0;
                    return /*#__PURE__*/ React.createElement("option", {
                        value: value,
                        selected: selected
                    }, vocabularyName);
                }), childElements = _to_consumable_array(options);
                return childElements;
            }
        },
        {
            key: "parentContext",
            value: function parentContext() {
                var getVocabularyName = this.getVocabularyName.bind(this); ///
                return {
                    getVocabularyName: getVocabularyName
                };
            }
        }
    ]);
    return VocabularyNameSelect;
}(_select.default);
_define_property(VocabularyNameSelect, "defaultProperties", {
    className: "rule-name",
    spellCheck: "false"
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9leGFtcGxlL3NlbGVjdC92b2NhYnVsYXJ5TmFtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFNlbGVjdCBmcm9tIFwiLi4vc2VsZWN0XCI7XG5cbmltcG9ydCB7IFRZUEVfVk9DQUJVTEFSWV9OQU1FLCBTWU1CT0xfVk9DQUJVTEFSWV9OQU1FIH0gIGZyb20gXCIuLi8uLi92b2NhYnVsYXJ5TmFtZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVm9jYWJ1bGFyeU5hbWVTZWxlY3QgZXh0ZW5kcyBTZWxlY3Qge1xuICBnZXRWb2NhYnVsYXJ5TmFtZSgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgICAgICB2b2NhYnVsYXJ5TmFtZSA9IHZhbHVlOyAvLy9cblxuICAgIHJldHVybiB2b2NhYnVsYXJ5TmFtZTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMoKSB7XG4gICAgY29uc3Qgdm9jYWJ1bGFyeU5hbWVzID0gW1xuICAgICAgICAgICAgVFlQRV9WT0NBQlVMQVJZX05BTUUsXG4gICAgICAgICAgICBTWU1CT0xfVk9DQUJVTEFSWV9OQU1FXG4gICAgICAgICAgXSxcbiAgICAgICAgICBvcHRpb25zICA9IHZvY2FidWxhcnlOYW1lcy5tYXAoKHZvY2FidWxhcnlOYW1lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2b2NhYnVsYXJ5TmFtZSxcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gKGluZGV4ID09PSAwKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcblxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPXt2YWx1ZX0gc2VsZWN0ZWQ9e3NlbGVjdGVkfSA+XG4gICAgICAgICAgICAgICAge3ZvY2FidWxhcnlOYW1lfVxuICAgICAgICAgICAgICA8L29wdGlvbj5cblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gW1xuICAgICAgICAgICAgLi4ub3B0aW9uc1xuICAgICAgICAgIF07XG5cblxuICAgIHJldHVybiBjaGlsZEVsZW1lbnRzO1xuICB9XG5cbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICBjb25zdCBnZXRWb2NhYnVsYXJ5TmFtZSA9IHRoaXMuZ2V0Vm9jYWJ1bGFyeU5hbWUuYmluZCh0aGlzKTsgLy8vXG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldFZvY2FidWxhcnlOYW1lXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcInJ1bGUtbmFtZVwiLFxuICAgIHNwZWxsQ2hlY2s6IFwiZmFsc2VcIlxuICB9XG59XG4iXSwibmFtZXMiOlsiVm9jYWJ1bGFyeU5hbWVTZWxlY3QiLCJnZXRWb2NhYnVsYXJ5TmFtZSIsInZhbHVlIiwiZ2V0VmFsdWUiLCJ2b2NhYnVsYXJ5TmFtZSIsImNoaWxkRWxlbWVudHMiLCJ2b2NhYnVsYXJ5TmFtZXMiLCJUWVBFX1ZPQ0FCVUxBUllfTkFNRSIsIlNZTUJPTF9WT0NBQlVMQVJZX05BTUUiLCJvcHRpb25zIiwibWFwIiwiaW5kZXgiLCJzZWxlY3RlZCIsIm9wdGlvbiIsInBhcmVudENvbnRleHQiLCJiaW5kIiwiU2VsZWN0IiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJzcGVsbENoZWNrIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztlQU1xQkE7Ozs2REFKRjsrQkFFMkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUvQyxJQUFBLEFBQU1BLHFDQUFOO2NBQU1BO2FBQUFBO2dDQUFBQTtRQUFOLE9BQUEsa0JBQU1BOztrQkFBQUE7O1lBQ25CQyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUMsUUFBUSxJQUFJLENBQUNDLFFBQVEsSUFDckJDLGlCQUFpQkYsT0FBTyxHQUFHO2dCQUVqQyxPQUFPRTtZQUNUOzs7WUFFQUMsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLElBQU1DLGtCQUFrQjtvQkFDaEJDLHFDQUFvQjtvQkFDcEJDLHVDQUFzQjtpQkFDdkIsRUFDREMsVUFBV0gsZ0JBQWdCSSxHQUFHLENBQUMsU0FBQ04sZ0JBQWdCTztvQkFDOUMsSUFBTVQsUUFBUUUsZ0JBQ1JRLFdBQVlELFVBQVU7b0JBRTVCLHFCQUVFLG9CQUFDRTt3QkFBT1gsT0FBT0E7d0JBQU9VLFVBQVVBO3VCQUM3QlI7Z0JBSVAsSUFDQUMsZ0JBQ0UscUJBQUdJO2dCQUlYLE9BQU9KO1lBQ1Q7OztZQUVBUyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTWIsb0JBQW9CLElBQUksQ0FBQ0EsaUJBQWlCLENBQUNjLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRztnQkFFaEUsT0FBUTtvQkFDTmQsbUJBQUFBO2dCQUNGO1lBQ0Y7OztXQXZDbUJEO0VBQTZCZ0IsZUFBTTtBQXlDdEQsaUJBekNtQmhCLHNCQXlDWmlCLHFCQUFvQjtJQUN6QkMsV0FBVztJQUNYQyxZQUFZO0FBQ2QifQ==