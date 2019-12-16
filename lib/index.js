"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var ethers_1 = require("ethers");
var utils_1 = require("ethers/utils");
var Input = styled_components_1.default.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  -moz-appearance: textfield;\n\n  &:focus {\n    outline: none;\n  }\n"], ["\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  -moz-appearance: textfield;\n\n  &:focus {\n    outline: none;\n  }\n"])));
exports.BigNumberInput = function (props) {
    var _a = props.placeholder, placeholder = _a === void 0 ? '0.00' : _a, _b = props.autofocus, autofocus = _b === void 0 ? false : _b, _c = props.value, value = _c === void 0 ? null : _c, decimals = props.decimals, name = props.name, step = props.step, min = props.min, max = props.max, className = props.className, _d = props.disabled, disabled = _d === void 0 ? false : _d, onChange = props.onChange;
    var _e = React.useState(''), currentValue = _e[0], setCurrentValue = _e[1];
    var inputRef = React.useRef(null);
    React.useEffect(function () {
        if (!value) {
            setCurrentValue('');
        }
        else if (value && !ethers_1.ethers.utils.parseUnits(currentValue || '0', decimals).eq(value)) {
            setCurrentValue(ethers_1.ethers.utils.formatUnits(value, decimals));
        }
    }, [value, decimals, currentValue]);
    React.useEffect(function () {
        if (autofocus && inputRef) {
            var node = inputRef.current;
            node.focus();
        }
    }, [autofocus, inputRef]);
    var updateValue = function (event) {
        var _a = event.currentTarget, name = _a.name, value = _a.value;
        if (!value) {
            onChange({ name: name, value: new utils_1.BigNumber(0) });
        }
        else {
            var newValue = ethers_1.ethers.utils.parseUnits(value, decimals);
            var invalidValue = (min && newValue.lt(min)) || (max && newValue.gt(max));
            if (invalidValue) {
                return;
            }
            onChange({ name: name, value: newValue });
        }
        setCurrentValue(value);
    };
    var currentStep = step && ethers_1.ethers.utils.formatUnits(step, decimals);
    var currentMin = min && ethers_1.ethers.utils.formatUnits(min, decimals);
    var currentMax = max && ethers_1.ethers.utils.formatUnits(max, decimals);
    return (React.createElement(Input, { "data-testid": name, className: className, max: currentMax, min: currentMin, onChange: updateValue, ref: inputRef, step: currentStep, type: 'number', name: name, value: currentValue, placeholder: placeholder, disabled: disabled }));
};
var templateObject_1;
//# sourceMappingURL=index.js.map