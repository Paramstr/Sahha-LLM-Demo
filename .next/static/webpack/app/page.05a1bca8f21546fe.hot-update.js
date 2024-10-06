"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.5_react-dom@18.0.0_react@18.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _public_Sahha_Logo_Final_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../public/Sahha Logo Final.svg */ \"(app-pages-browser)/./public/Sahha Logo Final.svg\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.5_react-dom@18.0.0_react@18.0.0/node_modules/next/dist/api/image.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.5_react-dom@18.0.0_react@18.0.0/node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction Home() {\n    _s();\n    const [loadingStep, setLoadingStep] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    const [Sahha_healthData, setHealthData] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\");\n    //For retrieving Sahha Health Data\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        fetch(\"/api/health-data\").then((response)=>response.json()).then((data)=>setHealthData(data.data)).catch((error)=>console.error(\"Error loading health data:\", error));\n    }, []);\n    const LoadingIndicator = ()=>{\n        if (loadingStep) {\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center space-x-2 text-gray-600 my-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900\"\n                    }, void 0, false, {\n                        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        children: loadingStep\n                    }, void 0, false, {\n                        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                lineNumber: 33,\n                columnNumber: 9\n            }, this);\n        } else {\n            return null;\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mb-8\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    src: _public_Sahha_Logo_Final_svg__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n                    alt: \"Sahha LLM Logo\",\n                    width: 250,\n                    height: 250\n                }, void 0, false, {\n                    fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                lineNumber: 45,\n                columnNumber: 8\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"text-2xl mb-8 text-black pb-5\",\n                children: \"An Exploration into Large Language Model assisted health insights and recommendations\"\n            }, void 0, false, {\n                fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                lineNumber: 48,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n        lineNumber: 44,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"AxXTPCSHlQ7T27DJCqzka2+/G4A=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDcUQ7QUFDdEI7QUFDb0I7QUFNcEMsU0FBU0s7O0lBQ3RCLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHSiwrQ0FBUUEsQ0FBZ0I7SUFDOUQsTUFBTSxDQUFDSyxrQkFBa0JDLGNBQWMsR0FBR04sK0NBQVFBLENBQVM7SUFHM0Qsa0NBQWtDO0lBQ2xDQyxnREFBU0EsQ0FBQztRQUNSTSxNQUFNLG9CQUNIQyxJQUFJLENBQUMsQ0FBQ0MsV0FBYUEsU0FBU0MsSUFBSSxJQUNoQ0YsSUFBSSxDQUFDLENBQUNHLE9BQVNMLGNBQWNLLEtBQUtBLElBQUksR0FDdENDLEtBQUssQ0FBQyxDQUFDQyxRQUFVQyxRQUFRRCxLQUFLLENBQUMsOEJBQThCQTtJQUNsRSxHQUFHLEVBQUU7SUFTTCxNQUFNRSxtQkFBbUI7UUFDdkIsSUFBSVosYUFBYTtZQUNmLHFCQUNFLDhEQUFDYTtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNEO3dCQUFJQyxXQUFVOzs7Ozs7a0NBQ2YsOERBQUNDO2tDQUFNZjs7Ozs7Ozs7Ozs7O1FBR2IsT0FBTztZQUNMLE9BQU87UUFDVDtJQUNGO0lBRUEscUJBQ0UsOERBQUNnQjtRQUFLRixXQUFVOzswQkFDYiw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ2QsNEVBQUNuQixrREFBS0E7b0JBQUNzQixLQUFLdkIsb0VBQUlBO29CQUFFd0IsS0FBSTtvQkFBaUJDLE9BQU87b0JBQUtDLFFBQVE7Ozs7Ozs7Ozs7OzBCQUU3RCw4REFBQ0M7Z0JBQUVQLFdBQVU7MEJBQWdDOzs7Ozs7Ozs7Ozs7QUFhbkQ7R0FuRHdCZjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3BhZ2UudHN4P2Y2OGEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5pbXBvcnQgTG9nbyBmcm9tICcuLi8uLi9wdWJsaWMvU2FoaGEgTG9nbyBGaW5hbC5zdmcnO1xuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIENvbXBvbmVudHMgZnJvbSBcIi4uL2FwcC9jb21wb25lbnRzL2luZGV4XCI7XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFtsb2FkaW5nU3RlcCwgc2V0TG9hZGluZ1N0ZXBdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtTYWhoYV9oZWFsdGhEYXRhLCBzZXRIZWFsdGhEYXRhXSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIik7XG5cblxuICAvL0ZvciByZXRyaWV2aW5nIFNhaGhhIEhlYWx0aCBEYXRhXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2goXCIvYXBpL2hlYWx0aC1kYXRhXCIpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBzZXRIZWFsdGhEYXRhKGRhdGEuZGF0YSkpXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyBoZWFsdGggZGF0YTpcIiwgZXJyb3IpKTtcbiAgfSwgW10pO1xuXG5cblxuXG5cblxuICBcblxuICBjb25zdCBMb2FkaW5nSW5kaWNhdG9yID0gKCkgPT4ge1xuICAgIGlmIChsb2FkaW5nU3RlcCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC1ncmF5LTYwMCBteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbmltYXRlLXNwaW4gcm91bmRlZC1mdWxsIGgtNSB3LTUgYm9yZGVyLWItMiBib3JkZXItZ3JheS05MDBcIj48L2Rpdj5cbiAgICAgICAgICA8c3Bhbj57bG9hZGluZ1N0ZXB9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxtYWluIGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ncmF5LTEwMCBwLTEwXCI+XG4gICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgIDxJbWFnZSBzcmM9e0xvZ299IGFsdD1cIlNhaGhhIExMTSBMb2dvXCIgd2lkdGg9ezI1MH0gaGVpZ2h0PXsyNTB9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtMnhsIG1iLTggdGV4dC1ibGFjayBwYi01XCI+XG4gICAgICBBbiBFeHBsb3JhdGlvbiBpbnRvIExhcmdlIExhbmd1YWdlIE1vZGVsIGFzc2lzdGVkIGhlYWx0aCBpbnNpZ2h0cyBhbmQgcmVjb21tZW5kYXRpb25zXG4gICAgICA8L3A+XG4gICAgICBcblxuXG4gICAgICAgXG5cbiAgXG4gICBcblxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJMb2dvIiwiSW1hZ2UiLCJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiSG9tZSIsImxvYWRpbmdTdGVwIiwic2V0TG9hZGluZ1N0ZXAiLCJTYWhoYV9oZWFsdGhEYXRhIiwic2V0SGVhbHRoRGF0YSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsIkxvYWRpbmdJbmRpY2F0b3IiLCJkaXYiLCJjbGFzc05hbWUiLCJzcGFuIiwibWFpbiIsInNyYyIsImFsdCIsIndpZHRoIiwiaGVpZ2h0IiwicCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});