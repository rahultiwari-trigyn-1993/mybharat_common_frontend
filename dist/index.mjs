// src/components/Header.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Header = ({ title = "My App" }) => {
  return /* @__PURE__ */ jsx("header", { style: { padding: "1rem", background: "#f5f5f5" }, children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ jsx("h1", { style: { margin: 0 }, children: title }),
    /* @__PURE__ */ jsxs("nav", { children: [
      /* @__PURE__ */ jsx("a", { href: "#", style: { margin: "0 0.5rem", textDecoration: "none", color: "#0366d6" }, children: "Home" }),
      /* @__PURE__ */ jsx("a", { href: "#", style: { margin: "0 0.5rem", textDecoration: "none", color: "#0366d6" }, children: "About" }),
      /* @__PURE__ */ jsx("a", { href: "#", style: { margin: "0 0.5rem", textDecoration: "none", color: "#0366d6" }, children: "Services" }),
      /* @__PURE__ */ jsx("a", { href: "#", style: { margin: "0 0.5rem", textDecoration: "none", color: "#0366d6" }, children: "Contact" })
    ] })
  ] }) });
};
var Header_default = Header;

// src/components/Footer.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Footer = ({ text }) => {
  const defaultText = `\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} My Company`;
  return /* @__PURE__ */ jsx2("footer", { style: { padding: "1rem", background: "#f5f5f5" }, children: /* @__PURE__ */ jsx2("small", { children: text ?? defaultText }) });
};
var Footer_default = Footer;
export {
  Footer_default as Footer,
  Header_default as Header
};
