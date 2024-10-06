"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-to-string@4.0.0";
exports.ids = ["vendor-chunks/mdast-util-to-string@4.0.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/mdast-util-to-string@4.0.0/node_modules/mdast-util-to-string/lib/index.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/.pnpm/mdast-util-to-string@4.0.0/node_modules/mdast-util-to-string/lib/index.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toString: () => (/* binding */ toString)\n/* harmony export */ });\n/**\n * @typedef {import('mdast').Nodes} Nodes\n *\n * @typedef Options\n *   Configuration (optional).\n * @property {boolean | null | undefined} [includeImageAlt=true]\n *   Whether to use `alt` for `image`s (default: `true`).\n * @property {boolean | null | undefined} [includeHtml=true]\n *   Whether to use `value` of HTML (default: `true`).\n */\n\n/** @type {Options} */\nconst emptyOptions = {}\n\n/**\n * Get the text content of a node or list of nodes.\n *\n * Prefers the node’s plain-text fields, otherwise serializes its children,\n * and if the given value is an array, serialize the nodes in it.\n *\n * @param {unknown} [value]\n *   Thing to serialize, typically `Node`.\n * @param {Options | null | undefined} [options]\n *   Configuration (optional).\n * @returns {string}\n *   Serialized `value`.\n */\nfunction toString(value, options) {\n  const settings = options || emptyOptions\n  const includeImageAlt =\n    typeof settings.includeImageAlt === 'boolean'\n      ? settings.includeImageAlt\n      : true\n  const includeHtml =\n    typeof settings.includeHtml === 'boolean' ? settings.includeHtml : true\n\n  return one(value, includeImageAlt, includeHtml)\n}\n\n/**\n * One node or several nodes.\n *\n * @param {unknown} value\n *   Thing to serialize.\n * @param {boolean} includeImageAlt\n *   Include image `alt`s.\n * @param {boolean} includeHtml\n *   Include HTML.\n * @returns {string}\n *   Serialized node.\n */\nfunction one(value, includeImageAlt, includeHtml) {\n  if (node(value)) {\n    if ('value' in value) {\n      return value.type === 'html' && !includeHtml ? '' : value.value\n    }\n\n    if (includeImageAlt && 'alt' in value && value.alt) {\n      return value.alt\n    }\n\n    if ('children' in value) {\n      return all(value.children, includeImageAlt, includeHtml)\n    }\n  }\n\n  if (Array.isArray(value)) {\n    return all(value, includeImageAlt, includeHtml)\n  }\n\n  return ''\n}\n\n/**\n * Serialize a list of nodes.\n *\n * @param {Array<unknown>} values\n *   Thing to serialize.\n * @param {boolean} includeImageAlt\n *   Include image `alt`s.\n * @param {boolean} includeHtml\n *   Include HTML.\n * @returns {string}\n *   Serialized nodes.\n */\nfunction all(values, includeImageAlt, includeHtml) {\n  /** @type {Array<string>} */\n  const result = []\n  let index = -1\n\n  while (++index < values.length) {\n    result[index] = one(values[index], includeImageAlt, includeHtml)\n  }\n\n  return result.join('')\n}\n\n/**\n * Check if `value` looks like a node.\n *\n * @param {unknown} value\n *   Thing.\n * @returns {value is Nodes}\n *   Whether `value` is a node.\n */\nfunction node(value) {\n  return Boolean(value && typeof value === 'object')\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vbWRhc3QtdXRpbC10by1zdHJpbmdANC4wLjAvbm9kZV9tb2R1bGVzL21kYXN0LXV0aWwtdG8tc3RyaW5nL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQSxhQUFhLHVCQUF1QjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxjQUFjLDRCQUE0QjtBQUMxQztBQUNBLGNBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7O0FBRUEsV0FBVyxTQUFTO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsNEJBQTRCO0FBQ3ZDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NhaGhhLWxsbS1kZW1vLy4vbm9kZV9tb2R1bGVzLy5wbnBtL21kYXN0LXV0aWwtdG8tc3RyaW5nQDQuMC4wL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLXRvLXN0cmluZy9saWIvaW5kZXguanM/MzM2YyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuTm9kZXN9IE5vZGVzXG4gKlxuICogQHR5cGVkZWYgT3B0aW9uc1xuICogICBDb25maWd1cmF0aW9uIChvcHRpb25hbCkuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkfSBbaW5jbHVkZUltYWdlQWx0PXRydWVdXG4gKiAgIFdoZXRoZXIgdG8gdXNlIGBhbHRgIGZvciBgaW1hZ2VgcyAoZGVmYXVsdDogYHRydWVgKS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWR9IFtpbmNsdWRlSHRtbD10cnVlXVxuICogICBXaGV0aGVyIHRvIHVzZSBgdmFsdWVgIG9mIEhUTUwgKGRlZmF1bHQ6IGB0cnVlYCkuXG4gKi9cblxuLyoqIEB0eXBlIHtPcHRpb25zfSAqL1xuY29uc3QgZW1wdHlPcHRpb25zID0ge31cblxuLyoqXG4gKiBHZXQgdGhlIHRleHQgY29udGVudCBvZiBhIG5vZGUgb3IgbGlzdCBvZiBub2Rlcy5cbiAqXG4gKiBQcmVmZXJzIHRoZSBub2Rl4oCZcyBwbGFpbi10ZXh0IGZpZWxkcywgb3RoZXJ3aXNlIHNlcmlhbGl6ZXMgaXRzIGNoaWxkcmVuLFxuICogYW5kIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbiBhcnJheSwgc2VyaWFsaXplIHRoZSBub2RlcyBpbiBpdC5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IFt2YWx1ZV1cbiAqICAgVGhpbmcgdG8gc2VyaWFsaXplLCB0eXBpY2FsbHkgYE5vZGVgLlxuICogQHBhcmFtIHtPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZH0gW29wdGlvbnNdXG4gKiAgIENvbmZpZ3VyYXRpb24gKG9wdGlvbmFsKS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIFNlcmlhbGl6ZWQgYHZhbHVlYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlLCBvcHRpb25zKSB7XG4gIGNvbnN0IHNldHRpbmdzID0gb3B0aW9ucyB8fCBlbXB0eU9wdGlvbnNcbiAgY29uc3QgaW5jbHVkZUltYWdlQWx0ID1cbiAgICB0eXBlb2Ygc2V0dGluZ3MuaW5jbHVkZUltYWdlQWx0ID09PSAnYm9vbGVhbidcbiAgICAgID8gc2V0dGluZ3MuaW5jbHVkZUltYWdlQWx0XG4gICAgICA6IHRydWVcbiAgY29uc3QgaW5jbHVkZUh0bWwgPVxuICAgIHR5cGVvZiBzZXR0aW5ncy5pbmNsdWRlSHRtbCA9PT0gJ2Jvb2xlYW4nID8gc2V0dGluZ3MuaW5jbHVkZUh0bWwgOiB0cnVlXG5cbiAgcmV0dXJuIG9uZSh2YWx1ZSwgaW5jbHVkZUltYWdlQWx0LCBpbmNsdWRlSHRtbClcbn1cblxuLyoqXG4gKiBPbmUgbm9kZSBvciBzZXZlcmFsIG5vZGVzLlxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gdmFsdWVcbiAqICAgVGhpbmcgdG8gc2VyaWFsaXplLlxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlSW1hZ2VBbHRcbiAqICAgSW5jbHVkZSBpbWFnZSBgYWx0YHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVIdG1sXG4gKiAgIEluY2x1ZGUgSFRNTC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiAgIFNlcmlhbGl6ZWQgbm9kZS5cbiAqL1xuZnVuY3Rpb24gb25lKHZhbHVlLCBpbmNsdWRlSW1hZ2VBbHQsIGluY2x1ZGVIdG1sKSB7XG4gIGlmIChub2RlKHZhbHVlKSkge1xuICAgIGlmICgndmFsdWUnIGluIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUudHlwZSA9PT0gJ2h0bWwnICYmICFpbmNsdWRlSHRtbCA/ICcnIDogdmFsdWUudmFsdWVcbiAgICB9XG5cbiAgICBpZiAoaW5jbHVkZUltYWdlQWx0ICYmICdhbHQnIGluIHZhbHVlICYmIHZhbHVlLmFsdCkge1xuICAgICAgcmV0dXJuIHZhbHVlLmFsdFxuICAgIH1cblxuICAgIGlmICgnY2hpbGRyZW4nIGluIHZhbHVlKSB7XG4gICAgICByZXR1cm4gYWxsKHZhbHVlLmNoaWxkcmVuLCBpbmNsdWRlSW1hZ2VBbHQsIGluY2x1ZGVIdG1sKVxuICAgIH1cbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBhbGwodmFsdWUsIGluY2x1ZGVJbWFnZUFsdCwgaW5jbHVkZUh0bWwpXG4gIH1cblxuICByZXR1cm4gJydcbn1cblxuLyoqXG4gKiBTZXJpYWxpemUgYSBsaXN0IG9mIG5vZGVzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8dW5rbm93bj59IHZhbHVlc1xuICogICBUaGluZyB0byBzZXJpYWxpemUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVJbWFnZUFsdFxuICogICBJbmNsdWRlIGltYWdlIGBhbHRgcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUh0bWxcbiAqICAgSW5jbHVkZSBIVE1MLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgU2VyaWFsaXplZCBub2Rlcy5cbiAqL1xuZnVuY3Rpb24gYWxsKHZhbHVlcywgaW5jbHVkZUltYWdlQWx0LCBpbmNsdWRlSHRtbCkge1xuICAvKiogQHR5cGUge0FycmF5PHN0cmluZz59ICovXG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGxldCBpbmRleCA9IC0xXG5cbiAgd2hpbGUgKCsraW5kZXggPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IG9uZSh2YWx1ZXNbaW5kZXhdLCBpbmNsdWRlSW1hZ2VBbHQsIGluY2x1ZGVIdG1sKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIGB2YWx1ZWAgbG9va3MgbGlrZSBhIG5vZGUuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSB2YWx1ZVxuICogICBUaGluZy5cbiAqIEByZXR1cm5zIHt2YWx1ZSBpcyBOb2Rlc31cbiAqICAgV2hldGhlciBgdmFsdWVgIGlzIGEgbm9kZS5cbiAqL1xuZnVuY3Rpb24gbm9kZSh2YWx1ZSkge1xuICByZXR1cm4gQm9vbGVhbih2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/mdast-util-to-string@4.0.0/node_modules/mdast-util-to-string/lib/index.js\n");

/***/ })

};
;