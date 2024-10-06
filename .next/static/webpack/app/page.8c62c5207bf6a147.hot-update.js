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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.5_react-dom@18.0.0_react@18.0.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _public_Sahha_Logo_Final_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../public/Sahha Logo Final.svg */ \"(app-pages-browser)/./public/Sahha Logo Final.svg\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.5_react-dom@18.0.0_react@18.0.0/node_modules/next/dist/api/image.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/.pnpm/next@14.2.5_react-dom@18.0.0_react@18.0.0/node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _app_components_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app/components/index */ \"(app-pages-browser)/./src/app/components/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ \"(app-pages-browser)/./src/app/utils.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Home() {\n    _s();\n    const [loadingStep, setLoadingStep] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    const [Sahha_healthData, setHealthData] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\");\n    const [selectedCity, setSelectedCity] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\");\n    const [response, setResponse] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\");\n    const [symptoms, setSymptoms] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({\n        current_symptoms: [],\n        potential_symptoms: []\n    });\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);\n    const [sahhaOutput, setSahhaOutput] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)();\n    const [placeholderText, setPlaceholderText] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\");\n    //For retrieving Sahha Health Data\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        fetch(\"/api/health-data\").then((response)=>response.json()).then((data)=>setHealthData(data.data)).catch((error)=>console.error(\"Error loading health data:\", error));\n    }, []);\n    //For Input Box\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const placeholderTexts = [\n            \"I heard you're sick. whats your symptoms..\",\n            \"Feeling weird? I reckon its strep..\",\n            \"Stop taking soo long..\",\n            \"Probably shouldn't have gone out last night..\",\n            \"What's your symptoms mate..\"\n        ];\n        let currentPlaceholderIndex = 0;\n        let currentIndex = 0;\n        let typingInterval;\n        const typeText = ()=>{\n            const fullPlaceholder = placeholderTexts[currentPlaceholderIndex];\n            typingInterval = setInterval(()=>{\n                setPlaceholderText(fullPlaceholder.slice(0, currentIndex));\n                currentIndex++;\n                if (currentIndex > fullPlaceholder.length) {\n                    clearInterval(typingInterval);\n                    setTimeout(()=>{\n                        currentIndex = 0;\n                        currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholderTexts.length;\n                        typeText();\n                    }, 2000);\n                }\n            }, 50);\n        };\n        typeText();\n        return ()=>{\n            clearInterval(typingInterval);\n        };\n    }, []);\n    //Handle City Selection\n    const handleCityChange = (city)=>{\n        setSelectedCity(city);\n        console.log(\"Selected city:\", city);\n    };\n    const handleInputChange = (value)=>{\n        setInputValue(value);\n    };\n    const handleSymptomClick = (symptom, state)=>{\n        if (state === \"potential\") {\n            setSymptoms((prevSymptoms)=>({\n                    current_symptoms: [\n                        ...prevSymptoms.current_symptoms,\n                        symptom\n                    ],\n                    potential_symptoms: prevSymptoms.potential_symptoms.filter((s)=>s !== symptom)\n                }));\n        }\n    };\n    const onSubmit = ()=>{\n        (0,_utils__WEBPACK_IMPORTED_MODULE_5__.handleChainedFunction)(inputValue, setIsLoading, setResponse, setSymptoms, setLoadingStep, setSahhaOutput);\n    };\n    const LoadingIndicator = ()=>{\n        if (loadingStep) {\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center space-x-2 text-gray-600 my-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900\"\n                    }, void 0, false, {\n                        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                        lineNumber: 107,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        children: loadingStep\n                    }, void 0, false, {\n                        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                        lineNumber: 108,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                lineNumber: 106,\n                columnNumber: 9\n            }, this);\n        } else {\n            return null;\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mb-8\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    src: _public_Sahha_Logo_Final_svg__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n                    alt: \"Vercel Logo\",\n                    width: 250,\n                    height: 250\n                }, void 0, false, {\n                    fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                    lineNumber: 119,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                lineNumber: 118,\n                columnNumber: 8\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"text-2xl mb-8 text-black pb-5\",\n                children: \"Super Supportive Sickness Buddy \\uD83E\\uDD27\"\n            }, void 0, false, {\n                fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                lineNumber: 121,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"p-8\",\n                children: selectedCity && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"mt-4 text-lg text-gray-500\",\n                    children: [\n                        \"You selected: \",\n                        selectedCity\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                    lineNumber: 128,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                lineNumber: 126,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-full max-w-4xl\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_components_index__WEBPACK_IMPORTED_MODULE_4__.CustomTextEntry, {\n                        value: inputValue,\n                        onChange: handleInputChange,\n                        onSubmit: onSubmit,\n                        placeholder: placeholderText\n                    }, void 0, false, {\n                        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                        lineNumber: 135,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-center w-full\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LoadingIndicator, {}, void 0, false, {\n                            fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                            lineNumber: 143,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                        lineNumber: 142,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_components_index__WEBPACK_IMPORTED_MODULE_4__.SymptomButtons, {\n                        currentSymptoms: symptoms.current_symptoms,\n                        potentialSymptoms: symptoms.potential_symptoms,\n                        onSymptomClick: handleSymptomClick\n                    }, void 0, false, {\n                        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                        lineNumber: 146,\n                        columnNumber: 9\n                    }, this),\n                    !isLoading && sahhaOutput && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"p-8\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_components_index__WEBPACK_IMPORTED_MODULE_4__.HealthSummary, {\n                            data: sahhaOutput\n                        }, void 0, false, {\n                            fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                            lineNumber: 154,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                        lineNumber: 153,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n                lineNumber: 134,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/param-singh/Documents/GitHub/Sahha-LLM-Demo/src/app/page.tsx\",\n        lineNumber: 117,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"Ho52meDccdxj9ikgvBSteR/ZzdU=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7UUFHYixPQUFPO1lBQ0wsT0FBTztRQUNUO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ3NEO1FBQUtGLFdBQVU7OzBCQUNiLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDZCw0RUFBQzNELGtEQUFLQTtvQkFBQzhELEtBQUsvRCxvRUFBSUE7b0JBQUVnRSxLQUFJO29CQUFjQyxPQUFPO29CQUFLQyxRQUFROzs7Ozs7Ozs7OzswQkFFMUQsOERBQUNDO2dCQUFFUCxXQUFVOzBCQUFnQzs7Ozs7OzBCQUs3Qyw4REFBQ0Q7Z0JBQUlDLFdBQVU7MEJBQ1poRCw4QkFDQyw4REFBQ3VEO29CQUFFUCxXQUFVOzt3QkFBNkI7d0JBQ3pCaEQ7Ozs7Ozs7Ozs7OzswQkFLckIsOERBQUMrQztnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUN2RCxrRUFBMEI7d0JBQ3pCNkMsT0FBT3BDO3dCQUNQdUQsVUFBVXBCO3dCQUNWUSxVQUFVQTt3QkFDVmEsYUFBYTVDOzs7Ozs7a0NBR2YsOERBQUNpQzt3QkFBSUMsV0FBVTtrQ0FDYiw0RUFBQ0Y7Ozs7Ozs7Ozs7a0NBR0gsOERBQUNyRCxpRUFBeUI7d0JBQ3hCbUUsaUJBQWlCdEQsU0FBU0UsZ0JBQWdCO3dCQUMxQ3FELG1CQUFtQnZELFNBQVNHLGtCQUFrQjt3QkFDOUNxRCxnQkFBZ0J2Qjs7Ozs7O29CQUdqQixDQUFDN0IsYUFBYUUsNkJBQ2IsOERBQUNtQzt3QkFBSUMsV0FBVTtrQ0FDYiw0RUFBQ3ZELGdFQUF3Qjs0QkFBQzBCLE1BQU1QOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU01QztHQXZKd0JqQjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3BhZ2UudHN4P2Y2OGEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5pbXBvcnQgTG9nbyBmcm9tICcuLi8uLi9wdWJsaWMvU2FoaGEgTG9nbyBGaW5hbC5zdmcnO1xuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIENvbXBvbmVudHMgZnJvbSBcIi4uL2FwcC9jb21wb25lbnRzL2luZGV4XCI7XG5pbXBvcnQgeyBoYW5kbGVDaGFpbmVkRnVuY3Rpb24gfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgU3ltcHRvbXMsIEJ1dHRvblN0YXRlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW2xvYWRpbmdTdGVwLCBzZXRMb2FkaW5nU3RlcF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW1NhaGhhX2hlYWx0aERhdGEsIHNldEhlYWx0aERhdGFdID0gdXNlU3RhdGU8c3RyaW5nPihcIlwiKTtcbiAgY29uc3QgW3NlbGVjdGVkQ2l0eSwgc2V0U2VsZWN0ZWRDaXR5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaW5wdXRWYWx1ZSwgc2V0SW5wdXRWYWx1ZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KFwiXCIpO1xuICBjb25zdCBbcmVzcG9uc2UsIHNldFJlc3BvbnNlXSA9IHVzZVN0YXRlPHN0cmluZz4oXCJcIik7XG4gIGNvbnN0IFtzeW1wdG9tcywgc2V0U3ltcHRvbXNdID0gdXNlU3RhdGU8U3ltcHRvbXM+KHtcbiAgICBjdXJyZW50X3N5bXB0b21zOiBbXSxcbiAgICBwb3RlbnRpYWxfc3ltcHRvbXM6IFtdLFxuICB9KTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW3NhaGhhT3V0cHV0LCBzZXRTYWhoYU91dHB1dF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCk7XG4gIGNvbnN0IFtwbGFjZWhvbGRlclRleHQsIHNldFBsYWNlaG9sZGVyVGV4dF0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICAvL0ZvciByZXRyaWV2aW5nIFNhaGhhIEhlYWx0aCBEYXRhXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2goXCIvYXBpL2hlYWx0aC1kYXRhXCIpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBzZXRIZWFsdGhEYXRhKGRhdGEuZGF0YSkpXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyBoZWFsdGggZGF0YTpcIiwgZXJyb3IpKTtcbiAgfSwgW10pO1xuXG4gIC8vRm9yIElucHV0IEJveFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHBsYWNlaG9sZGVyVGV4dHMgPSBbXG4gICAgICBcIkkgaGVhcmQgeW91J3JlIHNpY2suIHdoYXRzIHlvdXIgc3ltcHRvbXMuLlwiLFxuICAgICAgXCJGZWVsaW5nIHdlaXJkPyBJIHJlY2tvbiBpdHMgc3RyZXAuLlwiLFxuICAgICAgXCJTdG9wIHRha2luZyBzb28gbG9uZy4uXCIsXG4gICAgICBcIlByb2JhYmx5IHNob3VsZG4ndCBoYXZlIGdvbmUgb3V0IGxhc3QgbmlnaHQuLlwiLFxuICAgICAgXCJXaGF0J3MgeW91ciBzeW1wdG9tcyBtYXRlLi5cIixcbiAgICBdO1xuICAgIGxldCBjdXJyZW50UGxhY2Vob2xkZXJJbmRleCA9IDA7XG4gICAgbGV0IGN1cnJlbnRJbmRleCA9IDA7XG4gICAgbGV0IHR5cGluZ0ludGVydmFsOiBOb2RlSlMuVGltZW91dDtcblxuICAgIGNvbnN0IHR5cGVUZXh0ID0gKCkgPT4ge1xuICAgICAgY29uc3QgZnVsbFBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXJUZXh0c1tjdXJyZW50UGxhY2Vob2xkZXJJbmRleF07XG4gICAgICB0eXBpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc2V0UGxhY2Vob2xkZXJUZXh0KGZ1bGxQbGFjZWhvbGRlci5zbGljZSgwLCBjdXJyZW50SW5kZXgpKTtcbiAgICAgICAgY3VycmVudEluZGV4Kys7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPiBmdWxsUGxhY2Vob2xkZXIubGVuZ3RoKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0eXBpbmdJbnRlcnZhbCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSAwO1xuICAgICAgICAgICAgY3VycmVudFBsYWNlaG9sZGVySW5kZXggPVxuICAgICAgICAgICAgICAoY3VycmVudFBsYWNlaG9sZGVySW5kZXggKyAxKSAlIHBsYWNlaG9sZGVyVGV4dHMubGVuZ3RoO1xuICAgICAgICAgICAgdHlwZVRleHQoKTtcbiAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTApO1xuICAgIH07XG5cbiAgICB0eXBlVGV4dCgpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodHlwaW5nSW50ZXJ2YWwpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICAvL0hhbmRsZSBDaXR5IFNlbGVjdGlvblxuICBjb25zdCBoYW5kbGVDaXR5Q2hhbmdlID0gKGNpdHk6IHN0cmluZykgPT4ge1xuICAgIHNldFNlbGVjdGVkQ2l0eShjaXR5KTtcbiAgICBjb25zb2xlLmxvZyhcIlNlbGVjdGVkIGNpdHk6XCIsIGNpdHkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKHZhbHVlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICBzZXRJbnB1dFZhbHVlKHZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTeW1wdG9tQ2xpY2sgPSAoc3ltcHRvbTogc3RyaW5nLCBzdGF0ZTogQnV0dG9uU3RhdGUpID0+IHtcbiAgICBpZiAoc3RhdGUgPT09IFwicG90ZW50aWFsXCIpIHtcbiAgICAgIHNldFN5bXB0b21zKChwcmV2U3ltcHRvbXMpID0+ICh7XG4gICAgICAgIGN1cnJlbnRfc3ltcHRvbXM6IFsuLi5wcmV2U3ltcHRvbXMuY3VycmVudF9zeW1wdG9tcywgc3ltcHRvbV0sXG4gICAgICAgIHBvdGVudGlhbF9zeW1wdG9tczogcHJldlN5bXB0b21zLnBvdGVudGlhbF9zeW1wdG9tcy5maWx0ZXIoXG4gICAgICAgICAgKHMpID0+IHMgIT09IHN5bXB0b21cbiAgICAgICAgKSxcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgb25TdWJtaXQgPSAoKSA9PiB7XG4gICAgaGFuZGxlQ2hhaW5lZEZ1bmN0aW9uKFxuICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgIHNldElzTG9hZGluZyxcbiAgICAgIHNldFJlc3BvbnNlLFxuICAgICAgc2V0U3ltcHRvbXMsXG4gICAgICBzZXRMb2FkaW5nU3RlcCxcbiAgICAgIHNldFNhaGhhT3V0cHV0XG4gICAgKTtcbiAgfTtcblxuXG4gIFxuXG4gIGNvbnN0IExvYWRpbmdJbmRpY2F0b3IgPSAoKSA9PiB7XG4gICAgaWYgKGxvYWRpbmdTdGVwKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LWdyYXktNjAwIG15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuaW1hdGUtc3BpbiByb3VuZGVkLWZ1bGwgaC01IHctNSBib3JkZXItYi0yIGJvcmRlci1ncmF5LTkwMFwiPjwvZGl2PlxuICAgICAgICAgIDxzcGFuPntsb2FkaW5nU3RlcH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPG1haW4gY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWdyYXktMTAwIHAtMTBcIj5cbiAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLThcIj5cbiAgICAgICAgPEltYWdlIHNyYz17TG9nb30gYWx0PVwiVmVyY2VsIExvZ29cIiB3aWR0aD17MjUwfSBoZWlnaHQ9ezI1MH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC0yeGwgbWItOCB0ZXh0LWJsYWNrIHBiLTVcIj5cbiAgICAgICAgU3VwZXIgU3VwcG9ydGl2ZSBTaWNrbmVzcyBCdWRkeSDwn6SnXG4gICAgICA8L3A+XG4gICAgICBcblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLThcIj5cbiAgICAgICAge3NlbGVjdGVkQ2l0eSAmJiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtNCB0ZXh0LWxnIHRleHQtZ3JheS01MDBcIj5cbiAgICAgICAgICAgIFlvdSBzZWxlY3RlZDoge3NlbGVjdGVkQ2l0eX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctNHhsXCI+XG4gICAgICAgIDxDb21wb25lbnRzLkN1c3RvbVRleHRFbnRyeVxuICAgICAgICAgIHZhbHVlPXtpbnB1dFZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dENoYW5nZX1cbiAgICAgICAgICBvblN1Ym1pdD17b25TdWJtaXR9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyVGV4dH1cbiAgICAgICAgLz5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1jZW50ZXIgdy1mdWxsXCI+XG4gICAgICAgICAgPExvYWRpbmdJbmRpY2F0b3IgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPENvbXBvbmVudHMuU3ltcHRvbUJ1dHRvbnNcbiAgICAgICAgICBjdXJyZW50U3ltcHRvbXM9e3N5bXB0b21zLmN1cnJlbnRfc3ltcHRvbXN9XG4gICAgICAgICAgcG90ZW50aWFsU3ltcHRvbXM9e3N5bXB0b21zLnBvdGVudGlhbF9zeW1wdG9tc31cbiAgICAgICAgICBvblN5bXB0b21DbGljaz17aGFuZGxlU3ltcHRvbUNsaWNrfVxuICAgICAgICAvPlxuXG4gICAgICAgIHshaXNMb2FkaW5nICYmIHNhaGhhT3V0cHV0ICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtOFwiPlxuICAgICAgICAgICAgPENvbXBvbmVudHMuSGVhbHRoU3VtbWFyeSBkYXRhPXtzYWhoYU91dHB1dH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJMb2dvIiwiSW1hZ2UiLCJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiQ29tcG9uZW50cyIsImhhbmRsZUNoYWluZWRGdW5jdGlvbiIsIkhvbWUiLCJsb2FkaW5nU3RlcCIsInNldExvYWRpbmdTdGVwIiwiU2FoaGFfaGVhbHRoRGF0YSIsInNldEhlYWx0aERhdGEiLCJzZWxlY3RlZENpdHkiLCJzZXRTZWxlY3RlZENpdHkiLCJpbnB1dFZhbHVlIiwic2V0SW5wdXRWYWx1ZSIsInJlc3BvbnNlIiwic2V0UmVzcG9uc2UiLCJzeW1wdG9tcyIsInNldFN5bXB0b21zIiwiY3VycmVudF9zeW1wdG9tcyIsInBvdGVudGlhbF9zeW1wdG9tcyIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsInNhaGhhT3V0cHV0Iiwic2V0U2FoaGFPdXRwdXQiLCJwbGFjZWhvbGRlclRleHQiLCJzZXRQbGFjZWhvbGRlclRleHQiLCJmZXRjaCIsInRoZW4iLCJqc29uIiwiZGF0YSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwicGxhY2Vob2xkZXJUZXh0cyIsImN1cnJlbnRQbGFjZWhvbGRlckluZGV4IiwiY3VycmVudEluZGV4IiwidHlwaW5nSW50ZXJ2YWwiLCJ0eXBlVGV4dCIsImZ1bGxQbGFjZWhvbGRlciIsInNldEludGVydmFsIiwic2xpY2UiLCJsZW5ndGgiLCJjbGVhckludGVydmFsIiwic2V0VGltZW91dCIsImhhbmRsZUNpdHlDaGFuZ2UiLCJjaXR5IiwibG9nIiwiaGFuZGxlSW5wdXRDaGFuZ2UiLCJ2YWx1ZSIsImhhbmRsZVN5bXB0b21DbGljayIsInN5bXB0b20iLCJzdGF0ZSIsInByZXZTeW1wdG9tcyIsImZpbHRlciIsInMiLCJvblN1Ym1pdCIsIkxvYWRpbmdJbmRpY2F0b3IiLCJkaXYiLCJjbGFzc05hbWUiLCJzcGFuIiwibWFpbiIsInNyYyIsImFsdCIsIndpZHRoIiwiaGVpZ2h0IiwicCIsIkN1c3RvbVRleHRFbnRyeSIsIm9uQ2hhbmdlIiwicGxhY2Vob2xkZXIiLCJTeW1wdG9tQnV0dG9ucyIsImN1cnJlbnRTeW1wdG9tcyIsInBvdGVudGlhbFN5bXB0b21zIiwib25TeW1wdG9tQ2xpY2siLCJIZWFsdGhTdW1tYXJ5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});