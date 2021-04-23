/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/framework/controller.ts":
/*!*************************************!*\
  !*** ./src/framework/controller.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"App\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ \"./src/framework/view.ts\");\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\n        to[j] = from[i];\n    return to;\n};\n\nvar App = /** @class */ (function () {\n    function App(params) {\n        this.el = typeof params.el === 'string' ? document.querySelector(params.el) : params.el;\n        this.view = params.view;\n        this.state = params.state;\n        this.actions = this.dispatchAction(params.actions);\n        this.resolveNode();\n    }\n    App.prototype.dispatchAction = function (actions) {\n        var _this = this;\n        var dispatched = {};\n        var _loop_1 = function (key) {\n            var action = actions[key];\n            dispatched[key] = function (state) {\n                var data = [];\n                for (var _i = 1; _i < arguments.length; _i++) {\n                    data[_i - 1] = arguments[_i];\n                }\n                var ret = action.apply(void 0, __spreadArray([state], data));\n                _this.resolveNode();\n                return ret;\n            };\n        };\n        for (var key in actions) {\n            _loop_1(key);\n        }\n        return dispatched;\n    };\n    App.prototype.resolveNode = function () {\n        this.newNode = this.view(this.state, this.actions);\n        this.scheduleRender();\n    };\n    App.prototype.scheduleRender = function () {\n        if (!this.skipRender) {\n            this.skipRender = true;\n            setTimeout(this.render.bind(this));\n        }\n    };\n    App.prototype.render = function () {\n        console.log(\"test\");\n        if (this.oldNode) {\n            (0,_view__WEBPACK_IMPORTED_MODULE_0__.updateElement)(this.el, this.oldNode, this.newNode);\n        }\n        else {\n            this.el.appendChild((0,_view__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.newNode));\n        }\n        this.oldNode = this.newNode;\n        this.skipRender = false;\n    };\n    return App;\n}());\n\n\n\n//# sourceURL=webpack://virtual-dom-framework/./src/framework/controller.ts?");

/***/ }),

/***/ "./src/framework/view.ts":
/*!*******************************!*\
  !*** ./src/framework/view.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"h\": () => (/* binding */ h),\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"updateElement\": () => (/* binding */ updateElement)\n/* harmony export */ });\n// タグ名,属性,子ノードから仮想DOMを返す関数\nfunction h(nodeName, attributes) {\n    var children = [];\n    for (var _i = 2; _i < arguments.length; _i++) {\n        children[_i - 2] = arguments[_i];\n    }\n    return { nodeName: nodeName, attributes: attributes, children: children };\n}\n// 仮想DOMからリアルDOMを生成する関数\nfunction createElement(node) {\n    if (!isVNode(node)) {\n        return document.createTextNode(node.toString());\n    }\n    var element = document.createElement(node.nodeName);\n    setAttributes(element, node.attributes);\n    node.children.forEach(function (child) { return element.appendChild(createElement(child)); });\n    return element;\n}\n// onClickなどのイベントのときはイベントリスナを登録、それ以外は属性として登録する関数\nfunction setAttributes(target, attrs) {\n    for (var attr in attrs) {\n        if (isEventAttr(attr)) {\n            var eventName = attr.slice(2);\n            target.addEventListener(eventName, attrs[attr]);\n        }\n        else {\n            target.setAttribute(attr, attrs[attr]);\n        }\n    }\n}\n// Nodeを受け取り仮想DOMかどうかを判定\nfunction isVNode(node) {\n    return typeof node !== \"string\" && typeof node !== \"number\";\n}\n//属性を受け取りイベントかどうかを判定\nfunction isEventAttr(attr) {\n    return /^on/.test(attr);\n}\nvar ChangeType;\n(function (ChangeType) {\n    ChangeType[ChangeType[\"None\"] = 0] = \"None\";\n    ChangeType[ChangeType[\"Type\"] = 1] = \"Type\";\n    ChangeType[ChangeType[\"Text\"] = 2] = \"Text\";\n    ChangeType[ChangeType[\"Node\"] = 3] = \"Node\";\n    ChangeType[ChangeType[\"Value\"] = 4] = \"Value\";\n    ChangeType[ChangeType[\"Attr\"] = 5] = \"Attr\";\n})(ChangeType || (ChangeType = {}));\nfunction hasChanged(a, b) {\n    if (typeof a !== typeof b) {\n        return ChangeType.Type;\n    }\n    if (!isVNode(a) && a !== b) {\n        return ChangeType.Text;\n    }\n    if (isVNode(a) && isVNode(b)) {\n        if (a.nodeName !== b.nodeName) {\n            return ChangeType.Node;\n        }\n        if (a.attributes.value !== b.attributes.value) {\n            return ChangeType.Value;\n        }\n        if (JSON.stringify(a.attributes) !== JSON.stringify(b.attributes)) {\n            return ChangeType.Attr;\n        }\n    }\n    return ChangeType.None;\n}\nfunction updateElement(parent, oldNode, newNode, index) {\n    if (index === void 0) { index = 0; }\n    if (!oldNode) {\n        parent.appendChild(createElement(newNode));\n        return;\n    }\n    var target = parent.childNodes[index];\n    if (!newNode) {\n        parent.removeChild(target);\n        return;\n    }\n    var changeType = hasChanged(oldNode, newNode);\n    switch (changeType) {\n        case ChangeType.Type:\n        case ChangeType.Text:\n        case ChangeType.Node:\n            parent.replaceChild(createElement(newNode), target);\n            break;\n        case ChangeType.Value:\n            updateValue(target, newNode.attributes.value);\n            break;\n        case ChangeType.Attr:\n            updateAttributes(target, oldNode.attributes, newNode.attributes);\n            break;\n    }\n    if (isVNode(oldNode) && isVNode(newNode)) {\n        for (var i = 0; i < newNode.children.length || i < oldNode.children.length; i++) {\n            updateElement(target, oldNode.children[i], newNode.children[i], i);\n        }\n    }\n}\nfunction updateAttributes(target, oldAttrs, newAttrs) {\n    for (var attr in oldAttrs) {\n        if (!isEventAttr(attr)) {\n            target.removeAttribute(attr);\n        }\n    }\n    for (var attr in newAttrs) {\n        if (!isEventAttr(attr)) {\n            target.setAttribute(attr, newAttrs[attr]);\n        }\n    }\n}\nfunction updateValue(target, newValue) {\n    target.value = newValue;\n}\n\n\n//# sourceURL=webpack://virtual-dom-framework/./src/framework/view.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _framework_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework//view */ \"./src/framework/view.ts\");\n/* harmony import */ var _framework_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./framework/controller */ \"./src/framework/controller.ts\");\n\n\nvar state = {\n    count: 0\n};\nvar actions = {\n    increment: function (state) {\n        state.count++;\n    },\n    decrement: function (state) {\n        state.count--;\n    }\n};\nvar view = function (state, actions) {\n    return (0,_framework_view__WEBPACK_IMPORTED_MODULE_0__.h)(\"div\", null, (0,_framework_view__WEBPACK_IMPORTED_MODULE_0__.h)(\"p\", null, state.count), (0,_framework_view__WEBPACK_IMPORTED_MODULE_0__.h)(\"button\", { type: \"button\", onclick: function () { return actions.increment(state); } }, 'countUp'), (0,_framework_view__WEBPACK_IMPORTED_MODULE_0__.h)(\"button\", { type: \"button\", onclick: function () { return actions.decrement(state); } }, 'countDown'));\n};\nnew _framework_controller__WEBPACK_IMPORTED_MODULE_1__.App({\n    el: \"#app\",\n    state: state,\n    view: view,\n    actions: actions,\n});\n\n\n//# sourceURL=webpack://virtual-dom-framework/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;