"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  Footer: () => Footer_default,
  Header: () => Header_default
});
module.exports = __toCommonJS(index_exports);

// src/components/Header.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Header = ({ title = "My App" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { style: { padding: "1rem", background: "#f5f5f5" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { style: { margin: 0 }, children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#", style: { margin: "0 0.5rem", textDecoration: "none", color: "#0366d6" }, children: "Home" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#", style: { margin: "0 0.5rem", textDecoration: "none", color: "#0366d6" }, children: "About" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#", style: { margin: "0 0.5rem", textDecoration: "none", color: "#0366d6" }, children: "Services" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#", style: { margin: "0 0.5rem", textDecoration: "none", color: "#0366d6" }, children: "Contact" })
    ] })
  ] }) });
};
var Header_default = Header;

// src/components/Footer.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Footer = ({ text }) => {
  const defaultText = `\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} My Company`;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("footer", { style: { padding: "1rem", background: "#f5f5f5" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: text ?? defaultText }) });
};
var Footer_default = Footer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Footer,
  Header
});
