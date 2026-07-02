/*! mybharat_common_frontend@1.0.246 — if this version is wrong in Sources, Vite cached an old pre-bundle; see README "Vite dev server" */

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/bootstrap/dist/js/bootstrap.esm.js
var bootstrap_esm_exports = {};
__export(bootstrap_esm_exports, {
  Alert: () => Alert,
  Button: () => Button,
  Carousel: () => Carousel,
  Collapse: () => Collapse,
  Dropdown: () => Dropdown,
  Modal: () => Modal,
  Offcanvas: () => Offcanvas,
  Popover: () => Popover,
  ScrollSpy: () => ScrollSpy,
  Tab: () => Tab,
  Toast: () => Toast,
  Tooltip: () => Tooltip
});

// node_modules/@popperjs/core/lib/index.js
var lib_exports = {};
__export(lib_exports, {
  afterMain: () => afterMain,
  afterRead: () => afterRead,
  afterWrite: () => afterWrite,
  applyStyles: () => applyStyles_default,
  arrow: () => arrow_default,
  auto: () => auto,
  basePlacements: () => basePlacements,
  beforeMain: () => beforeMain,
  beforeRead: () => beforeRead,
  beforeWrite: () => beforeWrite,
  bottom: () => bottom,
  clippingParents: () => clippingParents,
  computeStyles: () => computeStyles_default,
  createPopper: () => createPopper3,
  createPopperBase: () => createPopper,
  createPopperLite: () => createPopper2,
  detectOverflow: () => detectOverflow,
  end: () => end,
  eventListeners: () => eventListeners_default,
  flip: () => flip_default,
  hide: () => hide_default,
  left: () => left,
  main: () => main,
  modifierPhases: () => modifierPhases,
  offset: () => offset_default,
  placements: () => placements,
  popper: () => popper,
  popperGenerator: () => popperGenerator,
  popperOffsets: () => popperOffsets_default,
  preventOverflow: () => preventOverflow_default,
  read: () => read,
  reference: () => reference,
  right: () => right,
  start: () => start,
  top: () => top,
  variationPlacements: () => variationPlacements,
  viewport: () => viewport,
  write: () => write
});

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle2(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle2(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = /* @__PURE__ */ popperGenerator();

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = /* @__PURE__ */ popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/bootstrap/dist/js/bootstrap.esm.js
var elementMap = /* @__PURE__ */ new Map();
var Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, /* @__PURE__ */ new Map());
    }
    const instanceMap = elementMap.get(element);
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }
    instanceMap.set(key, instance);
  },
  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }
    return null;
  },
  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }
    const instanceMap = elementMap.get(element);
    instanceMap.delete(key);
    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }
};
var MAX_UID = 1e6;
var MILLISECONDS_MULTIPLIER = 1e3;
var TRANSITION_END = "transitionend";
var parseSelector = (selector) => {
  if (selector && window.CSS && window.CSS.escape) {
    selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
  }
  return selector;
};
var toType = (object) => {
  if (object === null || object === void 0) {
    return `${object}`;
  }
  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};
var getUID = (prefix) => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));
  return prefix;
};
var getTransitionDurationFromElement = (element) => {
  if (!element) {
    return 0;
  }
  let {
    transitionDuration,
    transitionDelay
  } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay);
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }
  transitionDuration = transitionDuration.split(",")[0];
  transitionDelay = transitionDelay.split(",")[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
var triggerTransitionEnd = (element) => {
  element.dispatchEvent(new Event(TRANSITION_END));
};
var isElement2 = (object) => {
  if (!object || typeof object !== "object") {
    return false;
  }
  if (typeof object.jquery !== "undefined") {
    object = object[0];
  }
  return typeof object.nodeType !== "undefined";
};
var getElement = (object) => {
  if (isElement2(object)) {
    return object.jquery ? object[0] : object;
  }
  if (typeof object === "string" && object.length > 0) {
    return document.querySelector(parseSelector(object));
  }
  return null;
};
var isVisible = (element) => {
  if (!isElement2(element) || element.getClientRects().length === 0) {
    return false;
  }
  const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
  const closedDetails = element.closest("details:not([open])");
  if (!closedDetails) {
    return elementIsVisible;
  }
  if (closedDetails !== element) {
    const summary = element.closest("summary");
    if (summary && summary.parentNode !== closedDetails) {
      return false;
    }
    if (summary === null) {
      return false;
    }
  }
  return elementIsVisible;
};
var isDisabled = (element) => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element.classList.contains("disabled")) {
    return true;
  }
  if (typeof element.disabled !== "undefined") {
    return element.disabled;
  }
  return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
};
var findShadowRoot = (element) => {
  if (!document.documentElement.attachShadow) {
    return null;
  }
  if (typeof element.getRootNode === "function") {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  if (element instanceof ShadowRoot) {
    return element;
  }
  if (!element.parentNode) {
    return null;
  }
  return findShadowRoot(element.parentNode);
};
var noop = () => {
};
var reflow = (element) => {
  element.offsetHeight;
};
var getjQuery = () => {
  if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
    return window.jQuery;
  }
  return null;
};
var DOMContentLoadedCallbacks = [];
var onDOMContentLoaded = (callback) => {
  if (document.readyState === "loading") {
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener("DOMContentLoaded", () => {
        for (const callback2 of DOMContentLoadedCallbacks) {
          callback2();
        }
      });
    }
    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};
var isRTL = () => document.documentElement.dir === "rtl";
var defineJQueryPlugin = (plugin) => {
  onDOMContentLoaded(() => {
    const $2 = getjQuery();
    if ($2) {
      const name = plugin.NAME;
      const JQUERY_NO_CONFLICT = $2.fn[name];
      $2.fn[name] = plugin.jQueryInterface;
      $2.fn[name].Constructor = plugin;
      $2.fn[name].noConflict = () => {
        $2.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};
var execute = (possibleCallback, args = [], defaultValue = possibleCallback) => {
  return typeof possibleCallback === "function" ? possibleCallback.call(...args) : defaultValue;
};
var executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  const durationPadding = 5;
  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  let called = false;
  const handler = ({
    target
  }) => {
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };
  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};
var getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
  const listLength = list.length;
  let index = list.indexOf(activeElement);
  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
  }
  index += shouldGetNext ? 1 : -1;
  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }
  return list[Math.max(0, Math.min(index, listLength - 1))];
};
var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
var stripNameRegex = /\..*/;
var stripUidRegex = /::\d+$/;
var eventRegistry = {};
var uidEvent = 1;
var customEvents = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
};
var nativeEvents = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function makeEventUid(element, uid) {
  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
}
function getElementEvents(element) {
  const uid = makeEventUid(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}
function bootstrapHandler(element, fn2) {
  return function handler(event) {
    hydrateObj(event, {
      delegateTarget: element
    });
    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn2);
    }
    return fn2.apply(element, [event]);
  };
}
function bootstrapDelegationHandler(element, selector, fn2) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector);
    for (let {
      target
    } = event; target && target !== this; target = target.parentNode) {
      for (const domElement of domElements) {
        if (domElement !== target) {
          continue;
        }
        hydrateObj(event, {
          delegateTarget: target
        });
        if (handler.oneOff) {
          EventHandler.off(element, event.type, selector, fn2);
        }
        return fn2.apply(target, [event]);
      }
    }
  };
}
function findHandler(events, callable, delegationSelector = null) {
  return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
}
function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
  const isDelegated = typeof handler === "string";
  const callable = isDelegated ? delegationFunction : handler || delegationFunction;
  let typeEvent = getTypeEvent(originalTypeEvent);
  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent;
  }
  return [isDelegated, callable, typeEvent];
}
function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
  if (typeof originalTypeEvent !== "string" || !element) {
    return;
  }
  let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
  if (originalTypeEvent in customEvents) {
    const wrapFunction = (fn3) => {
      return function(event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn3.call(this, event);
        }
      };
    };
    callable = wrapFunction(callable);
  }
  const events = getElementEvents(element);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff;
    return;
  }
  const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
  const fn2 = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
  fn2.delegationSelector = isDelegated ? handler : null;
  fn2.callable = callable;
  fn2.oneOff = oneOff;
  fn2.uidEvent = uid;
  handlers[uid] = fn2;
  element.addEventListener(typeEvent, fn2, isDelegated);
}
function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn2 = findHandler(events[typeEvent], handler, delegationSelector);
  if (!fn2) {
    return;
  }
  element.removeEventListener(typeEvent, fn2, Boolean(delegationSelector));
  delete events[typeEvent][fn2.uidEvent];
}
function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  for (const [handlerKey, event] of Object.entries(storeElementEvent)) {
    if (handlerKey.includes(namespace)) {
      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    }
  }
}
function getTypeEvent(event) {
  event = event.replace(stripNameRegex, "");
  return customEvents[event] || event;
}
var EventHandler = {
  on(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, false);
  },
  one(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, true);
  },
  off(element, originalTypeEvent, handler, delegationFunction) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getElementEvents(element);
    const storeElementEvent = events[typeEvent] || {};
    const isNamespace = originalTypeEvent.startsWith(".");
    if (typeof callable !== "undefined") {
      if (!Object.keys(storeElementEvent).length) {
        return;
      }
      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
      return;
    }
    if (isNamespace) {
      for (const elementEvent of Object.keys(events)) {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      }
    }
    for (const [keyHandlers, event] of Object.entries(storeElementEvent)) {
      const handlerKey = keyHandlers.replace(stripUidRegex, "");
      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  },
  trigger(element, event, args) {
    if (typeof event !== "string" || !element) {
      return null;
    }
    const $2 = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    let jQueryEvent = null;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    if (inNamespace && $2) {
      jQueryEvent = $2.Event(event, args);
      $2(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    const evt = hydrateObj(new Event(event, {
      bubbles,
      cancelable: true
    }), args);
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && jQueryEvent) {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
function hydrateObj(obj, meta = {}) {
  for (const [key, value] of Object.entries(meta)) {
    try {
      obj[key] = value;
    } catch (_unused) {
      Object.defineProperty(obj, key, {
        configurable: true,
        get() {
          return value;
        }
      });
    }
  }
  return obj;
}
function normalizeData(value) {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === Number(value).toString()) {
    return Number(value);
  }
  if (value === "" || value === "null") {
    return null;
  }
  if (typeof value !== "string") {
    return value;
  }
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (_unused) {
    return value;
  }
}
function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}
var Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },
  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },
  getDataAttributes(element) {
    if (!element) {
      return {};
    }
    const attributes = {};
    const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
    for (const key of bsKeys) {
      let pureKey = key.replace(/^bs/, "");
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    }
    return attributes;
  },
  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  }
};
var Config = class {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    return config;
  }
  _mergeConfigObj(config, element) {
    const jsonConfig = isElement2(element) ? Manipulator.getDataAttribute(element, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof jsonConfig === "object" ? jsonConfig : {},
      ...isElement2(element) ? Manipulator.getDataAttributes(element) : {},
      ...typeof config === "object" ? config : {}
    };
  }
  _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
    for (const [property, expectedTypes] of Object.entries(configTypes)) {
      const value = config[property];
      const valueType = isElement2(value) ? "element" : toType(value);
      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
      }
    }
  }
};
var VERSION = "5.3.8";
var BaseComponent = class extends Config {
  constructor(element, config) {
    super();
    element = getElement(element);
    if (!element) {
      return;
    }
    this._element = element;
    this._config = this._getConfig(config);
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }
  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    for (const propertyName of Object.getOwnPropertyNames(this)) {
      this[propertyName] = null;
    }
  }
  // Private
  _queueCallback(callback, element, isAnimated = true) {
    executeAfterTransition(callback, element, isAnimated);
  }
  _getConfig(config) {
    config = this._mergeConfigObj(config, this._element);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  // Static
  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY);
  }
  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
  }
  static get VERSION() {
    return VERSION;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(name) {
    return `${name}${this.EVENT_KEY}`;
  }
};
var getSelector = (element) => {
  let selector = element.getAttribute("data-bs-target");
  if (!selector || selector === "#") {
    let hrefAttribute = element.getAttribute("href");
    if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
      return null;
    }
    if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
      hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
    }
    selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
  }
  return selector ? selector.split(",").map((sel) => parseSelector(sel)).join(",") : null;
};
var SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },
  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },
  children(element, selector) {
    return [].concat(...element.children).filter((child) => child.matches(selector));
  },
  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode.closest(selector);
    while (ancestor) {
      parents.push(ancestor);
      ancestor = ancestor.parentNode.closest(selector);
    }
    return parents;
  },
  prev(element, selector) {
    let previous = element.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(element, selector) {
    let next = element.nextElementSibling;
    while (next) {
      if (next.matches(selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  },
  focusableChildren(element) {
    const focusables = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
    return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
  },
  getSelectorFromElement(element) {
    const selector = getSelector(element);
    if (selector) {
      return SelectorEngine.findOne(selector) ? selector : null;
    }
    return null;
  },
  getElementFromSelector(element) {
    const selector = getSelector(element);
    return selector ? SelectorEngine.findOne(selector) : null;
  },
  getMultipleElementsFromSelector(element) {
    const selector = getSelector(element);
    return selector ? SelectorEngine.find(selector) : [];
  }
};
var enableDismissTrigger = (component, method = "hide") => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
  const name = component.NAME;
  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
    if (["A", "AREA"].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    const target = SelectorEngine.getElementFromSelector(this) || this.closest(`.${name}`);
    const instance = component.getOrCreateInstance(target);
    instance[method]();
  });
};
var NAME$f = "alert";
var DATA_KEY$a = "bs.alert";
var EVENT_KEY$b = `.${DATA_KEY$a}`;
var EVENT_CLOSE = `close${EVENT_KEY$b}`;
var EVENT_CLOSED = `closed${EVENT_KEY$b}`;
var CLASS_NAME_FADE$5 = "fade";
var CLASS_NAME_SHOW$8 = "show";
var Alert = class _Alert extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$f;
  }
  // Public
  close() {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
    if (closeEvent.defaultPrevented) {
      return;
    }
    this._element.classList.remove(CLASS_NAME_SHOW$8);
    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
  }
  // Private
  _destroyElement() {
    this._element.remove();
    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _Alert.getOrCreateInstance(this);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
};
enableDismissTrigger(Alert, "close");
defineJQueryPlugin(Alert);
var NAME$e = "button";
var DATA_KEY$9 = "bs.button";
var EVENT_KEY$a = `.${DATA_KEY$9}`;
var DATA_API_KEY$6 = ".data-api";
var CLASS_NAME_ACTIVE$3 = "active";
var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
var EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
var Button = class _Button extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$e;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _Button.getOrCreateInstance(this);
      if (config === "toggle") {
        data[config]();
      }
    });
  }
};
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, (event) => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  const data = Button.getOrCreateInstance(button);
  data.toggle();
});
defineJQueryPlugin(Button);
var NAME$d = "swipe";
var EVENT_KEY$9 = ".bs.swipe";
var EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
var EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
var EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
var EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
var EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
var POINTER_TYPE_TOUCH = "touch";
var POINTER_TYPE_PEN = "pen";
var CLASS_NAME_POINTER_EVENT = "pointer-event";
var SWIPE_THRESHOLD = 40;
var Default$c = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
};
var DefaultType$c = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
var Swipe = class _Swipe extends Config {
  constructor(element, config) {
    super();
    this._element = element;
    if (!element || !_Swipe.isSupported()) {
      return;
    }
    this._config = this._getConfig(config);
    this._deltaX = 0;
    this._supportPointerEvents = Boolean(window.PointerEvent);
    this._initEvents();
  }
  // Getters
  static get Default() {
    return Default$c;
  }
  static get DefaultType() {
    return DefaultType$c;
  }
  static get NAME() {
    return NAME$d;
  }
  // Public
  dispose() {
    EventHandler.off(this._element, EVENT_KEY$9);
  }
  // Private
  _start(event) {
    if (!this._supportPointerEvents) {
      this._deltaX = event.touches[0].clientX;
      return;
    }
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX;
    }
  }
  _end(event) {
    if (this._eventIsPointerPenTouch(event)) {
      this._deltaX = event.clientX - this._deltaX;
    }
    this._handleSwipe();
    execute(this._config.endCallback);
  }
  _move(event) {
    this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const absDeltaX = Math.abs(this._deltaX);
    if (absDeltaX <= SWIPE_THRESHOLD) {
      return;
    }
    const direction = absDeltaX / this._deltaX;
    this._deltaX = 0;
    if (!direction) {
      return;
    }
    execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    if (this._supportPointerEvents) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, (event) => this._start(event));
      EventHandler.on(this._element, EVENT_POINTERUP, (event) => this._end(event));
      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, (event) => this._start(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, (event) => this._move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, (event) => this._end(event));
    }
  }
  _eventIsPointerPenTouch(event) {
    return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
};
var NAME$c = "carousel";
var DATA_KEY$8 = "bs.carousel";
var EVENT_KEY$8 = `.${DATA_KEY$8}`;
var DATA_API_KEY$5 = ".data-api";
var ARROW_LEFT_KEY$1 = "ArrowLeft";
var ARROW_RIGHT_KEY$1 = "ArrowRight";
var TOUCHEVENT_COMPAT_WAIT = 500;
var ORDER_NEXT = "next";
var ORDER_PREV = "prev";
var DIRECTION_LEFT = "left";
var DIRECTION_RIGHT = "right";
var EVENT_SLIDE = `slide${EVENT_KEY$8}`;
var EVENT_SLID = `slid${EVENT_KEY$8}`;
var EVENT_KEYDOWN$1 = `keydown${EVENT_KEY$8}`;
var EVENT_MOUSEENTER$1 = `mouseenter${EVENT_KEY$8}`;
var EVENT_MOUSELEAVE$1 = `mouseleave${EVENT_KEY$8}`;
var EVENT_DRAG_START = `dragstart${EVENT_KEY$8}`;
var EVENT_LOAD_DATA_API$3 = `load${EVENT_KEY$8}${DATA_API_KEY$5}`;
var EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
var CLASS_NAME_CAROUSEL = "carousel";
var CLASS_NAME_ACTIVE$2 = "active";
var CLASS_NAME_SLIDE = "slide";
var CLASS_NAME_END = "carousel-item-end";
var CLASS_NAME_START = "carousel-item-start";
var CLASS_NAME_NEXT = "carousel-item-next";
var CLASS_NAME_PREV = "carousel-item-prev";
var SELECTOR_ACTIVE = ".active";
var SELECTOR_ITEM = ".carousel-item";
var SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
var SELECTOR_ITEM_IMG = ".carousel-item img";
var SELECTOR_INDICATORS = ".carousel-indicators";
var SELECTOR_DATA_SLIDE = "[data-bs-slide], [data-bs-slide-to]";
var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
var KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY$1]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY$1]: DIRECTION_LEFT
};
var Default$b = {
  interval: 5e3,
  keyboard: true,
  pause: "hover",
  ride: false,
  touch: true,
  wrap: true
};
var DefaultType$b = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
var Carousel = class _Carousel extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._interval = null;
    this._activeElement = null;
    this._isSliding = false;
    this.touchTimeout = null;
    this._swipeHelper = null;
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._addEventListeners();
    if (this._config.ride === CLASS_NAME_CAROUSEL) {
      this.cycle();
    }
  }
  // Getters
  static get Default() {
    return Default$b;
  }
  static get DefaultType() {
    return DefaultType$b;
  }
  static get NAME() {
    return NAME$c;
  }
  // Public
  next() {
    this._slide(ORDER_NEXT);
  }
  nextWhenVisible() {
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }
  prev() {
    this._slide(ORDER_PREV);
  }
  pause() {
    if (this._isSliding) {
      triggerTransitionEnd(this._element);
    }
    this._clearInterval();
  }
  cycle() {
    this._clearInterval();
    this._updateInterval();
    this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (!this._config.ride) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.cycle());
      return;
    }
    this.cycle();
  }
  to(index) {
    const items = this._getItems();
    if (index > items.length - 1 || index < 0) {
      return;
    }
    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }
    const activeIndex = this._getItemIndex(this._getActive());
    if (activeIndex === index) {
      return;
    }
    const order2 = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
    this._slide(order2, items[index]);
  }
  dispose() {
    if (this._swipeHelper) {
      this._swipeHelper.dispose();
    }
    super.dispose();
  }
  // Private
  _configAfterMerge(config) {
    config.defaultInterval = config.interval;
    return config;
  }
  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN$1, (event) => this._keydown(event));
    }
    if (this._config.pause === "hover") {
      EventHandler.on(this._element, EVENT_MOUSEENTER$1, () => this.pause());
      EventHandler.on(this._element, EVENT_MOUSELEAVE$1, () => this._maybeEnableCycle());
    }
    if (this._config.touch && Swipe.isSupported()) {
      this._addTouchEventListeners();
    }
  }
  _addTouchEventListeners() {
    for (const img of SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)) {
      EventHandler.on(img, EVENT_DRAG_START, (event) => event.preventDefault());
    }
    const endCallBack = () => {
      if (this._config.pause !== "hover") {
        return;
      }
      this.pause();
      if (this.touchTimeout) {
        clearTimeout(this.touchTimeout);
      }
      this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
    };
    const swipeConfig = {
      leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
      rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
      endCallback: endCallBack
    };
    this._swipeHelper = new Swipe(this._element, swipeConfig);
  }
  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }
    const direction = KEY_TO_DIRECTION[event.key];
    if (direction) {
      event.preventDefault();
      this._slide(this._directionToOrder(direction));
    }
  }
  _getItemIndex(element) {
    return this._getItems().indexOf(element);
  }
  _setActiveIndicatorElement(index) {
    if (!this._indicatorsElement) {
      return;
    }
    const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
    activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
    activeIndicator.removeAttribute("aria-current");
    const newActiveIndicator = SelectorEngine.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
    if (newActiveIndicator) {
      newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
      newActiveIndicator.setAttribute("aria-current", "true");
    }
  }
  _updateInterval() {
    const element = this._activeElement || this._getActive();
    if (!element) {
      return;
    }
    const elementInterval = Number.parseInt(element.getAttribute("data-bs-interval"), 10);
    this._config.interval = elementInterval || this._config.defaultInterval;
  }
  _slide(order2, element = null) {
    if (this._isSliding) {
      return;
    }
    const activeElement = this._getActive();
    const isNext = order2 === ORDER_NEXT;
    const nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
    if (nextElement === activeElement) {
      return;
    }
    const nextElementIndex = this._getItemIndex(nextElement);
    const triggerEvent = (eventName) => {
      return EventHandler.trigger(this._element, eventName, {
        relatedTarget: nextElement,
        direction: this._orderToDirection(order2),
        from: this._getItemIndex(activeElement),
        to: nextElementIndex
      });
    };
    const slideEvent = triggerEvent(EVENT_SLIDE);
    if (slideEvent.defaultPrevented) {
      return;
    }
    if (!activeElement || !nextElement) {
      return;
    }
    const isCycling = Boolean(this._interval);
    this.pause();
    this._isSliding = true;
    this._setActiveIndicatorElement(nextElementIndex);
    this._activeElement = nextElement;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
    nextElement.classList.add(orderClassName);
    reflow(nextElement);
    activeElement.classList.add(directionalClassName);
    nextElement.classList.add(directionalClassName);
    const completeCallBack = () => {
      nextElement.classList.remove(directionalClassName, orderClassName);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
      this._isSliding = false;
      triggerEvent(EVENT_SLID);
    };
    this._queueCallback(completeCallBack, activeElement, this._isAnimated());
    if (isCycling) {
      this.cycle();
    }
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_SLIDE);
  }
  _getActive() {
    return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
  }
  _getItems() {
    return SelectorEngine.find(SELECTOR_ITEM, this._element);
  }
  _clearInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _directionToOrder(direction) {
    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }
    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }
  _orderToDirection(order2) {
    if (isRTL()) {
      return order2 === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return order2 === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _Carousel.getOrCreateInstance(this, config);
      if (typeof config === "number") {
        data.to(config);
        return;
      }
      if (typeof config === "string") {
        if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
};
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function(event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    return;
  }
  event.preventDefault();
  const carousel = Carousel.getOrCreateInstance(target);
  const slideIndex = this.getAttribute("data-bs-slide-to");
  if (slideIndex) {
    carousel.to(slideIndex);
    carousel._maybeEnableCycle();
    return;
  }
  if (Manipulator.getDataAttribute(this, "slide") === "next") {
    carousel.next();
    carousel._maybeEnableCycle();
    return;
  }
  carousel.prev();
  carousel._maybeEnableCycle();
});
EventHandler.on(window, EVENT_LOAD_DATA_API$3, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
  for (const carousel of carousels) {
    Carousel.getOrCreateInstance(carousel);
  }
});
defineJQueryPlugin(Carousel);
var NAME$b = "collapse";
var DATA_KEY$7 = "bs.collapse";
var EVENT_KEY$7 = `.${DATA_KEY$7}`;
var DATA_API_KEY$4 = ".data-api";
var EVENT_SHOW$6 = `show${EVENT_KEY$7}`;
var EVENT_SHOWN$6 = `shown${EVENT_KEY$7}`;
var EVENT_HIDE$6 = `hide${EVENT_KEY$7}`;
var EVENT_HIDDEN$6 = `hidden${EVENT_KEY$7}`;
var EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
var CLASS_NAME_SHOW$7 = "show";
var CLASS_NAME_COLLAPSE = "collapse";
var CLASS_NAME_COLLAPSING = "collapsing";
var CLASS_NAME_COLLAPSED = "collapsed";
var CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
var CLASS_NAME_HORIZONTAL = "collapse-horizontal";
var WIDTH = "width";
var HEIGHT = "height";
var SELECTOR_ACTIVES = ".collapse.show, .collapse.collapsing";
var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
var Default$a = {
  parent: null,
  toggle: true
};
var DefaultType$a = {
  parent: "(null|element)",
  toggle: "boolean"
};
var Collapse = class _Collapse extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isTransitioning = false;
    this._triggerArray = [];
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
    for (const elem of toggleList) {
      const selector = SelectorEngine.getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter((foundElement) => foundElement === this._element);
      if (selector !== null && filterElement.length) {
        this._triggerArray.push(elem);
      }
    }
    this._initializeChildren();
    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }
    if (this._config.toggle) {
      this.toggle();
    }
  }
  // Getters
  static get Default() {
    return Default$a;
  }
  static get DefaultType() {
    return DefaultType$a;
  }
  static get NAME() {
    return NAME$b;
  }
  // Public
  toggle() {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }
  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }
    let activeChildren = [];
    if (this._config.parent) {
      activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter((element) => element !== this._element).map((element) => _Collapse.getOrCreateInstance(element, {
        toggle: false
      }));
    }
    if (activeChildren.length && activeChildren[0]._isTransitioning) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    for (const activeInstance of activeChildren) {
      activeInstance.hide();
    }
    const dimension = this._getDimension();
    this._element.classList.remove(CLASS_NAME_COLLAPSE);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.style[dimension] = 0;
    this._addAriaAndCollapsedClass(this._triggerArray, true);
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      this._element.style[dimension] = "";
      EventHandler.trigger(this._element, EVENT_SHOWN$6);
    };
    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    this._queueCallback(complete, this._element, true);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }
    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
    if (startEvent.defaultPrevented) {
      return;
    }
    const dimension = this._getDimension();
    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_COLLAPSING);
    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
    for (const trigger of this._triggerArray) {
      const element = SelectorEngine.getElementFromSelector(trigger);
      if (element && !this._isShown(element)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }
    this._isTransitioning = true;
    const complete = () => {
      this._isTransitioning = false;
      this._element.classList.remove(CLASS_NAME_COLLAPSING);
      this._element.classList.add(CLASS_NAME_COLLAPSE);
      EventHandler.trigger(this._element, EVENT_HIDDEN$6);
    };
    this._element.style[dimension] = "";
    this._queueCallback(complete, this._element, true);
  }
  // Private
  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$7);
  }
  _configAfterMerge(config) {
    config.toggle = Boolean(config.toggle);
    config.parent = getElement(config.parent);
    return config;
  }
  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }
  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }
    const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
    for (const element of children) {
      const selected = SelectorEngine.getElementFromSelector(element);
      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    }
  }
  _getFirstLevelChildren(selector) {
    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    return SelectorEngine.find(selector, this._config.parent).filter((element) => !children.includes(element));
  }
  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }
    for (const element of triggerArray) {
      element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
      element.setAttribute("aria-expanded", isOpen);
    }
  }
  // Static
  static jQueryInterface(config) {
    const _config = {};
    if (typeof config === "string" && /show|hide/.test(config)) {
      _config.toggle = false;
    }
    return this.each(function() {
      const data = _Collapse.getOrCreateInstance(this, _config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    });
  }
};
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function(event) {
  if (event.target.tagName === "A" || event.delegateTarget && event.delegateTarget.tagName === "A") {
    event.preventDefault();
  }
  for (const element of SelectorEngine.getMultipleElementsFromSelector(this)) {
    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  }
});
defineJQueryPlugin(Collapse);
var NAME$a = "dropdown";
var DATA_KEY$6 = "bs.dropdown";
var EVENT_KEY$6 = `.${DATA_KEY$6}`;
var DATA_API_KEY$3 = ".data-api";
var ESCAPE_KEY$2 = "Escape";
var TAB_KEY$1 = "Tab";
var ARROW_UP_KEY$1 = "ArrowUp";
var ARROW_DOWN_KEY$1 = "ArrowDown";
var RIGHT_MOUSE_BUTTON = 2;
var EVENT_HIDE$5 = `hide${EVENT_KEY$6}`;
var EVENT_HIDDEN$5 = `hidden${EVENT_KEY$6}`;
var EVENT_SHOW$5 = `show${EVENT_KEY$6}`;
var EVENT_SHOWN$5 = `shown${EVENT_KEY$6}`;
var EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
var EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$6}${DATA_API_KEY$3}`;
var EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$6}${DATA_API_KEY$3}`;
var CLASS_NAME_SHOW$6 = "show";
var CLASS_NAME_DROPUP = "dropup";
var CLASS_NAME_DROPEND = "dropend";
var CLASS_NAME_DROPSTART = "dropstart";
var CLASS_NAME_DROPUP_CENTER = "dropup-center";
var CLASS_NAME_DROPDOWN_CENTER = "dropdown-center";
var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
var SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`;
var SELECTOR_MENU = ".dropdown-menu";
var SELECTOR_NAVBAR = ".navbar";
var SELECTOR_NAVBAR_NAV = ".navbar-nav";
var SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
var PLACEMENT_TOP = isRTL() ? "top-end" : "top-start";
var PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end";
var PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start";
var PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end";
var PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start";
var PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start";
var PLACEMENT_TOPCENTER = "top";
var PLACEMENT_BOTTOMCENTER = "bottom";
var Default$9 = {
  autoClose: true,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
};
var DefaultType$9 = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
var Dropdown = class _Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._popper = null;
    this._parent = this._element.parentNode;
    this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent);
    this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Default$9;
  }
  static get DefaultType() {
    return DefaultType$9;
  }
  static get NAME() {
    return NAME$a;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._createPopper();
    if ("ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, "mouseover", noop);
      }
    }
    this._element.focus();
    this._element.setAttribute("aria-expanded", true);
    this._menu.classList.add(CLASS_NAME_SHOW$6);
    this._element.classList.add(CLASS_NAME_SHOW$6);
    EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown()) {
      return;
    }
    const relatedTarget = {
      relatedTarget: this._element
    };
    this._completeHide(relatedTarget);
  }
  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }
    super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar();
    if (this._popper) {
      this._popper.update();
    }
  }
  // Private
  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
    if (hideEvent.defaultPrevented) {
      return;
    }
    if ("ontouchstart" in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, "mouseover", noop);
      }
    }
    if (this._popper) {
      this._popper.destroy();
    }
    this._menu.classList.remove(CLASS_NAME_SHOW$6);
    this._element.classList.remove(CLASS_NAME_SHOW$6);
    this._element.setAttribute("aria-expanded", "false");
    Manipulator.removeDataAttribute(this._menu, "popper");
    EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
  }
  _getConfig(config) {
    config = super._getConfig(config);
    if (typeof config.reference === "object" && !isElement2(config.reference) && typeof config.reference.getBoundingClientRect !== "function") {
      throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }
    return config;
  }
  _createPopper() {
    if (typeof lib_exports === "undefined") {
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
    }
    let referenceElement = this._element;
    if (this._config.reference === "parent") {
      referenceElement = this._parent;
    } else if (isElement2(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === "object") {
      referenceElement = this._config.reference;
    }
    const popperConfig = this._getPopperConfig();
    this._popper = createPopper3(referenceElement, this._menu, popperConfig);
  }
  _isShown() {
    return this._menu.classList.contains(CLASS_NAME_SHOW$6);
  }
  _getPlacement() {
    const parentDropdown = this._parent;
    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
      return PLACEMENT_TOPCENTER;
    }
    if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
      return PLACEMENT_BOTTOMCENTER;
    }
    const isEnd = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }
    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(SELECTOR_NAVBAR) !== null;
  }
  _getOffset() {
    const {
      offset: offset2
    } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((value) => Number.parseInt(value, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }]
    };
    if (this._inNavbar || this._config.display === "static") {
      Manipulator.setDataAttribute(this._menu, "popper", "static");
      defaultBsPopperConfig.modifiers = [{
        name: "applyStyles",
        enabled: false
      }];
    }
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [void 0, defaultBsPopperConfig])
    };
  }
  _selectMenuItem({
    key,
    target
  }) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((element) => isVisible(element));
    if (!items.length) {
      return;
    }
    getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _Dropdown.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
  static clearMenus(event) {
    if (event.button === RIGHT_MOUSE_BUTTON || event.type === "keyup" && event.key !== TAB_KEY$1) {
      return;
    }
    const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
    for (const toggle of openToggles) {
      const context = _Dropdown.getInstance(toggle);
      if (!context || context._config.autoClose === false) {
        continue;
      }
      const composedPath = event.composedPath();
      const isMenuTarget = composedPath.includes(context._menu);
      if (composedPath.includes(context._element) || context._config.autoClose === "inside" && !isMenuTarget || context._config.autoClose === "outside" && isMenuTarget) {
        continue;
      }
      if (context._menu.contains(event.target) && (event.type === "keyup" && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
        continue;
      }
      const relatedTarget = {
        relatedTarget: context._element
      };
      if (event.type === "click") {
        relatedTarget.clickEvent = event;
      }
      context._completeHide(relatedTarget);
    }
  }
  static dataApiKeydownHandler(event) {
    const isInput = /input|textarea/i.test(event.target.tagName);
    const isEscapeEvent = event.key === ESCAPE_KEY$2;
    const isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
    if (!isUpOrDownEvent && !isEscapeEvent) {
      return;
    }
    if (isInput && !isEscapeEvent) {
      return;
    }
    event.preventDefault();
    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
    const instance = _Dropdown.getOrCreateInstance(getToggleButton);
    if (isUpOrDownEvent) {
      event.stopPropagation();
      instance.show();
      instance._selectMenuItem(event);
      return;
    }
    if (instance._isShown()) {
      event.stopPropagation();
      instance.hide();
      getToggleButton.focus();
    }
  }
};
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function(event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});
defineJQueryPlugin(Dropdown);
var NAME$9 = "backdrop";
var CLASS_NAME_FADE$4 = "fade";
var CLASS_NAME_SHOW$5 = "show";
var EVENT_MOUSEDOWN = `mousedown.bs.${NAME$9}`;
var Default$8 = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
};
var DefaultType$8 = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
var Backdrop = class extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }
  // Getters
  static get Default() {
    return Default$8;
  }
  static get DefaultType() {
    return DefaultType$8;
  }
  static get NAME() {
    return NAME$9;
  }
  // Public
  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._append();
    const element = this._getElement();
    if (this._config.isAnimated) {
      reflow(element);
    }
    element.classList.add(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      execute(callback);
    });
  }
  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }
    this._getElement().classList.remove(CLASS_NAME_SHOW$5);
    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  }
  dispose() {
    if (!this._isAppended) {
      return;
    }
    EventHandler.off(this._element, EVENT_MOUSEDOWN);
    this._element.remove();
    this._isAppended = false;
  }
  // Private
  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement("div");
      backdrop.className = this._config.className;
      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$4);
      }
      this._element = backdrop;
    }
    return this._element;
  }
  _configAfterMerge(config) {
    config.rootElement = getElement(config.rootElement);
    return config;
  }
  _append() {
    if (this._isAppended) {
      return;
    }
    const element = this._getElement();
    this._config.rootElement.append(element);
    EventHandler.on(element, EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }
  _emulateAnimation(callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  }
};
var NAME$8 = "focustrap";
var DATA_KEY$5 = "bs.focustrap";
var EVENT_KEY$5 = `.${DATA_KEY$5}`;
var EVENT_FOCUSIN$2 = `focusin${EVENT_KEY$5}`;
var EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$5}`;
var TAB_KEY = "Tab";
var TAB_NAV_FORWARD = "forward";
var TAB_NAV_BACKWARD = "backward";
var Default$7 = {
  autofocus: true,
  trapElement: null
  // The element to trap focus inside of
};
var DefaultType$7 = {
  autofocus: "boolean",
  trapElement: "element"
};
var FocusTrap = class extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return Default$7;
  }
  static get DefaultType() {
    return DefaultType$7;
  }
  static get NAME() {
    return NAME$8;
  }
  // Public
  activate() {
    if (this._isActive) {
      return;
    }
    if (this._config.autofocus) {
      this._config.trapElement.focus();
    }
    EventHandler.off(document, EVENT_KEY$5);
    EventHandler.on(document, EVENT_FOCUSIN$2, (event) => this._handleFocusin(event));
    EventHandler.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
    this._isActive = true;
  }
  deactivate() {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$5);
  }
  // Private
  _handleFocusin(event) {
    const {
      trapElement
    } = this._config;
    if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
      return;
    }
    const elements = SelectorEngine.focusableChildren(trapElement);
    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  }
  _handleKeydown(event) {
    if (event.key !== TAB_KEY) {
      return;
    }
    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  }
};
var SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
var SELECTOR_STICKY_CONTENT = ".sticky-top";
var PROPERTY_PADDING = "padding-right";
var PROPERTY_MARGIN = "margin-right";
var ScrollBarHelper = class {
  constructor() {
    this._element = document.body;
  }
  // Public
  getWidth() {
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }
  hide() {
    const width = this.getWidth();
    this._disableOverFlow();
    this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
    this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
    this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow");
    this._resetElementAttributes(this._element, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow");
    this._element.style.overflow = "hidden";
  }
  _setElementAttributes(selector, styleProperty, callback) {
    const scrollbarWidth = this.getWidth();
    const manipulationCallBack = (element) => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return;
      }
      this._saveInitialAttribute(element, styleProperty);
      const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
      element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _saveInitialAttribute(element, styleProperty) {
    const actualValue = element.style.getPropertyValue(styleProperty);
    if (actualValue) {
      Manipulator.setDataAttribute(element, styleProperty, actualValue);
    }
  }
  _resetElementAttributes(selector, styleProperty) {
    const manipulationCallBack = (element) => {
      const value = Manipulator.getDataAttribute(element, styleProperty);
      if (value === null) {
        element.style.removeProperty(styleProperty);
        return;
      }
      Manipulator.removeDataAttribute(element, styleProperty);
      element.style.setProperty(styleProperty, value);
    };
    this._applyManipulationCallback(selector, manipulationCallBack);
  }
  _applyManipulationCallback(selector, callBack) {
    if (isElement2(selector)) {
      callBack(selector);
      return;
    }
    for (const sel of SelectorEngine.find(selector, this._element)) {
      callBack(sel);
    }
  }
};
var NAME$7 = "modal";
var DATA_KEY$4 = "bs.modal";
var EVENT_KEY$4 = `.${DATA_KEY$4}`;
var DATA_API_KEY$2 = ".data-api";
var ESCAPE_KEY$1 = "Escape";
var EVENT_HIDE$4 = `hide${EVENT_KEY$4}`;
var EVENT_HIDE_PREVENTED$1 = `hidePrevented${EVENT_KEY$4}`;
var EVENT_HIDDEN$4 = `hidden${EVENT_KEY$4}`;
var EVENT_SHOW$4 = `show${EVENT_KEY$4}`;
var EVENT_SHOWN$4 = `shown${EVENT_KEY$4}`;
var EVENT_RESIZE$1 = `resize${EVENT_KEY$4}`;
var EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$4}`;
var EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$4}`;
var EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$4}`;
var EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$4}${DATA_API_KEY$2}`;
var CLASS_NAME_OPEN = "modal-open";
var CLASS_NAME_FADE$3 = "fade";
var CLASS_NAME_SHOW$4 = "show";
var CLASS_NAME_STATIC = "modal-static";
var OPEN_SELECTOR$1 = ".modal.show";
var SELECTOR_DIALOG = ".modal-dialog";
var SELECTOR_MODAL_BODY = ".modal-body";
var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
var Default$6 = {
  backdrop: true,
  focus: true,
  keyboard: true
};
var DefaultType$6 = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
var Modal = class _Modal extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
    this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Default$6;
  }
  static get DefaultType() {
    return DefaultType$6;
  }
  static get NAME() {
    return NAME$7;
  }
  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._isTransitioning = true;
    this._scrollBar.hide();
    document.body.classList.add(CLASS_NAME_OPEN);
    this._adjustDialog();
    this._backdrop.show(() => this._showElement(relatedTarget));
  }
  hide() {
    if (!this._isShown || this._isTransitioning) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._isShown = false;
    this._isTransitioning = true;
    this._focustrap.deactivate();
    this._element.classList.remove(CLASS_NAME_SHOW$4);
    this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
  }
  dispose() {
    EventHandler.off(window, EVENT_KEY$4);
    EventHandler.off(this._dialog, EVENT_KEY$4);
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _showElement(relatedTarget) {
    if (!document.body.contains(this._element)) {
      document.body.append(this._element);
    }
    this._element.style.display = "block";
    this._element.removeAttribute("aria-hidden");
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.scrollTop = 0;
    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW$4);
    const transitionComplete = () => {
      if (this._config.focus) {
        this._focustrap.activate();
      }
      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$4, {
        relatedTarget
      });
    };
    this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, (event) => {
      if (event.key !== ESCAPE_KEY$1) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      this._triggerBackdropTransition();
    });
    EventHandler.on(window, EVENT_RESIZE$1, () => {
      if (this._isShown && !this._isTransitioning) {
        this._adjustDialog();
      }
    });
    EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, (event) => {
      EventHandler.one(this._element, EVENT_CLICK_DISMISS, (event2) => {
        if (this._element !== event.target || this._element !== event2.target) {
          return;
        }
        if (this._config.backdrop === "static") {
          this._triggerBackdropTransition();
          return;
        }
        if (this._config.backdrop) {
          this.hide();
        }
      });
    });
  }
  _hideModal() {
    this._element.style.display = "none";
    this._element.setAttribute("aria-hidden", true);
    this._element.removeAttribute("aria-modal");
    this._element.removeAttribute("role");
    this._isTransitioning = false;
    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);
      this._resetAdjustments();
      this._scrollBar.reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$4);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$3);
  }
  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const initialOverflowY = this._element.style.overflowY;
    if (initialOverflowY === "hidden" || this._element.classList.contains(CLASS_NAME_STATIC)) {
      return;
    }
    if (!isModalOverflowing) {
      this._element.style.overflowY = "hidden";
    }
    this._element.classList.add(CLASS_NAME_STATIC);
    this._queueCallback(() => {
      this._element.classList.remove(CLASS_NAME_STATIC);
      this._queueCallback(() => {
        this._element.style.overflowY = initialOverflowY;
      }, this._dialog);
    }, this._dialog);
    this._element.focus();
  }
  /**
   * The following methods are used to handle overflowing modals
   */
  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = this._scrollBar.getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;
    if (isBodyOverflowing && !isModalOverflowing) {
      const property = isRTL() ? "paddingLeft" : "paddingRight";
      this._element.style[property] = `${scrollbarWidth}px`;
    }
    if (!isBodyOverflowing && isModalOverflowing) {
      const property = isRTL() ? "paddingRight" : "paddingLeft";
      this._element.style[property] = `${scrollbarWidth}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "";
    this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(config, relatedTarget) {
    return this.each(function() {
      const data = _Modal.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](relatedTarget);
    });
  }
};
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function(event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  EventHandler.one(target, EVENT_SHOW$4, (showEvent) => {
    if (showEvent.defaultPrevented) {
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$4, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
  });
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
  if (alreadyOpen) {
    Modal.getInstance(alreadyOpen).hide();
  }
  const data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
enableDismissTrigger(Modal);
defineJQueryPlugin(Modal);
var NAME$6 = "offcanvas";
var DATA_KEY$3 = "bs.offcanvas";
var EVENT_KEY$3 = `.${DATA_KEY$3}`;
var DATA_API_KEY$1 = ".data-api";
var EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$3}${DATA_API_KEY$1}`;
var ESCAPE_KEY = "Escape";
var CLASS_NAME_SHOW$3 = "show";
var CLASS_NAME_SHOWING$1 = "showing";
var CLASS_NAME_HIDING = "hiding";
var CLASS_NAME_BACKDROP = "offcanvas-backdrop";
var OPEN_SELECTOR = ".offcanvas.show";
var EVENT_SHOW$3 = `show${EVENT_KEY$3}`;
var EVENT_SHOWN$3 = `shown${EVENT_KEY$3}`;
var EVENT_HIDE$3 = `hide${EVENT_KEY$3}`;
var EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$3}`;
var EVENT_HIDDEN$3 = `hidden${EVENT_KEY$3}`;
var EVENT_RESIZE = `resize${EVENT_KEY$3}`;
var EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$3}${DATA_API_KEY$1}`;
var EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$3}`;
var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
var Default$5 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
var DefaultType$5 = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
var Offcanvas = class _Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._addEventListeners();
  }
  // Getters
  static get Default() {
    return Default$5;
  }
  static get DefaultType() {
    return DefaultType$5;
  }
  static get NAME() {
    return NAME$6;
  }
  // Public
  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }
  show(relatedTarget) {
    if (this._isShown) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });
    if (showEvent.defaultPrevented) {
      return;
    }
    this._isShown = true;
    this._backdrop.show();
    if (!this._config.scroll) {
      new ScrollBarHelper().hide();
    }
    this._element.setAttribute("aria-modal", true);
    this._element.setAttribute("role", "dialog");
    this._element.classList.add(CLASS_NAME_SHOWING$1);
    const completeCallBack = () => {
      if (!this._config.scroll || this._config.backdrop) {
        this._focustrap.activate();
      }
      this._element.classList.add(CLASS_NAME_SHOW$3);
      this._element.classList.remove(CLASS_NAME_SHOWING$1);
      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
        relatedTarget
      });
    };
    this._queueCallback(completeCallBack, this._element, true);
  }
  hide() {
    if (!this._isShown) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
    if (hideEvent.defaultPrevented) {
      return;
    }
    this._focustrap.deactivate();
    this._element.blur();
    this._isShown = false;
    this._element.classList.add(CLASS_NAME_HIDING);
    this._backdrop.hide();
    const completeCallback = () => {
      this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
      this._element.removeAttribute("aria-modal");
      this._element.removeAttribute("role");
      if (!this._config.scroll) {
        new ScrollBarHelper().reset();
      }
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    };
    this._queueCallback(completeCallback, this._element, true);
  }
  dispose() {
    this._backdrop.dispose();
    this._focustrap.deactivate();
    super.dispose();
  }
  // Private
  _initializeBackDrop() {
    const clickCallback = () => {
      if (this._config.backdrop === "static") {
        EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
        return;
      }
      this.hide();
    };
    const isVisible2 = Boolean(this._config.backdrop);
    return new Backdrop({
      className: CLASS_NAME_BACKDROP,
      isVisible: isVisible2,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: isVisible2 ? clickCallback : null
    });
  }
  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
      if (event.key !== ESCAPE_KEY) {
        return;
      }
      if (this._config.keyboard) {
        this.hide();
        return;
      }
      EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);
    });
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _Offcanvas.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config](this);
    });
  }
};
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function(event) {
  const target = SelectorEngine.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  EventHandler.one(target, EVENT_HIDDEN$3, () => {
    if (isVisible(this)) {
      this.focus();
    }
  });
  const alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
  if (alreadyOpen && alreadyOpen !== target) {
    Offcanvas.getInstance(alreadyOpen).hide();
  }
  const data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  for (const selector of SelectorEngine.find(OPEN_SELECTOR)) {
    Offcanvas.getOrCreateInstance(selector).show();
  }
});
EventHandler.on(window, EVENT_RESIZE, () => {
  for (const element of SelectorEngine.find("[aria-modal][class*=show][class*=offcanvas-]")) {
    if (getComputedStyle(element).position !== "fixed") {
      Offcanvas.getOrCreateInstance(element).hide();
    }
  }
});
enableDismissTrigger(Offcanvas);
defineJQueryPlugin(Offcanvas);
var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
var DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  dd: [],
  div: [],
  dl: [],
  dt: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
var uriAttributes = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]);
var SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
var allowedAttribute = (attribute, allowedAttributeList) => {
  const attributeName = attribute.nodeName.toLowerCase();
  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
    }
    return true;
  }
  return allowedAttributeList.filter((attributeRegex) => attributeRegex instanceof RegExp).some((regex) => regex.test(attributeName));
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }
  if (sanitizeFunction && typeof sanitizeFunction === "function") {
    return sanitizeFunction(unsafeHtml);
  }
  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
  const elements = [].concat(...createdDocument.body.querySelectorAll("*"));
  for (const element of elements) {
    const elementName = element.nodeName.toLowerCase();
    if (!Object.keys(allowList).includes(elementName)) {
      element.remove();
      continue;
    }
    const attributeList = [].concat(...element.attributes);
    const allowedAttributes = [].concat(allowList["*"] || [], allowList[elementName] || []);
    for (const attribute of attributeList) {
      if (!allowedAttribute(attribute, allowedAttributes)) {
        element.removeAttribute(attribute.nodeName);
      }
    }
  }
  return createdDocument.body.innerHTML;
}
var NAME$5 = "TemplateFactory";
var Default$4 = {
  allowList: DefaultAllowlist,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: "<div></div>"
};
var DefaultType$4 = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
};
var DefaultContentType = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
var TemplateFactory = class extends Config {
  constructor(config) {
    super();
    this._config = this._getConfig(config);
  }
  // Getters
  static get Default() {
    return Default$4;
  }
  static get DefaultType() {
    return DefaultType$4;
  }
  static get NAME() {
    return NAME$5;
  }
  // Public
  getContent() {
    return Object.values(this._config.content).map((config) => this._resolvePossibleFunction(config)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(content) {
    this._checkContent(content);
    this._config.content = {
      ...this._config.content,
      ...content
    };
    return this;
  }
  toHtml() {
    const templateWrapper = document.createElement("div");
    templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
    for (const [selector, text] of Object.entries(this._config.content)) {
      this._setContent(templateWrapper, text, selector);
    }
    const template = templateWrapper.children[0];
    const extraClass = this._resolvePossibleFunction(this._config.extraClass);
    if (extraClass) {
      template.classList.add(...extraClass.split(" "));
    }
    return template;
  }
  // Private
  _typeCheckConfig(config) {
    super._typeCheckConfig(config);
    this._checkContent(config.content);
  }
  _checkContent(arg) {
    for (const [selector, content] of Object.entries(arg)) {
      super._typeCheckConfig({
        selector,
        entry: content
      }, DefaultContentType);
    }
  }
  _setContent(template, content, selector) {
    const templateElement = SelectorEngine.findOne(selector, template);
    if (!templateElement) {
      return;
    }
    content = this._resolvePossibleFunction(content);
    if (!content) {
      templateElement.remove();
      return;
    }
    if (isElement2(content)) {
      this._putElementInTemplate(getElement(content), templateElement);
      return;
    }
    if (this._config.html) {
      templateElement.innerHTML = this._maybeSanitize(content);
      return;
    }
    templateElement.textContent = content;
  }
  _maybeSanitize(arg) {
    return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [void 0, this]);
  }
  _putElementInTemplate(element, templateElement) {
    if (this._config.html) {
      templateElement.innerHTML = "";
      templateElement.append(element);
      return;
    }
    templateElement.textContent = element.textContent;
  }
};
var NAME$4 = "tooltip";
var DISALLOWED_ATTRIBUTES = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]);
var CLASS_NAME_FADE$2 = "fade";
var CLASS_NAME_MODAL = "modal";
var CLASS_NAME_SHOW$2 = "show";
var SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
var SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
var EVENT_MODAL_HIDE = "hide.bs.modal";
var TRIGGER_HOVER = "hover";
var TRIGGER_FOCUS = "focus";
var TRIGGER_CLICK = "click";
var TRIGGER_MANUAL = "manual";
var EVENT_HIDE$2 = "hide";
var EVENT_HIDDEN$2 = "hidden";
var EVENT_SHOW$2 = "show";
var EVENT_SHOWN$2 = "shown";
var EVENT_INSERTED = "inserted";
var EVENT_CLICK$1 = "click";
var EVENT_FOCUSIN$1 = "focusin";
var EVENT_FOCUSOUT$1 = "focusout";
var EVENT_MOUSEENTER = "mouseenter";
var EVENT_MOUSELEAVE = "mouseleave";
var AttachmentMap = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: isRTL() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: isRTL() ? "right" : "left"
};
var Default$3 = {
  allowList: DefaultAllowlist,
  animation: true,
  boundary: "clippingParents",
  container: false,
  customClass: "",
  delay: 0,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  html: false,
  offset: [0, 6],
  placement: "top",
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: "",
  trigger: "hover focus"
};
var DefaultType$3 = {
  allowList: "object",
  animation: "boolean",
  boundary: "(string|element)",
  container: "(string|element|boolean)",
  customClass: "(string|function)",
  delay: "(number|object)",
  fallbackPlacements: "array",
  html: "boolean",
  offset: "(array|string|function)",
  placement: "(string|function)",
  popperConfig: "(null|object|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  selector: "(string|boolean)",
  template: "string",
  title: "(string|element|function)",
  trigger: "string"
};
var Tooltip = class _Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof lib_exports === "undefined") {
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
    }
    super(element, config);
    this._isEnabled = true;
    this._timeout = 0;
    this._isHovered = null;
    this._activeTrigger = {};
    this._popper = null;
    this._templateFactory = null;
    this._newContent = null;
    this.tip = null;
    this._setListeners();
    if (!this._config.selector) {
      this._fixTitle();
    }
  }
  // Getters
  static get Default() {
    return Default$3;
  }
  static get DefaultType() {
    return DefaultType$3;
  }
  static get NAME() {
    return NAME$4;
  }
  // Public
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (!this._isEnabled) {
      return;
    }
    if (this._isShown()) {
      this._leave();
      return;
    }
    this._enter();
  }
  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    if (this._element.getAttribute("data-bs-original-title")) {
      this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title"));
    }
    this._disposePopper();
    super.dispose();
  }
  show() {
    if (this._element.style.display === "none") {
      throw new Error("Please use show on visible elements");
    }
    if (!(this._isWithContent() && this._isEnabled)) {
      return;
    }
    const showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }
    this._disposePopper();
    const tip = this._getTipElement();
    this._element.setAttribute("aria-describedby", tip.getAttribute("id"));
    const {
      container
    } = this._config;
    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.append(tip);
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
    }
    this._popper = this._createPopper(tip);
    tip.classList.add(CLASS_NAME_SHOW$2);
    if ("ontouchstart" in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.on(element, "mouseover", noop);
      }
    }
    const complete = () => {
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOWN$2));
      if (this._isHovered === false) {
        this._leave();
      }
      this._isHovered = false;
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
    if (hideEvent.defaultPrevented) {
      return;
    }
    const tip = this._getTipElement();
    tip.classList.remove(CLASS_NAME_SHOW$2);
    if ("ontouchstart" in document.documentElement) {
      for (const element of [].concat(...document.body.children)) {
        EventHandler.off(element, "mouseover", noop);
      }
    }
    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;
    this._isHovered = null;
    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }
      if (!this._isHovered) {
        this._disposePopper();
      }
      this._element.removeAttribute("aria-describedby");
      EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN$2));
    };
    this._queueCallback(complete, this.tip, this._isAnimated());
  }
  update() {
    if (this._popper) {
      this._popper.update();
    }
  }
  // Protected
  _isWithContent() {
    return Boolean(this._getTitle());
  }
  _getTipElement() {
    if (!this.tip) {
      this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
    }
    return this.tip;
  }
  _createTipElement(content) {
    const tip = this._getTemplateFactory(content).toHtml();
    if (!tip) {
      return null;
    }
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
    tip.classList.add(`bs-${this.constructor.NAME}-auto`);
    const tipId = getUID(this.constructor.NAME).toString();
    tip.setAttribute("id", tipId);
    if (this._isAnimated()) {
      tip.classList.add(CLASS_NAME_FADE$2);
    }
    return tip;
  }
  setContent(content) {
    this._newContent = content;
    if (this._isShown()) {
      this._disposePopper();
      this.show();
    }
  }
  _getTemplateFactory(content) {
    if (this._templateFactory) {
      this._templateFactory.changeContent(content);
    } else {
      this._templateFactory = new TemplateFactory({
        ...this._config,
        // the `content` var has to be after `this._config`
        // to override config.content in case of popover
        content,
        extraClass: this._resolvePossibleFunction(this._config.customClass)
      });
    }
    return this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [SELECTOR_TOOLTIP_INNER]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
  }
  // Private
  _initializeOnDelegatedTarget(event) {
    return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
  }
  _createPopper(tip) {
    const placement = execute(this._config.placement, [this, tip, this._element]);
    const attachment = AttachmentMap[placement.toUpperCase()];
    return createPopper3(this._element, tip, this._getPopperConfig(attachment));
  }
  _getOffset() {
    const {
      offset: offset2
    } = this._config;
    if (typeof offset2 === "string") {
      return offset2.split(",").map((value) => Number.parseInt(value, 10));
    }
    if (typeof offset2 === "function") {
      return (popperData) => offset2(popperData, this._element);
    }
    return offset2;
  }
  _resolvePossibleFunction(arg) {
    return execute(arg, [this._element, this._element]);
  }
  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: "flip",
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }, {
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "arrow",
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: "preSetPlacement",
        enabled: true,
        phase: "beforeMain",
        fn: (data) => {
          this._getTipElement().setAttribute("data-popper-placement", data.state.placement);
        }
      }]
    };
    return {
      ...defaultBsPopperConfig,
      ...execute(this._config.popperConfig, [void 0, defaultBsPopperConfig])
    };
  }
  _setListeners() {
    const triggers = this._config.trigger.split(" ");
    for (const trigger of triggers) {
      if (trigger === "click") {
        EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, (event) => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[TRIGGER_CLICK] = !(context._isShown() && context._activeTrigger[TRIGGER_CLICK]);
          context.toggle();
        });
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
        EventHandler.on(this._element, eventIn, this._config.selector, (event) => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
          context._enter();
        });
        EventHandler.on(this._element, eventOut, this._config.selector, (event) => {
          const context = this._initializeOnDelegatedTarget(event);
          context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
          context._leave();
        });
      }
    }
    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };
    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
  }
  _fixTitle() {
    const title = this._element.getAttribute("title");
    if (!title) {
      return;
    }
    if (!this._element.getAttribute("aria-label") && !this._element.textContent.trim()) {
      this._element.setAttribute("aria-label", title);
    }
    this._element.setAttribute("data-bs-original-title", title);
    this._element.removeAttribute("title");
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = true;
      return;
    }
    this._isHovered = true;
    this._setTimeout(() => {
      if (this._isHovered) {
        this.show();
      }
    }, this._config.delay.show);
  }
  _leave() {
    if (this._isWithActiveTrigger()) {
      return;
    }
    this._isHovered = false;
    this._setTimeout(() => {
      if (!this._isHovered) {
        this.hide();
      }
    }, this._config.delay.hide);
  }
  _setTimeout(handler, timeout) {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(handler, timeout);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(true);
  }
  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    for (const dataAttribute of Object.keys(dataAttributes)) {
      if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
        delete dataAttributes[dataAttribute];
      }
    }
    config = {
      ...dataAttributes,
      ...typeof config === "object" && config ? config : {}
    };
    config = this._mergeConfigObj(config);
    config = this._configAfterMerge(config);
    this._typeCheckConfig(config);
    return config;
  }
  _configAfterMerge(config) {
    config.container = config.container === false ? document.body : getElement(config.container);
    if (typeof config.delay === "number") {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }
    if (typeof config.title === "number") {
      config.title = config.title.toString();
    }
    if (typeof config.content === "number") {
      config.content = config.content.toString();
    }
    return config;
  }
  _getDelegateConfig() {
    const config = {};
    for (const [key, value] of Object.entries(this._config)) {
      if (this.constructor.Default[key] !== value) {
        config[key] = value;
      }
    }
    config.selector = false;
    config.trigger = "manual";
    return config;
  }
  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();
      this._popper = null;
    }
    if (this.tip) {
      this.tip.remove();
      this.tip = null;
    }
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _Tooltip.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
};
defineJQueryPlugin(Tooltip);
var NAME$3 = "popover";
var SELECTOR_TITLE = ".popover-header";
var SELECTOR_CONTENT = ".popover-body";
var Default$2 = {
  ...Tooltip.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
};
var DefaultType$2 = {
  ...Tooltip.DefaultType,
  content: "(null|string|element|function)"
};
var Popover = class _Popover extends Tooltip {
  // Getters
  static get Default() {
    return Default$2;
  }
  static get DefaultType() {
    return DefaultType$2;
  }
  static get NAME() {
    return NAME$3;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [SELECTOR_TITLE]: this._getTitle(),
      [SELECTOR_CONTENT]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _Popover.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (typeof data[config] === "undefined") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
};
defineJQueryPlugin(Popover);
var NAME$2 = "scrollspy";
var DATA_KEY$2 = "bs.scrollspy";
var EVENT_KEY$2 = `.${DATA_KEY$2}`;
var DATA_API_KEY = ".data-api";
var EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
var EVENT_CLICK = `click${EVENT_KEY$2}`;
var EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$2}${DATA_API_KEY}`;
var CLASS_NAME_DROPDOWN_ITEM = "dropdown-item";
var CLASS_NAME_ACTIVE$1 = "active";
var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
var SELECTOR_TARGET_LINKS = "[href]";
var SELECTOR_NAV_LIST_GROUP = ".nav, .list-group";
var SELECTOR_NAV_LINKS = ".nav-link";
var SELECTOR_NAV_ITEMS = ".nav-item";
var SELECTOR_LIST_ITEMS = ".list-group-item";
var SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
var SELECTOR_DROPDOWN = ".dropdown";
var SELECTOR_DROPDOWN_TOGGLE$1 = ".dropdown-toggle";
var Default$1 = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1]
};
var DefaultType$1 = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
var ScrollSpy = class _ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._targetLinks = /* @__PURE__ */ new Map();
    this._observableSections = /* @__PURE__ */ new Map();
    this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element;
    this._activeTarget = null;
    this._observer = null;
    this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    };
    this.refresh();
  }
  // Getters
  static get Default() {
    return Default$1;
  }
  static get DefaultType() {
    return DefaultType$1;
  }
  static get NAME() {
    return NAME$2;
  }
  // Public
  refresh() {
    this._initializeTargetsAndObservables();
    this._maybeEnableSmoothScroll();
    if (this._observer) {
      this._observer.disconnect();
    } else {
      this._observer = this._getNewObserver();
    }
    for (const section of this._observableSections.values()) {
      this._observer.observe(section);
    }
  }
  dispose() {
    this._observer.disconnect();
    super.dispose();
  }
  // Private
  _configAfterMerge(config) {
    config.target = getElement(config.target) || document.body;
    config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
    if (typeof config.threshold === "string") {
      config.threshold = config.threshold.split(",").map((value) => Number.parseFloat(value));
    }
    return config;
  }
  _maybeEnableSmoothScroll() {
    if (!this._config.smoothScroll) {
      return;
    }
    EventHandler.off(this._config.target, EVENT_CLICK);
    EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, (event) => {
      const observableSection = this._observableSections.get(event.target.hash);
      if (observableSection) {
        event.preventDefault();
        const root = this._rootElement || window;
        const height = observableSection.offsetTop - this._element.offsetTop;
        if (root.scrollTo) {
          root.scrollTo({
            top: height,
            behavior: "smooth"
          });
          return;
        }
        root.scrollTop = height;
      }
    });
  }
  _getNewObserver() {
    const options = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver((entries) => this._observerCallback(entries), options);
  }
  // The logic of selection
  _observerCallback(entries) {
    const targetElement = (entry) => this._targetLinks.get(`#${entry.target.id}`);
    const activate = (entry) => {
      this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
      this._process(targetElement(entry));
    };
    const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
    const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = parentScrollTop;
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        this._activeTarget = null;
        this._clearActiveClass(targetElement(entry));
        continue;
      }
      const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (userScrollsDown && entryIsLowerThanPrevious) {
        activate(entry);
        if (!parentScrollTop) {
          return;
        }
        continue;
      }
      if (!userScrollsDown && !entryIsLowerThanPrevious) {
        activate(entry);
      }
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map();
    this._observableSections = /* @__PURE__ */ new Map();
    const targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
    for (const anchor of targetLinks) {
      if (!anchor.hash || isDisabled(anchor)) {
        continue;
      }
      const observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);
      if (isVisible(observableSection)) {
        this._targetLinks.set(decodeURI(anchor.hash), anchor);
        this._observableSections.set(anchor.hash, observableSection);
      }
    }
  }
  _process(target) {
    if (this._activeTarget === target) {
      return;
    }
    this._clearActiveClass(this._config.target);
    this._activeTarget = target;
    target.classList.add(CLASS_NAME_ACTIVE$1);
    this._activateParents(target);
    EventHandler.trigger(this._element, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }
  _activateParents(target) {
    if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
      return;
    }
    for (const listGroup of SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)) {
      for (const item of SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)) {
        item.classList.add(CLASS_NAME_ACTIVE$1);
      }
    }
  }
  _clearActiveClass(parent) {
    parent.classList.remove(CLASS_NAME_ACTIVE$1);
    const activeNodes = SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`, parent);
    for (const node of activeNodes) {
      node.classList.remove(CLASS_NAME_ACTIVE$1);
    }
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _ScrollSpy.getOrCreateInstance(this, config);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
};
EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
  for (const spy of SelectorEngine.find(SELECTOR_DATA_SPY)) {
    ScrollSpy.getOrCreateInstance(spy);
  }
});
defineJQueryPlugin(ScrollSpy);
var NAME$1 = "tab";
var DATA_KEY$1 = "bs.tab";
var EVENT_KEY$1 = `.${DATA_KEY$1}`;
var EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
var EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
var EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
var EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
var EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}`;
var EVENT_KEYDOWN = `keydown${EVENT_KEY$1}`;
var EVENT_LOAD_DATA_API = `load${EVENT_KEY$1}`;
var ARROW_LEFT_KEY = "ArrowLeft";
var ARROW_RIGHT_KEY = "ArrowRight";
var ARROW_UP_KEY = "ArrowUp";
var ARROW_DOWN_KEY = "ArrowDown";
var HOME_KEY = "Home";
var END_KEY = "End";
var CLASS_NAME_ACTIVE = "active";
var CLASS_NAME_FADE$1 = "fade";
var CLASS_NAME_SHOW$1 = "show";
var CLASS_DROPDOWN = "dropdown";
var SELECTOR_DROPDOWN_TOGGLE = ".dropdown-toggle";
var SELECTOR_DROPDOWN_MENU = ".dropdown-menu";
var NOT_SELECTOR_DROPDOWN_TOGGLE = `:not(${SELECTOR_DROPDOWN_TOGGLE})`;
var SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
var SELECTOR_OUTER = ".nav-item, .list-group-item";
var SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
var SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
var SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
var Tab = class _Tab extends BaseComponent {
  constructor(element) {
    super(element);
    this._parent = this._element.closest(SELECTOR_TAB_PANEL);
    if (!this._parent) {
      return;
    }
    this._setInitialAttributes(this._parent, this._getChildren());
    EventHandler.on(this._element, EVENT_KEYDOWN, (event) => this._keydown(event));
  }
  // Getters
  static get NAME() {
    return NAME$1;
  }
  // Public
  show() {
    const innerElem = this._element;
    if (this._elemIsActive(innerElem)) {
      return;
    }
    const active = this._getActiveElem();
    const hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
      relatedTarget: innerElem
    }) : null;
    const showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
      relatedTarget: active
    });
    if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
      return;
    }
    this._deactivate(active, innerElem);
    this._activate(innerElem, active);
  }
  // Private
  _activate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.add(CLASS_NAME_ACTIVE);
    this._activate(SelectorEngine.getElementFromSelector(element));
    const complete = () => {
      if (element.getAttribute("role") !== "tab") {
        element.classList.add(CLASS_NAME_SHOW$1);
        return;
      }
      element.removeAttribute("tabindex");
      element.setAttribute("aria-selected", true);
      this._toggleDropDown(element, true);
      EventHandler.trigger(element, EVENT_SHOWN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _deactivate(element, relatedElem) {
    if (!element) {
      return;
    }
    element.classList.remove(CLASS_NAME_ACTIVE);
    element.blur();
    this._deactivate(SelectorEngine.getElementFromSelector(element));
    const complete = () => {
      if (element.getAttribute("role") !== "tab") {
        element.classList.remove(CLASS_NAME_SHOW$1);
        return;
      }
      element.setAttribute("aria-selected", false);
      element.setAttribute("tabindex", "-1");
      this._toggleDropDown(element, false);
      EventHandler.trigger(element, EVENT_HIDDEN$1, {
        relatedTarget: relatedElem
      });
    };
    this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
  }
  _keydown(event) {
    if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY, HOME_KEY, END_KEY].includes(event.key)) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const children = this._getChildren().filter((element) => !isDisabled(element));
    let nextActiveElement;
    if ([HOME_KEY, END_KEY].includes(event.key)) {
      nextActiveElement = children[event.key === HOME_KEY ? 0 : children.length - 1];
    } else {
      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
      nextActiveElement = getNextActiveElement(children, event.target, isNext, true);
    }
    if (nextActiveElement) {
      nextActiveElement.focus({
        preventScroll: true
      });
      _Tab.getOrCreateInstance(nextActiveElement).show();
    }
  }
  _getChildren() {
    return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((child) => this._elemIsActive(child)) || null;
  }
  _setInitialAttributes(parent, children) {
    this._setAttributeIfNotExists(parent, "role", "tablist");
    for (const child of children) {
      this._setInitialAttributesOnChild(child);
    }
  }
  _setInitialAttributesOnChild(child) {
    child = this._getInnerElement(child);
    const isActive = this._elemIsActive(child);
    const outerElem = this._getOuterElement(child);
    child.setAttribute("aria-selected", isActive);
    if (outerElem !== child) {
      this._setAttributeIfNotExists(outerElem, "role", "presentation");
    }
    if (!isActive) {
      child.setAttribute("tabindex", "-1");
    }
    this._setAttributeIfNotExists(child, "role", "tab");
    this._setInitialAttributesOnTargetPanel(child);
  }
  _setInitialAttributesOnTargetPanel(child) {
    const target = SelectorEngine.getElementFromSelector(child);
    if (!target) {
      return;
    }
    this._setAttributeIfNotExists(target, "role", "tabpanel");
    if (child.id) {
      this._setAttributeIfNotExists(target, "aria-labelledby", `${child.id}`);
    }
  }
  _toggleDropDown(element, open) {
    const outerElem = this._getOuterElement(element);
    if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
      return;
    }
    const toggle = (selector, className) => {
      const element2 = SelectorEngine.findOne(selector, outerElem);
      if (element2) {
        element2.classList.toggle(className, open);
      }
    };
    toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
    toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
    outerElem.setAttribute("aria-expanded", open);
  }
  _setAttributeIfNotExists(element, attribute, value) {
    if (!element.hasAttribute(attribute)) {
      element.setAttribute(attribute, value);
    }
  }
  _elemIsActive(elem) {
    return elem.classList.contains(CLASS_NAME_ACTIVE);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(elem) {
    return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(elem) {
    return elem.closest(SELECTOR_OUTER) || elem;
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _Tab.getOrCreateInstance(this);
      if (typeof config !== "string") {
        return;
      }
      if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    });
  }
};
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
  if (["A", "AREA"].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  Tab.getOrCreateInstance(this).show();
});
EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  for (const element of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
    Tab.getOrCreateInstance(element);
  }
});
defineJQueryPlugin(Tab);
var NAME = "toast";
var DATA_KEY = "bs.toast";
var EVENT_KEY = `.${DATA_KEY}`;
var EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
var EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
var EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
var EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
var EVENT_HIDE = `hide${EVENT_KEY}`;
var EVENT_HIDDEN = `hidden${EVENT_KEY}`;
var EVENT_SHOW = `show${EVENT_KEY}`;
var EVENT_SHOWN = `shown${EVENT_KEY}`;
var CLASS_NAME_FADE = "fade";
var CLASS_NAME_HIDE = "hide";
var CLASS_NAME_SHOW = "show";
var CLASS_NAME_SHOWING = "showing";
var DefaultType = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
};
var Default = {
  animation: true,
  autohide: true,
  delay: 5e3
};
var Toast = class _Toast extends BaseComponent {
  constructor(element, config) {
    super(element, config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;
    this._setListeners();
  }
  // Getters
  static get Default() {
    return Default;
  }
  static get DefaultType() {
    return DefaultType;
  }
  static get NAME() {
    return NAME;
  }
  // Public
  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
    if (showEvent.defaultPrevented) {
      return;
    }
    this._clearTimeout();
    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }
    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);
      EventHandler.trigger(this._element, EVENT_SHOWN);
      this._maybeScheduleHide();
    };
    this._element.classList.remove(CLASS_NAME_HIDE);
    reflow(this._element);
    this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown()) {
      return;
    }
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
    if (hideEvent.defaultPrevented) {
      return;
    }
    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE);
      this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };
    this._element.classList.add(CLASS_NAME_SHOWING);
    this._queueCallback(complete, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout();
    if (this.isShown()) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }
    super.dispose();
  }
  isShown() {
    return this._element.classList.contains(CLASS_NAME_SHOW);
  }
  // Private
  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }
    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }
    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }
  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = isInteracting;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = isInteracting;
        break;
      }
    }
    if (isInteracting) {
      this._clearTimeout();
      return;
    }
    const nextElement = event.relatedTarget;
    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }
    this._maybeScheduleHide();
  }
  _setListeners() {
    EventHandler.on(this._element, EVENT_MOUSEOVER, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, (event) => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, (event) => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, (event) => this._onInteraction(event, false));
  }
  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  }
  // Static
  static jQueryInterface(config) {
    return this.each(function() {
      const data = _Toast.getOrCreateInstance(this, config);
      if (typeof config === "string") {
        if (typeof data[config] === "undefined") {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      }
    });
  }
};
enableDismissTrigger(Toast);
defineJQueryPlugin(Toast);

// src/vendor/installShellFramework.ts
if (typeof window !== "undefined") {
  window.bootstrap = bootstrap_esm_exports;
}

// #style-inject:#style-inject
function styleInject(css, { insertAt } = {}) {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// src/components/header/Header.common.css
styleInject("header.mb-common-header .f-hd-left {\n  float: left;\n}\nheader.mb-common-header .f-hd-right {\n  float: right;\n}\nheader.mb-common-header a,\nheader.mb-common-header a:hover,\nheader.mb-common-header a:focus,\nheader.mb-common-header a:focus-visible,\nheader.mb-common-header a:visited,\nheader.mb-common-header a:active {\n  text-decoration: none !important;\n}\n#mb-nav-desktop-main {\n  padding: 0;\n}\n@media (min-width: 992px) {\n  header.mb-common-header #mb-nav-desktop-main.navbar {\n    display: flex;\n    flex-wrap: nowrap;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 0;\n  }\n  header.mb-common-header #mb-nav-desktop-main .menu_nav1 {\n    display: inline-flex;\n    flex: 0 1 auto;\n    flex-wrap: nowrap;\n    align-items: center;\n    list-style: none;\n    margin: 0;\n    padding: 0;\n  }\n  header.mb-common-header #mb-nav-desktop-main > .mb-common-header__auth-btn,\n  header.mb-common-header #mb-nav-desktop-main > .mb-common-header__register-link {\n    flex: 0 0 auto;\n    align-self: center;\n    margin-left: 12px;\n    vertical-align: middle;\n  }\n  header.mb-common-header #mb-nav-desktop-main > .mb-common-header__profile,\n  header.mb-common-header #mb-nav-desktop-main > .chat-toggler.mb-common-header__profile {\n    flex: 0 0 auto;\n    align-self: center;\n    margin-left: 12px;\n  }\n  header.mb-common-header #mb-nav-desktop-main > .btn-group {\n    flex: 0 0 auto;\n    align-self: center;\n  }\n}\n.header-top {\n  background: #081854;\n  position: relative;\n}\n.header-top .skip01 {\n  color: #ffffff;\n  line-height: 28px;\n  font-size: 13px;\n  font-weight: 600;\n  padding-right: 15px;\n}\n.header-top .partition {\n  color: #ffffff;\n}\n.header-top .goi {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  line-height: 1.2;\n  padding-top: 2px;\n  color: #ffffff;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: 500;\n  text-decoration: none;\n}\n.header-top .goi img {\n  flex-shrink: 0;\n  margin-right: 15px;\n  width: 25px;\n  height: 15px;\n  vertical-align: middle;\n}\n.header-top .font01 {\n  border: none;\n  outline: none;\n  background: no-repeat;\n  width: 40px;\n  height: auto;\n  color: #ffffff;\n  font-size: 13px;\n  font-weight: 600;\n}\n.header-top .language01 {\n  height: auto;\n  padding: 2px 0 2px 14px;\n}\n.header-top .active01 {\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 6px;\n}\n.header-top .gov_india {\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 1.2;\n}\nhtml.mb-accessibility-font-active:not([style*=zoom]) .header-top .font01,\nhtml.mb-accessibility-font-active:not([style*=zoom]) .header-top .skip01,\nhtml.mb-accessibility-font-active:not([style*=zoom]) .header-top .gov_india,\nhtml.mb-accessibility-font-active:not([style*=zoom]) .fontchange12,\nhtml.mb-accessibility-font-active:not([style*=zoom]) .fontchange14,\nhtml.mb-accessibility-font-active:not([style*=zoom]) .fontchange {\n  font-size: calc(1em + var(--mb-font-delta, 0px));\n}\nhtml.mb-accessibility-font-active:not([style*=zoom]) .header-top .font01 {\n  font-size: calc(13px + var(--mb-font-delta, 0px));\n}\nhtml.mb-accessibility-font-active:not([style*=zoom]) .fontchange12 {\n  font-size: calc(12px + var(--mb-font-delta, 0px)) !important;\n}\nhtml.mb-accessibility-font-active:not([style*=zoom]) .fontchange14 {\n  font-size: calc(14px + var(--mb-font-delta, 0px)) !important;\n}\n.mb-common-header__modal-nav a {\n  color: #000000;\n  font-weight: 600;\n}\n.mb-common-header__modal-nav a:hover {\n  color: #f15b43;\n}\n#mobileMenuNew a,\n#mobileMenuNew a:hover,\n#mobileMenuNew a:focus,\n#mobileMenuNew a:visited,\n#mobileMenuNew a:active,\n#mobileMenuNew a * {\n  text-decoration: none !important;\n}\n.chat-toggler .username {\n  font-size: 15px;\n  font-weight: 700;\n  text-align: left;\n  line-height: 1.2;\n  color: #003d52;\n}\nheader.mb-common-header .chat-toggler.mb-common-header__profile {\n  display: inline-flex;\n  align-items: center;\n  align-self: center;\n  float: none;\n  margin-left: 12px;\n}\nheader.mb-common-header .chat-toggler.mb-common-header__profile .mb-common-header__profile-toggle {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  float: none !important;\n  margin: 0 !important;\n  color: inherit;\n}\nheader.mb-common-header .chat-toggler .user-info-wrapper {\n  float: none;\n  flex-shrink: 0;\n  margin: 0;\n}\nheader.mb-common-header .chat-toggler .user-details {\n  float: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  line-height: 1.2;\n  color: #003d52;\n  min-width: 0;\n}\nheader.mb-common-header .chat-toggler .mb-common-header__welcome-label {\n  font-size: 11px;\n  font-weight: 400;\n  color: #1789d2;\n  text-align: left;\n  margin: 0 0 2px;\n  line-height: 1.2;\n}\nheader.mb-common-header .chat-toggler .profile-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #d9d9d9;\n}\nheader.mb-common-header .chat-toggler .mb-common-header__profile-initial {\n  font-size: 28px;\n  font-weight: 400;\n  color: #1789d2;\n  line-height: 1;\n  font-family: Inter, sans-serif;\n}\nheader.mb-common-header .chat-toggler .profile-wrapper .profileimage {\n  display: block;\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n}\n.mb-common-header__mobile-profile a {\n  color: #333333;\n  font-weight: 500;\n}\n");

// src/styles/bhashini.css
styleInject(".bhashini-plugin-container svg,\n#bhashini-translation svg,\n.bhashini-translator-widget svg {\n  width: 24px;\n  height: 24px;\n}\nheader.mb-common-header > .mb-common-header__bhashini-mount:not(.mb-common-header__bhashini-mount--empty) {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  overflow: hidden !important;\n  clip: rect(0, 0, 0, 0) !important;\n  white-space: nowrap !important;\n  border: 0 !important;\n  float: none !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\nheader.mb-common-header > .mb-common-header__bhashini-mount--empty {\n  display: none !important;\n}\n.bhashini-dropdown-content {\n  bottom: auto !important;\n  right: -75px;\n  scrollbar-width: thin;\n}\n.bhashini-dropdown-content .language-option {\n  text-align: left !important;\n}\n#bhashini-desktop-header,\n#bhashini-mobile-header {\n  display: inline-block;\n  vertical-align: middle;\n  line-height: 1;\n}\n#bhashini-desktop-header .bhashini-dropdown,\n#bhashini-mobile-header .bhashini-dropdown,\n#bhashini-translation {\n  display: inline-block;\n  vertical-align: middle;\n  position: relative;\n}\n.header-top #bhashini-desktop-header .bhashini-dropdown-btn-icon svg path {\n  fill: #ffffff;\n}\n@media only screen and (max-width: 999px) {\n  .bhashini-dropdown-content {\n    top: 40px !important;\n    right: -40px;\n  }\n  #bhashini-mobile-header .bhashini-dropdown-btn-icon svg path,\n  #bhashini-translation .bhashini-dropdown-btn-icon svg path {\n    fill: #000000 !important;\n  }\n}\n");

// src/components/Header.css
styleInject('.main-menu ul li {\n  display: inline-block;\n  margin: 0 3px;\n  position: relative;\n  list-style: none;\n}\n.main-menu ul li a {\n  color: #000000;\n  display: list-item;\n  list-style: none;\n  line-height: 1;\n  padding: 6px 4px !important;\n  font-size: 13px;\n  font-weight: 600 !important;\n  text-decoration: none !important;\n}\n.header-area {\n  background-size: cover;\n}\n@media (max-width: 991.98px) {\n  header#mb-common-header-root.mb-common-header .header-area.mb-common-header__header-area {\n    padding-top: 0.45rem !important;\n    padding-bottom: 0.45rem !important;\n  }\n}\n.mb-common-header__mobile-bar {\n  position: relative;\n  z-index: 2;\n}\n.mb-common-header__mobile-bar .mb-common-header__mobile-row {\n  align-items: center !important;\n  gap: 0.5rem;\n}\n.mb-common-header__mobile-bar .mb-common-header__mobile-logos {\n  flex: 0 1 auto;\n  justify-content: flex-start;\n  align-items: center;\n  align-self: center;\n}\n@media (max-width: 991.98px) {\n  header.mb-common-header .mb-common-header__mobile-row--split {\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 0.25rem 0.35rem;\n    width: 100%;\n    min-width: 0;\n  }\n  header.mb-common-header .mb-common-header__mobile-logos--split {\n    flex: 0 0 auto;\n    min-width: 0;\n    max-width: none;\n    align-items: center;\n    overflow: visible;\n    padding-right: 2px;\n  }\n  header.mb-common-header .mb-common-header__mobile-actions--split {\n    flex: 1 1 auto;\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: flex-end !important;\n    gap: 0.35rem;\n    min-width: 0;\n    float: none !important;\n    margin-top: 0 !important;\n  }\n  header.mb-common-header .mb-common-header__mobile-actions--split #toll_mb .lang_toll_free {\n    justify-content: flex-end;\n  }\n  header.mb-common-header .mb-common-header__mobile-row--split {\n    padding-top: 0.3rem !important;\n    padding-bottom: 0.3rem !important;\n  }\n}\n.mb-common-header__mobile-bar #toll_mb.skip01 {\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n  flex: 0 1 auto;\n  min-width: 0;\n  color: #1937b2;\n  text-decoration: none;\n  line-height: 1;\n}\n.mb-common-header__mobile-bar #toll_mb .lang_toll_free {\n  font-size: clamp(11px, 3vw, 14px);\n  font-weight: 700;\n  line-height: 1.15;\n  color: #1937b2;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35em;\n}\n@media (max-width: 575.98px) {\n  .mb-common-header__mobile-bar #mb_menus.btn-light {\n    padding: 0.28rem 0.5rem;\n    font-size: 1rem;\n    line-height: 1;\n  }\n  header.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n    font-size: 0.88em;\n  }\n  .dropdown-menu-header a,\n  .dropdown-item,\n  .dropdown-menu-header a.border-bottom {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n  .dropdown-menu-header a:hover,\n  .dropdown-menu-header a:focus,\n  .dropdown-item:hover,\n  .dropdown-item:focus {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n}\nheader.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n  display: inline-block;\n  font-size: 0.95em;\n  line-height: 1;\n  vertical-align: middle;\n}\n@media (min-width: 1000px) {\n  .mb-common-header__mobile-bar #toll_mb,\n  .mb-common-header__mobile-bar #mb_menus {\n    position: static !important;\n    right: auto !important;\n    top: auto !important;\n  }\n}\n.mb-common-header__mobile-bar #mb_menus.btn-light {\n  flex: 0 0 auto;\n  border: 1px solid #dee2e6;\n}\n@media (max-width: 575.98px) {\n  .mb-common-header__mobile-bar #mb_menus.btn-light {\n    padding: 0.28rem 0.5rem;\n    font-size: 1rem;\n    line-height: 1;\n  }\n}\nheader#mb-common-header-root.mb-common-header .new_head a img {\n  padding-right: 6px;\n  padding-left: 6px;\n  max-width: none !important;\n  height: auto !important;\n  object-fit: contain;\n  vertical-align: middle;\n}\n.new_head a img {\n  padding-right: 6px;\n  padding-left: 6px;\n}\n.new_head1 {\n  border-right: 1px solid #bdbdbd;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__register-link {\n  display: inline-block;\n  vertical-align: middle;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__auth-btn {\n  color: #ffffff !important;\n  background-color: #f15b43 !important;\n  border: none !important;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__auth-btn:hover,\nheader#mb-common-header-root.mb-common-header .mb-common-header__auth-btn:focus-visible {\n  color: #f15b43 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #f15b43 !important;\n}\n@media (min-width: 992px) {\n  header#mb-common-header-root.mb-common-header .logo-w-sm-md-sec {\n    width: 98px !important;\n    transform: scale(1.12);\n    margin-left: 7px;\n    margin-top: 5px;\n    max-width: none !important;\n    height: auto !important;\n  }\n  header#mb-common-header-root.mb-common-header .logo-w-sm-md1 {\n    width: 90px !important;\n    max-width: none !important;\n    height: auto !important;\n  }\n  header#mb-common-header-root.mb-common-header .new_head {\n    display: flex;\n    align-items: center;\n    flex-wrap: nowrap;\n  }\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .logo-w-sm-md {\n  width: 80px;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .new_head2 {\n  width: 74px;\n  margin-top: 5px;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__mobile-bar .new_head {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__mobile-bar .new_head img.logo-w-sm-md1,\nheader#mb-common-header-root.mb-common-header .mb-common-header__mobile-bar .new_head img.logo-w-sm-md-sec {\n  flex-shrink: 1;\n  min-width: 0;\n  object-fit: contain;\n  height: auto !important;\n  max-width: none !important;\n}\n#mobileMenuNew img.logo-w-sm-md-sec {\n  width: 98px !important;\n  transform: scale(1.12);\n}\n#mobileMenuNew img.logo-w-sm-md1 {\n  width: 90px !important;\n  max-width: none !important;\n  height: auto !important;\n}\n.f-12-dropdown {\n  padding-left: 24px;\n  color: #000000;\n  font-weight: 400;\n  font-size: 12px;\n}\n.dropdown-menu-header {\n  background: #ffffff;\n  border: 1px solid #f15b43;\n  border-radius: 10px;\n}\n.dropdown-menu-header a.border-bottom {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a.border-bottom:hover,\n.dropdown-menu-header a.border-bottom:focus {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a {\n  padding-top: 4px;\n  padding-bottom: 10px;\n  text-decoration: none !important;\n}\n.dropdown_evnt_prog {\n  position: relative;\n  display: inline-block;\n}\n.dropevent {\n  background-color: #ffffff;\n  color: #000000;\n  padding: 6px 4px;\n  font-size: 13px;\n  font-weight: 600;\n  border: none;\n}\n.dropevent_content {\n  display: none;\n  position: absolute;\n  background-color: #fff;\n  min-width: 180px;\n  z-index: 1;\n  border: 1px solid #dcdcdc;\n  border-radius: 4px;\n  left: -25px;\n}\n.dropevent_content > .fa.fa-caret-up {\n  position: absolute;\n  top: -10px;\n  left: 43%;\n  color: #bc4717;\n}\n.dropevent_content a {\n  color: black;\n  border-bottom: 1px solid #dcdcdc;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n}\n.dropevent_content a:hover {\n  background-color: #fff;\n}\n.dropevent i.fa-chevron-down {\n  transform: rotate(-90deg);\n  transition: transform 0.3s ease-in-out;\n}\n.dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(0deg);\n}\n.dropevent_content .dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(0deg);\n}\n.dropevent_content .dropdown_evnt_prog {\n  display: block;\n  width: 100%;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent {\n  width: 100%;\n  text-align: left;\n  border-top: 1px solid #dcdcdc;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent_content {\n  left: 100%;\n  top: 0;\n  margin-left: 2px;\n}\n.dropevent_content .dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.pull-right {\n  margin-left: 30px;\n}\n.header_img {\n  text-align: center;\n  top: 0 !important;\n}\n.user-info-wrapper {\n  display: block;\n  margin: 0;\n  width: 46px;\n  height: 46px;\n  background: #6c757d8a;\n  border-radius: 50px;\n  padding: 3px;\n  float: left;\n}\n.user-info-wrapper .profile-wrapper {\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  display: inline-block;\n}\n.chat-toggler .user-details {\n  float: left;\n  line-height: 0;\n  color: #003d52;\n}\n.chat-toggler .dropdown-menu {\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.5);\n}\n.chat-toggler .dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.chat-toggler .dropdown-menu[data-bs-popper] {\n  top: 92%;\n}\n.chat-toggler .dropdown-menu li {\n  display: block !important;\n}\n.chat-toggler .dropdown-menu li a i {\n  font-size: 12px;\n}\n.chat-toggler .dropdown-menu > li > a {\n  line-height: 25px !important;\n  color: #003d52 !important;\n  margin: 4px;\n  border-radius: 3px;\n  text-align: left;\n  font-size: 14px !important;\n  font-weight: 400 !important;\n  padding: 3px 20px !important;\n}\n.chat-toggler .dropdown-menu > li > a:hover {\n  text-decoration: none;\n  background-color: #eff2f3;\n  background-image: none;\n}\nheader#mb-common-header-root.mb-common-header .dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  list-style: none;\n  text-shadow: none;\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.2);\n  border: none;\n  border-radius: 3px;\n  padding: 0;\n  font-size: 13px;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__profile.dropdown.show > .dropdown-menu,\nheader#mb-common-header-root.mb-common-header .mb-common-header__profile .dropdown-menu.show {\n  display: block !important;\n}\nheader#mb-common-header-root.mb-common-header .header-area,\nheader#mb-common-header-root.mb-common-header .main-menu,\nheader#mb-common-header-root.mb-common-header #mb-nav-desktop-main,\nheader#mb-common-header-root.mb-common-header .mb-common-header__profile {\n  overflow: visible !important;\n}\n@media only screen and (max-width: 991.98px) {\n  #mobileMenuNew img.logo-w-sm-md1 {\n    width: clamp(118px, 32vw, 148px) !important;\n  }\n  #mobileMenuNew img.logo-w-sm-md-sec {\n    width: clamp(126px, 34vw, 156px) !important;\n    transform: scale(1.08) !important;\n  }\n}\n@media only screen and (max-width: 575.98px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-row--split {\n    gap: 0.25rem !important;\n    padding-left: 4px !important;\n    padding-right: 2px !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  .header-area {\n    min-height: 56px;\n  }\n}\n@media only screen and (max-width: 1000px) {\n  .header-top,\n  .main-menu {\n    display: none !important;\n  }\n  header.mb-common-header .d-sm-none1 {\n    display: block !important;\n  }\n  .header-area .justify-content-sm-end {\n    justify-content: flex-start !important;\n  }\n}\n@media only screen and (max-width: 999px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .header-area {\n    height: 60px;\n    min-height: 56px;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .header-area .container {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .mb-common-header__mobile-row--split {\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 0.35rem !important;\n    width: 100%;\n    min-height: 52px;\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .mb-common-header__mobile-logos--split {\n    flex: 0 1 auto !important;\n    align-items: center !important;\n    min-width: 0;\n    max-width: calc(100% - 158px);\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #bhashini-mobile-header {\n    flex: 0 0 28px !important;\n    width: 28px;\n    min-width: 28px;\n    height: 24px;\n    display: inline-block;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .new_head {\n    align-items: center !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split .mb-common-header__mobile-actions--split {\n    flex: 1 1 auto !important;\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: flex-end !important;\n    gap: 0.4rem !important;\n    min-width: 0;\n    float: none !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #toll_mb,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #mb_menus {\n    position: static !important;\n    float: none !important;\n    right: auto !important;\n    top: auto !important;\n    left: auto !important;\n    bottom: auto !important;\n    margin: 0 !important;\n    z-index: auto !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #toll_mb {\n    display: inline-flex !important;\n    align-items: center !important;\n    font-size: 10px !important;\n    white-space: nowrap;\n    flex: 0 1 auto;\n    min-width: 0;\n    color: #1937b2;\n    text-decoration: none;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #toll_mb .lang_toll_free {\n    font-size: 10px !important;\n    font-weight: 700 !important;\n    line-height: 1.1 !important;\n    gap: 0.2em !important;\n    align-items: center !important;\n    display: inline-flex !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .mb-common-header__mobile-bar--split #mb_menus {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    flex: 0 0 auto !important;\n    padding: 6px !important;\n    border: 1px solid #dee2e6;\n  }\n  .bhashini-dropdown-content {\n    top: 40px !important;\n    right: -40px;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #bhashini-mobile-header .bhashini-translator-widget svg path,\n  .bhashini-plugin-container svg path {\n    fill: #000000 !important;\n  }\n}\n@media (min-width: 1001px) {\n  header.mb-common-header .d-sm-none1 {\n    display: none !important;\n  }\n}\n#mobileMenuNew.modal.left {\n  z-index: 1060 !important;\n}\n#mobileMenuNew.modal.left .modal-dialog {\n  position: fixed;\n  margin: auto;\n  width: 75%;\n  max-width: 420px;\n  height: 100%;\n  transform: translate3d(0%, 0, 0);\n  right: 0;\n  left: auto;\n}\n#mobileMenuNew.modal.left .modal-content {\n  height: 100%;\n  overflow-y: auto;\n}\n#mobileMenuNew .modal-header .btn-close {\n  margin: -1rem -5px -0.5rem auto;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li:not(:last-child) {\n  border-bottom: 1px solid #d7d7d7;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a,\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n#mobileMenuNew a,\n#mobileMenuNew a * {\n  text-decoration: none !important;\n}\n#mobileMenuNew a:hover,\n#mobileMenuNew a:focus,\n#mobileMenuNew a:visited,\n#mobileMenuNew a:active {\n  text-decoration: none !important;\n  color: inherit !important;\n}\n#mobileMenuNew .modal-body ul.list-unstyled li a {\n  text-decoration: none !important;\n  font-weight: 500 !important;\n  color: #333333 !important;\n}\n#mobileMenuNew .modal-body ul li a,\n#mobileMenuNew .modal-body ul li a span {\n  text-decoration: none !important;\n}\n.f-10-dropdown {\n  font-size: 10px;\n  color: #999999;\n}\n@media only screen and (max-width: 600px) {\n  #mobileMenuNew .modal-content {\n    transform: translate(100%, 0) scale(1);\n    transition: transform 0.4s ease-in-out;\n  }\n  #mobileMenuNew.modal.show .modal-content {\n    transform: translate(0, 0) scale(1);\n  }\n  #mobileMenuNew .accordion-button:not(.collapsed) {\n    background-color: #f15b43;\n    color: #fff;\n  }\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) {\n  font-family: "Noto Sans Meetei Mayek", sans-serif;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .single-login-pad {\n  margin-right: 15px;\n  padding: 0.375rem 1.75rem;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .rounded-pill {\n  border-radius: 5px !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:active,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary.disabled,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:disabled,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary.dropdown-toggle.show {\n  color: #ffffff;\n  border-color: #f15b4300;\n  background-color: #f15b43;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-item.active,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-item:active {\n  background-color: #f15b43;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn {\n  background-color: #ffff !important;\n  border: 1px solid #f15b43 !important;\n  color: #f15b43 !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn:hover {\n  color: #ffffff !important;\n  border-color: #f15b4300 !important;\n  background-color: #f15b43 !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn::after,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .carrot_dn1::after {\n  display: none !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .primary,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:focus {\n  box-shadow: 0 0 0 0.25rem #f15b4300;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary.dropdown-toggle.show:focus,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .btn-outline-primary:active:focus {\n  box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0%);\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu[data-bs-popper] {\n  top: 109%;\n  left: -275px;\n  margin-top: 0.125rem;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_yuva,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_youth_partner,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_login_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_other,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_nyf,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a .lang_partner {\n  color: #f15b43;\n  font-weight: 500;\n  font-size: 15px;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_yuva,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_youth_partner,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_login_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_other,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_verifier,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_nyf,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .lang_partner,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .dropdown-menu-header a:active .f-12-dropdown {\n  color: #ffff;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .national_1 span:nth-child(1) {\n  color: #f39620;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .national_1 span:nth-child(2) {\n  color: #0473b7;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .national_1 span:nth-child(3) {\n  color: #04a651;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .home_ico .fa {\n  color: #313033;\n  font-size: 24px;\n  padding: 7px 10px;\n  cursor: pointer !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .home_ico {\n  cursor: pointer !important;\n  position: relative;\n  z-index: 999;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #unity-btn {\n  background:\n    linear-gradient(\n      95deg,\n      #faad17 -3.76%,\n      #e4860e 101.62%);\n  color: #fff !important;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #beta_txt {\n  position: absolute;\n  top: 61px;\n  background-color: #f15b43;\n  padding: 9px;\n  border-radius: 10px;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  bottom: 7px;\n  cursor: pointer;\n  display: none;\n  height: 20px;\n  margin-left: 113px;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu {\n  position: relative;\n  list-style: none;\n  display: inline-block;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu-link {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 4px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #000;\n  text-decoration: none;\n  white-space: nowrap;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu-link:hover {\n  color: #bc4717;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown {\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  min-width: 220px;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  background: #fff;\n  border: 1px solid #dcdcdc;\n  border-radius: 4px;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);\n  z-index: 999;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-menu:hover > .resource-dropdown {\n  display: block;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown > li {\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #dcdcdc;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown > li:last-child {\n  border-bottom: none;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu-link,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown li a,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li a {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  padding: 12px 16px;\n  font-size: 13px;\n  font-weight: 600;\n  color: #000;\n  text-decoration: none;\n  background: #fff;\n  white-space: nowrap;\n  line-height: 2 !important;\n  cursor: pointer;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu-link:hover,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-dropdown li a:hover,\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li a:hover {\n  background: #f8f8f8;\n  color: #bc4717;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu {\n  display: none;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  background: #fff;\n  border-top: 1px solid #e5e5e5;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .has-submenu.open > .resource-submenu {\n  display: block;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li {\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ededed;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li:last-child {\n  border-bottom: none;\n}\nheader#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .resource-submenu li a {\n  padding-left: 32px;\n  font-weight: 500;\n}\n@media (max-width: 767px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #beta_txt {\n    position: relative !important;\n    height: 17px !important;\n    top: 19px !important;\n    margin-left: 3px !important;\n    font-size: 10px !important;\n    padding: 7px !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .logo-w-sm-md1,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md1 {\n    width: 70px !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .logo-w-sm-md-sec,\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md-sec {\n    width: 70px !important;\n    transform: scale(1) !important;\n  }\n  header#mb-common-header-root.mb-common-header:not(.mb-common-header--header2) .header-area {\n    height: 60px;\n  }\n  #mobileMenuNew .lang_mobile {\n    font-size: 1rem;\n    padding: 6px 11px 7px 32px;\n    color: #515151;\n    line-height: 19px;\n    width: 90%;\n    font-weight: 600;\n    border: none;\n  }\n  #mobileMenuNew .modal-title .logo a img {\n    height: auto !important;\n  }\n}\n');

// src/components/Footer.css
styleInject("#feed_back.modal,\n#feed_back1.modal,\n#successToaster.modal {\n  z-index: 1060 !important;\n}\n.litext {\n  color: #525c66;\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n#footer_external a.litext,\n#footer_external p.litext {\n  color: #525c66 !important;\n}\n#footer_external a,\n#footer_external a:hover,\n#footer_external a:focus,\n#footer_external a:visited,\n#footer_external a:active,\n#feed_back a,\n#feed_back a:hover,\n#feed_back1 a,\n#feed_back1 a:hover,\n#successToaster a,\n#successToaster a:hover {\n  text-decoration: none !important;\n}\n#footer_external {\n  border-top: solid 1px #d6d6d6;\n}\n#footer_external .foot_p1 {\n  color: #525c66;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n}\n#footer_external .footer-top {\n  background-color: #ffffff !important;\n}\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col {\n  text-align: left !important;\n}\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col h6.img_link,\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col li,\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col a.litext,\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col p.litext {\n  text-align: left !important;\n}\n#footer_external.mb-common-footer .footer-top .mb-common-footer__link-col ul {\n  padding-left: 0;\n}\n@media (max-width: 991.98px) {\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col {\n    text-align: center !important;\n  }\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col h6.img_link,\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col li,\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col a.litext,\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col p.litext {\n    text-align: center !important;\n  }\n  #footer_external.mb-common-footer .footer-top .mb-common-footer__link-col ul {\n    padding-left: 0;\n  }\n  #footer_external .mb-common-footer__follow-col {\n    text-align: center;\n  }\n  #footer_external .mb-common-footer__follow-col h6.img_link {\n    text-align: center;\n  }\n  #footer_external .mb-common-footer__follow-col .social-icons {\n    justify-content: center;\n  }\n  #footer_external .mb-common-footer__follow-col .mb-common-footer__powered-by {\n    text-align: center;\n  }\n  #footer_external .mb-common-footer__follow-col .mb-common-footer__powered-inner {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 0.35rem 0.75rem;\n    width: 100%;\n    max-width: 100%;\n  }\n  #footer_external .mb-common-footer__follow-col .foot_p1 {\n    text-align: center;\n  }\n}\n#footer_external .foot_p2 {\n  padding-left: initial;\n}\n.pricy1_a {\n  background-color: #000627;\n}\n.pricy1_a .row .col-sm-8 {\n  margin-bottom: 0;\n  line-height: 35px;\n}\n.pricy1_a .row .col-sm-8 p {\n  margin-bottom: 0;\n  line-height: 29px;\n}\n.pricy1_a .row {\n  color: #fff;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 500;\n  line-height: 20px;\n}\n.pricy_a ul {\n  width: 100%;\n  line-height: 31px;\n  text-align: center;\n  display: inline-flex;\n  justify-content: center;\n  padding-left: 68px;\n  list-style: none;\n  margin: 0;\n  flex-wrap: wrap;\n}\n.pricy_a ul li:nth-child(1) {\n  padding-right: 27px;\n}\n.pricy_a p {\n  margin-bottom: 0;\n  line-height: 35px;\n}\n.foot1w {\n  width: fit-content;\n  color: #000;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 24px;\n  letter-spacing: 0.5px;\n  padding: 4px 10px;\n}\n.pricy1_a a {\n  color: #fff !important;\n  text-decoration: none;\n}\n@media only screen and (max-width: 600px) {\n  .foot1w {\n    margin: auto;\n  }\n  .pricy_a ul {\n    padding-left: 0;\n    display: flex;\n    justify-content: center;\n  }\n  .new_foot li .fab {\n    vertical-align: inherit !important;\n  }\n}\n.img_link {\n  color: #343f4a;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 24px;\n  letter-spacing: 0.15px;\n}\n.new_foot li {\n  line-height: 15px;\n  padding: 1px;\n}\n.new_foot li img {\n  width: 81%;\n}\n@media (max-width: 767.98px) {\n  #footer_external .footer-contact {\n    text-align: center !important;\n  }\n  #footer_external .footer-contact .d-flex.align-items-center {\n    justify-content: center !important;\n  }\n}\n@media (min-width: 601px) and (max-width: 991.98px) {\n  #footer_external .footer-contact,\n  #footer_external .footer-links {\n    padding-bottom: 1rem;\n  }\n}\n.mb-common-footer__social-row {\n  flex-wrap: wrap;\n}\n.feed_back {\n  text-align: end;\n}\n#feed_back textarea {\n  margin-top: 0 !important;\n  margin-bottom: 11px !important;\n}\n#feed_back label {\n  font-size: 15px;\n  font-weight: 500;\n  line-height: 20px;\n  color: #252525;\n}\n#feed_back .cross_ico img {\n  cursor: pointer;\n  padding: 6px 10px;\n}\n#feed_back .text-left {\n  text-align: left;\n}\n#feed_back .cross_ico {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px;\n  position: static;\n  bottom: auto;\n  z-index: 1;\n}\n#feed_back .mb-common-footer__feedback-footer-row {\n  margin-top: 4px;\n}\n#feed_back .mb-common-footer__feedback-actions img {\n  cursor: pointer;\n}\n#feed_back .mb-common-footer__recaptcha {\n  min-height: 78px;\n}\n#feed_back .modal-body {\n  position: relative;\n}\n#feed_back .mb-common-footer__feedback-loader {\n  position: absolute;\n  inset: 0;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.72);\n  border-radius: inherit;\n  z-index: 10;\n}\n#feed_back .mb-common-footer__feedback-loader.is-visible {\n  display: flex;\n}\n#feed_back .mb-common-footer__feedback-loader-inner {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n}\n#feed_back .mb-common-footer__feedback-spinner {\n  border: 4px solid #e9ecef;\n  border-top-color: #0fbd5f;\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  animation: mb-common-footer-feedback-spin 0.85s linear infinite;\n}\n#feed_back .mb-common-footer__feedback-loader-text {\n  color: #333;\n  font-size: 14px;\n  font-weight: 500;\n}\n@keyframes mb-common-footer-feedback-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n#feed_back .mb-common-footer__feedback-form--submitting {\n  pointer-events: none;\n  opacity: 0.55;\n}\n#feed_back .radio-tile-group {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n#feed_back .tt_yuvr {\n  display: inline-flex;\n  padding: 10px;\n  margin-bottom: 15px;\n  flex-wrap: wrap;\n  gap: 0.25rem;\n}\n#feed_back .tt_yuvr .input-container {\n  position: relative;\n  width: 50px;\n  margin-right: 18px;\n  margin-top: 7px;\n}\n#feed_back .tt_yuvr .input-container input {\n  position: absolute;\n  cursor: pointer;\n  z-index: 2;\n  opacity: 0;\n  width: 50px;\n  height: 50px;\n}\n#feed_back .tt_yuvr input:checked + .radio-tile {\n  background: #0b6bbe;\n}\n#feed_back .tt_yuvr input:checked + .radio-tile label {\n  color: #fff;\n}\n#feed_back .tt_yuvr .input-container .radio-tile {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background: #eee;\n  width: 50px;\n  height: 50px;\n  border-radius: 30px;\n}\n#feed_back .tt_yuvr .input-container {\n  transition: transform 0.2s;\n}\n#feed_back .tt_yuvr .input-container:hover {\n  transform: scale(1.07);\n}\n#feed_back .tt_yuvr .input-container label {\n  font-size: 18px;\n  font-weight: 600;\n  text-align: center;\n  margin-bottom: 0;\n}\n.radio-tile-group:nth-child(1),\n.radio-tile-group:nth-child(2),\n.radio-tile-group:nth-child(3),\n.radio-tile-group:nth-child(4) {\n  border-top: 3px solid #f00;\n}\n.radio-tile-group:nth-child(5),\n.radio-tile-group:nth-child(6),\n.radio-tile-group:nth-child(7),\n.radio-tile-group:nth-child(8) {\n  border-top: 3px solid #ffbe15;\n}\n.radio-tile-group:nth-child(9),\n.radio-tile-group:nth-child(10) {\n  border-top: 3px solid #04a651;\n}\n.radio-tile-group:nth-child(5),\n.radio-tile-group:nth-child(9) {\n  margin-left: 10px;\n}\n.vError {\n  border: 1px solid #e41f12;\n}\np.vErrormsg {\n  font-size: small;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #e41f12;\n  margin-bottom: 20px;\n  float: inline-start;\n}\nsmall.vErrormsg {\n  font-size: small;\n  font-weight: 400;\n  color: #e41f12;\n  float: inline-start;\n}\n#char_left_cnt {\n  color: #252525;\n  float: inline-end;\n  font-size: small;\n}\n#successToaster .modal-dialog {\n  margin: 20% auto;\n}\n@media only screen and (min-width: 601px) {\n  #feed_back .modal-dialog {\n    max-width: 876px !important;\n    margin-top: 133px;\n  }\n  #feed_back1 .modal-dialog {\n    margin-top: 133px;\n  }\n}\n@media only screen and (max-width: 600px) {\n  #feed_back .tt_yuvr {\n    display: flex !important;\n    overflow: auto !important;\n  }\n  #feed_back .form-group {\n    margin-bottom: 10px;\n  }\n  #feed_back .tt_yuvr .input-container input {\n    width: 20px !important;\n    height: 20px !important;\n  }\n  #feed_back .tt_yuvr .input-container .radio-tile {\n    width: 30px !important;\n    height: 30px !important;\n    border-radius: 30px !important;\n  }\n  #feed_back .cross_ico {\n    position: initial !important;\n  }\n  #feed_back .tt_yuvr .input-container {\n    width: 17px !important;\n    margin-right: 18px !important;\n  }\n  #feed_back .tt_yuvr .input-container label {\n    font-size: 13px !important;\n  }\n  #feed_back .modal-dialog {\n    width: 100% !important;\n    padding: 10px 15px 10px 0;\n  }\n  .social-icons {\n    justify-content: center;\n  }\n}\n#pls_select h3 {\n  color: #343434;\n  font-weight: 600;\n}\n#pls_select {\n  text-align: center;\n}\n#pls_select #guest_usr {\n  background-color: #f15b43;\n  border: none;\n  color: #fff;\n  font-size: 16px;\n  font-weight: 500;\n  border-radius: 4px;\n  margin: 10px;\n}\n#pls_select #regi_usr {\n  background-color: #fff;\n  border: 1px solid #5a6370;\n  font-size: 16px;\n  color: #5a6370;\n  font-weight: 500;\n  border-radius: 4px;\n  margin: 10px;\n}\n#pls_select .btn-close {\n  border: none !important;\n  background: none !important;\n  float: right;\n  width: 32px;\n  height: 32px;\n  cursor: pointer;\n}\n#pls_select .col-sm-12:nth-child(2) {\n  margin-bottom: 20px;\n}\n#feedback_captcha_value {\n  border-top-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.social-icons {\n  display: flex;\n  gap: 9px;\n  flex-wrap: wrap;\n}\n.social-icons .icon {\n  display: flex;\n  align-items: center;\n  background: white;\n  border-radius: 50px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  width: 30px;\n  overflow: hidden;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n}\n.social-icons .icon img {\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  transition: all 0.3s ease;\n}\n.social-icons .icon span {\n  margin-left: 4px;\n  white-space: nowrap;\n  opacity: 0;\n  transform: translateX(-10px);\n  transition: all 0.3s ease;\n  font-size: 13px;\n}\n.twitter-color {\n  color: #000;\n}\n.instagram-color {\n  color: #cf188a;\n}\n.facebook-color {\n  color: #4676ed;\n}\n.linkedin-color {\n  color: #4467ad;\n}\n.whatsapp-color {\n  color: #00c169;\n}\n.youtube-color {\n  color: #e52d27;\n}\n@media (hover: hover) and (pointer: fine) {\n  .social-icons .icon:hover {\n    width: 100px;\n    justify-content: flex-start;\n  }\n  .social-icons .icon:hover span {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n.mb-20 {\n  margin-bottom: 1.25rem;\n}\n.whitetext img {\n  vertical-align: middle;\n}\n#footer_external .mb-common-footer__powered-inner {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.35rem 0.75rem;\n}\n#footer_external .mb-common-footer__powered-by {\n  color: #495059 !important;\n}\n#footer_external .whitetext.mb-common-footer__powered-logo {\n  color: inherit !important;\n  display: inline-flex;\n  align-items: center;\n  line-height: 1;\n}\n#footer_external .mb-common-footer__powered-logo img {\n  display: block;\n  flex-shrink: 0;\n}\n");

// src/components/Header.tsx
import { createPortal as createPortal2 } from "react-dom";

// src/config/requireClientConfig.ts
var VALID_ENVIRONMENTS = /* @__PURE__ */ new Set(["local", "dev", "beta", "prod"]);
var alerted = /* @__PURE__ */ new Set();
function alertOnce(key, message) {
  if (typeof window === "undefined" || alerted.has(key)) return;
  alerted.add(key);
  window.alert(message);
}
function readBaseUrlFromDom() {
  return document.querySelector("mybharat-header")?.getAttribute("login-base-url")?.trim();
}
function readApiBaseUrlFromDom() {
  return document.querySelector("mybharat-header")?.getAttribute("api-base-url")?.trim();
}
function readEnvironmentFromDom() {
  return document.querySelector("mybharat-header")?.getAttribute("environment")?.trim();
}
function readCdnBaseFromDom() {
  return document.querySelector("mybharat-header")?.getAttribute("cdn-base")?.trim() || document.querySelector("mybharat-footer")?.getAttribute("cdn-base")?.trim();
}
function mergeRequiredClientConfig(props) {
  const shellLogin = window.MYBHARAT_SHELL?.login;
  return {
    baseUrl: props?.baseUrl?.trim() || shellLogin?.baseUrl?.trim() || readBaseUrlFromDom(),
    apiBaseUrl: props?.apiBaseUrl?.trim() || shellLogin?.apiBaseUrl?.trim() || readApiBaseUrlFromDom(),
    environment: props?.environment?.trim() || shellLogin?.environment?.trim() || readEnvironmentFromDom(),
    cdnBase: props?.cdnBase?.trim() || window.MYBHARAT_SHELL?.header?.cdnBase?.trim() || window.MYBHARAT_SHELL?.footer?.cdnBase?.trim() || readCdnBaseFromDom()
  };
}
function isValidEnvironment(value) {
  return !!value && VALID_ENVIRONMENTS.has(value);
}
function assertRequiredClientConfig(props) {
  const merged = mergeRequiredClientConfig(props);
  let ok = true;
  if (!merged.baseUrl) {
    alertOnce("baseUrl", "Base Url is not configured");
    ok = false;
  }
  if (!merged.apiBaseUrl) {
    alertOnce("apiBaseUrl", "Api Base Url is not configured");
    ok = false;
  }
  if (!isValidEnvironment(merged.environment)) {
    alertOnce("environment", "Environment is not configured");
    ok = false;
  }
  if (!merged.cdnBase) {
    alertOnce("cdnBase", "Cdn Base Url is not configured");
    ok = false;
  }
  return ok;
}
function readClientEnvironment(props) {
  const env = mergeRequiredClientConfig(props).environment;
  return isValidEnvironment(env) ? env : void 0;
}

// src/config/resolve.ts
var CDN_ASSET_SEGMENT = "mybharat";
function normalizeCdnOrigin(cdnBase) {
  return cdnBase.trim().replace(/\/$/, "").replace(/\/mybharat$/i, "");
}
function resolveCdnBase(options) {
  const merged = mergeRequiredClientConfig({ cdnBase: options?.cdnBase });
  const raw = merged.cdnBase?.trim();
  return raw ? normalizeCdnOrigin(raw) : "";
}
function resolveCdnAssetUrl(cdnBase, assetPath) {
  const origin = normalizeCdnOrigin(cdnBase);
  const path = assetPath.replace(/^\/+/, "");
  if (!origin) return `/${CDN_ASSET_SEGMENT}/${path}`;
  return `${origin}/${CDN_ASSET_SEGMENT}/${path}`;
}
function resolveShellLoginConfig(props) {
  const shell = window.MYBHARAT_SHELL?.login ?? {};
  const required = mergeRequiredClientConfig({
    baseUrl: props?.baseUrl,
    apiBaseUrl: props?.apiBaseUrl,
    environment: props?.environment,
    cdnBase: props?.cdnBase
  });
  return {
    baseUrl: required.baseUrl,
    apiBaseUrl: required.apiBaseUrl,
    environment: required.environment,
    cdnBase: required.cdnBase,
    oauthUsername: props?.oauthUsername?.trim() || shell.oauthUsername?.trim(),
    oauthPassword: props?.oauthPassword?.trim() || shell.oauthPassword?.trim(),
    cookieDomain: props?.cookieDomain?.trim() || shell.cookieDomain?.trim(),
    publicProfileApiBaseUrl: props?.publicProfileApiBaseUrl?.trim() || shell.publicProfileApiBaseUrl?.trim(),
    recaptchaSiteKey: props?.recaptchaSiteKey?.trim(),
    feedbackApiBaseUrl: props?.feedbackApiBaseUrl?.trim(),
    rewardsApiBaseUrl: props?.rewardsApiBaseUrl?.trim(),
    navItems: props?.navItems
  };
}

// src/components/DesktopMainNav.tsx
import React from "react";

// src/navigation/navHref.ts
function isSafeNavHref(href) {
  const h = href.trim();
  if (!h) return false;
  if (/^\s*(javascript:|data:|vbscript:)/i.test(h)) return false;
  if (/^https?:\/\//i.test(h)) return true;
  if (h.startsWith("mailto:") || h.startsWith("tel:")) return true;
  if (h.startsWith("/")) return !h.startsWith("//");
  return false;
}

// src/navigation/navLinkAttrs.ts
function warnInvalid(href, context) {
  if (typeof console !== "undefined" && console.warn) {
    console.warn(`[${context}] invalid href:`, href);
  }
}
function getNavLinkAttrs(item, context = "Nav") {
  const ok = isSafeNavHref(item.href);
  const href = ok ? item.href : "#";
  if (!ok) warnInvalid(item.href, context);
  const external = item.external ?? /^https?:\/\//i.test(href);
  return { href, external };
}

// src/navigation/navTree.ts
function isPlainRecord(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
function normalizeLink(raw) {
  const href = typeof raw.href === "string" ? raw.href.trim() : "";
  const label = typeof raw.label === "string" ? raw.label.trim() : "";
  if (!href && !label) return null;
  const link = {
    type: "link",
    label,
    href: href || "#"
  };
  if (typeof raw.linkClassName === "string") link.linkClassName = raw.linkClassName;
  if (typeof raw.spanClassName === "string") link.spanClassName = raw.spanClassName;
  if (typeof raw.external === "boolean") link.external = raw.external;
  return link;
}
function normalizeGroup(raw, depth, maxDepth) {
  const label = typeof raw.label === "string" ? raw.label.trim() : "";
  const rawChildren = raw.children;
  const arr = Array.isArray(rawChildren) ? rawChildren : [];
  const children = normalizeNavTreeInner(arr, depth + 1, maxDepth);
  if (children.length === 0) return null;
  return {
    type: "group",
    label: label || "More",
    children
  };
}
function navNodeType(raw) {
  const t = raw.type;
  if (typeof t === "string") return t.trim().toLowerCase();
  return null;
}
function unwrapRootNavArray(data) {
  if (Array.isArray(data)) return data;
  if (!isPlainRecord(data)) return [];
  const keys = ["items", "children", "mainNavItems", "nav", "navigation", "data"];
  for (const k of keys) {
    const v = data[k];
    if (Array.isArray(v)) return v;
  }
  return [];
}
function normalizeNavTreeInner(items, depth, maxDepth) {
  if (depth > maxDepth) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn("[normalizeNavTree] maxDepth exceeded; deeper nodes dropped.");
    }
    return [];
  }
  const list = depth === 0 ? unwrapRootNavArray(items) : Array.isArray(items) ? items : [];
  if (!Array.isArray(list)) return [];
  const out = [];
  for (const raw of list) {
    if (!isPlainRecord(raw)) continue;
    const t = navNodeType(raw);
    if (t === "link") {
      const link = normalizeLink(raw);
      if (link) out.push(link);
      continue;
    }
    if (t === "group") {
      const group = normalizeGroup(raw, depth, maxDepth);
      if (group) out.push(group);
      continue;
    }
  }
  return out;
}
function normalizeNavTree(items, options) {
  const maxDepth = options?.maxDepth ?? 32;
  return normalizeNavTreeInner(items, 0, maxDepth);
}
function isNavLinkItem(item) {
  return item.type === "link";
}
function isNavGroupItem(item) {
  return item.type === "group";
}

// src/navigation/navTreeKeys.ts
function navTreeItemKey(item, segments) {
  const prefix = segments.join("_");
  if (!isNavGroupItem(item)) {
    return `${prefix}|L|${item.label}|${item.href}`;
  }
  return `${prefix}|G|${item.label}|${item.children.length}`;
}

// src/components/DesktopMainNav.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function NavLinkLi({ item }) {
  const { href, external } = getNavLinkAttrs(item, "DesktopMainNav");
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
    "a",
    {
      className: item.linkClassName ?? "fontchange14",
      href,
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: item.spanClassName ? /* @__PURE__ */ jsx("span", { className: item.spanClassName, children: item.label }) : /* @__PURE__ */ jsx("span", { children: item.label })
    }
  ) });
}
function NavLinkInline({ item }) {
  const { href, external } = getNavLinkAttrs(item, "DesktopMainNav");
  return /* @__PURE__ */ jsx(
    "a",
    {
      className: item.linkClassName ?? "fontchange14",
      href,
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: item.spanClassName ? /* @__PURE__ */ jsx("span", { className: item.spanClassName, children: item.label }) : /* @__PURE__ */ jsx("span", { children: item.label })
    }
  );
}
function NavDropdownChild({
  item,
  segments,
  nestedOpenKey,
  setNestedOpenKey
}) {
  const myKey = navTreeItemKey(item, segments);
  if (!isNavGroupItem(item)) {
    return /* @__PURE__ */ jsx(NavLinkInline, { item });
  }
  const isOpen = nestedOpenKey === myKey;
  const handleClick = (e) => {
    e.preventDefault();
    setNestedOpenKey(isOpen ? null : myKey);
  };
  const handleMouseLeave = React.useCallback(() => {
    if (isOpen) {
      setNestedOpenKey(null);
    }
  }, [isOpen, setNestedOpenKey]);
  return /* @__PURE__ */ jsxs("div", { className: `dropdown_evnt_prog ${isOpen ? "active" : ""}`, onMouseLeave: handleMouseLeave, children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: "dropevent", onClick: handleClick, children: [
      item.label,
      " ",
      /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-down", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "dropevent_content", role: "menu", style: { display: isOpen ? "block" : "none" }, children: [
      /* @__PURE__ */ jsx("i", { className: "fa fa-caret-up", "aria-hidden": "true" }),
      item.children.map((child, i) => {
        const childSegments = [...segments, i];
        return /* @__PURE__ */ jsx(
          NavDropdownChild,
          {
            item: child,
            segments: childSegments,
            nestedOpenKey,
            setNestedOpenKey
          },
          navTreeItemKey(child, childSegments)
        );
      })
    ] })
  ] });
}
function DropdownLi({
  item,
  segments,
  openTopKey,
  setOpenTopKey,
  topMenuKey
}) {
  const [nestedOpenKey, setNestedOpenKey] = React.useState(null);
  const isOpenTop = openTopKey === topMenuKey;
  React.useEffect(() => {
    if (!isOpenTop) {
      setNestedOpenKey(null);
    }
  }, [isOpenTop]);
  const handleClick = (e) => {
    e.preventDefault();
    setOpenTopKey(isOpenTop ? null : topMenuKey);
  };
  const handleMouseLeave = React.useCallback(() => {
    if (isOpenTop) {
      setOpenTopKey(null);
    }
  }, [isOpenTop, setOpenTopKey]);
  return /* @__PURE__ */ jsx("li", { role: "presentation", children: /* @__PURE__ */ jsxs("div", { className: `dropdown_evnt_prog ${isOpenTop ? "active" : ""}`, onMouseLeave: handleMouseLeave, children: [
    /* @__PURE__ */ jsxs("button", { type: "button", className: "dropevent", onClick: handleClick, children: [
      item.label,
      " ",
      /* @__PURE__ */ jsx("i", { className: "fa fa-chevron-down", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "dropevent_content", role: "menu", style: { display: isOpenTop ? "block" : "none" }, children: [
      /* @__PURE__ */ jsx("i", { className: "fa fa-caret-up", "aria-hidden": "true" }),
      item.children.map((child, i) => {
        const childSegments = [...segments, i];
        return /* @__PURE__ */ jsx(
          NavDropdownChild,
          {
            item: child,
            segments: childSegments,
            nestedOpenKey,
            setNestedOpenKey
          },
          navTreeItemKey(child, childSegments)
        );
      })
    ] })
  ] }) });
}
function TopItem({
  item,
  segments,
  openTopKey,
  setOpenTopKey
}) {
  if (!isNavGroupItem(item)) {
    return /* @__PURE__ */ jsx(NavLinkLi, { item });
  }
  return /* @__PURE__ */ jsx(
    DropdownLi,
    {
      item,
      segments,
      openTopKey,
      setOpenTopKey,
      topMenuKey: navTreeItemKey(item, segments)
    }
  );
}
var DesktopMainNav = ({ items }) => {
  const tree = React.useMemo(() => normalizeNavTree(items), [items]);
  const [openTopKey, setOpenTopKey] = React.useState(null);
  return /* @__PURE__ */ jsx("ul", { className: "menu_nav1", children: tree.map((item, index) => {
    const segments = [index];
    return /* @__PURE__ */ jsx(
      TopItem,
      {
        item,
        segments,
        openTopKey,
        setOpenTopKey
      },
      navTreeItemKey(item, segments)
    );
  }) });
};

// src/components/header/HeaderBrandLogos.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function HeaderBrandLogos({ cdn, layout }) {
  const yas = resolveCdnAssetUrl(cdn, "assets/img/yuva_landing/YASLogo_opt_2x.png");
  const mb = resolveCdnAssetUrl(cdn, "assets/img/yuva_landing/mybharatlogo_opt_2x.png");
  if (layout === "mobile") {
    const mobileLogoStyle = { width: 70, maxWidth: 70, height: "auto" };
    return /* @__PURE__ */ jsxs2("div", { className: "d-flex new_head align-items-center", children: [
      /* @__PURE__ */ jsx2("a", { href: "/", children: /* @__PURE__ */ jsx2("img", { src: yas, className: "new_head1 logo-w-sm-md1", alt: "", style: mobileLogoStyle }) }),
      /* @__PURE__ */ jsx2("span", { className: "d-inline-flex align-items-center", children: /* @__PURE__ */ jsx2("a", { href: "/", children: /* @__PURE__ */ jsx2("img", { src: mb, className: "logo-w-sm-md-sec", alt: "MY Bharat", style: mobileLogoStyle }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxs2("div", { className: "d-flex new_head", children: [
    /* @__PURE__ */ jsx2("a", { href: "/", children: /* @__PURE__ */ jsx2("img", { src: yas, className: "new_head1 logo-w-sm-md1", alt: "" }) }),
    /* @__PURE__ */ jsx2("span", { style: { display: "inline-flex" }, children: /* @__PURE__ */ jsx2("a", { href: "/", children: /* @__PURE__ */ jsx2("img", { src: mb, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }) })
  ] });
}

// src/components/header/HeaderGovernmentStrip.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function HeaderGovernmentStrip({ cdn }) {
  return /* @__PURE__ */ jsx3("div", { className: "header-top d-none d-sm-block ", children: /* @__PURE__ */ jsx3("div", { className: "container", children: /* @__PURE__ */ jsxs3("div", { className: "row", children: [
    /* @__PURE__ */ jsx3("div", { className: "col-xl-3 col-lg-3 d-flex col-sm-4 col-6 align-items-center", children: /* @__PURE__ */ jsxs3("a", { href: "https://www.india.gov.in/", target: "_blank", rel: "noreferrer", className: "goi", children: [
      /* @__PURE__ */ jsx3(
        "img",
        {
          src: resolveCdnAssetUrl(cdn, "assets/img/mybharat/Flag%20of%20India.png"),
          className: "cursor",
          alt: ""
        }
      ),
      /* @__PURE__ */ jsx3("strong", { className: "gov_india", children: "Government of India" })
    ] }) }),
    /* @__PURE__ */ jsx3("div", { className: "col-xl-9 col-lg-9 col-sm-8 col-6 text-end", children: /* @__PURE__ */ jsxs3("span", { className: " d-none d-md-inline", children: [
      /* @__PURE__ */ jsx3("button", { type: "button", id: "decreasetext", className: "font01", "aria-label": "Decrease text size", children: "-A" }),
      /* @__PURE__ */ jsx3("button", { type: "button", id: "resettext", className: "font01 active01", "aria-label": "Reset text size", children: "A" }),
      /* @__PURE__ */ jsx3("button", { type: "button", id: "increasetext", className: "font01", "aria-label": "Increase text size", children: "A+" }),
      /* @__PURE__ */ jsx3("span", { className: "partition", children: "| \xA0" }),
      /* @__PURE__ */ jsx3("a", { href: "tel:18002122729", title: "Toll Free", className: "skip01", children: "Toll Free : 14472 Or 18002122729" }),
      /* @__PURE__ */ jsx3("span", { className: "partition", children: "| \xA0" }),
      /* @__PURE__ */ jsx3("a", { href: "/pages/support", className: "skip01", children: "support.mybharat.gov.in" }),
      /* @__PURE__ */ jsx3("span", { className: "partition", children: "| \xA0" }),
      /* @__PURE__ */ jsx3("span", { id: "bhashini-desktop-header" })
    ] }) })
  ] }) }) });
}

// src/components/header/HeaderMobileStrip.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var stripClasses = {
  split: {
    bar: "mb-common-header__mobile-bar mb-common-header__mobile-bar--split",
    row: "mb-common-header__mobile-row mb-common-header__mobile-row--split d-flex align-items-center flex-nowrap w-100 py-2",
    logos: "mb-common-header__mobile-logos mb-common-header__mobile-logos--split min-w-0 d-flex align-items-center",
    actions: "mb-common-header__mobile-actions--split d-sm-none1 d-flex flex-nowrap align-items-center justify-content-end flex-shrink-0 min-w-0",
    mid: "mb-common-header__mobile-mid--split d-flex flex-nowrap align-items-center justify-content-center flex-shrink-0 min-w-0",
    tollLink: "skip01",
    end: "mb-common-header__mobile-end--split d-flex align-items-center justify-content-end flex-shrink-0 min-w-0",
    menuBtn: "btn btn-light"
  },
  h2: {
    bar: "mb-common-header__mobile-bar mb-common-header__mobile-bar--h2",
    row: "mb-common-header__mobile-row mb-common-header__mobile-row--h2 d-flex align-items-center flex-nowrap w-100 py-2",
    logos: "mb-common-header__mobile-logos mb-common-header__mobile-logos--h2 min-w-0 d-flex align-items-center",
    actions: "mb-common-header__mobile-actions--h2 d-sm-none1 d-flex flex-nowrap align-items-center justify-content-end flex-shrink-0 min-w-0",
    mid: "mb-common-header__mobile-mid--h2 d-flex flex-nowrap align-items-center justify-content-center flex-shrink-0 min-w-0",
    tollLink: "skip01 mb-common-header__toll-link--h2",
    end: "mb-common-header__mobile-end--h2 d-flex align-items-center justify-content-end flex-shrink-0 min-w-0",
    menuBtn: "btn mb-common-header__mobile-menu-btn--h2"
  }
};
function HeaderMobileStrip({ cdn, variant }) {
  const s = stripClasses[variant];
  const tollLink = /* @__PURE__ */ jsx4("a", { href: "tel:18002122729", title: "Toll Free", id: "toll_mb", className: s.tollLink, children: /* @__PURE__ */ jsxs4("strong", { className: "lang_toll_free", children: [
    /* @__PURE__ */ jsx4(
      "i",
      {
        className: "fa fa-phone mb-common-header__toll-phone-icon",
        "aria-hidden": "true",
        style: { transform: variant === "h2" ? "rotate(180deg)" : "rotate(0deg)" }
      }
    ),
    " ",
    "14472 Or 18002122729"
  ] }) });
  const bhashiniSlot = /* @__PURE__ */ jsx4("div", { id: "bhashini-mobile-header" });
  const menuButton = /* @__PURE__ */ jsx4(
    "button",
    {
      type: "button",
      className: s.menuBtn,
      "data-bs-toggle": "modal",
      id: "mb_menus",
      "data-bs-target": "#mobileMenuNew",
      "aria-label": "Open menu",
      children: /* @__PURE__ */ jsx4("i", { className: "fa fa-bars fa-fw ", "aria-hidden": "true" })
    }
  );
  return /* @__PURE__ */ jsx4("div", { className: `col-12 d-lg-none ${s.bar}`, children: /* @__PURE__ */ jsxs4("div", { className: s.row, children: [
    /* @__PURE__ */ jsx4("div", { className: s.logos, children: /* @__PURE__ */ jsx4(HeaderBrandLogos, { cdn, layout: "mobile" }) }),
    s.actions ? /* @__PURE__ */ jsxs4("div", { className: s.actions, children: [
      tollLink,
      bhashiniSlot,
      menuButton
    ] }) : /* @__PURE__ */ jsxs4(Fragment, { children: [
      /* @__PURE__ */ jsxs4("div", { className: s.mid, children: [
        tollLink,
        bhashiniSlot
      ] }),
      /* @__PURE__ */ jsx4("div", { className: s.end, children: menuButton })
    ] })
  ] }) });
}

// src/components/header/useMbHeaderBootstrapAndPortal.ts
import { useEffect, useState } from "react";
function useMbHeaderBootstrapAndPortal(_cdn) {
  const [menuPortalReady, setMenuPortalReady] = useState(false);
  useEffect(() => {
    setMenuPortalReady(true);
  }, []);
  return menuPortalReady;
}

// src/components/MobileMenuModal.tsx
import React3 from "react";

// src/components/header/login/bootstrapModal.ts
function getBootstrapModal() {
  return typeof window !== "undefined" && window.bootstrap?.Modal;
}
var BOOTSTRAP_WAIT_MS = 8e3;
var BOOTSTRAP_POLL_MS = 50;
function whenElementReady(id, onReady) {
  if (document.getElementById(id)) {
    onReady();
    return;
  }
  const started = Date.now();
  const timer = window.setInterval(() => {
    if (document.getElementById(id)) {
      window.clearInterval(timer);
      onReady();
      return;
    }
    if (Date.now() - started >= BOOTSTRAP_WAIT_MS) {
      window.clearInterval(timer);
    }
  }, BOOTSTRAP_POLL_MS);
}
function whenBootstrapReady(onReady) {
  if (getBootstrapModal()) {
    onReady();
    return;
  }
  const started = Date.now();
  const timer = window.setInterval(() => {
    if (getBootstrapModal()) {
      window.clearInterval(timer);
      onReady();
      return;
    }
    if (Date.now() - started >= BOOTSTRAP_WAIT_MS) {
      window.clearInterval(timer);
    }
  }, BOOTSTRAP_POLL_MS);
}
function showBootstrapModal(id, options) {
  const tryShow = () => {
    const el = document.getElementById(id);
    const Modal2 = getBootstrapModal();
    if (!el || !Modal2) return false;
    Modal2.getOrCreateInstance(el, options).show();
    return true;
  };
  if (tryShow()) return;
  const attemptShow = () => {
    if (tryShow()) return;
    whenBootstrapReady(tryShow);
  };
  if (document.getElementById(id)) {
    whenBootstrapReady(tryShow);
  } else {
    whenElementReady(id, attemptShow);
  }
}
function cleanupOrphanModalBackdrop() {
  if (typeof document === "undefined") return;
  const visibleModals = document.querySelectorAll(".modal.show");
  if (visibleModals.length > 0) return;
  document.querySelectorAll(".modal-backdrop").forEach((node) => node.remove());
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
}
function hideBootstrapModal(id) {
  const el = document.getElementById(id);
  const Modal2 = getBootstrapModal();
  if (!el) return;
  if (Modal2) {
    const instance = Modal2.getInstance(el) ?? Modal2.getOrCreateInstance(el);
    instance.hide();
  } else {
    el.classList.remove("show");
    el.setAttribute("aria-hidden", "true");
    el.removeAttribute("aria-modal");
    el.style.display = "none";
  }
  window.setTimeout(cleanupOrphanModalBackdrop, 350);
}
function switchBootstrapModal(fromId, toId, delayMs = 0) {
  hideBootstrapModal(fromId);
  window.setTimeout(() => showBootstrapModal(toId, { backdrop: "static", keyboard: false }), delayMs);
}

// src/config/messages.ts
var DEFAULT_API_ERROR_MESSAGE = "Something went wrong!!! Plz try again later.";
var OTP_MESSAGES = {
  invalid: "Please enter valid OTP.",
  required: "Please enter OTP",
  sixDigits: "Please enter 6 digit OTP",
  maxAttempts: "You have reached maximum limit to verify OTP. Please try again after sometime.",
  sendFailed: "Failed to send OTP"
};

// src/components/header/login/loginApiErrorMessage.ts
var DEFAULT_API_ERROR_MESSAGE2 = DEFAULT_API_ERROR_MESSAGE;
var TECHNICAL_ERROR_PATTERNS = [
  /fetch failed/i,
  /ECONNREFUSED/i,
  /ENOTFOUND/i,
  /network error/i,
  /Host proxy must map/i,
  /Login is not configured/i,
  /internal auth proxy routes/i,
  /wrong token type/i
];
function isApiSuccessStatus(statusCode) {
  if (statusCode == null || statusCode === "") return false;
  const code = typeof statusCode === "string" ? Number(statusCode) : statusCode;
  return code === 200 || code === 201;
}
function readTrimmedString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}
function collectErrorStrings(node, depth = 0) {
  if (node == null || depth > 6) return [];
  const parts = [];
  if (typeof node === "string") {
    const trimmed = node.trim();
    if (trimmed && !trimmed.startsWith("{") && !trimmed.startsWith("[")) {
      parts.push(trimmed);
    }
    return parts;
  }
  if (typeof node !== "object") return parts;
  const obj = node;
  for (const key of ["error_description", "error", "message", "detail", "description"]) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) parts.push(value.trim());
  }
  for (const key of ["keycloak", "data", "message", "response", "result"]) {
    parts.push(...collectErrorStrings(obj[key], depth + 1));
  }
  return parts;
}
function resolveApiErrorMessage(res, fallback = DEFAULT_API_ERROR_MESSAGE2) {
  if (!res || typeof res !== "object") return fallback;
  const direct = readTrimmedString(res.error_description) || readTrimmedString(res.keycloak?.error_description) || readTrimmedString(res.error) || readTrimmedString(res.keycloak?.error);
  if (direct && direct !== "invalid_grant") return direct;
  const message = res.message;
  if (typeof message === "string" && message.trim()) return message.trim();
  const collected = collectErrorStrings(res);
  const description = collected.find((part) => part.includes(" ") && part.length > 8);
  if (description) return description;
  if (collected.includes("invalid_grant")) {
    return "Invalid user credentials";
  }
  if (collected.length) return collected[0];
  return fallback;
}
function sanitizeUserFacingError(message, fallback = DEFAULT_API_ERROR_MESSAGE2) {
  const trimmed = message.trim();
  if (!trimmed) return fallback;
  if (TECHNICAL_ERROR_PATTERNS.some((pattern) => pattern.test(trimmed))) {
    return fallback;
  }
  return trimmed;
}
function resolveUserFacingApiError(res, fallback = DEFAULT_API_ERROR_MESSAGE2) {
  return sanitizeUserFacingError(resolveApiErrorMessage(res, fallback), fallback);
}
function hasOAuthFailure(res) {
  if (!res || typeof res !== "object") return false;
  if (readTrimmedString(res.keycloak?.error)) return true;
  if (readTrimmedString(res.error) && !readTrimmedString(res.access_token)) return true;
  return false;
}
function inferApiStatusCode(res, httpStatus) {
  if (res.status_code != null && res.status_code !== "" && !isApiSuccessStatus(res.status_code)) {
    return res.status_code;
  }
  const oauthError = readTrimmedString(res.keycloak?.error) || readTrimmedString(res.error);
  if (oauthError === "invalid_grant") return 401;
  if (oauthError) return 400;
  if (httpStatus != null && httpStatus >= 400) return httpStatus;
  return res.status_code;
}
function normalizeApiResponse(parsed, httpStatus) {
  const next = { ...parsed };
  if (next.status_code == null || next.status_code === "") {
    next.status_code = inferApiStatusCode(next, httpStatus) ?? (httpStatus >= 400 ? httpStatus : httpStatus);
  }
  if (hasOAuthFailure(next) && isApiSuccessStatus(next.status_code)) {
    next.status_code = inferApiStatusCode(next, httpStatus) ?? 401;
  }
  if (!isApiSuccessStatus(next.status_code) && httpStatus >= 400) {
    next.status_code = httpStatus;
  }
  return next;
}
function resolveLoginFlowError(error, fallback = DEFAULT_API_ERROR_MESSAGE2) {
  if (error instanceof Error) {
    return resolveUserFacingApiError({ message: error.message }, fallback);
  }
  return fallback;
}

// src/config/apiPaths.ts
var GATEWAY_PATHS = {
  getKeycloakClientAccessToken: "/getKeycloakClientAccessToken",
  oauth: "/oauth",
  keycloakLogin: "/keycloakLogin",
  verifyGuestUserOtp: "/verifyGuestUserOtp",
  keycloakChangePassword: "/keycloakChangePassword",
  checkUserExists: "/checkUserExists",
  sendMobileGuestUserOtp: "/sendMobileGuestUserOtp",
  keycloakGetExchangeToken: "/keycloakGetExchangeToken",
  keycloakForgotPassword: "/keycloakForgotPassword",
  saveFeedbackData: "/saveFeedbackData",
  triggerYouthReward: "/trigger-youth-reward-points"
};
var INTERNAL_PATHS = {
  proxyDefault: "/mybharat-shell-api"
};
var PROXY_REWRITES = {
  kcClient: "/api/getKeycloakClientAccessToken",
  guestOauth: "/api/oauth",
  apiPrefix: "/api"
};
var PORTAL_PATHS = {
  establishSession: "/establish_session"
};
var DEV_API_PROXY_PREFIXES = {
  feedback: "/api",
  rewards: "/rewards-api"
};

// src/config/resolveBrowserApiBaseUrl.ts
var loggedSameOriginRewrite = false;
function logSameOriginRewrite(from, to) {
  if (loggedSameOriginRewrite) return;
  loggedSameOriginRewrite = true;
  console.info(
    `[mybharat_common_frontend] sameOriginApi: "${from}" \u2192 "${to}". Host must proxy /api to APIGateway (Vite or CakePHP).`
  );
}
function resolveBrowserApiBaseUrl(configured) {
  const trimmed = configured?.trim().replace(/\/$/, "") ?? "";
  if (!trimmed) return "";
  if (typeof window === "undefined") return trimmed;
  const login = window.MYBHARAT_SHELL?.login;
  if (login?.sameOriginApi !== true) return trimmed;
  if (!/^https?:\/\//i.test(trimmed)) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (parsed.origin === window.location.origin) return trimmed;
    const apiPath = parsed.pathname.replace(/\/$/, "") || "/api";
    if (apiPath === "/api" || apiPath.endsWith("/api")) {
      logSameOriginRewrite(trimmed, apiPath);
      return apiPath;
    }
  } catch {
    return trimmed;
  }
  return trimmed;
}

// src/components/header/login/shellLoginGateway.ts
var ShellGatewayAuthError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ShellGatewayAuthError";
  }
};
var cachedKeycloakClientToken = null;
var keycloakClientTokenPromise = null;
var cachedGuestOauthToken = null;
function clearShellInternalKcAuthCache() {
  cachedKeycloakClientToken = null;
  keycloakClientTokenPromise = null;
}
function clearShellInternalAuthCache() {
  clearShellInternalKcAuthCache();
  cachedGuestOauthToken = null;
}
function readApiBaseUrl() {
  const fromShell = window.MYBHARAT_SHELL?.login?.apiBaseUrl?.trim();
  if (fromShell) return resolveBrowserApiBaseUrl(fromShell);
  const fromHeader = document.querySelector("mybharat-header")?.getAttribute("api-base-url")?.trim();
  if (fromHeader) return resolveBrowserApiBaseUrl(fromHeader);
  const fromMeta = document.querySelector('meta[name="mybharat-shell-api-base-url"]')?.getAttribute("content")?.trim();
  return fromMeta ? resolveBrowserApiBaseUrl(fromMeta) : "";
}
function buildGatewayUrl(path) {
  const base = readApiBaseUrl();
  if (!base) {
    throw new ShellGatewayAuthError("Api Base Url is not configured");
  }
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
function normalizeBearerAccessToken(raw) {
  if (!raw) return "";
  return raw.trim().replace(/^bearer\s+/i, "").trim();
}
function readAccessTokenField(value) {
  if (typeof value !== "string") return void 0;
  const token = normalizeBearerAccessToken(value);
  return token || void 0;
}
function readAccessTokenFromNode(node, depth = 0) {
  if (node == null || depth > 5) return void 0;
  if (typeof node === "string") {
    const trimmed = node.trim();
    if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return void 0;
    try {
      return readAccessTokenFromNode(JSON.parse(trimmed), depth + 1);
    } catch {
      return void 0;
    }
  }
  if (typeof node !== "object") return void 0;
  const obj = node;
  const direct = readAccessTokenField(obj.access_token) ?? readAccessTokenField(obj.accessToken);
  if (direct) return direct;
  for (const key of ["data", "message", "response", "result"]) {
    const nested = readAccessTokenFromNode(obj[key], depth + 1);
    if (nested) return nested;
  }
  return void 0;
}
function readAccessTokenFromResponse(data) {
  const root = readAccessTokenField(data.access_token) ?? readAccessTokenField(data.accessToken);
  if (root) return root;
  return readAccessTokenFromNode(data.data) ?? readAccessTokenFromNode(data.message) ?? readAccessTokenFromNode(data);
}
function decodeJwtHeaderAlg(token) {
  try {
    const parts = token.split(".");
    if (parts.length < 1) return "";
    const base64 = parts[0].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
    const header = JSON.parse(atob(padded));
    return header.alg ?? "";
  } catch {
    return "";
  }
}
async function parseGatewayJson(res) {
  const text = await res.text();
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return normalizeApiResponse(
        { status_code: res.status, data: parsed },
        res.status
      );
    }
    return normalizeApiResponse(parsed, res.status);
  } catch {
    return { status_code: res.ok ? 200 : res.status, message: DEFAULT_API_ERROR_MESSAGE2 };
  }
}
function readOauthCredentials() {
  const login = window.MYBHARAT_SHELL?.login;
  return {
    username: login?.oauthUsername?.trim() ?? "",
    password: login?.oauthPassword?.trim() ?? ""
  };
}
async function fetchInternalKeycloakClientAccessToken(forceRefresh = false) {
  if (forceRefresh) clearShellInternalKcAuthCache();
  if (cachedKeycloakClientToken) return cachedKeycloakClientToken;
  if (keycloakClientTokenPromise) return keycloakClientTokenPromise;
  keycloakClientTokenPromise = (async () => {
    let res;
    try {
      res = await fetch(buildGatewayUrl(GATEWAY_PATHS.getKeycloakClientAccessToken), {
        method: "POST",
        credentials: "omit",
        headers: { Accept: "application/json" }
      });
    } catch {
      throw new ShellGatewayAuthError(DEFAULT_API_ERROR_MESSAGE2);
    }
    const data = await parseGatewayJson(res);
    const token = readAccessTokenFromResponse(data);
    if (!token) {
      throw new ShellGatewayAuthError(resolveUserFacingApiError(data));
    }
    if (decodeJwtHeaderAlg(token) !== "RS256") {
      throw new ShellGatewayAuthError("Keycloak client token has unexpected format.");
    }
    cachedKeycloakClientToken = token;
    return token;
  })();
  try {
    return await keycloakClientTokenPromise;
  } catch (err) {
    cachedKeycloakClientToken = null;
    keycloakClientTokenPromise = null;
    throw err;
  } finally {
    if (cachedKeycloakClientToken) keycloakClientTokenPromise = null;
  }
}
async function fetchInternalGuestOauthAccessToken(forceRefresh = false) {
  if (forceRefresh) cachedGuestOauthToken = null;
  if (cachedGuestOauthToken) return cachedGuestOauthToken;
  const { username, password } = readOauthCredentials();
  if (!username || !password) {
    throw new ShellGatewayAuthError(
      "Guest OAuth is not configured. Set MYBHARAT_SHELL.login.oauthUsername and oauthPassword."
    );
  }
  let res;
  try {
    res = await fetch(buildGatewayUrl(GATEWAY_PATHS.oauth), {
      method: "POST",
      credentials: "omit",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      body: new URLSearchParams({ username, password }).toString()
    });
  } catch {
    throw new ShellGatewayAuthError(DEFAULT_API_ERROR_MESSAGE2);
  }
  const data = await parseGatewayJson(res);
  const token = readAccessTokenFromResponse(data);
  if (!token) {
    throw new ShellGatewayAuthError(resolveUserFacingApiError(data));
  }
  cachedGuestOauthToken = token;
  return token;
}

// src/config/auth.ts
var AUTH_CONFIG = {
  cookieNames: {
    token: "token",
    tokenEssays: "token_essays",
    encryptId: "encryptId",
    essayRedirectUrl: "essay_redirect_url"
  },
  cookieExpiryMinutes: 1440,
  cookiePath: "/",
  otpResendSeconds: 45,
  otpLength: 6,
  storageKeys: {
    loginData: "loginData",
    regCode: "mybharat_reg_code",
    clientIp: "mybharat_client_ip_address",
    fromQuiz: "fromQuiz",
    fromOrg: "fromOrg",
    quizId: "quizId",
    designForBharat: "design_for_bharat",
    hackForSocial: "hack_for_social_cause",
    fromGamification: "fromGamification",
    userId: "user_id",
    accessibilityFont: "mb-accessibility-font-step"
  },
  excludedProfileMenuUserTypes: /* @__PURE__ */ new Set([11, 12, 13, 14, 50]),
  youthUserType: 6,
  recaptchaLoadTimeoutMs: 15e3
};

// src/components/header/login/authSessionCookies.ts
function readField(obj, ...keys) {
  if (!obj || typeof obj !== "object") return void 0;
  const record = obj;
  for (const key of keys) {
    if (record[key] != null && record[key] !== "") return record[key];
  }
  return void 0;
}
function readString(obj, ...keys) {
  const value = readField(obj, ...keys);
  return value != null ? String(value).trim() : "";
}
function readNestedRecord(obj, ...path) {
  let current = obj;
  for (const key of path) {
    if (!current || typeof current !== "object") return {};
    current = current[key];
  }
  return current && typeof current === "object" && !Array.isArray(current) ? current : {};
}
function readKeycloakNode(res) {
  const data = res.data && typeof res.data === "object" && !Array.isArray(res.data) ? res.data : {};
  const authOutputRecord = readNestedRecord(res, "auth_output");
  const candidates = [
    readNestedRecord(res, "keycloak"),
    readNestedRecord(data, "keycloak"),
    readNestedRecord(authOutputRecord, "keycloak")
  ];
  for (const node of candidates) {
    if (readString(node, "access_token", "accessToken")) return node;
  }
  return candidates.find((node) => Object.keys(node).length > 0) ?? {};
}
function readMbAppTokenFromGatewayResponse(authResponse) {
  if (!authResponse || typeof authResponse !== "object") return "";
  const res = authResponse;
  const data = res.data && typeof res.data === "object" && !Array.isArray(res.data) ? res.data : {};
  const keycloak = readKeycloakNode(res);
  const mbTokenFromField = readString(res, "mb_token", "mbToken", "token") || readString(data, "mb_token", "mbToken", "token") || readString(keycloak, "mb_token", "mbToken");
  if (mbTokenFromField) return mbTokenFromField;
  const keycloakAccessToken = readString(keycloak, "access_token", "accessToken");
  const rootAccessToken = readString(res, "access_token", "accessToken") || readString(data, "access_token", "accessToken");
  if (keycloakAccessToken && rootAccessToken && rootAccessToken !== keycloakAccessToken) {
    return rootAccessToken;
  }
  return rootAccessToken || keycloakAccessToken;
}
function readShellCookieDomain() {
  const configured = window.MYBHARAT_SHELL?.login?.cookieDomain?.trim();
  if (configured) return configured;
  return window.location.hostname;
}
function setMbAuthSessionCookies(tokenValue, options) {
  const value = tokenValue.trim();
  if (!value) return;
  const expiry = new Date(
    Date.now() + AUTH_CONFIG.cookieExpiryMinutes * 60 * 1e3
  ).toUTCString();
  const domain = (options?.cookieDomain ?? readShellCookieDomain()).trim();
  const domainPart = domain ? `;domain=${domain}` : "";
  const names = AUTH_CONFIG.cookieNames;
  document.cookie = `${names.token}=${encodeURIComponent(value)};expires=${expiry};path=${AUTH_CONFIG.cookiePath}${domainPart}`;
  document.cookie = `${names.tokenEssays}=${encodeURIComponent(value)};expires=${expiry};path=${AUTH_CONFIG.cookiePath}${domainPart}`;
}

// src/components/header/login/establishSessionForm.ts
function resolveEstablishSessionAction(baseUrl) {
  const base = baseUrl.trim().replace(/\/$/, "");
  if (!base) return PORTAL_PATHS.establishSession;
  return `${base}${PORTAL_PATHS.establishSession}`;
}
function submitEstablishSessionForm(params) {
  const mbToken = readMbAppTokenFromGatewayResponse(params.authResponse);
  if (mbToken) {
    setMbAuthSessionCookies(mbToken, { cookieDomain: params.cookieDomain });
  }
  const form = document.createElement("form");
  form.method = "POST";
  form.action = resolveEstablishSessionAction(params.baseUrl);
  form.style.display = "none";
  form.acceptCharset = "UTF-8";
  const fields = {
    flow: params.flow,
    username: params.username.trim(),
    auth_response: JSON.stringify(params.authResponse ?? {})
  };
  if (params.flow === "registration") {
    fields.qualification = String(params.qualification ?? "");
    fields.sports_area = String(params.sportsArea ?? "");
    fields.is_outside_india = params.isOutsideIndia ? "1" : "";
    fields.country_id = String(params.countryId ?? "");
  }
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

// src/components/header/login/loginWithOtpFlow.ts
var DEFAULT_ERROR = DEFAULT_API_ERROR_MESSAGE2;
var REG_CODE_STORAGE_KEY = AUTH_CONFIG.storageKeys.regCode;
function isLoginOtpRedirectResult(res) {
  return "redirecting" in res && res.redirecting === true;
}
function isSuccessStatus(statusCode) {
  return isApiSuccessStatus(statusCode);
}
function readLoginFetchBase() {
  const shell = window.MYBHARAT_SHELL?.login;
  const direct = shell?.apiBaseUrl?.trim().replace(/\/$/, "") || document.querySelector("mybharat-header")?.getAttribute("api-base-url")?.trim().replace(/\/$/, "") || "";
  return resolveBrowserApiBaseUrl(direct);
}
function apiUrl(path) {
  const base = readLoginFetchBase();
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
function readPagesBaseUrl() {
  const fromShell = window.MYBHARAT_SHELL?.login?.baseUrl?.trim();
  if (fromShell) return fromShell.replace(/\/$/, "");
  const fromHeader = document.querySelector("mybharat-header")?.getAttribute("login-base-url")?.trim();
  return fromHeader ? fromHeader.replace(/\/$/, "") : "";
}
async function parseJsonResponse(res, text) {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return normalizeApiResponse(
        { status_code: res.status, data: parsed },
        res.status
      );
    }
    return normalizeApiResponse(parsed, res.status);
  } catch {
    return {
      status_code: res.ok ? 200 : res.status,
      message: DEFAULT_ERROR
    };
  }
}
async function postGatewayJson(path, body, bearerToken) {
  const headers = {
    "Content-Type": "Application/json",
    Accept: "Application/json"
  };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken.replace(/^bearer\s+/i, "").trim()}`;
  }
  let res;
  try {
    res = await fetch(apiUrl(path), {
      method: "POST",
      credentials: "omit",
      headers,
      body: JSON.stringify(body)
    });
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  return parseJsonResponse(res, await res.text());
}
function readField2(obj, ...keys) {
  if (!obj || typeof obj !== "object") return void 0;
  const record = obj;
  for (const key of keys) {
    if (record[key] != null && record[key] !== "") return record[key];
  }
  return void 0;
}
function readString2(obj, ...keys) {
  const value = readField2(obj, ...keys);
  return value != null ? String(value) : "";
}
function unwrapDataNode(response) {
  const data = response.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data;
  }
  return {};
}
function storeRegCodeFromVerifyResponse(verify) {
  const regCode = verify.reg_code?.trim();
  if (!regCode) return;
  try {
    sessionStorage.setItem(REG_CODE_STORAGE_KEY, regCode);
  } catch {
  }
}
function readStoredRegCode() {
  try {
    return sessionStorage.getItem(REG_CODE_STORAGE_KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}
function clearStoredRegCode() {
  try {
    sessionStorage.removeItem(REG_CODE_STORAGE_KEY);
  } catch {
  }
}
async function fetchClientAccessToken() {
  return fetchInternalKeycloakClientAccessToken();
}
function resolveGatewayError(res, fallback = DEFAULT_ERROR) {
  return resolveUserFacingApiError(res, fallback);
}
function isGatewayAuthSuccess(res) {
  if (hasOAuthFailure(res)) return false;
  if (isSuccessStatus(res.status_code)) return true;
  return Boolean(readMbAppTokenFromGatewayResponse(res));
}
function submitPortalEstablishSession(flow, username, authResponse) {
  const baseUrl = readPagesBaseUrl();
  if (!baseUrl.trim()) {
    assertRequiredClientConfig();
    throw new Error("Portal base URL is not configured for establish_session.");
  }
  submitEstablishSessionForm({
    baseUrl,
    flow,
    username,
    authResponse,
    cookieDomain: window.MYBHARAT_SHELL?.login?.cookieDomain?.trim() || void 0
  });
  return { redirecting: true };
}
function resolveExchangeError(res) {
  return resolveGatewayError(res, DEFAULT_ERROR);
}
async function completeLoginWithOtp(username) {
  const regCode = readStoredRegCode();
  if (!regCode) {
    return { status_code: 500, message: "Something went wrong! Please try again." };
  }
  let clientToken;
  try {
    clientToken = await fetchClientAccessToken();
  } catch (err) {
    return { status_code: 500, message: resolveLoginFlowError(err) };
  }
  const exchange = await postGatewayJson(
    GATEWAY_PATHS.keycloakGetExchangeToken,
    { username, reg_code: regCode },
    clientToken
  );
  if (!isGatewayAuthSuccess(exchange)) {
    return {
      status_code: exchange.status_code ?? 401,
      message: resolveExchangeError(exchange)
    };
  }
  clearStoredRegCode();
  return submitPortalEstablishSession("login_otp", username, exchange);
}
async function completePasswordSignIn(username, password) {
  let clientToken;
  try {
    clientToken = await fetchClientAccessToken();
  } catch (err) {
    return { status_code: 500, message: resolveLoginFlowError(err) };
  }
  const loginRes = await postGatewayJson(
    GATEWAY_PATHS.keycloakLogin,
    { username, password },
    clientToken
  );
  if (!isGatewayAuthSuccess(loginRes)) {
    return {
      status_code: inferApiStatusCode(loginRes) ?? loginRes.status_code ?? 401,
      message: resolveGatewayError(loginRes)
    };
  }
  return submitPortalEstablishSession("login_password", username, loginRes);
}
function readAttributeString(attributes, ...keys) {
  if (!attributes || typeof attributes !== "object") return "";
  const record = attributes;
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value) && value.length > 0) {
      const first = value[0];
      if (first != null && String(first).trim()) return String(first).trim();
    }
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}
function readKeycloakForgotPasswordUser(node) {
  if (Array.isArray(node)) {
    for (const item of node) {
      const user = readKeycloakForgotPasswordUser(item);
      if (user?.id) return user;
    }
    return null;
  }
  if (!node || typeof node !== "object") return null;
  const obj = node;
  if (typeof obj.id === "string" && obj.id.trim()) {
    return obj;
  }
  for (const key of ["data", "message", "response", "result", "user"]) {
    const nested = readKeycloakForgotPasswordUser(obj[key]);
    if (nested?.id) return nested;
  }
  return null;
}
function isForgotPasswordGatewaySuccess(response) {
  if (Array.isArray(response) && response.length > 0) return true;
  if (response && typeof response === "object") {
    return isSuccessStatus(response.status_code);
  }
  return false;
}
function isKeycloakChangePasswordSuccess(res) {
  if (isSuccessStatus(res.status_code)) return true;
  if (res.status_code != null && res.status_code !== "" && !isSuccessStatus(res.status_code)) {
    return false;
  }
  const message = res.message;
  if (typeof message !== "string" || !message.trim()) return false;
  const normalized = message.trim().toLowerCase();
  if (normalized.includes("fail") || normalized.includes("error") || normalized.includes("invalid")) {
    return false;
  }
  return normalized.includes("password changed successfully") || normalized.includes("changed successfully") || normalized === "success";
}
function readForgotPasswordIdentity(response) {
  const user = readKeycloakForgotPasswordUser(response) ?? readKeycloakForgotPasswordUser(response?.data) ?? readKeycloakForgotPasswordUser(response?.message);
  if (user?.id) {
    const dlId2 = readAttributeString(user.attributes, "dlId", "dl_id", "DLId") || readString2(user, "dlId", "dl_id");
    return { userId: user.id.trim(), dlId: dlId2 };
  }
  const data = unwrapDataNode(response);
  const userId = readString2(data, "userId", "user_id", "ID", "id") || readString2(response, "userId", "user_id", "ID", "id");
  const dlId = readString2(data, "dlId", "dl_id") || readString2(response, "dlId", "dl_id");
  return { userId, dlId };
}
async function completeForgotPasswordUpdate(identifier, password) {
  const regCode = readStoredRegCode();
  if (!regCode) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  let clientToken;
  try {
    clientToken = await fetchClientAccessToken();
  } catch (err) {
    return { status_code: 500, message: resolveLoginFlowError(err) };
  }
  const forgotRes = await postGatewayJson(
    GATEWAY_PATHS.keycloakForgotPassword,
    { identifier, reg_code: regCode },
    clientToken
  );
  if (!isForgotPasswordGatewaySuccess(forgotRes)) {
    return {
      status_code: forgotRes.status_code ?? 500,
      message: resolveGatewayError(forgotRes)
    };
  }
  const { userId, dlId } = readForgotPasswordIdentity(forgotRes);
  if (!userId || !dlId) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }
  try {
    clientToken = await fetchClientAccessToken();
  } catch (err) {
    return { status_code: 500, message: resolveLoginFlowError(err) };
  }
  const changeRes = await postGatewayJson(
    GATEWAY_PATHS.keycloakChangePassword,
    { userId, dlId, password },
    clientToken
  );
  if (!isKeycloakChangePasswordSuccess(changeRes)) {
    return {
      status_code: changeRes.status_code ?? 500,
      message: resolveGatewayError(changeRes, DEFAULT_ERROR)
    };
  }
  clearStoredRegCode();
  return { status_code: 200, message: "success" };
}

// src/config/routes.ts
var APP_ROUTES = {
  home: "/",
  yuvaRegister: "/yuva_register",
  partnerRegister: "/partner_register",
  youthProfile: "/youth-profile",
  dashboard: "/dashboard",
  quiz: "/quiz",
  support: "/pages/support",
  terms: "/pages/terms_of_use",
  policy: "/pages/policy",
  sitemap: "/sitemap",
  about: "/pages/about_mybharat",
  megaEvents: "/mega_events",
  experientialLearning: "/pages/experiential_learning?mode=I",
  events: "/pages/events",
  podcasts: "/pages/podcasts",
  designForBharat: "/pages/design_for_bharat",
  editPartnerProfile: "users/editpartnerprofile",
  partnerProfile: "reports/partner_profile",
  logout: "users/check_user_logout"
};

// src/config/external.ts
var EXTERNAL_URLS = {
  government: {
    indiaGov: "https://www.india.gov.in/",
    digitalIndia: "https://digitalindia.gov.in/",
    yas: "https://yas.gov.in/"
  },
  support: {
    phones: ["14472", "18002122729"],
    tel: "18002122729",
    label: "support.mybharat.gov.in"
  },
  social: {
    twitter: "https://x.com/MYBharatHQ",
    instagram: "https://www.instagram.com/mybharatgov/",
    facebook: "https://www.facebook.com/mybharathq/",
    linkedin: "https://www.linkedin.com/company/mybharatgov/",
    whatsapp: "https://whatsapp.com/channel/0029VaI9Yoj9WtCA717aAd0h",
    youtube: "https://www.youtube.com/@MyBharatHQ"
  },
  thirdParty: {
    bhashiniScript: "https://translation-plugin.bhashini.co.in/v3/website_translation_utility.js",
    bhashiniLanguages: "en,as,bn,brx,gom,gu,hi,ml,or,pa,te,ur",
    recaptchaApi: "https://www.google.com/recaptcha/api.js",
    ipLookup: [
      "https://api.ipify.org?format=json",
      "https://api64.ipify.org?format=json"
    ],
    cloudflareTrace: "https://www.cloudflare.com/cdn-cgi/trace"
  }
};

// src/components/header/login/headerLoginFlow.ts
var HEADER_LOGIN_SIGN_IN_SELECTORS = "#btnGroupDrop1, #signInLink, #register-login-link, #home-login-link";
var LOGIN_DATA_KEY = AUTH_CONFIG.storageKeys.loginData;
var DEFAULT_LOGIN_API_ERROR = DEFAULT_API_ERROR_MESSAGE2;
var shellLoginApiBaseUrl;
function applyShellLoginApiConfig(apiBaseUrl) {
  const url = apiBaseUrl?.trim();
  if (url) shellLoginApiBaseUrl = resolveBrowserApiBaseUrl(url);
  clearShellInternalAuthCache();
}
var installed = false;
var timeRemainingHeader = AUTH_CONFIG.otpResendSeconds;
var responseCount = 0;
var countdownHeader = null;
var otpLoginSendInFlight = false;
var LoginApiError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "LoginApiError";
  }
};
function loginModalRoot() {
  return document.querySelector(".mb-common-header-login") ?? document;
}
function $(id) {
  const root = loginModalRoot();
  if (root === document) return document.getElementById(id);
  const escaped = typeof CSS !== "undefined" && typeof CSS.escape === "function" ? CSS.escape(id) : id;
  return root.querySelector(`#${escaped}`);
}
function val(id) {
  return ($(id)?.value ?? "").trim();
}
function setVal(id, value) {
  const el = $(id);
  if (el) el.value = value;
}
function setText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}
function isChecked(id) {
  return !!$(id)?.checked;
}
function setChecked(id, checked) {
  const el = $(id);
  if (el) el.checked = checked;
}
function setDisabled(id, disabled) {
  const el = $(id);
  if (el) el.disabled = disabled;
}
function showLoader() {
  const el = $("mb-common-header-loader");
  if (el) el.style.display = "flex";
}
function hideLoader() {
  const el = $("mb-common-header-loader");
  if (el) el.style.display = "none";
}
function validateEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}
function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-+=])[A-Za-z\d@$!%*?&#^()\-+=]{8,15}$/.test(password);
}
function storeLoginIdentifier(identifier) {
  try {
    localStorage.setItem(LOGIN_DATA_KEY, identifier);
  } catch {
  }
}
function readLoginIdentifier() {
  try {
    return localStorage.getItem(LOGIN_DATA_KEY) ?? "";
  } catch {
    return "";
  }
}
function clearLoginStorage() {
  try {
    localStorage.removeItem(LOGIN_DATA_KEY);
    localStorage.removeItem(AUTH_CONFIG.storageKeys.userId);
  } catch {
  }
}
function cookieExists(name) {
  return document.cookie.split(";").some((c) => c.trim().startsWith(`${name}=`));
}
function setAuthCookies(tokenValue, domain, encryptIdValue) {
  const expiry = new Date(
    Date.now() + AUTH_CONFIG.cookieExpiryMinutes * 60 * 1e3
  ).toUTCString();
  const names = AUTH_CONFIG.cookieNames;
  if (!cookieExists(names.token) && !cookieExists(names.tokenEssays)) {
    document.cookie = `${names.token}=${encodeURIComponent(tokenValue)};expires=${expiry};path=/;domain=${domain};`;
    document.cookie = `${names.tokenEssays}=${encodeURIComponent(tokenValue)};expires=${expiry};path=/;domain=${domain};`;
  }
  if (encryptIdValue) {
    document.cookie = `${names.encryptId}=${encodeURIComponent(encryptIdValue)};expires=${expiry};path=/;domain=${domain};`;
  }
}
function resolveFirebaseTrackingUserId(loginRes) {
  const data = loginRes?.data;
  if (data && typeof data === "object") {
    for (const key of ["user_id", "userId", "ID", "id"]) {
      const value = data[key];
      if (value != null && String(value).trim()) return String(value);
    }
  }
  const userData = window.USER_DATA?.ID;
  if (userData != null && String(userData).trim()) return String(userData);
  const fromShell = window.__MYBHARAT_LOGIN_USER_ID__?.trim();
  if (fromShell) return fromShell;
  return "unknown";
}
function tryFirebaseEvent(event, loginRes) {
  const setup = window.setupFirebaseUserAjaxEvents;
  if (typeof setup !== "function") return;
  const rawId = resolveFirebaseTrackingUserId(loginRes);
  const encode = window.encodeIdentifier;
  const trackingId = typeof encode === "function" ? encode(rawId) : rawId;
  setup(event, trackingId);
}
function readShellLoginApiBaseUrl() {
  if (shellLoginApiBaseUrl) return shellLoginApiBaseUrl;
  const fromShellLogin = window.MYBHARAT_SHELL?.login?.apiBaseUrl?.trim();
  if (fromShellLogin) return resolveBrowserApiBaseUrl(fromShellLogin);
  const fromHeader = document.querySelector("mybharat-header")?.getAttribute("api-base-url")?.trim();
  if (fromHeader) return resolveBrowserApiBaseUrl(fromHeader);
  const fromMeta = document.querySelector('meta[name="mybharat-shell-api-base-url"]')?.getAttribute("content")?.trim();
  return fromMeta ? resolveBrowserApiBaseUrl(fromMeta) : "";
}
function readShellLoginFetchBaseUrl() {
  syncShellLoginApiConfigFromDom();
  return readShellLoginApiBaseUrl();
}
function syncShellLoginApiConfigFromDom() {
  const headerEl = document.querySelector("mybharat-header");
  const apiBaseUrl = headerEl?.getAttribute("api-base-url")?.trim();
  const baseUrl = headerEl?.getAttribute("login-base-url")?.trim();
  if (apiBaseUrl) applyShellLoginApiConfig(apiBaseUrl);
  if (!baseUrl && !apiBaseUrl) return;
  window.MYBHARAT_SHELL = {
    ...window.MYBHARAT_SHELL,
    login: {
      ...window.MYBHARAT_SHELL?.login,
      ...baseUrl ? { baseUrl } : {},
      ...apiBaseUrl ? { apiBaseUrl } : {}
    }
  };
}
function buildLoginApiUrl(path) {
  const base = readShellLoginFetchBaseUrl();
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
function getShellApiFetchBaseUrl() {
  syncShellLoginApiConfigFromDom();
  return readShellLoginFetchBaseUrl();
}
function buildShellApiUrl(path) {
  syncShellLoginApiConfigFromDom();
  return buildLoginApiUrl(path);
}
function isSuccessStatus2(statusCode) {
  return isApiSuccessStatus(statusCode);
}
function resolveLoginApiError(res, fallback = DEFAULT_LOGIN_API_ERROR) {
  return resolveUserFacingApiError(res, fallback);
}
function readShellLoginBaseUrl() {
  syncShellLoginApiConfigFromDom();
  const fromShell = window.MYBHARAT_SHELL?.login?.baseUrl?.trim();
  if (fromShell) return fromShell.replace(/\/$/, "");
  const fromHeader = document.querySelector("mybharat-header")?.getAttribute("login-base-url")?.trim();
  return fromHeader ? fromHeader.replace(/\/$/, "") : "";
}
function showLoginFieldError(id, message) {
  setText(id, message);
  const el = $(id);
  if (el) {
    el.style.display = message ? "block" : "none";
    el.setAttribute("role", "alert");
  }
}
function resolveVerifyOtpError(res, fallback = OTP_MESSAGES.invalid) {
  const data = res?.data;
  if (typeof data === "string" && data.trim()) return data.trim();
  if (data && typeof data === "object") {
    const parts = [];
    for (const value of Object.values(data)) {
      if (typeof value === "string" && value.trim()) parts.push(value.trim());
      else if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === "string" && item.trim()) parts.push(item.trim());
        }
      }
    }
    if (parts.length) return parts.join(" ");
  }
  return resolveLoginApiError(res, fallback);
}
function markLoginOtpVerified() {
  setText("otp-field-3_error", "");
  setVal("verify_otp_header", "1");
  timeRemainingHeader = 0;
  if (countdownHeader) clearInterval(countdownHeader);
  document.querySelectorAll(".resend_otp_header").forEach((el) => {
    el.style.display = "none";
  });
  document.querySelectorAll(".otp_timer_header").forEach((el) => {
    el.style.display = "none";
  });
  setDisabled("otp-field-3", true);
  setDisabled("btn-otp-verify-header", true);
}
var LOGIN_API_JSON_CONTENT_TYPE = "Application/json";
var LOGIN_API_FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";
function normalizeBearerAccessToken2(raw) {
  if (!raw) return "";
  let token = raw.trim();
  if (/^bearer\s+/i.test(token)) {
    token = token.replace(/^bearer\s+/i, "").trim();
  }
  return token;
}
function parseLoginApiResponse(res, text) {
  try {
    const parsed = JSON.parse(text);
    return normalizeApiResponse(parsed, res.status);
  } catch {
    if (!res.ok) throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
    return { status_code: res.status, message: DEFAULT_LOGIN_API_ERROR };
  }
}
async function fetchLoginApiFormPost(path, form, bearerAccessToken) {
  syncShellLoginApiConfigFromDom();
  const base = readShellLoginFetchBaseUrl();
  if (!base) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const token = normalizeBearerAccessToken2(bearerAccessToken);
  if (!token) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const url = buildLoginApiUrl(path);
  const headers = new Headers();
  headers.set("Content-Type", LOGIN_API_FORM_CONTENT_TYPE);
  headers.set("Authorization", `Bearer ${token}`);
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      credentials: "omit",
      headers,
      body: new URLSearchParams(form)
    });
  } catch {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const text = await res.text();
  return parseLoginApiResponse(res, text);
}
function buildBearerJsonHeaders(bearerAccessToken) {
  const headers = new Headers();
  headers.set("Content-Type", LOGIN_API_JSON_CONTENT_TYPE);
  headers.set("Accept", LOGIN_API_JSON_CONTENT_TYPE);
  const token = normalizeBearerAccessToken2(bearerAccessToken);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}
async function fetchLoginApiJsonPost(path, body, bearerAccessToken) {
  syncShellLoginApiConfigFromDom();
  const base = readShellLoginFetchBaseUrl();
  if (!base) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const token = normalizeBearerAccessToken2(bearerAccessToken);
  if (!token) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const headers = buildBearerJsonHeaders(token);
  if (!headers.has("Authorization")) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const url = buildLoginApiUrl(path);
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      credentials: "omit",
      headers,
      body: JSON.stringify(body)
    });
  } catch {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }
  const text = await res.text();
  return parseLoginApiResponse(res, text);
}
function isKeycloakUnauthorizedResponse(data) {
  if (!data || typeof data !== "object") return false;
  const obj = data;
  if (obj.status_code === 401 || obj.status_code === "401") return true;
  const err = typeof obj.error === "string" ? obj.error : "";
  return /401|unauthorized/i.test(err);
}
async function getKeycloakClientAccessToken(forceRefresh = false) {
  try {
    return await fetchInternalKeycloakClientAccessToken(forceRefresh);
  } catch (err) {
    if (err instanceof ShellGatewayAuthError) {
      throw new LoginApiError(resolveUserFacingApiError({ message: err.message }));
    }
    throw err;
  }
}
async function getOauthAccessToken(forceRefresh = false) {
  try {
    return await fetchInternalGuestOauthAccessToken(forceRefresh);
  } catch (err) {
    if (err instanceof ShellGatewayAuthError) {
      throw new LoginApiError(resolveUserFacingApiError({ message: err.message }));
    }
    throw err;
  }
}
function readShellClientIpAddress() {
  return window.MYBHARAT_SHELL?.login?.ipAddress?.trim() ?? "";
}
function readClientUserAgent() {
  return typeof navigator !== "undefined" ? navigator.userAgent : "";
}
var CLIENT_IP_SESSION_KEY = AUTH_CONFIG.storageKeys.clientIp;
var cachedClientIpAddress = null;
var clientIpFetchPromise = null;
function readCachedClientIpFromSession() {
  try {
    return sessionStorage.getItem(CLIENT_IP_SESSION_KEY)?.trim() ?? "";
  } catch {
    return "";
  }
}
function storeClientIpCache(ip) {
  cachedClientIpAddress = ip;
  try {
    sessionStorage.setItem(CLIENT_IP_SESSION_KEY, ip);
  } catch {
  }
}
function parseIpFromJsonResponse(data) {
  if (!data || typeof data !== "object") return void 0;
  const obj = data;
  for (const key of ["ip", "ipAddress", "query", "ip_address"]) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return void 0;
}
function parseIpFromCloudflareTrace(text) {
  for (const line of text.split("\n")) {
    if (line.startsWith("ip=")) {
      const ip = line.slice(3).trim();
      if (ip) return ip;
    }
  }
  return void 0;
}
async function fetchClientIpFromPublicApi() {
  const jsonEndpoints = [...EXTERNAL_URLS.thirdParty.ipLookup];
  for (const url of jsonEndpoints) {
    try {
      const res = await fetch(url, { method: "GET", credentials: "omit" });
      if (!res.ok) continue;
      const data = await res.json();
      const ip = parseIpFromJsonResponse(data);
      if (ip) return ip;
    } catch {
    }
  }
  try {
    const res = await fetch(EXTERNAL_URLS.thirdParty.cloudflareTrace, {
      method: "GET",
      credentials: "omit"
    });
    if (res.ok) {
      const ip = parseIpFromCloudflareTrace(await res.text());
      if (ip) return ip;
    }
  } catch {
  }
  return "";
}
async function resolveClientIpAddress() {
  const fromShell = readShellClientIpAddress();
  if (fromShell) return fromShell;
  if (cachedClientIpAddress) return cachedClientIpAddress;
  const fromSession = readCachedClientIpFromSession();
  if (fromSession) {
    cachedClientIpAddress = fromSession;
    return fromSession;
  }
  if (!clientIpFetchPromise) {
    clientIpFetchPromise = fetchClientIpFromPublicApi().finally(() => {
      clientIpFetchPromise = null;
    });
  }
  const ip = await clientIpFetchPromise;
  if (ip) storeClientIpCache(ip);
  return ip;
}
function prefetchClientIpAddress() {
  void resolveClientIpAddress();
}
async function fetchCheckUserExists(identifier, accessToken) {
  return fetchLoginApiJsonPost(GATEWAY_PATHS.checkUserExists, { identifier }, accessToken);
}
function handleLoginRedirect(signInJsonObj) {
  const fromQuiz = localStorage.getItem(AUTH_CONFIG.storageKeys.fromQuiz);
  const returnUrl = localStorage.getItem(AUTH_CONFIG.storageKeys.fromOrg);
  const quizId = localStorage.getItem(AUTH_CONFIG.storageKeys.quizId);
  const designForBharat = localStorage.getItem(AUTH_CONFIG.storageKeys.designForBharat) === "true";
  const hackForSocial = localStorage.getItem(AUTH_CONFIG.storageKeys.hackForSocial) === "true";
  const baseUrl = readShellLoginBaseUrl();
  if (!baseUrl) {
    assertRequiredClientConfig();
    return;
  }
  if (hackForSocial) {
    localStorage.removeItem(AUTH_CONFIG.storageKeys.hackForSocial);
    window.location.href = `${baseUrl}${APP_ROUTES.podcasts.replace(/^\//, "")}`;
    return;
  }
  if (designForBharat) {
    localStorage.removeItem(AUTH_CONFIG.storageKeys.designForBharat);
    window.location.href = `${baseUrl}${APP_ROUTES.designForBharat.replace(/^\//, "")}`;
    return;
  }
  if (returnUrl && quizId != null) {
    window.location.href = returnUrl;
    return;
  }
  if (fromQuiz && window.location.href.includes("quiz") && quizId != null) {
    hideBootstrapModal("signInModal");
    hideBootstrapModal("loginWithOtpModal");
    hideBootstrapModal("loginWIthOtpVerifyModal");
    window.location.reload();
    return;
  }
  if (signInJsonObj.redirect_url && signInJsonObj.token && signInJsonObj.domain) {
    setAuthCookies(signInJsonObj.token, signInJsonObj.domain, signInJsonObj.encryptId);
    const matches = document.cookie.match(/(?:^|; )essay_redirect_url=([^;]*)/);
    if (matches) {
      document.cookie = "essay_redirect_url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = decodeURIComponent(matches[1]);
      return;
    }
    const fromGamification = localStorage.getItem(AUTH_CONFIG.storageKeys.fromGamification);
    if (fromGamification) {
      localStorage.removeItem(AUTH_CONFIG.storageKeys.fromGamification);
      window.location.href = fromGamification;
      return;
    }
    window.location.href = signInJsonObj.redirect_url;
    return;
  }
  if (signInJsonObj.controller && signInJsonObj.action) {
    window.location.href = `${baseUrl}${signInJsonObj.controller}/${signInJsonObj.action}`;
    return;
  }
  window.location.href = baseUrl;
}
function startTimerHeader() {
  document.querySelectorAll(".resend_otp_header").forEach((el) => {
    el.style.display = "none";
  });
  document.querySelectorAll(".otp_timer_header").forEach((el) => {
    el.style.display = "block";
  });
  updateTimerHeader();
  if (countdownHeader) clearInterval(countdownHeader);
  countdownHeader = setInterval(updateTimerHeader, 1e3);
}
function updateTimerHeader() {
  const label = `Resend OTP in 00:${timeRemainingHeader}`;
  setText("timerHeader", label);
  setText("timerHeaderOtp", label);
  if (timeRemainingHeader > 0) {
    timeRemainingHeader -= 1;
    return;
  }
  if (countdownHeader) clearInterval(countdownHeader);
  document.querySelectorAll(".otp_timer_header").forEach((el) => {
    el.style.display = "none";
  });
  if (val("verified_otp_header") === "1") {
    document.querySelectorAll(".resend_otp_header").forEach((el) => {
      el.style.display = "none";
    });
  } else {
    document.querySelectorAll(".resend_otp_header").forEach((el) => {
      el.style.display = "block";
    });
    const alertEl = $("alertDivHeader");
    if (alertEl) alertEl.style.display = "none";
  }
}
function resetOtpLoginForm() {
  setVal("otp_login_header", "");
  setText("otp_login_header_error", "");
  setChecked("consentCheck1", false);
  loginModalQueryAll(".login_otp_header").forEach((el) => {
    el.disabled = true;
  });
}
function openLoginWithOtpModalNow() {
  if (!document.getElementById("loginWithOtpModal")) return;
  resetOtpLoginForm();
  hideBootstrapModal("mobileMenuNew");
  showBootstrapModal("loginWithOtpModal");
  window.dispatchEvent(new CustomEvent("mb:open-login", { bubbles: true, detail: { mode: "otp" } }));
}
function openLoginWithOtpModal() {
  if (document.getElementById("loginWithOtpModal")) {
    openLoginWithOtpModalNow();
    return;
  }
  const started = Date.now();
  const timer = window.setInterval(() => {
    if (document.getElementById("loginWithOtpModal")) {
      window.clearInterval(timer);
      openLoginWithOtpModalNow();
      return;
    }
    if (Date.now() - started >= 8e3) {
      window.clearInterval(timer);
    }
  }, 50);
}
function openSignInPasswordModal() {
  if (!document.getElementById("signInModal")) return;
  hideBootstrapModal("mobileMenuNew");
  showBootstrapModal("signInModal", { backdrop: "static", keyboard: false });
  window.dispatchEvent(new CustomEvent("mb:open-login", { bubbles: true, detail: { mode: "password" } }));
}
function togglePasswordField(inputId, toggleId) {
  const input = $(inputId);
  const toggle = $(toggleId);
  if (!input || !toggle) return;
  const icon = toggle.querySelector("i");
  if (input.type === "password") {
    input.type = "text";
    icon?.classList.replace("bi-eye-slash", "bi-eye");
  } else {
    input.type = "password";
    icon?.classList.replace("bi-eye", "bi-eye-slash");
  }
}
function loginModalQueryAll(selector) {
  const root = loginModalRoot();
  if (root === document) return document.querySelectorAll(selector);
  return root.querySelectorAll(selector);
}
function isOtpInlineValidationMessage(text) {
  return text === "Please check the consent box" || text === "Please enter valid Mobile / Email";
}
function isPasswordInlineValidationMessage(text) {
  return text === "All inputs are mandatory!";
}
function validateOtpLoginInput() {
  const input = val("otp_login_header");
  const isEmail = validateEmail(input);
  const isMobile = validatePhone(input);
  const consent = isChecked("consentCheck1");
  const err = $("otp_login_header_error");
  const buttons = loginModalQueryAll(".login_otp_header");
  const errText = err?.textContent?.trim() ?? "";
  const isApiError = errText.length > 0 && !isOtpInlineValidationMessage(errText);
  if ((isEmail || isMobile) && consent) {
    if (err) err.style.display = isApiError ? "block" : "none";
    buttons.forEach((b) => {
      b.disabled = false;
    });
  } else if (!consent && (isEmail || isMobile)) {
    setText("otp_login_header_error", "Please check the consent box");
    if (err) err.style.display = "block";
    buttons.forEach((b) => {
      b.disabled = true;
    });
  } else {
    setText("otp_login_header_error", "Please enter valid Mobile / Email");
    if (err) err.style.display = "block";
    buttons.forEach((b) => {
      b.disabled = true;
    });
  }
}
function validatePasswordLoginForm() {
  const username = val("username");
  const password = val("password");
  const consent = isChecked("consentCheck2");
  const btn = $("signInButton");
  const err = $("user_mobile_header_error_login");
  const errText = err?.textContent?.trim() ?? "";
  const isApiError = errText.length > 0 && !isPasswordInlineValidationMessage(errText);
  if (username && password && consent) {
    if (!isApiError) {
      setText("user_mobile_header_error_login", "");
      if (err) err.style.display = "none";
    } else if (err) {
      err.style.display = "block";
    }
    if (btn) btn.disabled = false;
  } else {
    setText("user_mobile_header_error_login", "All inputs are mandatory!");
    if (err) err.style.display = "block";
    if (btn) btn.disabled = true;
  }
}
function buildSendMobileGuestUserOtpForm(data, ipAddress) {
  const form = {
    ip_address: ipAddress,
    user_agent: readClientUserAgent()
  };
  const phone = data.user_phone?.trim();
  const email = data.user_email?.trim();
  if (phone) {
    form.user_phone = phone;
  } else if (email) {
    form.user_email = email;
  }
  return form;
}
async function sendGuestOtp(data) {
  const ipAddress = await resolveClientIpAddress();
  if (!ipAddress) {
    return {
      status_code: 400,
      message: "Unable to detect your IP address. Please try again."
    };
  }
  const form = buildSendMobileGuestUserOtpForm(data, ipAddress);
  if (!form.user_phone && !form.user_email) {
    return {
      status_code: 400,
      message: "Please enter valid Mobile / Email"
    };
  }
  try {
    let accessToken = await getOauthAccessToken();
    let res = await fetchLoginApiFormPost(
      GATEWAY_PATHS.sendMobileGuestUserOtp,
      form,
      accessToken
    );
    if (isKeycloakUnauthorizedResponse(res)) {
      accessToken = await getOauthAccessToken(true);
      res = await fetchLoginApiFormPost(
        GATEWAY_PATHS.sendMobileGuestUserOtp,
        form,
        accessToken
      );
    }
    return res;
  } catch (err) {
    const message = resolveLoginFlowError(err);
    return { status_code: 500, message };
  }
}
async function verifyGuestUserOtp(identifier, otp) {
  const form = { otp };
  if (validateEmail(identifier)) {
    form.user_email = identifier;
    form.user_phone = "";
  } else if (validatePhone(identifier)) {
    form.user_phone = identifier;
    form.user_email = "";
  } else {
    form.user_email = identifier;
    form.user_phone = "";
  }
  try {
    let accessToken = await getOauthAccessToken();
    let res = await fetchLoginApiFormPost(
      GATEWAY_PATHS.verifyGuestUserOtp,
      form,
      accessToken
    );
    if (isKeycloakUnauthorizedResponse(res)) {
      accessToken = await getOauthAccessToken(true);
      res = await fetchLoginApiFormPost(
        GATEWAY_PATHS.verifyGuestUserOtp,
        form,
        accessToken
      );
    }
    return res;
  } catch (err) {
    return { status_code: 500, message: resolveLoginFlowError(err) };
  }
}
function readKeycloakGivenData(message) {
  if (message && typeof message === "object" && "given_data" in message) {
    return message.given_data;
  }
  return void 0;
}
async function checkUserInKeycloak(identifier) {
  try {
    let accessToken = await getKeycloakClientAccessToken();
    let check = await fetchCheckUserExists(identifier, accessToken);
    if (isKeycloakUnauthorizedResponse(check)) {
      clearShellInternalKcAuthCache();
      accessToken = await getKeycloakClientAccessToken(true);
      check = await fetchCheckUserExists(identifier, accessToken);
    }
    if (!isSuccessStatus2(check.status_code)) {
      return {
        ...check,
        status_code: check.status_code ?? 500,
        message: resolveLoginApiError(check)
      };
    }
    return check;
  } catch (err) {
    return { status_code: 500, message: resolveLoginFlowError(err) };
  }
}
function buildOtpPayload(identifier, givenData) {
  if (givenData === "Mobile" || validatePhone(identifier)) {
    setText("mobEmailHeader", "Mobile Number");
    setText("mobEmailConfirm", "Mobile Number");
    return { user_phone: identifier };
  }
  setText("mobEmailHeader", "Email Id");
  setText("mobEmailConfirm", "Email ID");
  return { user_email: identifier };
}
async function handleForgotPasswordGetOtp() {
  const identifier = val("user_mobile_header");
  if (!identifier) return;
  storeLoginIdentifier(identifier);
  showLoader();
  setText("user_mobile_header_error", "");
  try {
    const check = await checkUserInKeycloak(identifier);
    if (!isSuccessStatus2(check.status_code)) {
      showLoginFieldError("user_mobile_header_error", resolveLoginApiError(check));
      return;
    }
    const given = readKeycloakGivenData(check.message);
    const payload = buildOtpPayload(identifier, given);
    const otpRes = await sendGuestOtp(payload);
    if (isSuccessStatus2(otpRes.status_code)) {
      timeRemainingHeader = AUTH_CONFIG.otpResendSeconds;
      startTimerHeader();
      setDisabled("user_mobile_header", true);
      document.querySelectorAll(".generate_otp_header").forEach((el) => {
        el.disabled = true;
      });
      switchBootstrapModal("forgotPwdModal", "otpVerifyForgotPwdModal", 200);
      setVal("otp-field-2", "");
      setDisabled("btn-verify-otp-header", false);
    } else {
      showLoginFieldError(
        "user_mobile_header_error",
        resolveLoginApiError(otpRes, "Failed to send OTP")
      );
    }
  } catch (err) {
    showLoginFieldError("user_mobile_header_error", resolveLoginFlowError(err));
  } finally {
    hideLoader();
  }
}
function validateOtpLoginForm() {
  validateOtpLoginInput();
}
function submitOtpLoginFromModal() {
  validateOtpLoginInput();
  const btn = loginModalQueryAll(".login_otp_header")[0];
  if (btn?.disabled) return;
  void handleOtpLoginSend();
}
async function handleOtpLoginSend() {
  if (otpLoginSendInFlight) return;
  const identifier = val("otp_login_header");
  if (!identifier) return;
  otpLoginSendInFlight = true;
  storeLoginIdentifier(identifier);
  showLoader();
  loginModalQueryAll(".login_otp_header").forEach((el) => {
    el.disabled = true;
  });
  try {
    const check = await checkUserInKeycloak(identifier);
    if (!isSuccessStatus2(check.status_code)) {
      showLoginFieldError("otp_login_header_error", resolveLoginApiError(check));
      return;
    }
    const given = readKeycloakGivenData(check.message);
    const payload = buildOtpPayload(identifier, given);
    const otpRes = await sendGuestOtp(payload);
    if (isSuccessStatus2(otpRes.status_code)) {
      timeRemainingHeader = AUTH_CONFIG.otpResendSeconds;
      startTimerHeader();
      switchBootstrapModal("loginWithOtpModal", "loginWIthOtpVerifyModal", 200);
      setVal("otp-field-3", "");
      setText("otp-field-3_error", "");
    } else {
      showLoginFieldError(
        "otp_login_header_error",
        resolveLoginApiError(otpRes, "Please check Mobile / Email you entered!")
      );
    }
  } finally {
    otpLoginSendInFlight = false;
    hideLoader();
    validateOtpLoginInput();
  }
}
function otpPayloadForStoredIdentifier() {
  const identifier = readLoginIdentifier();
  if (validatePhone(identifier)) return { user_phone: identifier };
  if (validateEmail(identifier)) return { user_email: identifier };
  return { user_email: identifier };
}
async function handleResendOtp() {
  if (timeRemainingHeader > 0) return;
  timeRemainingHeader = AUTH_CONFIG.otpResendSeconds;
  const payload = otpPayloadForStoredIdentifier();
  const res = await sendGuestOtp(payload);
  if (isSuccessStatus2(res.status_code)) {
    startTimerHeader();
    setText("otp-field-2_error", "");
    setText("otp-field-3_error", "");
    return;
  }
  const message = resolveLoginApiError(res);
  showLoginFieldError("otp-field-2_error", message);
  showLoginFieldError("otp-field-3_error", message);
}
async function handleVerifyForgotOtp() {
  const identifier = readLoginIdentifier() || val("user_mobile_header");
  const otp = val("otp-field-2");
  if (!otp) {
    showLoginFieldError("otp-field-2_error", OTP_MESSAGES.required);
    return;
  }
  if (!/^[0-9]{6}$/.test(otp)) {
    showLoginFieldError("otp-field-2_error", OTP_MESSAGES.sixDigits);
    return;
  }
  showLoader();
  setText("otp-field-2_error", "");
  try {
    const verify = await verifyGuestUserOtp(identifier, otp);
    if (isSuccessStatus2(verify.status_code)) {
      storeRegCodeFromVerifyResponse(verify);
      setVal("verified_otp_header", "1");
      timeRemainingHeader = 0;
      setDisabled("user_mobile_header", true);
      setDisabled("btn-verify-otp-header", true);
      switchBootstrapModal("otpVerifyForgotPwdModal", "newPasswordModal", 200);
      setVal("newPwd", "");
      setVal("confirmPwd", "");
      return;
    }
    responseCount += 1;
    if (responseCount >= 5) {
      showLoginFieldError(
        "otp-field-2_error",
        OTP_MESSAGES.maxAttempts
      );
      setDisabled("btn-verify-otp-header", true);
    } else {
      showLoginFieldError("otp-field-2_error", resolveVerifyOtpError(verify));
    }
  } catch (err) {
    showLoginFieldError("otp-field-2_error", resolveLoginFlowError(err));
  } finally {
    hideLoader();
  }
}
async function handleVerifyLoginOtp() {
  const userMobile = readLoginIdentifier();
  setVal("otp_login_header", userMobile);
  setDisabled("btn-otp-verify-header", true);
  const otp = val("otp-field-3");
  if (!otp) {
    showLoginFieldError("otp-field-3_error", OTP_MESSAGES.required);
    setDisabled("btn-otp-verify-header", false);
    return;
  }
  if (!/^[0-9]{6}$/.test(otp)) {
    showLoginFieldError("otp-field-3_error", OTP_MESSAGES.sixDigits);
    setDisabled("btn-otp-verify-header", false);
    return;
  }
  showLoader();
  let redirecting = false;
  try {
    const verify = await verifyGuestUserOtp(userMobile, otp);
    if (!isSuccessStatus2(verify.status_code)) {
      responseCount += 1;
      if (responseCount >= 5) {
        document.querySelectorAll(".otp_timer_header").forEach((el) => {
          el.style.display = "none";
        });
        document.querySelectorAll(".resend_otp_header").forEach((el) => {
          el.style.display = "none";
        });
        loginModalQueryAll(".generate_otp_header").forEach((el) => {
          el.disabled = true;
        });
        showLoginFieldError(
          "otp-field-3_error",
          OTP_MESSAGES.maxAttempts
        );
        setDisabled("btn-otp-verify-header", true);
      } else {
        showLoginFieldError("otp-field-3_error", resolveVerifyOtpError(verify));
        setDisabled("btn-otp-verify-header", false);
      }
      return;
    }
    markLoginOtpVerified();
    storeRegCodeFromVerifyResponse(verify);
    const loginRes = await completeLoginWithOtp(userMobile);
    clearLoginStorage();
    if (isLoginOtpRedirectResult(loginRes)) {
      redirecting = true;
      tryFirebaseEvent("user_login_success");
      return;
    }
    if (isSuccessStatus2(loginRes.status_code)) {
      const redirectPayload = loginRes;
      tryFirebaseEvent("user_login_success", redirectPayload);
      handleLoginRedirect(redirectPayload);
      return;
    }
    tryFirebaseEvent("user_login_failure");
    showLoginFieldError("otp-field-3_error", resolveLoginApiError(loginRes, "Login failed"));
    setDisabled("btn-otp-verify-header", false);
  } catch (err) {
    tryFirebaseEvent("user_login_failure");
    showLoginFieldError("otp-field-3_error", resolveLoginFlowError(err));
    setDisabled("btn-otp-verify-header", false);
  } finally {
    if (!redirecting) {
      hideLoader();
    }
  }
}
async function handleUpdatePassword() {
  const identifier = readLoginIdentifier() || val("user_mobile_header");
  const password = val("newPwd");
  const confirmPwd = val("confirmPwd");
  if (!validatePassword(password)) {
    setText("new_pwd_error", "Please follow the password policy!");
    return;
  }
  if (password !== confirmPwd) {
    setText("new_pwd_error", "Passwords do not match!");
    return;
  }
  showLoader();
  setText("new_pwd_error", "");
  try {
    const res = await completeForgotPasswordUpdate(identifier, password);
    if (isSuccessStatus2(res.status_code)) {
      switchBootstrapModal("newPasswordModal", "successModal", 200);
      return;
    }
    showLoginFieldError("new_pwd_error", resolveLoginApiError(res));
  } catch (err) {
    showLoginFieldError("new_pwd_error", resolveLoginFlowError(err));
  } finally {
    hideLoader();
  }
}
async function handlePasswordSignIn() {
  validatePasswordLoginForm();
  const username = val("username");
  const password = val("password");
  const consent = isChecked("consentCheck2");
  if (!username || !password || !consent) return;
  showLoader();
  setDisabled("signInButton", true);
  let redirecting = false;
  try {
    const res = await completePasswordSignIn(username, password);
    clearLoginStorage();
    if (isLoginOtpRedirectResult(res)) {
      redirecting = true;
      tryFirebaseEvent("user_login_success");
      return;
    }
    tryFirebaseEvent("user_login_failure");
    showLoginFieldError("user_mobile_header_error_login", resolveLoginApiError(res));
    setDisabled("signInButton", false);
  } catch (err) {
    tryFirebaseEvent("user_login_failure");
    showLoginFieldError("user_mobile_header_error_login", resolveLoginFlowError(err));
    setDisabled("signInButton", false);
  } finally {
    if (!redirecting) {
      hideLoader();
    }
  }
}
function onDocumentClick(e) {
  const target = e.target;
  if (!target) return;
  const signInTrigger = target.closest(HEADER_LOGIN_SIGN_IN_SELECTORS);
  if (signInTrigger) {
    e.preventDefault();
    openLoginWithOtpModal();
    return;
  }
  if (target.closest("#forgot_password")) {
    e.preventDefault();
    const username = val("username") || val("otp_login_header");
    if (username) {
      setVal("user_mobile_header", username);
      setDisabled("user_mobile_header", false);
      document.querySelectorAll(".generate_otp_header").forEach((el) => {
        el.disabled = !!username;
      });
    }
    switchBootstrapModal("signInModal", "forgotPwdModal", 0);
    return;
  }
  if (target.closest("#login_with_otp")) {
    e.preventDefault();
    const username = val("username");
    if (username) setVal("otp_login_header", username);
    switchBootstrapModal("signInModal", "loginWithOtpModal", 0);
    return;
  }
  if (target.closest("#login_with_pwd")) {
    e.preventDefault();
    const otpVal = val("otp_login_header");
    if (otpVal) setVal("username", otpVal);
    setChecked("consentCheck2", false);
    switchBootstrapModal("loginWithOtpModal", "signInModal", 0);
    return;
  }
  if (target.closest("#backToSignInModal")) {
    e.preventDefault();
    const mobile = val("user_mobile_header");
    if (mobile) {
      setVal("username", mobile);
      validatePasswordLoginForm();
    }
    switchBootstrapModal("forgotPwdModal", "signInModal", 0);
    return;
  }
  if (target.closest("#backToSignInModal2")) {
    e.preventDefault();
    switchBootstrapModal("loginWithOtpModal", "signInModal", 0);
    return;
  }
  if (target.closest("#backTologinWithOtpModal")) {
    e.preventDefault();
    setChecked("consentCheck1", false);
    switchBootstrapModal("loginWIthOtpVerifyModal", "loginWithOtpModal", 0);
    return;
  }
  if (target.closest("#backToForgotPwdModal")) {
    e.preventDefault();
    setDisabled("user_mobile_header", false);
    document.querySelectorAll(".generate_otp_header").forEach((el) => {
      el.disabled = false;
    });
    switchBootstrapModal("otpVerifyForgotPwdModal", "forgotPwdModal", 0);
    return;
  }
  if (target.closest("#backToOtpVerifyForgotPwdModal")) {
    e.preventDefault();
    setVal("otp-field-2", "");
    setDisabled("btn-verify-otp-header", false);
    switchBootstrapModal("newPasswordModal", "otpVerifyForgotPwdModal", 0);
    return;
  }
  if (target.closest("#backToNewPwdModal")) {
    e.preventDefault();
    switchBootstrapModal("successModal", "newPasswordModal", 0);
    return;
  }
  if (target.closest(".generate_otp_header")) {
    e.preventDefault();
    void handleForgotPasswordGetOtp();
    return;
  }
  if (target.closest(".login_otp_header")) {
    e.preventDefault();
    if (target.closest(".mb-common-header-login")) return;
    submitOtpLoginFromModal();
    return;
  }
  if (target.closest("#signInButton")) {
    e.preventDefault();
    void handlePasswordSignIn();
    return;
  }
  if (target.closest("#togglePassword")) {
    e.preventDefault();
    togglePasswordField("password", "togglePassword");
    return;
  }
  if (target.closest("#toggleNewPwd")) {
    e.preventDefault();
    togglePasswordField("newPwd", "toggleNewPwd");
    return;
  }
  if (target.closest("#toggleConfirmPwd")) {
    e.preventDefault();
    togglePasswordField("confirmPwd", "toggleConfirmPwd");
    return;
  }
  if (target.closest("#btn-verify-otp-header")) {
    e.preventDefault();
    void handleVerifyForgotOtp();
    return;
  }
  if (target.closest("#btn-otp-verify-header")) {
    e.preventDefault();
    void handleVerifyLoginOtp();
    return;
  }
  if (target.closest("#updatePwdButton")) {
    e.preventDefault();
    void handleUpdatePassword();
    return;
  }
  if (target.closest("#resendOTPHeader") || target.closest("#resendOTPVerifyHeader")) {
    e.preventDefault();
    void handleResendOtp();
    return;
  }
  if (target.closest("#loginNowButton")) {
    e.preventDefault();
    hideBootstrapModal("successModal");
    const baseUrl = readShellLoginBaseUrl();
    if (!baseUrl) {
      assertRequiredClientConfig();
      return;
    }
    window.location.href = baseUrl;
    return;
  }
  if (target.closest("#close-signIn")) {
    localStorage.removeItem(AUTH_CONFIG.storageKeys.fromQuiz);
    localStorage.removeItem("quizId");
    localStorage.removeItem("loginData");
    localStorage.removeItem(AUTH_CONFIG.storageKeys.designForBharat);
    localStorage.removeItem(AUTH_CONFIG.storageKeys.hackForSocial);
    return;
  }
  if (target.closest("#close-otpLogin")) {
    setVal("otp_login_header", "");
    localStorage.removeItem(AUTH_CONFIG.storageKeys.fromQuiz);
    localStorage.removeItem("quizId");
    localStorage.removeItem("loginData");
    localStorage.removeItem(AUTH_CONFIG.storageKeys.designForBharat);
    localStorage.removeItem(AUTH_CONFIG.storageKeys.hackForSocial);
    loginModalQueryAll(".login_otp_header").forEach((el) => {
      el.disabled = true;
    });
  }
}
function onDocumentInput(e) {
  const target = e.target;
  if (!target) return;
  if (target.id === "otp_login_header" || target.id === "consentCheck1") {
    const err = $("otp_login_header_error");
    const errText = err?.textContent?.trim() ?? "";
    if (errText && !isOtpInlineValidationMessage(errText)) {
      setText("otp_login_header_error", "");
    }
    validateOtpLoginInput();
  }
  if (target.id === "username" || target.id === "password" || target.id === "consentCheck2") {
    const err = $("user_mobile_header_error_login");
    const errText = err?.textContent?.trim() ?? "";
    if (errText && !isPasswordInlineValidationMessage(errText)) {
      setText("user_mobile_header_error_login", "");
    }
    validatePasswordLoginForm();
  }
  if (target.id === "user_mobile_header") {
    document.querySelectorAll(".generate_otp_header").forEach((el) => {
      el.disabled = !val("user_mobile_header");
    });
  }
  if (target.id === "newPwd" || target.id === "confirmPwd") {
    const password = val("newPwd");
    const confirmPassword = val("confirmPwd");
    const help = $("confirmPwdHelpBlock");
    if (!validatePassword(password)) {
      $("newPwd")?.classList.add("is-invalid");
    } else {
      $("newPwd")?.classList.remove("is-invalid");
    }
    if (password !== confirmPassword) {
      $("confirmPwd")?.classList.add("is-invalid");
      if (help) help.style.display = "block";
    } else {
      $("confirmPwd")?.classList.remove("is-invalid");
      if (help) help.style.display = "none";
    }
  }
}
function onDocumentKeyPress(e) {
  const target = e.target;
  if (target?.classList.contains("otp-field")) {
    if (e.charCode < 48 || e.charCode > 57) e.preventDefault();
  }
}
function installHeaderLoginFlow() {
  if (installed) return () => void 0;
  installed = true;
  syncShellLoginApiConfigFromDom();
  applyShellLoginApiConfig(window.MYBHARAT_SHELL?.login?.apiBaseUrl);
  prefetchClientIpAddress();
  document.addEventListener("click", onDocumentClick, true);
  document.addEventListener("input", onDocumentInput, true);
  document.addEventListener("change", onDocumentInput, true);
  document.addEventListener("keypress", onDocumentKeyPress, true);
  if (window.location.hash === "#login") {
    window.setTimeout(openLoginWithOtpModal, 0);
  }
  const w = window;
  w.MyBharatShell = w.MyBharatShell ?? {};
  w.MyBharatShell.openLoginModal = (mode = "otp") => {
    if (mode === "password") openSignInPasswordModal();
    else openLoginWithOtpModal();
  };
  return () => {
    installed = false;
    document.removeEventListener("click", onDocumentClick, true);
    document.removeEventListener("input", onDocumentInput, true);
    document.removeEventListener("change", onDocumentInput, true);
    document.removeEventListener("keypress", onDocumentKeyPress, true);
  };
}
function hostHasLoginModals() {
  const el = document.getElementById("loginWithOtpModal");
  return !!el && !el.closest(".mb-common-header-login");
}

// src/components/header/HeaderProfileMenu.tsx
import { useCallback, useEffect as useEffect2, useRef, useState as useState2 } from "react";

// src/components/header/headerUserSession.ts
function isGuestHeaderUserPayload(input) {
  return parseHeaderUserSession(input) == null;
}
function ucfirst(value) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}
var EXCLUDED_PROFILE_MENU_TYPES = AUTH_CONFIG.excludedProfileMenuUserTypes;
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function readUserType(data) {
  const record = data;
  const raw = readField3(record, "user_type", "userType", "UserType");
  return typeof raw === "number" && Number.isFinite(raw) ? raw : void 0;
}
function readStringField(data, ...keys) {
  const value = readField3(data, ...keys);
  return typeof value === "string" ? value.trim() : "";
}
function buildDisplayName(data) {
  const record = data;
  const parts = [
    readStringField(record, "first_name", "FirstName"),
    readStringField(record, "middle_name", "MiddleName"),
    readStringField(record, "last_name", "LastName")
  ].filter(Boolean);
  if (parts.length) return ucfirst(parts.join(" "));
  const screen = readStringField(record, "screen_name", "ScreenName");
  if (screen) return ucfirst(screen);
  const username = readStringField(record, "username", "Username");
  if (username) return username;
  return "User";
}
function resolveUserType(data) {
  const explicit = readUserType(data);
  if (explicit != null) return explicit;
  if (typeof data.yuva_type === "string" && data.yuva_type.trim()) return 6;
  return void 0;
}
function readField3(data, ...keys) {
  for (const key of keys) {
    if (data[key] != null && data[key] !== "") return data[key];
  }
  return void 0;
}
function parseUserId(data) {
  const raw = readField3(data, "id", "ID");
  if (typeof raw === "number" && Number.isFinite(raw) && raw > 0) return raw;
  if (typeof raw === "string" && raw.trim() !== "") {
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return null;
}
function isEmptyUserData(data) {
  if (data == null) return true;
  if (!isRecord(data)) return true;
  if (Object.keys(data).length === 0) return true;
  return parseUserId(data) == null;
}
function unwrapUserData(input) {
  if (input == null) return null;
  if (isRecord(input) && "displayName" in input && typeof input.id === "number") {
    return null;
  }
  if (isRecord(input) && "data" in input) {
    if (isEmptyUserData(input.data)) return null;
    return input.data;
  }
  if (isRecord(input)) {
    if (isEmptyUserData(input)) return null;
    return input;
  }
  return null;
}
function normalizeSession(data) {
  if (isEmptyUserData(data)) return null;
  const id = parseUserId(data);
  if (id == null) return null;
  const displayName = buildDisplayName(data);
  if (!displayName.trim()) return null;
  const profilePic = typeof data.profile_pic === "string" && data.profile_pic.trim() || typeof data.profile_pic_path === "string" && data.profile_pic_path.trim() || null;
  return {
    id,
    dlId: typeof data.dl_id === "string" ? data.dl_id : void 0,
    displayName,
    username: typeof data.username === "string" ? data.username : void 0,
    email: typeof data.user_email === "string" ? data.user_email : void 0,
    profilePic,
    publicProfileUrl: typeof data.public_profile === "string" ? data.public_profile : void 0,
    myBharatId: typeof data.my_bharat_id === "string" ? data.my_bharat_id : void 0,
    userType: resolveUserType(data),
    orgType: typeof data.org_type === "string" && data.org_type || typeof data.orgType === "string" && data.orgType || void 0
  };
}
function parseHeaderUserSession(input) {
  if (input == null) return null;
  if (isRecord(input) && "displayName" in input && typeof input.id === "number") {
    return input;
  }
  const data = unwrapUserData(input);
  if (!data) return null;
  return normalizeSession(data);
}
function isHeaderUserLoggedIn(input) {
  return parseHeaderUserSession(input) != null;
}
function headerUserInitial(user) {
  const ch = user.displayName.trim().charAt(0);
  return ch ? ch.toUpperCase() : "U";
}
function headerUserDisplayName(user, maxLength = 20) {
  const name = user.displayName.trim();
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength)}...`;
}
function buildHeaderProfileMenuItems(user, options) {
  const webroot = (options?.webroot ?? "/").replace(/\/?$/, "/");
  const items = [];
  const userType = user.userType;
  if (userType == null || !EXCLUDED_PROFILE_MENU_TYPES.has(userType)) {
    if (userType === AUTH_CONFIG.youthUserType) {
      items.push({
        href: user.publicProfileUrl ?? APP_ROUTES.youthProfile,
        label: "MY Bharat Profile",
        iconClass: "fa fa-th-large",
        external: Boolean(user.publicProfileUrl?.startsWith("http"))
      });
    } else {
      items.push({
        href: APP_ROUTES.dashboard,
        label: "Dashboard",
        iconClass: "fa fa-th-large"
      });
    }
    if (userType != null && userType !== AUTH_CONFIG.youthUserType) {
      items.push(
        {
          href: `${webroot}${APP_ROUTES.editPartnerProfile}`,
          label: "My Account",
          iconClass: "fa fa-user"
        },
        {
          href: `${webroot}${APP_ROUTES.partnerProfile}`,
          label: "View Profile",
          iconClass: "fa fa-user"
        }
      );
    }
  }
  items.push({
    href: `${webroot}${APP_ROUTES.logout}`,
    label: "Log Out",
    iconClass: "fa fa-power-off",
    className: "firebase-profile-logout-btn"
  });
  return items;
}
function encodeHeaderUserIdForLogout(userId) {
  if (typeof window !== "undefined" && typeof window.encodeIdentifier === "function") {
    try {
      return window.encodeIdentifier(String(userId));
    } catch {
    }
  }
  return String(userId);
}

// src/components/header/HeaderProfileMenu.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function ProfileAvatar({ user }) {
  const initial = headerUserInitial(user);
  const pic = user.profilePic?.trim();
  return /* @__PURE__ */ jsx5("div", { className: "user-info-wrapper", children: /* @__PURE__ */ jsx5("div", { className: "profile-wrapper", id: "profileMenuUserNameContatiner", children: pic ? /* @__PURE__ */ jsx5("img", { src: pic, className: "profileimage", width: 40, height: 40, alt: "" }) : /* @__PURE__ */ jsx5("span", { className: "mb-common-header__profile-initial", "aria-hidden": "true", children: initial }) }) });
}
function MenuLink({
  item,
  userId,
  dismissModal,
  className
}) {
  const isLogout = item.className?.includes("firebase-profile-logout-btn");
  const linkClass = [className, item.className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs5(
    "a",
    {
      href: item.href,
      className: linkClass || void 0,
      "data-bs-dismiss": dismissModal ? "modal" : void 0,
      "data-userid": isLogout ? encodeHeaderUserIdForLogout(userId) : void 0,
      ...item.external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: [
        /* @__PURE__ */ jsx5("i", { className: item.iconClass, "aria-hidden": "true" }),
        "\xA0\xA0",
        item.label
      ]
    }
  );
}
function HeaderProfileMenu({ user, webroot, variant = "desktop" }) {
  const items = buildHeaderProfileMenuItems(user, { webroot });
  const displayName = headerUserDisplayName(user);
  const [open, setOpen] = useState2(false);
  const rootRef = useRef(null);
  const toggleOpen = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  }, []);
  useEffect2(() => {
    if (!open) return void 0;
    const onDocumentClick4 = (e) => {
      if (rootRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onDocumentClick4);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocumentClick4);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  if (variant === "mobile") {
    return /* @__PURE__ */ jsx5("div", { className: "m-menu border-top mt-2 pt-2 mb-common-header__mobile-profile", children: /* @__PURE__ */ jsx5("ul", { className: "list-unstyled mb-0", children: items.map((item) => /* @__PURE__ */ jsx5("li", { className: "border-bottom", children: /* @__PURE__ */ jsx5(
      MenuLink,
      {
        item,
        userId: user.id,
        dismissModal: true,
        className: "mbv_yuva_drop text-decoration-none text-reset d-block py-2"
      }
    ) }, item.href + item.label)) }) });
  }
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      ref: rootRef,
      className: `dropdown chat-toggler header_img mb-common-header__profile${open ? " show" : ""}`,
      children: [
        /* @__PURE__ */ jsxs5(
          "a",
          {
            href: "#",
            className: "mb-common-header__profile-toggle text-decoration-none",
            id: "user-options",
            role: "button",
            "aria-expanded": open,
            "aria-haspopup": "menu",
            onClick: toggleOpen,
            children: [
              /* @__PURE__ */ jsx5(ProfileAvatar, { user }),
              /* @__PURE__ */ jsxs5("div", { className: "user-details", children: [
                /* @__PURE__ */ jsx5("p", { className: "mb-common-header__welcome-label", children: "Welcome" }),
                /* @__PURE__ */ jsx5("div", { className: "username", children: displayName })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx5(
          "ul",
          {
            className: `dropdown-menu dropdown-menu-end pull-right${open ? " show" : ""}`,
            role: "menu",
            "aria-labelledby": "user-options",
            style: open ? { display: "block" } : void 0,
            children: items.map((item) => /* @__PURE__ */ jsx5("li", { children: /* @__PURE__ */ jsx5(MenuLink, { item, userId: user.id }) }, item.href + item.label))
          }
        )
      ]
    }
  );
}

// src/components/MobileMenuModal.tsx
import { Fragment as Fragment2, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function collapseDomId(path) {
  return `mb-mnav-${path.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}
function MobileNavLinkRow({ item }) {
  const { href, external } = getNavLinkAttrs(item, "MobileMenuModal");
  const aClass = ["fontchange14", "text-decoration-none", "text-reset", item.linkClassName].filter(Boolean).join(" ");
  const spanClass = ["d-block", "py-2", item.spanClassName].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx6(
    "a",
    {
      href,
      className: aClass,
      "data-bs-dismiss": "modal",
      style: { marginLeft: 0 },
      ...external ? { target: "_blank", rel: "noopener noreferrer" } : {},
      children: /* @__PURE__ */ jsx6("span", { className: spanClass, style: { marginLeft: 0 }, children: item.label })
    }
  );
}
function MobileNavNode({ item, segments }) {
  if (!isNavGroupItem(item)) {
    return /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsx6(MobileNavLinkRow, { item }) });
  }
  const path = navTreeItemKey(item, segments);
  const collapseId = collapseDomId(path);
  return /* @__PURE__ */ jsxs6("li", { className: "border-0", children: [
    /* @__PURE__ */ jsxs6(
      "button",
      {
        type: "button",
        className: "w-100 text-start border-0 bg-transparent fontchange14 text-reset py-2 px-0 d-flex align-items-center justify-content-between",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#${collapseId}`,
        "aria-expanded": "false",
        "aria-controls": collapseId,
        children: [
          /* @__PURE__ */ jsx6("span", { children: item.label }),
          /* @__PURE__ */ jsx6("i", { className: "fa fa-chevron-down small", "aria-hidden": "true" })
        ]
      }
    ),
    /* @__PURE__ */ jsx6("div", { id: collapseId, className: "collapse", children: /* @__PURE__ */ jsx6("ul", { className: "list-unstyled mb-0 ps-3 pb-1 border-start ms-1", children: item.children.map((child, j) => {
      const childSegments = [...segments, j];
      return /* @__PURE__ */ jsx6(MobileNavNode, { item: child, segments: childSegments }, navTreeItemKey(child, childSegments));
    }) }) })
  ] });
}
var MobileMenuModal = ({
  cdnBase,
  items,
  userSession,
  webroot
}) => {
  const tree = React3.useMemo(() => normalizeNavTree(items), [items]);
  const user = parseHeaderUserSession(userSession);
  return /* @__PURE__ */ jsx6(
    "div",
    {
      className: "modal left fade",
      id: "mobileMenuNew",
      tabIndex: -1,
      "aria-labelledby": "mobileMenuNewLabel",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx6("div", { className: "modal-dialog", children: /* @__PURE__ */ jsxs6("div", { className: "modal-content", children: [
        /* @__PURE__ */ jsxs6("div", { className: "modal-header align-items-center border-0 pb-0", children: [
          /* @__PURE__ */ jsx6("h5", { className: "modal-title flex-grow-1 mb-0", id: "mobileMenuNewLabel", children: /* @__PURE__ */ jsx6("div", { className: "logo", children: /* @__PURE__ */ jsx6("a", { href: "/", "data-bs-dismiss": "modal", children: /* @__PURE__ */ jsx6(
            "img",
            {
              src: resolveCdnAssetUrl(cdnBase, "assets/img/yuva_landing/mybharatlogo_opt_2x.png"),
              className: "logo-w-sm-md-sec",
              alt: "MY Bharat"
            }
          ) }) }) }),
          /* @__PURE__ */ jsx6("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "modal-body pt-2", children: [
          /* @__PURE__ */ jsx6("div", { className: "m-menu", children: /* @__PURE__ */ jsx6("ul", { className: "list-unstyled mb-0", children: tree.map((item, i) => {
            const segments = [i];
            return /* @__PURE__ */ jsx6(MobileNavNode, { item, segments }, navTreeItemKey(item, segments));
          }) }) }),
          !user ? /* @__PURE__ */ jsxs6(Fragment2, { children: [
            /* @__PURE__ */ jsx6("div", { className: "m-menu border-top mt-2 pt-2", children: /* @__PURE__ */ jsxs6("ul", { className: "list-unstyled mb-0", children: [
              /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsx6(
                "a",
                {
                  className: "mbv_yuva_drop border-bottom text-decoration-none text-reset d-block",
                  href: "#",
                  id: "signInLink",
                  style: { borderBottom: "1px solid #D7D7D7" },
                  onClick: (e) => {
                    e.preventDefault();
                    openLoginWithOtpModal();
                  },
                  children: /* @__PURE__ */ jsx6("span", { className: "lang_yuva_register_login_link d-block py-2", style: { marginLeft: 0 }, children: "Sign In" })
                }
              ) }),
              /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsx6(
                "a",
                {
                  className: "mbv_yuva_drop border-bottom text-decoration-none text-reset d-block",
                  href: "/yuva_register",
                  "data-bs-dismiss": "modal",
                  style: { borderBottom: "1px solid #D7D7D7" },
                  children: /* @__PURE__ */ jsx6("span", { className: "lang_register d-block py-2", style: { marginLeft: 0 }, children: "Register Now" })
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsx6("div", { className: "accordion mt-2", id: "accordionExamples", children: /* @__PURE__ */ jsxs6("div", { className: "accordion-item border-0", children: [
              /* @__PURE__ */ jsx6("h2", { className: "accordion-header", id: "headingTwos", children: /* @__PURE__ */ jsx6(
                "button",
                {
                  className: "accordion-button collapsed",
                  type: "button",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#collapseTwos",
                  "aria-expanded": "false",
                  "aria-controls": "collapseTwos",
                  children: /* @__PURE__ */ jsx6("span", { className: "lang_register", children: "Get Started" })
                }
              ) }),
              /* @__PURE__ */ jsx6(
                "div",
                {
                  id: "collapseTwos",
                  className: "accordion-collapse collapse",
                  "aria-labelledby": "headingTwos",
                  "data-bs-parent": "#accordionExamples",
                  children: /* @__PURE__ */ jsxs6("div", { className: "accordion-body", children: [
                    /* @__PURE__ */ jsxs6(
                      "a",
                      {
                        className: "mbv_yuva_drop border-bottom text-decoration-none d-block py-2",
                        href: "/yuva_register",
                        "data-bs-dismiss": "modal",
                        style: { borderBottom: "1px solid #D7D7D7" },
                        children: [
                          /* @__PURE__ */ jsx6("span", { className: "lang_yuva", children: "Youth" }),
                          /* @__PURE__ */ jsx6("br", {}),
                          /* @__PURE__ */ jsx6("span", { className: "f-10-dropdown lang_applicants_volunteer", children: "Applicants/Volunteers/Participants" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs6(
                      "a",
                      {
                        className: "mbv_partner text-decoration-none d-block py-2",
                        href: "/partner_register",
                        "data-bs-dismiss": "modal",
                        style: { borderBottom: "1px solid #D7D7D7", padding: "8px 1px 3px 1px" },
                        children: [
                          /* @__PURE__ */ jsx6("span", { className: "lang_partner", children: "Partner" }),
                          /* @__PURE__ */ jsx6("br", {}),
                          /* @__PURE__ */ jsx6("span", { className: "f-10-dropdown lang_BYCN", children: "Knowledge Institution/ Businesses/Government/NGOs/Youth Club/Academia/" }),
                          /* @__PURE__ */ jsx6("br", {}),
                          /* @__PURE__ */ jsx6("span", { className: "f-10-dropdown lang_dyo_nss_register", children: "DYOs/NSS Program Officers/Placement Officers" })
                        ]
                      }
                    )
                  ] })
                }
              )
            ] }) })
          ] }) : /* @__PURE__ */ jsx6(HeaderProfileMenu, { user, webroot, variant: "mobile" })
        ] })
      ] }) })
    }
  );
};

// src/components/header/login/useHeaderLoginShell.tsx
import { useLayoutEffect as useLayoutEffect2, useState as useState3 } from "react";

// src/components/header/login/HeaderLoginModals.tsx
import { memo, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

// src/components/header/login/HeaderLogin.css
styleInject(".mb-common-header-login .uniform-modal-height .modal-dialog {\n  position: relative !important;\n}\n.mb-common-header-login .uniform-modal-height .modal-content {\n  height: 100%;\n  overflow-y: auto;\n}\n.mb-common-header-login img.logo-w-sm-md-sec {\n  width: 98px !important;\n  max-width: none !important;\n  height: auto !important;\n  object-fit: contain;\n  transform: none !important;\n  display: inline-block;\n}\n.mb-common-header-login .modal-header {\n  align-items: center !important;\n}\n.mb-common-header-login .modal-header .text-center.w-100 {\n  flex: 1 1 auto;\n  min-width: 0;\n  padding-right: 2rem;\n}\n.mb-common-header-login .form-check {\n  padding-right: 1.5em !important;\n}\n.mb-common-header-login .mr-button {\n  margin-right: 1.5rem;\n}\n.mb-common-header-login #forgot_password,\n.mb-common-header-login #login_with_pwd {\n  font-size: 14px;\n  color: #0b6bbe;\n  cursor: pointer;\n  margin-bottom: 0;\n}\n.mb-common-header-login #login_with_otp {\n  font-size: 14px;\n  color: #f15f22;\n  cursor: pointer;\n  margin-bottom: 0;\n}\n.mb-common-header-login .pipe {\n  color: #bbbbbb;\n}\n.mb-common-header-login hr {\n  margin: 20px 0 !important;\n}\n.mb-common-header-login #register_now {\n  color: #f15f22;\n  cursor: pointer;\n  font-weight: 500;\n}\n.mb-common-header-login a,\n.mb-common-header-login a:hover,\n.mb-common-header-login a:focus,\n.mb-common-header-login a:visited,\n.mb-common-header-login a:active {\n  text-decoration: none !important;\n}\n.mb-common-header-login .go-back {\n  cursor: pointer;\n  width: 350px;\n  color: rgba(80, 80, 80, 1);\n}\n.mb-common-header-login .input-error {\n  display: block;\n  color: #dc3545;\n  font-size: 0.875rem;\n  line-height: 1.3;\n}\n.mb-common-header-login .mb-common-header-login__btn {\n  color: #ffffff !important;\n  background-color: #f15b43 !important;\n  border: none !important;\n  box-shadow: none !important;\n  font-weight: 600;\n  line-height: 1.25;\n}\n.mb-common-header-login .mb-common-header-login__btn:hover,\n.mb-common-header-login .mb-common-header-login__btn:focus-visible {\n  color: #f15b43 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #f15b43 !important;\n  box-shadow: none !important;\n}\n.mb-common-header-login .mb-common-header-login__btn:focus {\n  box-shadow: none !important;\n}\n.mb-common-header-login .mb-common-header-login__btn:disabled,\n.mb-common-header-login .mb-common-header-login__btn.disabled {\n  color: #ffffff !important;\n  background-color: #f15b43 !important;\n  border: none !important;\n  opacity: 0.65;\n}\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn {\n  --bs-btn-bg: #bc4717;\n  --bs-btn-border-color: #bc4717;\n  background-color: #bc4717 !important;\n  border-radius: 9999px !important;\n  padding: 10px 22px !important;\n  min-height: 42px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn:hover,\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn:focus-visible {\n  color: #bc4717 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #bc4717 !important;\n}\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn:disabled,\n.mb-common-header-login.mb-common-header-login--header2 .mb-common-header-login__btn.disabled {\n  background-color: #bc4717 !important;\n  border: none !important;\n}\n.mb-common-header-login .form-check-input:focus {\n  box-shadow: none !important;\n}\n#mb-common-header-loader {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.3);\n  display: none;\n  justify-content: center;\n  align-items: center;\n  z-index: 3000;\n}\n#mb-common-header-loader .spinner {\n  border: 8px solid #f3f3f3;\n  border-top: 8px solid #3498db;\n  border-radius: 50%;\n  width: 50px;\n  height: 50px;\n  animation: mb-common-header-spin 1s linear infinite;\n}\n@keyframes mb-common-header-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n");

// src/components/header/login/HeaderLoginModals.tsx
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var LOGIN_BTN = "btn mb-common-header-login__btn";
function quizRegisterHref() {
  if (typeof window !== "undefined" && window.location.href.includes("/quiz")) {
    return "javascript:void(0)";
  }
  return "/yuva_register";
}
function disableShellLoginSubmitButtons() {
  document.querySelectorAll(".mb-common-header-login .login_otp_header, .mb-common-header-login .generate_otp_header").forEach((el) => {
    el.disabled = true;
  });
  const signIn = document.querySelector(".mb-common-header-login #signInButton");
  if (signIn) signIn.disabled = true;
}
function HeaderLoginModalsInner({ cdnBase, variant = "header" }) {
  useLayoutEffect(() => {
    disableShellLoginSubmitButtons();
  }, []);
  const logo = resolveCdnAssetUrl(cdnBase, "assets/img/yuva_landing/mybharatlogo_opt_2x.png");
  const rootClass = variant === "header2" ? "mb-common-header-login mb-common-header-login--header2" : "mb-common-header-login";
  const content = /* @__PURE__ */ jsxs7("div", { className: rootClass, "aria-hidden": false, children: [
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "signInModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsx7("div", { className: "text-center w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", id: "close-signIn", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check mb-1", children: [
        /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "signInModalLabel", children: "Login" }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12 mb-3", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "username", className: "form-label", children: "Mobile / Email / Username / MY Bharat ID*" }),
            /* @__PURE__ */ jsx7("input", { type: "text", className: "form-control", id: "username", name: "username", placeholder: "Enter here" })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "password", className: "form-label", children: "Password*" }),
            /* @__PURE__ */ jsxs7("div", { className: "input-group mb-3", id: "emailGroup", children: [
              /* @__PURE__ */ jsx7(
                "input",
                {
                  type: "password",
                  className: "form-control",
                  id: "password",
                  name: "password",
                  placeholder: "Enter password",
                  minLength: 8,
                  maxLength: 15
                }
              ),
              /* @__PURE__ */ jsx7("span", { className: "input-group-text", children: /* @__PURE__ */ jsx7("a", { href: "#", className: "form-control-icon", id: "togglePassword", onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx7("i", { className: "bi bi-eye-slash", "aria-hidden": "true" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx7("small", { id: "user_mobile_header_error_login", className: "input-error" })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row mt-2", style: { paddingTop: "0.4rem" }, children: /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("div", { className: "alert alert-success", id: "alertDivHeader", role: "alert", style: { fontSize: 13, padding: "0.5rem 0.7rem" }, children: "To create a new password or reset your existing one, click 'Forgot Password'" }) }) }),
        /* @__PURE__ */ jsx7("div", { className: "row mt-2", children: /* @__PURE__ */ jsxs7("div", { style: { marginLeft: 23 }, children: [
          /* @__PURE__ */ jsx7("input", { className: "form-check-input", type: "checkbox", id: "consentCheck2" }),
          /* @__PURE__ */ jsxs7("label", { className: "form-check-label", htmlFor: "consentCheck2", children: [
            "I consent to",
            " ",
            /* @__PURE__ */ jsx7("a", { href: "/pages/terms_of_use", style: { color: "#0B6BBE" }, children: "terms of use" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs7("div", { className: "row mt-2", style: { paddingTop: "0.4rem" }, children: [
          /* @__PURE__ */ jsxs7("div", { className: "col-md-8 d-flex align-items-center", children: [
            /* @__PURE__ */ jsx7("p", { id: "forgot_password", title: "To create a new password or reset your existing one, click 'Forgot Password'", children: "Forgot Password" }),
            /* @__PURE__ */ jsx7("p", { className: "mx-2 pipe", children: "|" }),
            /* @__PURE__ */ jsx7("p", { id: "login_with_otp", children: "Login with OTP" })
          ] }),
          /* @__PURE__ */ jsx7("div", { className: "col-md-4", children: /* @__PURE__ */ jsx7("button", { type: "button", id: "signInButton", className: `${LOGIN_BTN} float-end w-100 firebase-user-login-btn`, children: "Login" }) })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
          /* @__PURE__ */ jsx7("hr", { style: { height: 1, borderBottom: "1px solid #666", margin: "20px 0" } }),
          /* @__PURE__ */ jsxs7("div", { style: { fontSize: 16, textAlign: "center" }, children: [
            "New User?",
            " ",
            /* @__PURE__ */ jsx7("a", { href: quizRegisterHref(), children: /* @__PURE__ */ jsx7("span", { id: "register_now", children: "Register Now" }) })
          ] })
        ] }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "forgotPwdModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs7("span", { className: "go-back", id: "backToSignInModal", children: [
          /* @__PURE__ */ jsx7("i", { className: "bi bi-arrow-left", "aria-hidden": "true" }),
          " Go back"
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsxs7("div", { className: "modal-body", children: [
        /* @__PURE__ */ jsx7("div", { className: "form-check mb-4", children: /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "forgotPwdModalLabel", children: "Forgot Password" }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "user_mobile_header", className: "form-label", children: "Mobile / Email / Username / MY Bharat ID*" }),
            /* @__PURE__ */ jsx7("input", { type: "text", className: "form-control", id: "user_mobile_header", name: "user_mobile_header", placeholder: "Enter here..." })
          ] }),
          /* @__PURE__ */ jsx7("small", { id: "user_mobile_header_error", className: "input-error" })
        ] }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: `${LOGIN_BTN} float-end w-25 mr-button generate_otp_header mb-3`, children: "Get OTP" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "otpVerifyForgotPwdModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs7("span", { className: "go-back", id: "backToForgotPwdModal", children: [
          /* @__PURE__ */ jsx7("i", { className: "bi bi-arrow-left", "aria-hidden": "true" }),
          " Go back"
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsxs7("div", { className: "modal-body", children: [
        /* @__PURE__ */ jsx7("div", { className: "form-check", children: /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "otpVerifyForgotPwdModalLabel", children: "Verify Your Account" }),
          /* @__PURE__ */ jsxs7("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "otp-field-2", className: "form-label", children: "Enter OTP" }),
            /* @__PURE__ */ jsx7("div", { className: "input-group mb-3", children: /* @__PURE__ */ jsx7("input", { id: "otp-field-2", type: "text", className: "form-control otp-field", maxLength: 6, autoComplete: "off" }) }),
            /* @__PURE__ */ jsxs7("div", { className: "alert alert-success", role: "alert", style: { fontSize: 14, padding: "0.7rem 1rem" }, children: [
              "OTP has been sent to your ",
              /* @__PURE__ */ jsx7("span", { id: "mobEmailHeader" }),
              " . OTP is valid for 2 minutes"
            ] }),
            /* @__PURE__ */ jsxs7("div", { className: "forgot float-end", children: [
              /* @__PURE__ */ jsx7("div", { className: "otp_timer_header mb-3", children: /* @__PURE__ */ jsx7("p", { id: "timerHeader", style: { color: "#0B6BBE", fontSize: "0.8rem" } }) }),
              /* @__PURE__ */ jsx7("div", { className: "resend_otp_header mb-3", style: { display: "none" }, children: /* @__PURE__ */ jsx7("p", { id: "resendOTPHeader", style: { color: "#0B6BBE", cursor: "pointer", fontSize: "0.8rem" }, children: "Resend OTP" }) })
            ] }),
            /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("p", { id: "otp-field-2_error", className: "text-danger", style: { color: "#dc3545", fontSize: "0.8rem" } }) }),
            /* @__PURE__ */ jsx7("input", { type: "hidden", id: "verified_otp_header", defaultValue: "0" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", id: "btn-verify-otp-header", className: `${LOGIN_BTN} float-end w-25 mr-button mb-3`, children: "Verify OTP" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "newPasswordModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs7("span", { className: "go-back", id: "backToOtpVerifyForgotPwdModal", children: [
          /* @__PURE__ */ jsx7("i", { className: "bi bi-arrow-left", "aria-hidden": "true" }),
          " Go back"
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check mb-1", children: [
        /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "newPasswordModalLabel", children: "Set a New Password" }),
          /* @__PURE__ */ jsx7("div", { className: "mb-3", style: { fontSize: 15 }, children: "Create a new password. Ensure it differs from previous ones for security" }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12 mb-3", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "newPwd", className: "form-label", children: "Password*" }),
            /* @__PURE__ */ jsxs7("div", { className: "input-group", children: [
              /* @__PURE__ */ jsx7("input", { type: "password", className: "form-control", id: "newPwd", name: "newPwd", minLength: 8, maxLength: 15 }),
              /* @__PURE__ */ jsx7("span", { className: "input-group-text", children: /* @__PURE__ */ jsx7("a", { href: "#", className: "form-control-icon", id: "toggleNewPwd", onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx7("i", { className: "bi bi-eye-slash", "aria-hidden": "true" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "confirmPwd", className: "form-label", children: "Confirm Password*" }),
            /* @__PURE__ */ jsxs7("div", { className: "input-group mb-3", children: [
              /* @__PURE__ */ jsx7("input", { type: "password", className: "form-control", id: "confirmPwd", name: "confirmPwd", minLength: 8, maxLength: 15 }),
              /* @__PURE__ */ jsx7("span", { className: "input-group-text", children: /* @__PURE__ */ jsx7("a", { href: "#", className: "form-control-icon", id: "toggleConfirmPwd", onClick: (e) => e.preventDefault(), children: /* @__PURE__ */ jsx7("i", { className: "bi bi-eye-slash", "aria-hidden": "true" }) }) })
            ] }),
            /* @__PURE__ */ jsx7("div", { id: "confirmPwdHelpBlock", className: "form-text", style: { display: "none", color: "red" }, children: "Passwords do not match!" })
          ] }),
          /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("p", { id: "new_pwd_error", className: "text-danger", style: { color: "#dc3545", fontSize: "0.8rem" } }) })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "row mt-2", style: { paddingTop: "0.4rem" }, children: [
          /* @__PURE__ */ jsx7("div", { className: "col-md-6" }),
          /* @__PURE__ */ jsx7("div", { className: "col-md-6", children: /* @__PURE__ */ jsx7("button", { type: "button", id: "updatePwdButton", className: `${LOGIN_BTN} float-end w-100 mb-20 firebase-user-password-update-btn`, children: "Update Password" }) })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "successModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsx7("span", { className: "go-back", id: "backToNewPwdModal" }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check mb-1", children: [
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsx7("div", { style: { textAlign: "center", padding: 20 }, children: /* @__PURE__ */ jsx7("i", { className: "bi bi-check-circle-fill", style: { fontSize: 60, color: "#279A33" }, "aria-hidden": "true" }) }) }),
        /* @__PURE__ */ jsx7("div", { style: { fontSize: 17, fontWeight: 500, color: "#000", textAlign: "center", paddingBottom: 20 }, children: "You have successfully changed your password." }),
        /* @__PURE__ */ jsx7("div", { style: { textAlign: "center", marginTop: 15 }, children: /* @__PURE__ */ jsx7("button", { type: "button", id: "loginNowButton", className: `${LOGIN_BTN} mb-20`, children: "Login Now" }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "loginWithOtpModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsx7("span", { className: "go-back", id: "backToSignInModal2", children: "\xA0" }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", id: "close-otpLogin", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check mb-4", children: [
        /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "loginWithOtpModalLabel", children: "Login" }),
          /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "otp_login_header", id: "otp_login_header_label", className: "form-label", children: "Mobile / Email*" }),
            /* @__PURE__ */ jsx7(
              "input",
              {
                type: "text",
                className: "form-control",
                id: "otp_login_header",
                name: "otp_login_header",
                placeholder: "Enter here...",
                onInput: () => validateOtpLoginForm()
              }
            )
          ] }),
          /* @__PURE__ */ jsx7("small", { id: "otp_login_header_error", className: "input-error", style: { paddingTop: 16 } })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row mt-2", children: /* @__PURE__ */ jsxs7("div", { style: { marginLeft: 23, paddingTop: 16 }, children: [
          /* @__PURE__ */ jsx7("input", { className: "form-check-input", type: "checkbox", id: "consentCheck1", onChange: () => validateOtpLoginForm() }),
          /* @__PURE__ */ jsxs7("label", { className: "form-check-label", htmlFor: "consentCheck1", children: [
            "I consent to",
            " ",
            /* @__PURE__ */ jsx7("a", { href: "/pages/terms_of_use", style: { color: "#0B6BBE" }, children: "terms of use" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs7("div", { className: "row", style: { marginTop: 20, marginBottom: 64 }, children: [
          /* @__PURE__ */ jsx7("div", { className: "col-md-8", style: { paddingTop: 6 }, children: /* @__PURE__ */ jsx7("p", { id: "login_with_pwd", children: "Login with Password" }) }),
          /* @__PURE__ */ jsx7("div", { className: "col-md-4", children: /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              className: `${LOGIN_BTN} float-end w-100 login_otp_header firebase-user-sentOtp-btn mb-3`,
              onClick: (e) => {
                e.preventDefault();
                submitOtpLoginFromModal();
              },
              children: "Login"
            }
          ) }),
          /* @__PURE__ */ jsx7("p", { children: /* @__PURE__ */ jsx7("b", { children: "International users, please sign in using your registered Email ID only" }) })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsxs7("div", { className: "col-md-12", children: [
          /* @__PURE__ */ jsx7("hr", { style: { height: 1, borderBottom: "1px solid #666", margin: "20px 0" } }),
          /* @__PURE__ */ jsxs7("div", { style: { fontSize: 16, textAlign: "center" }, children: [
            "New User?",
            " ",
            /* @__PURE__ */ jsx7("a", { href: quizRegisterHref(), children: /* @__PURE__ */ jsx7("span", { id: "register_now", children: "Register Now" }) })
          ] })
        ] }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { className: "modal fade uniform-modal-height", id: "loginWIthOtpVerifyModal", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "modal-dialog modal-dialog-centered", children: /* @__PURE__ */ jsxs7("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs7("div", { className: "modal-header d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ jsxs7("span", { className: "go-back", id: "backTologinWithOtpModal", children: [
          /* @__PURE__ */ jsx7("i", { className: "bi bi-arrow-left", "aria-hidden": "true" }),
          " Go back"
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "text-start w-100", children: /* @__PURE__ */ jsx7("img", { src: logo, className: "logo-w-sm-md-sec", alt: "MY Bharat" }) }),
        /* @__PURE__ */ jsx7("button", { type: "button", className: "btn-close", "data-bs-dismiss": "modal", "aria-label": "Close" })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "modal-body", children: /* @__PURE__ */ jsxs7("div", { className: "form-check", children: [
        /* @__PURE__ */ jsxs7("div", { className: "row", children: [
          /* @__PURE__ */ jsx7("h5", { className: "modal-title mb-3", id: "loginWIthOtpVerifyModalLabel", children: "Verify Your Account" }),
          /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsx7("label", { htmlFor: "otp-field-3", className: "form-label", children: "Enter OTP" }),
            /* @__PURE__ */ jsx7("div", { className: "input-group mb-3", children: /* @__PURE__ */ jsx7("input", { id: "otp-field-3", type: "text", className: "form-control otp-field", maxLength: 6, autoComplete: "off" }) }),
            /* @__PURE__ */ jsxs7("div", { className: "alert alert-success", id: "alertVerifyHeader", role: "alert", style: { fontSize: 14, padding: "0.7rem 0.8rem" }, children: [
              "OTP has been sent to your ",
              /* @__PURE__ */ jsx7("span", { id: "mobEmailConfirm" }),
              " . OTP is valid for 2 minutes"
            ] }),
            /* @__PURE__ */ jsxs7("div", { className: "forgot float-end", children: [
              /* @__PURE__ */ jsx7("div", { className: "otp_timer_header mb-3", children: /* @__PURE__ */ jsx7("p", { id: "timerHeaderOtp", style: { color: "#0B6BBE", fontSize: "0.8rem" } }) }),
              /* @__PURE__ */ jsx7("div", { className: "resend_otp_header mb-3", style: { display: "none" }, children: /* @__PURE__ */ jsx7("p", { id: "resendOTPVerifyHeader", style: { color: "#0B6BBE", cursor: "pointer", fontSize: "0.8rem" }, children: "Resend OTP" }) })
            ] }),
            /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("p", { id: "otp-field-3_error", className: "text-danger", style: { color: "#dc3545", fontSize: "0.8rem" } }) }),
            /* @__PURE__ */ jsx7("input", { type: "hidden", id: "verify_otp_header", defaultValue: "0" })
          ] })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsx7("button", { type: "button", id: "btn-otp-verify-header", className: `${LOGIN_BTN} float-end mb-3 firebase-user-otplogin-btn`, children: "Verify OTP" }) }) }),
        /* @__PURE__ */ jsx7("div", { className: "row", children: /* @__PURE__ */ jsx7("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs7("div", { style: { fontSize: 16, textAlign: "center", borderTop: "1px solid #ccc", paddingTop: 10 }, children: [
          "New User?",
          " ",
          /* @__PURE__ */ jsx7("a", { href: quizRegisterHref(), children: /* @__PURE__ */ jsx7("span", { id: "register_now", children: "Register Now" }) })
        ] }) }) })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx7("div", { id: "mb-common-header-loader", "aria-hidden": "true", children: /* @__PURE__ */ jsx7("div", { className: "spinner" }) })
  ] });
  return createPortal(content, document.body);
}
var HeaderLoginModals = memo(HeaderLoginModalsInner);

// src/components/header/login/useHeaderLoginShell.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
function useHeaderLoginShell(enabled = true) {
  const [showModals] = useState3(() => !hostHasLoginModals());
  useLayoutEffect2(() => {
    if (!enabled) return void 0;
    return installHeaderLoginFlow();
  }, [enabled]);
  return enabled && showModals;
}
function HeaderLoginShellPortal({
  cdnBase,
  enabled = true,
  variant = "header"
}) {
  const showModals = useHeaderLoginShell(enabled);
  if (!showModals) return null;
  return /* @__PURE__ */ jsx8(HeaderLoginModals, { cdnBase, variant });
}

// src/components/header/login/useHeaderLoginConfig.ts
import { useEffect as useEffect3 } from "react";
function applyHeaderLoginConfig(config) {
  assertRequiredClientConfig({
    baseUrl: config?.baseUrl,
    apiBaseUrl: config?.apiBaseUrl,
    environment: config?.environment,
    cdnBase: config?.cdnBase
  });
  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const environment = config?.environment?.trim();
  const oauthUsername = config?.oauthUsername?.trim();
  const oauthPassword = config?.oauthPassword?.trim();
  const ipAddress = config?.ipAddress?.trim();
  const publicProfileApiBaseUrl = config?.publicProfileApiBaseUrl?.trim();
  const cookieDomain = config?.cookieDomain?.trim();
  const cdnBase = config?.cdnBase?.trim();
  if (!baseUrl && !apiBaseUrl && !environment && !cdnBase && !oauthUsername && !oauthPassword && !ipAddress && !publicProfileApiBaseUrl && !cookieDomain) {
    return;
  }
  if (apiBaseUrl) applyShellLoginApiConfig(apiBaseUrl);
  window.MYBHARAT_SHELL = {
    ...window.MYBHARAT_SHELL,
    ...cdnBase ? {
      header: { ...window.MYBHARAT_SHELL?.header, cdnBase },
      footer: { ...window.MYBHARAT_SHELL?.footer, cdnBase }
    } : {},
    login: {
      ...window.MYBHARAT_SHELL?.login,
      ...baseUrl ? { baseUrl } : {},
      ...apiBaseUrl ? { apiBaseUrl } : {},
      ...environment ? { environment } : {},
      ...oauthUsername ? { oauthUsername } : {},
      ...oauthPassword ? { oauthPassword } : {},
      ...ipAddress ? { ipAddress } : {},
      ...publicProfileApiBaseUrl ? { publicProfileApiBaseUrl } : {},
      ...cookieDomain ? { cookieDomain } : {}
    }
  };
}
function useHeaderLoginConfig(config) {
  applyHeaderLoginConfig(config);
  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const environment = config?.environment?.trim();
  const oauthUsername = config?.oauthUsername?.trim();
  const oauthPassword = config?.oauthPassword?.trim();
  const ipAddress = config?.ipAddress?.trim();
  const publicProfileApiBaseUrl = config?.publicProfileApiBaseUrl?.trim();
  const cookieDomain = config?.cookieDomain?.trim();
  const cdnBase = config?.cdnBase?.trim();
  useEffect3(() => {
    applyHeaderLoginConfig({
      baseUrl,
      apiBaseUrl,
      environment,
      cdnBase,
      oauthUsername,
      oauthPassword,
      ipAddress,
      publicProfileApiBaseUrl,
      cookieDomain
    });
  }, [
    baseUrl,
    apiBaseUrl,
    environment,
    cdnBase,
    oauthUsername,
    oauthPassword,
    ipAddress,
    publicProfileApiBaseUrl,
    cookieDomain
  ]);
}

// src/components/header/useHeaderAccessibilityFont.ts
import { useEffect as useEffect4 } from "react";

// src/components/header/headerAccessibilityFont.ts
var STEP_SIZE = 2;
var MAX_STEPS = 3;
var STORAGE_KEY = AUTH_CONFIG.storageKeys.accessibilityFont;
var HTML_ACTIVE_CLASS = "mb-accessibility-font-active";
var listenerCount = 0;
var currentStep = 0;
var originalRootFontSize = null;
function clampStep(step) {
  return Math.max(-MAX_STEPS, Math.min(MAX_STEPS, step));
}
function readStoredStep() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return 0;
    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) ? clampStep(parsed) : 0;
  } catch {
    return 0;
  }
}
function ensureOriginalRootFontSize() {
  if (originalRootFontSize !== null) return originalRootFontSize;
  const html = document.documentElement;
  const previousInline = html.style.fontSize;
  html.style.fontSize = "";
  originalRootFontSize = parseFloat(getComputedStyle(html).fontSize) || 16;
  if (previousInline) html.style.fontSize = previousInline;
  return originalRootFontSize;
}
function rootSupportsZoom() {
  return typeof CSS !== "undefined" && CSS.supports?.("zoom", "1") === true;
}
function updateButtonActiveState() {
  const decrease = document.getElementById("decreasetext");
  const reset = document.getElementById("resettext");
  const increase = document.getElementById("increasetext");
  decrease?.classList.toggle("active01", currentStep < 0);
  reset?.classList.toggle("active01", currentStep === 0);
  increase?.classList.toggle("active01", currentStep > 0);
}
function applyAccessibilityFont() {
  const html = document.documentElement;
  const base = ensureOriginalRootFontSize();
  const delta = currentStep * STEP_SIZE;
  const nextSize = base + delta;
  const ratio = nextSize / base;
  const useZoom = rootSupportsZoom();
  html.style.setProperty("--mb-font-step", String(currentStep));
  html.style.setProperty("--mb-font-delta", `${delta}px`);
  html.style.setProperty("--mb-font-ratio", String(ratio));
  if (currentStep === 0) {
    html.classList.remove(HTML_ACTIVE_CLASS);
    html.style.zoom = "";
    html.style.fontSize = "";
    document.body.style.fontSize = "";
  } else {
    html.classList.add(HTML_ACTIVE_CLASS);
    if (useZoom) {
      html.style.zoom = String(ratio);
      html.style.fontSize = "";
      document.body.style.fontSize = "";
    } else {
      html.style.zoom = "";
      html.style.fontSize = `${nextSize}px`;
      document.body.style.fontSize = `${nextSize}px`;
    }
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, String(currentStep));
  } catch {
  }
  updateButtonActiveState();
}
function handleFontControl(action) {
  if (action === "increase") {
    if (currentStep >= MAX_STEPS) return;
    currentStep += 1;
  } else if (action === "decrease") {
    if (currentStep <= -MAX_STEPS) return;
    currentStep -= 1;
  } else {
    currentStep = 0;
  }
  applyAccessibilityFont();
}
function onDocumentClick2(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const control = target.closest("#increasetext, #decreasetext, #resettext");
  if (!control) return;
  event.preventDefault();
  if (control.id === "increasetext") handleFontControl("increase");
  else if (control.id === "decreasetext") handleFontControl("decrease");
  else if (control.id === "resettext") handleFontControl("reset");
}
function installHeaderAccessibilityFont() {
  if (listenerCount === 0) {
    currentStep = readStoredStep();
    ensureOriginalRootFontSize();
    applyAccessibilityFont();
    document.addEventListener("click", onDocumentClick2, true);
  }
  listenerCount += 1;
  return () => {
    listenerCount = Math.max(0, listenerCount - 1);
    if (listenerCount === 0) {
      document.removeEventListener("click", onDocumentClick2, true);
    }
  };
}

// src/components/header/useHeaderAccessibilityFont.ts
function useHeaderAccessibilityFont(enabled = true) {
  useEffect4(() => {
    if (!enabled) return void 0;
    return installHeaderAccessibilityFont();
  }, [enabled]);
}

// src/hooks/useBhashiniWidgetPlacement.ts
import { useEffect as useEffect5, useCallback as useCallback2 } from "react";

// src/utils/loadBhashiniScript.ts
var BHASHINI_SCRIPT_URL = EXTERNAL_URLS.thirdParty.bhashiniScript;
var BHASHINI_LANGUAGE_LIST = EXTERNAL_URLS.thirdParty.bhashiniLanguages;
var BHASHINI_WIDGET_SELECTORS = [
  "#bhashini-translation",
  ".bhashini-plugin-container .bhashini-dropdown",
  ".bhashini-translator-widget"
];
var loadPromise = null;
function findBhashiniWidget(root) {
  const scope = root ?? document;
  for (const selector of BHASHINI_WIDGET_SELECTORS) {
    const el = scope.querySelector(selector);
    if (el instanceof HTMLElement) return el;
  }
  return null;
}
function appendBhashiniScriptTag() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = BHASHINI_SCRIPT_URL;
    script.async = false;
    script.setAttribute("language-icon-color", "#fff");
    script.setAttribute("translation-language-list", BHASHINI_LANGUAGE_LIST);
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Bhashini script"));
    document.body.appendChild(script);
  });
}
function loadBhashiniScript() {
  if (findBhashiniWidget()) {
    return Promise.resolve();
  }
  if (loadPromise) return loadPromise;
  const existingScript = document.querySelector(`script[src="${BHASHINI_SCRIPT_URL}"]`);
  if (existingScript) {
    existingScript.remove();
    loadPromise = null;
  }
  loadPromise = appendBhashiniScriptTag().catch((err) => {
    loadPromise = null;
    throw err;
  });
  return loadPromise;
}

// src/hooks/useBhashiniWidgetPlacement.ts
var MOBILE_BREAKPOINT = 768;
var MOUNT_ID = "bhashini-plugin-mount";
var DESKTOP_SLOT_ID = "bhashini-desktop-header";
var MOBILE_SLOT_ID = "bhashini-mobile-header";
var MAX_POLL_MS = 3e4;
function isDesktopSlotVisible() {
  const desktopHeader = document.getElementById(DESKTOP_SLOT_ID);
  const topStrip = desktopHeader?.closest(".header-top");
  if (topStrip) {
    return window.getComputedStyle(topStrip).display !== "none";
  }
  return window.innerWidth >= MOBILE_BREAKPOINT;
}
function isSlotVisible(slot) {
  if (!slot) return false;
  return window.getComputedStyle(slot).display !== "none" && slot.offsetParent !== null;
}
function useBhashiniWidgetPlacement(enabled = true) {
  const moveBhashiniToTarget = useCallback2(() => {
    const mount = document.getElementById(MOUNT_ID);
    const widget = findBhashiniWidget(mount ?? document);
    const mobileHeader = document.getElementById(MOBILE_SLOT_ID);
    const desktopHeader = document.getElementById(DESKTOP_SLOT_ID);
    if (!widget) return false;
    const useDesktop = isDesktopSlotVisible() && isSlotVisible(desktopHeader);
    const target = useDesktop ? desktopHeader : mobileHeader;
    if (target && !target.contains(widget)) {
      target.appendChild(widget);
    }
    if (mount) {
      const empty = mount.childElementCount === 0;
      mount.classList.toggle("mb-common-header__bhashini-mount--empty", empty);
      mount.setAttribute("aria-hidden", empty ? "true" : "false");
    }
    return Boolean(target?.contains(widget));
  }, []);
  const pollUntilWidgetReady = useCallback2(() => {
    const started = Date.now();
    const tryMove = () => {
      if (moveBhashiniToTarget()) return;
      if (Date.now() - started > MAX_POLL_MS) {
        console.warn("[Bhashini] Widget not found after 30s \u2014 check script/CSP and .bhashini-plugin-container mount");
        return;
      }
      setTimeout(tryMove, 300);
    };
    tryMove();
  }, [moveBhashiniToTarget]);
  useEffect5(() => {
    if (!enabled) return;
    let resizeTimer;
    let cancelled = false;
    const init = async () => {
      const mount = document.getElementById(MOUNT_ID);
      if (!mount) {
        console.warn("[Bhashini] Mount #bhashini-plugin-mount missing");
        return;
      }
      try {
        await loadBhashiniScript();
        if (!cancelled) pollUntilWidgetReady();
      } catch (e) {
        console.error("[Bhashini] Script load failed", e);
      }
    };
    init();
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(moveBhashiniToTarget, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, [enabled, moveBhashiniToTarget, pollUntilWidgetReady]);
  useEffect5(() => {
    if (!enabled) return;
    const id = setTimeout(moveBhashiniToTarget, 300);
    return () => clearTimeout(id);
  }, [enabled, moveBhashiniToTarget]);
}

// src/components/header/HeaderAuthControls.tsx
import { Fragment as Fragment3, jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function HeaderAuthControls({ cdn, userSession, webroot }) {
  const user = parseHeaderUserSession(userSession);
  if (user) {
    return /* @__PURE__ */ jsx9(HeaderProfileMenu, { user, webroot, variant: "desktop" });
  }
  return /* @__PURE__ */ jsxs8(Fragment3, { children: [
    /* @__PURE__ */ jsx9(
      "button",
      {
        id: "btnGroupDrop1",
        type: "button",
        className: "btn mb-common-header__auth-btn",
        onClick: (e) => {
          e.preventDefault();
          openLoginWithOtpModal();
        },
        children: /* @__PURE__ */ jsx9("span", { className: "lang_yuva_register_login_link fontchange", children: "Sign In" })
      }
    ),
    /* @__PURE__ */ jsx9("a", { href: "/yuva_register", className: "mb-common-header__register-link text-decoration-none", children: /* @__PURE__ */ jsx9("button", { id: "btnGroupDrop2", type: "button", className: "btn mb-common-header__auth-btn", children: /* @__PURE__ */ jsx9("span", { className: "fontchange", children: "Register Now" }) }) }),
    "\xA0\xA0",
    /* @__PURE__ */ jsx9("div", { className: "btn-group", role: "group", children: /* @__PURE__ */ jsx9("div", { className: "dropdown-menu dropdown-menu-header", "aria-labelledby": "btnGroupDrop1", children: /* @__PURE__ */ jsxs8("a", { className: "dropdown-item border-bottom", href: "/yuva_register", children: [
      /* @__PURE__ */ jsx9("img", { src: resolveCdnAssetUrl(cdn, "assets/img/yuva_landing/youth_icon1.png"), alt: "" }),
      " ",
      /* @__PURE__ */ jsx9("span", { className: "lang_yuva", children: "Youth" }),
      /* @__PURE__ */ jsx9("br", {}),
      " ",
      /* @__PURE__ */ jsx9("span", { className: "f-12-dropdown lang_applicants_volunteer", children: "Applicants/Volunteers/Participants" })
    ] }) }) })
  ] });
}

// src/components/Header.tsx
import { Fragment as Fragment4, jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var Header = ({
  title = "MyBharat",
  cdnBase,
  mainNavItems,
  userSession,
  webroot,
  baseUrl,
  apiBaseUrl,
  environment,
  oauthUsername,
  oauthPassword,
  ipAddress,
  publicProfileApiBaseUrl,
  cookieDomain,
  bhashini = true
}) => {
  useHeaderLoginConfig({
    baseUrl,
    apiBaseUrl,
    environment,
    oauthUsername,
    oauthPassword,
    ipAddress,
    publicProfileApiBaseUrl,
    cookieDomain,
    cdnBase
  });
  useHeaderAccessibilityFont();
  useBhashiniWidgetPlacement(bhashini);
  const cdn = resolveCdnBase({ cdnBase });
  const menuPortalReady = useMbHeaderBootstrapAndPortal(cdn);
  const navItems = mainNavItems;
  const loggedIn = isHeaderUserLoggedIn(userSession);
  return /* @__PURE__ */ jsxs9(Fragment4, { children: [
    /* @__PURE__ */ jsxs9("header", { id: "mb-common-header-root", className: "fixed-top shadow mb-common-header", "aria-label": title, children: [
      /* @__PURE__ */ jsx10(
        "div",
        {
          id: "bhashini-plugin-mount",
          className: "bhashini-plugin-container mb-common-header__bhashini-mount",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx10(HeaderGovernmentStrip, { cdn }),
      /* @__PURE__ */ jsx10("div", { className: "header-area header-white bg-white pt-10 pb-10 mt-sm-0 mb-common-header__header-area", children: /* @__PURE__ */ jsx10("div", { className: "container", children: /* @__PURE__ */ jsxs9("div", { className: "row align-items-center gx-2", children: [
        /* @__PURE__ */ jsx10(HeaderMobileStrip, { cdn, variant: "split" }),
        /* @__PURE__ */ jsx10("nav", { className: "d-none", id: "mb-nav-mobile-quick", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx10("div", { className: "col-xl-2 col-lg-2 d-none d-lg-flex min-w-0 justify-content-start mb_new1", children: /* @__PURE__ */ jsx10(HeaderBrandLogos, { cdn, layout: "desktop" }) }),
        /* @__PURE__ */ jsxs9("div", { className: "col-xl-10 col-lg-10 d-none d-lg-block", children: [
          /* @__PURE__ */ jsx10("div", { className: "main-menu f-hd-right d-none d-md-block", children: /* @__PURE__ */ jsxs9("nav", { className: "navbar navbar-expand-lg navbar-light", id: "mb-nav-desktop-main", "aria-label": "Main navigation", children: [
            /* @__PURE__ */ jsx10(DesktopMainNav, { items: navItems }),
            /* @__PURE__ */ jsx10(HeaderAuthControls, { cdn, userSession, webroot })
          ] }) }),
          /* @__PURE__ */ jsx10("div", { className: "f-hd-right d-sm-none1 mt-10", children: /* @__PURE__ */ jsx10("button", { type: "button", className: "btn btn-light", "data-bs-toggle": "modal", "data-bs-target": "#mobileMenuNew", children: /* @__PURE__ */ jsx10("i", { className: "fa fa-bars fa-fw ", "aria-hidden": "true" }) }) })
        ] })
      ] }) }) })
    ] }),
    menuPortalReady ? createPortal2(
      /* @__PURE__ */ jsx10(MobileMenuModal, { cdnBase: cdn, items: navItems, userSession, webroot }),
      document.body
    ) : null,
    !loggedIn ? /* @__PURE__ */ jsx10(HeaderLoginShellPortal, { cdnBase: cdn, variant: "header" }) : null
  ] });
};
var Header_default = Header;

// src/components/Header2.tsx
import { createPortal as createPortal3 } from "react-dom";

// src/components/Header2.css
styleInject(".main-menu ul li {\n  display: inline-block;\n  margin: 0 3px;\n  position: relative;\n  list-style: none;\n}\n.main-menu ul li a {\n  color: #000000;\n  display: list-item;\n  list-style: none;\n  line-height: 1;\n  padding: 6px 4px !important;\n  font-size: 13px;\n  font-weight: 600 !important;\n  position: relative;\n  transition: all 0.3s ease-in-out;\n  text-decoration: none !important;\n}\n.dropevent i.fa-chevron-down {\n  display: inline-block;\n  transform: rotate(0deg);\n  transition: transform 0.3s ease-in-out;\n  margin-left: 4px;\n}\n.dropdown_evnt_prog.active > .dropevent_content {\n  display: block !important;\n}\n.dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(-90deg);\n}\n.dropevent_content .dropdown_evnt_prog.active > .dropevent_content {\n  display: block !important;\n}\n.dropevent_content .dropdown_evnt_prog.active > .dropevent i.fa-chevron-down {\n  transform: rotate(-90deg);\n}\n.header-area {\n  background-size: cover;\n}\n@media (max-width: 991.98px) {\n  header#mb-common-header-root.mb-common-header .header-area.mb-common-header__header-area {\n    padding-top: 0.45rem !important;\n    padding-bottom: 0.45rem !important;\n  }\n}\n.mb-common-header__mobile-bar--h2 {\n  position: relative;\n  z-index: 2;\n}\n.mb-common-header__mobile-bar--h2 .mb-common-header__mobile-row--h2 {\n  align-items: center !important;\n  gap: 0.5rem;\n}\n.mb-common-header__mobile-bar--h2 .mb-common-header__mobile-logos--h2 {\n  flex: 0 1 auto;\n  justify-content: flex-start;\n  align-items: center;\n  align-self: center;\n}\n@media (max-width: 991.98px) {\n  header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 0.25rem 0.35rem;\n    width: 100%;\n    min-width: 0;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-logos--h2 {\n    flex: 0 0 auto;\n    min-width: 0;\n    max-width: none;\n    align-items: center;\n    overflow: visible;\n    padding-right: 2px;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-actions--h2 {\n    flex: 1 1 auto;\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: flex-end !important;\n    gap: 0.35rem;\n    min-width: 0;\n    float: none !important;\n    margin-top: 0 !important;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-actions--h2 #toll_mb .lang_toll_free {\n    justify-content: flex-end;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    padding-top: 0.3rem !important;\n    padding-bottom: 0.3rem !important;\n  }\n}\n.mb-common-header__mobile-bar--h2 #toll_mb.skip01,\n.mb-common-header__mobile-bar--h2 #toll_mb.mb-common-header__toll-link--h2 {\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n  flex: 0 1 auto;\n  min-width: 0;\n  color: rgb(13 110 253);\n  text-decoration: none !important;\n  line-height: 1;\n}\n.mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free {\n  font-size: clamp(11px, 3vw, 14px);\n  font-weight: 700;\n  line-height: 1.15;\n  color: rgb(13 110 253);\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35em;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n  display: inline-block;\n  font-size: 0.95em;\n  line-height: 1;\n  vertical-align: middle;\n  transform: rotate(180deg);\n}\n@media (min-width: 1000px) {\n  .mb-common-header__mobile-bar--h2 #toll_mb,\n  .mb-common-header__mobile-bar--h2 #mb_menus {\n    position: static !important;\n    right: auto !important;\n    top: auto !important;\n  }\n}\n.mb-common-header__mobile-bar--h2 #mb_menus {\n  position: static !important;\n  right: auto !important;\n  top: auto !important;\n}\n@media (max-width: 575.98px) {\n  header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free .mb-common-header__toll-phone-icon {\n    font-size: 0.88em;\n  }\n  .dropdown-menu-header a,\n  .dropdown-item,\n  .dropdown-menu-header a.border-bottom {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n  .dropdown-menu-header a:hover,\n  .dropdown-menu-header a:focus,\n  .dropdown-item:hover,\n  .dropdown-item:focus {\n    text-decoration: none !important;\n    border: none !important;\n    border-bottom: none !important;\n  }\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n  width: auto !important;\n  height: auto !important;\n  min-width: 0 !important;\n  padding: 6px !important;\n  display: inline-flex !important;\n  align-items: center;\n  justify-content: center;\n  background-color: #bc4717 !important;\n  border: none !important;\n  color: #ffffff !important;\n  border-radius: 10px !important;\n  box-shadow: none !important;\n  line-height: 1 !important;\n  flex: 0 0 auto !important;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2:hover {\n  background-color: #9a3a13 !important;\n  color: #ffffff !important;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2:focus-visible {\n  background-color: #9a3a13 !important;\n  color: #ffffff !important;\n  outline: 2px solid rgb(13 110 253);\n  outline-offset: 2px;\n}\nheader.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2 .fa {\n  color: #ffffff !important;\n  font-size: 1rem;\n  line-height: 1;\n}\n@media (max-width: 575.98px) {\n  header.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2,\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n    padding: 0.28rem 0.5rem !important;\n  }\n  header.mb-common-header--header2 .mb-common-header__mobile-menu-btn--h2 .fa,\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 .fa {\n    font-size: 1rem !important;\n  }\n}\nheader.mb-common-header--header2.mb-common-header .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n  border: none !important;\n}\n.new_head a img {\n  padding-right: 6px;\n  padding-left: 6px;\n}\n.new_head1 {\n  border-right: 1px solid #bdbdbd;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__register-link {\n  display: inline-block;\n  vertical-align: middle;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop1.btn.mb-common-header__auth-btn,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop2.btn.mb-common-header__auth-btn {\n  --bs-btn-bg: #bc4717;\n  --bs-btn-border-color: #bc4717;\n  color: #ffffff !important;\n  background-color: #bc4717 !important;\n  border: none !important;\n  border-radius: 9999px !important;\n  padding: 10px 22px !important;\n  font-weight: 600 !important;\n  line-height: 1.25 !important;\n  box-shadow: none !important;\n  min-height: 42px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop1.btn.mb-common-header__auth-btn:hover,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop1.btn.mb-common-header__auth-btn:focus-visible,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop2.btn.mb-common-header__auth-btn:hover,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 #btnGroupDrop2.btn.mb-common-header__auth-btn:focus-visible {\n  color: #bc4717 !important;\n  background-color: #ffffff !important;\n  border: 1px solid #bc4717 !important;\n  box-shadow: none !important;\n}\n@media (min-width: 992px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .logo-w-sm-md-sec {\n    width: 98px !important;\n    transform: scale(1.12);\n    margin-left: 7px;\n    margin-top: 5px;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .logo-w-sm-md1 {\n    width: 90px !important;\n  }\n  body:has(header#mb-common-header-root.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md-sec {\n    width: 98px !important;\n    transform: scale(1.12);\n  }\n  body:has(header#mb-common-header-root.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md1 {\n    width: 90px !important;\n    max-width: none !important;\n    height: auto !important;\n  }\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n}\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md1,\nheader#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md-sec {\n  flex-shrink: 1;\n  min-width: 0;\n  object-fit: contain;\n  height: auto !important;\n  max-width: none !important;\n}\n@media only screen and (max-width: 991.98px) {\n  body:has(header.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md1 {\n    width: 90px !important;\n    max-width: none !important;\n    height: auto !important;\n  }\n  body:has(header.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md-sec {\n    width: 98px !important;\n    max-width: none !important;\n    height: auto !important;\n    transform: scale(1.12) !important;\n  }\n}\n@media only screen and (max-width: 999px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head {\n    align-items: center !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md1,\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head img.logo-w-sm-md-sec {\n    width: 70px !important;\n    max-width: 70px !important;\n    min-width: 0 !important;\n    height: auto !important;\n    max-height: 48px !important;\n    object-fit: contain !important;\n    transform: none !important;\n    margin-left: 0 !important;\n    margin-top: 0 !important;\n    flex-shrink: 0 !important;\n  }\n}\n@media only screen and (max-width: 600px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .logo-w-sm-md1,\n  body:has(header#mb-common-header-root.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md1 {\n    width: 70px !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .logo-w-sm-md-sec,\n  body:has(header#mb-common-header-root.mb-common-header--header2) #mobileMenuNew img.logo-w-sm-md-sec {\n    width: 70px !important;\n    transform: none !important;\n  }\n}\n.f-12-dropdown {\n  padding-left: 24px;\n  color: #000000;\n  font-weight: 400;\n  font-size: 12px;\n}\n.dropdown-menu-header {\n  background: #ffffff;\n  border: 1px solid #f15b43;\n  border-radius: 10px;\n}\n.dropdown-menu-header a.border-bottom {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a.border-bottom:hover,\n.dropdown-menu-header a.border-bottom:focus {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n.dropdown-menu-header a {\n  padding-top: 4px;\n  padding-bottom: 10px;\n  text-decoration: none !important;\n}\n.dropdown_evnt_prog {\n  position: relative;\n  display: inline-block;\n}\n.dropevent {\n  background-color: #ffffff;\n  color: #000000;\n  padding: 6px 4px;\n  font-size: 13px;\n  font-weight: 600;\n  border: none;\n}\n.dropevent_content {\n  display: none;\n  position: absolute;\n  background-color: #fff;\n  min-width: 180px;\n  z-index: 1;\n  border: 1px solid #dcdcdc;\n  border-radius: 4px;\n  left: -25px;\n}\n.dropevent_content > .fa.fa-caret-up {\n  position: absolute;\n  top: -10px;\n  left: 43%;\n  color: #bc4717;\n}\n.dropevent_content a {\n  color: black;\n  border-bottom: 1px solid #dcdcdc;\n  padding: 12px 16px;\n  text-decoration: none;\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n}\n.dropevent_content a:hover {\n  background-color: #fff;\n}\n.dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.dropevent_content .dropdown_evnt_prog {\n  display: block;\n  width: 100%;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent {\n  width: 100%;\n  text-align: left;\n  border-top: 1px solid #dcdcdc;\n}\n.dropevent_content .dropdown_evnt_prog .dropevent_content {\n  left: 100%;\n  top: 0;\n  margin-left: 2px;\n  z-index: 2;\n}\n.dropevent_content .dropdown_evnt_prog:hover > .dropevent_content {\n  display: block;\n}\n.pull-right {\n  margin-left: 30px;\n}\n.header_img {\n  text-align: center;\n  top: 0 !important;\n}\n.user-info-wrapper {\n  display: block;\n  margin: 0;\n  width: 46px;\n  height: 46px;\n  background: #6c757d8a;\n  border-radius: 50px;\n  padding: 3px;\n  float: left;\n}\n.user-info-wrapper .profile-wrapper {\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  display: inline-block;\n}\n.chat-toggler .user-details {\n  float: left;\n  line-height: 0;\n  color: #003d52;\n}\n.chat-toggler .dropdown-menu {\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.5);\n}\n.chat-toggler .dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.chat-toggler .dropdown-menu[data-bs-popper] {\n  top: 92%;\n}\n.chat-toggler .dropdown-menu li {\n  display: block !important;\n}\n.chat-toggler .dropdown-menu li a i {\n  font-size: 12px;\n}\n.chat-toggler .dropdown-menu > li > a {\n  line-height: 25px !important;\n  color: #003d52 !important;\n  margin: 4px;\n  border-radius: 3px;\n  text-align: left;\n  font-size: 14px !important;\n  font-weight: 400 !important;\n  padding: 3px 20px !important;\n}\n.chat-toggler .dropdown-menu > li > a:hover {\n  text-decoration: none;\n  background-color: #eff2f3;\n  background-image: none;\n}\nheader#mb-common-header-root.mb-common-header .dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  list-style: none;\n  text-shadow: none;\n  box-shadow: 0 0 5px rgba(86, 96, 117, 0.2);\n  border: none;\n  border-radius: 3px;\n  padding: 0;\n  font-size: 13px;\n}\nheader#mb-common-header-root.mb-common-header .mb-common-header__profile.dropdown.show > .dropdown-menu,\nheader#mb-common-header-root.mb-common-header .mb-common-header__profile .dropdown-menu.show {\n  display: block !important;\n}\nheader#mb-common-header-root.mb-common-header .header-area,\nheader#mb-common-header-root.mb-common-header .main-menu,\nheader#mb-common-header-root.mb-common-header #mb-nav-desktop-main,\nheader#mb-common-header-root.mb-common-header .mb-common-header__profile {\n  overflow: visible !important;\n}\n@media only screen and (max-width: 600px) {\n  .header-area {\n    min-height: 56px;\n  }\n}\n@media only screen and (max-width: 1000px) {\n  .header-top,\n  .main-menu {\n    display: none !important;\n  }\n  header.mb-common-header .d-sm-none1 {\n    display: block !important;\n  }\n  .header-area .justify-content-sm-end {\n    justify-content: flex-start !important;\n  }\n}\n@media only screen and (max-width: 575.98px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-row--h2 {\n    gap: 0.25rem !important;\n    padding-left: 4px !important;\n    padding-right: 2px !important;\n  }\n}\n@media only screen and (max-width: 999px) {\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .header-area {\n    height: 60px;\n    min-height: 56px;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .header-area .container {\n    padding-left: 8px;\n    padding-right: 8px;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .mb-common-header__mobile-row--h2 {\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 0.35rem !important;\n    width: 100%;\n    min-height: 52px;\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .mb-common-header__mobile-logos--h2 {\n    flex: 0 1 auto !important;\n    align-items: center !important;\n    min-width: 0;\n    max-width: calc(100% - 158px);\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #bhashini-mobile-header {\n    flex: 0 0 28px !important;\n    width: 28px;\n    min-width: 28px;\n    height: 24px;\n    display: inline-block;\n    margin-right: 0.1rem;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .new_head {\n    align-items: center !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 .mb-common-header__mobile-actions--h2 {\n    flex: 1 1 auto !important;\n    display: flex !important;\n    flex-wrap: nowrap !important;\n    align-items: center !important;\n    justify-content: flex-end !important;\n    gap: 0.4rem !important;\n    min-width: 0;\n    float: none !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb,\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus {\n    position: static !important;\n    float: none !important;\n    right: auto !important;\n    top: auto !important;\n    left: auto !important;\n    bottom: auto !important;\n    margin: 0 !important;\n    z-index: auto !important;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb {\n    display: inline-flex !important;\n    align-items: center !important;\n    font-size: 10px !important;\n    white-space: nowrap;\n    flex: 0 1 auto;\n    min-width: 0;\n    color: rgb(13 110 253);\n    text-decoration: none;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #toll_mb .lang_toll_free {\n    font-size: 10px !important;\n    font-weight: 700 !important;\n    line-height: 1.1 !important;\n    gap: 0.2em !important;\n    align-items: center !important;\n    display: inline-flex !important;\n    color: rgb(13 110 253);\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    flex: 0 0 auto !important;\n    width: auto !important;\n    height: auto !important;\n    min-width: 0 !important;\n    padding: 6px !important;\n    background-color: #bc4717 !important;\n    border: none !important;\n    color: #ffffff !important;\n    border-radius: 10px !important;\n    box-shadow: none !important;\n    margin-left: 0.1rem;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 .mb-common-header__mobile-bar--h2 #mb_menus.mb-common-header__mobile-menu-btn--h2 .fa {\n    color: #ffffff !important;\n    font-size: 1rem !important;\n    line-height: 1 !important;\n  }\n  .bhashini-dropdown-content {\n    top: 40px !important;\n    right: -40px;\n  }\n  header#mb-common-header-root.mb-common-header.mb-common-header--header2 #bhashini-mobile-header .bhashini-translator-widget svg path,\n  .bhashini-plugin-container svg path {\n    fill: #000000 !important;\n  }\n}\n@media (min-width: 1001px) {\n  header.mb-common-header .d-sm-none1 {\n    display: none !important;\n  }\n}\n#mobileMenuNew.modal.left {\n  z-index: 1060 !important;\n}\n#mobileMenuNew.modal.left .modal-dialog {\n  position: fixed;\n  margin: auto;\n  width: 75%;\n  max-width: 420px;\n  height: 100%;\n  transform: translate3d(0%, 0, 0);\n  right: 0;\n  left: auto;\n}\n#mobileMenuNew.modal.left .modal-content {\n  height: 100%;\n  overflow-y: auto;\n}\n#mobileMenuNew .modal-header .btn-close {\n  margin: -1rem -5px -0.5rem auto;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li:not(:last-child) {\n  border-bottom: 1px solid #d7d7d7;\n}\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a,\n#mobileMenuNew .modal-body > .m-menu:first-of-type ul.list-unstyled > li a {\n  border-bottom: none !important;\n  border: none !important;\n  text-decoration: none !important;\n}\n#mobileMenuNew a,\n#mobileMenuNew a * {\n  text-decoration: none !important;\n}\n#mobileMenuNew a:hover,\n#mobileMenuNew a:focus,\n#mobileMenuNew a:visited,\n#mobileMenuNew a:active {\n  text-decoration: none !important;\n  color: inherit !important;\n}\n#mobileMenuNew .modal-body ul.list-unstyled li a {\n  text-decoration: none !important;\n  font-weight: 500 !important;\n  color: #333333 !important;\n}\n#mobileMenuNew .modal-body ul li a,\n#mobileMenuNew .modal-body ul li a span {\n  text-decoration: none !important;\n}\n.f-10-dropdown {\n  font-size: 10px;\n  color: #999999;\n}\n@media only screen and (max-width: 600px) {\n  #mobileMenuNew .modal-content {\n    transform: translate(100%, 0) scale(1);\n    transition: transform 0.4s ease-in-out;\n  }\n  #mobileMenuNew.modal.show .modal-content {\n    transform: translate(0, 0) scale(1);\n  }\n  body:has(header.mb-common-header--header2) #mobileMenuNew .accordion-button:not(.collapsed) {\n    background-color: #bc4717 !important;\n    color: #fff !important;\n  }\n  body:has(header.mb-common-header--header2) #mobileMenuNew .accordion-button::after {\n    transform: rotate(0deg);\n    transition: transform 0.3s ease-in-out;\n  }\n  body:has(header.mb-common-header--header2) #mobileMenuNew .accordion-button:not(.collapsed)::after {\n    transform: rotate(-90deg);\n    transition: transform 0.3s ease-in-out;\n  }\n}\nbody:has(header.mb-common-header--header2) #mobileMenuNew [data-bs-toggle=collapse] i.fa-chevron-down {\n  display: inline-block;\n  transform: rotate(0deg);\n  transition: transform 0.3s ease-in-out;\n}\nbody:has(header.mb-common-header--header2) #mobileMenuNew [data-bs-toggle=collapse][aria-expanded=true] i.fa-chevron-down {\n  transform: rotate(-90deg);\n}\nbody:has(header.mb-common-header--header2) #mobileMenuNew .modal-body > .m-menu + .m-menu ul.list-unstyled > li:last-child > a,\nbody:has(header.mb-common-header--header2) #mobileMenuNew .modal-body > .m-menu + .m-menu ul.list-unstyled > li:last-child > a > span {\n  color: #bc4717 !important;\n}\n");

// src/components/Header2.tsx
import { Fragment as Fragment5, jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
var Header2 = ({
  title = "MyBharat",
  cdnBase,
  mainNavItems,
  userSession,
  webroot,
  baseUrl,
  apiBaseUrl,
  environment,
  oauthUsername,
  oauthPassword,
  ipAddress,
  publicProfileApiBaseUrl,
  cookieDomain,
  bhashini = true
}) => {
  useHeaderLoginConfig({
    baseUrl,
    apiBaseUrl,
    environment,
    oauthUsername,
    oauthPassword,
    ipAddress,
    publicProfileApiBaseUrl,
    cookieDomain,
    cdnBase
  });
  useHeaderAccessibilityFont();
  useBhashiniWidgetPlacement(bhashini);
  const cdn = resolveCdnBase({ cdnBase });
  const menuPortalReady = useMbHeaderBootstrapAndPortal(cdn);
  const navItems = mainNavItems;
  const loggedIn = isHeaderUserLoggedIn(userSession);
  return /* @__PURE__ */ jsxs10(Fragment5, { children: [
    /* @__PURE__ */ jsxs10(
      "header",
      {
        id: "mb-common-header-root",
        className: "fixed-top shadow mb-common-header mb-common-header--header2",
        "aria-label": title,
        children: [
          /* @__PURE__ */ jsx11(
            "div",
            {
              id: "bhashini-plugin-mount",
              className: "bhashini-plugin-container mb-common-header__bhashini-mount",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx11(HeaderGovernmentStrip, { cdn }),
          /* @__PURE__ */ jsx11("div", { className: "header-area header-white bg-white pt-10 pb-10 mt-sm-0 mb-common-header__header-area", children: /* @__PURE__ */ jsx11("div", { className: "container", children: /* @__PURE__ */ jsxs10("div", { className: "row align-items-center gx-2", children: [
            /* @__PURE__ */ jsx11(HeaderMobileStrip, { cdn, variant: "h2" }),
            /* @__PURE__ */ jsx11("nav", { className: "d-none", id: "mb-nav-mobile-quick", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx11("div", { className: "col-xl-2 col-lg-2 d-none d-lg-flex min-w-0 justify-content-start mb_new1", children: /* @__PURE__ */ jsx11(HeaderBrandLogos, { cdn, layout: "desktop" }) }),
            /* @__PURE__ */ jsxs10("div", { className: "col-xl-10 col-lg-10 d-none d-lg-block", children: [
              /* @__PURE__ */ jsx11("div", { className: "main-menu f-hd-right d-none d-md-block", children: /* @__PURE__ */ jsxs10("nav", { className: "navbar navbar-expand-lg navbar-light", id: "mb-nav-desktop-main", "aria-label": "Main navigation", children: [
                /* @__PURE__ */ jsx11(DesktopMainNav, { items: navItems }),
                /* @__PURE__ */ jsx11(HeaderAuthControls, { cdn, userSession, webroot })
              ] }) }),
              /* @__PURE__ */ jsx11("div", { className: "f-hd-right d-sm-none1 mt-10", children: /* @__PURE__ */ jsx11("button", { type: "button", className: "btn btn-light", "data-bs-toggle": "modal", "data-bs-target": "#mobileMenuNew", children: /* @__PURE__ */ jsx11("i", { className: "fa fa-bars fa-fw ", "aria-hidden": "true" }) }) })
            ] })
          ] }) }) })
        ]
      }
    ),
    menuPortalReady ? createPortal3(
      /* @__PURE__ */ jsx11(MobileMenuModal, { cdnBase: cdn, items: navItems, userSession, webroot }),
      document.body
    ) : null,
    !loggedIn ? /* @__PURE__ */ jsx11(HeaderLoginShellPortal, { cdnBase: cdn, variant: "header2" }) : null
  ] });
};
var Header2_default = Header2;

// src/hooks/useRequiredClientConfig.ts
import { useEffect as useEffect6 } from "react";
function useRequiredClientConfig(config) {
  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const environment = config?.environment?.trim();
  const cdnBase = config?.cdnBase?.trim();
  useEffect6(() => {
    assertRequiredClientConfig({ baseUrl, apiBaseUrl, environment, cdnBase });
  }, [baseUrl, apiBaseUrl, environment, cdnBase]);
}

// src/components/footer/useFooterFeedbackShell.ts
import { useLayoutEffect as useLayoutEffect3 } from "react";

// src/components/footer/footerRecaptchaBridge.ts
var feedbackRecaptchaWidgetId = null;
function setFeedbackRecaptchaWidgetId(widgetId) {
  feedbackRecaptchaWidgetId = widgetId;
}
function getFeedbackRecaptchaWidgetId() {
  return feedbackRecaptchaWidgetId;
}
function isFeedbackRecaptchaRendered() {
  return !!document.querySelector("#feed_back .mb-common-footer__recaptcha iframe");
}
function resetFeedbackRecaptchaSafely() {
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha || feedbackRecaptchaWidgetId == null || !isFeedbackRecaptchaRendered()) {
    return;
  }
  try {
    grecaptcha.reset(feedbackRecaptchaWidgetId);
  } catch {
  }
}

// src/components/footer/footerFeedbackSubmit.ts
var SAVE_FEEDBACK_DATA_PATH = GATEWAY_PATHS.saveFeedbackData;
var TRIGGER_YOUTH_REWARD_PATH = GATEWAY_PATHS.triggerYouthReward;
var feedbackApiBaseUrl;
var rewardsApiBaseUrl;
var feedbackSubmitUrlOverride;
var feedbackUserSession;
var feedbackIsLoggedInOverride;
function applyFooterFeedbackApiConfig(options) {
  const apiBase = options?.feedbackApiBaseUrl?.trim();
  if (apiBase) feedbackApiBaseUrl = apiBase.replace(/\/$/, "");
  const rewardsBase = options?.rewardsApiBaseUrl?.trim();
  if (rewardsBase) rewardsApiBaseUrl = rewardsBase.replace(/\/$/, "");
  const submitUrl = options?.feedbackSubmitUrl?.trim();
  if (submitUrl) feedbackSubmitUrlOverride = submitUrl;
  if (options?.userSession !== void 0) {
    feedbackUserSession = options.userSession;
  }
  if (options?.isLoggedIn !== void 0) {
    feedbackIsLoggedInOverride = options.isLoggedIn;
  }
}
function resolveUserSession() {
  if (feedbackUserSession !== void 0) return feedbackUserSession;
  return window.MYBHARAT_SHELL?.footer?.userSession ?? window.MYBHARAT_SHELL?.header?.userSession ?? null;
}
function resolveApiFetchBase() {
  if (feedbackApiBaseUrl) return feedbackApiBaseUrl;
  const fromFooter = window.MYBHARAT_SHELL?.footer?.feedbackApiBaseUrl?.trim();
  if (fromFooter) return fromFooter.replace(/\/$/, "");
  const fromShell = getShellApiFetchBaseUrl();
  if (fromShell) return fromShell.replace(/\/$/, "");
  const loginApi = window.MYBHARAT_SHELL?.login?.apiBaseUrl?.trim();
  if (loginApi) return loginApi.replace(/\/$/, "");
  return "";
}
function resolveSubmitUrl() {
  if (feedbackSubmitUrlOverride) return feedbackSubmitUrlOverride;
  const fromShell = window.MYBHARAT_SHELL?.footer?.feedbackSubmitUrl?.trim();
  if (fromShell) return fromShell;
  const base = resolveApiFetchBase();
  if (!base) return SAVE_FEEDBACK_DATA_PATH;
  return `${base}${SAVE_FEEDBACK_DATA_PATH}`;
}
function resolveRewardsApiFetchBase() {
  if (rewardsApiBaseUrl) return rewardsApiBaseUrl;
  const fromFooter = window.MYBHARAT_SHELL?.footer?.rewardsApiBaseUrl?.trim();
  if (fromFooter) return fromFooter.replace(/\/$/, "");
  return "";
}
function usesHostApiAuthProxy(base) {
  return base === DEV_API_PROXY_PREFIXES.feedback;
}
function usesHostRewardsApiAuthProxy(base) {
  return base === DEV_API_PROXY_PREFIXES.rewards;
}
function unwrapRawUserRecord(input) {
  if (input == null || typeof input !== "object") return null;
  if ("data" in input && input.data != null && typeof input.data === "object") {
    return input.data;
  }
  return input;
}
function readSessionPhone(raw) {
  if (!raw) return "";
  for (const key of ["user_phone", "phone", "mobile", "USER_PHONE"]) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return "";
}
function resolveWebActivityUrl() {
  const baseUrl = window.MYBHARAT_SHELL?.login?.baseUrl?.trim();
  if (baseUrl) {
    const normalized = baseUrl.replace(/\/$/, "");
    return `${normalized}/`;
  }
  if (typeof window !== "undefined") {
    return `${window.location.origin}/`;
  }
  return "/";
}
function resolveIsLoggedInForSubmit(formType) {
  const isWeb = formType.toLowerCase() === "web";
  if (!isWeb) return true;
  if (feedbackIsLoggedInOverride !== void 0) return feedbackIsLoggedInOverride;
  if (window.MYBHARAT_SHELL?.footer?.isLoggedIn !== void 0) {
    return !!window.MYBHARAT_SHELL.footer.isLoggedIn;
  }
  return isHeaderUserLoggedIn(resolveUserSession());
}
function buildSaveFeedbackPayload(form, isLoggedIn) {
  const session = parseHeaderUserSession(resolveUserSession());
  const raw = unwrapRawUserRecord(resolveUserSession());
  const formType = (form.type || "web").trim() || "web";
  const isWeb = formType.toLowerCase() === "web";
  const payload = {
    user_name: !isLoggedIn && form.user_name?.trim() ? form.user_name.trim() : session?.displayName ?? "",
    user_email: !isLoggedIn && form.user_email?.trim() ? form.user_email.trim() : session?.email ?? "",
    user_mobile: !isLoggedIn && form.user_mobile?.trim() ? form.user_mobile.trim() : readSessionPhone(raw),
    dl_id: !isLoggedIn ? "" : session?.dlId ?? "",
    user_registered: !isLoggedIn ? "N" : "Y",
    user_type: formType,
    user_activity: isWeb ? resolveWebActivityUrl() : "",
    user_activity_id: isWeb ? "" : "",
    user_feedback: form.user_feedback.trim(),
    user_rating: form.user_rating.trim(),
    feedback_exist_check: "0",
    feedback_captcha_name: !isLoggedIn ? form.feedback_captcha_name?.trim() ?? "" : "",
    feedback_captcha_value: !isLoggedIn ? form.feedback_captcha_value?.trim() ?? "" : "",
    "g-recaptcha-response": !isLoggedIn ? form["g-recaptcha-response"]?.trim() ?? "" : "",
    id: !isLoggedIn ? "" : session ? String(session.id) : ""
  };
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== void 0)
  );
}
async function postFormToApi(url, form) {
  const base = resolveApiFetchBase();
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "application/json"
  };
  if (!usesHostApiAuthProxy(base)) {
    try {
      const token = await fetchInternalGuestOauthAccessToken();
      headers.Authorization = `Bearer ${token}`;
    } catch {
      return { status_code: 500, message: DEFAULT_API_ERROR_MESSAGE2 };
    }
  }
  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers,
      body: new URLSearchParams(form),
      credentials: usesHostApiAuthProxy(base) ? "same-origin" : "omit"
    });
  } catch {
    return { status_code: 500, message: DEFAULT_API_ERROR_MESSAGE2 };
  }
  const text = await res.text();
  try {
    const parsed = JSON.parse(text);
    return normalizeApiResponse(parsed, res.status);
  } catch {
    return { status_code: res.ok ? 200 : res.status, message: DEFAULT_API_ERROR_MESSAGE2 };
  }
}
function buildRewardsApiUrl(path) {
  const base = resolveRewardsApiFetchBase();
  const suffix = path.startsWith("/") ? path : `/${path}`;
  if (!base) return suffix;
  return `${base}${suffix}`;
}
async function postJsonToRewardsApi(path, body) {
  const base = resolveRewardsApiFetchBase();
  if (!base) return;
  const url = buildRewardsApiUrl(path);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  if (!usesHostRewardsApiAuthProxy(base)) {
    const token = await fetchInternalGuestOauthAccessToken();
    headers.Authorization = `Bearer ${token}`;
  }
  await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    credentials: usesHostRewardsApiAuthProxy(base) ? "same-origin" : "omit"
  });
}
async function triggerGeneralFeedbackReward(userId) {
  if (!Number.isFinite(userId) || userId <= 0) return;
  try {
    await postJsonToRewardsApi(TRIGGER_YOUTH_REWARD_PATH, {
      events: [
        {
          event_key: "general_feedback",
          action: "added",
          user_id: userId
        }
      ],
      is_batch: true
    });
  } catch {
  }
}
async function saveUserFeedback(form) {
  const formType = (form.type || "web").trim() || "web";
  const isLoggedIn = resolveIsLoggedInForSubmit(formType);
  const session = parseHeaderUserSession(resolveUserSession());
  if (isLoggedIn && formType === "web" && session) {
    void triggerGeneralFeedbackReward(session.id);
  }
  const payload = buildSaveFeedbackPayload(form, isLoggedIn);
  return postFormToApi(resolveSubmitUrl(), payload);
}
function isFeedbackSubmitSuccess(res) {
  return isApiSuccessStatus(res.status_code);
}

// src/components/footer/footerFeedbackFlow.ts
var GUEST_VALIDATION_FIELDS = [
  ["user_rating:checked", "Rating"],
  ["user_name", "Name"],
  ["user_email", "Email"],
  ["user_mobile", "Mobile"],
  ["user_feedback", "Feedback"]
];
var LOGGED_IN_VALIDATION_FIELDS = [
  ["user_rating:checked", "Rating"],
  ["user_feedback", "Feedback"]
];
var FEEDBACK_MAX_CHARS = 250;
var installed2 = false;
var feedbackIsLoggedIn;
var submitInFlight = false;
function applyFooterFeedbackConfig(options) {
  applyFooterFeedbackApiConfig({
    feedbackApiBaseUrl: options?.feedbackApiBaseUrl,
    rewardsApiBaseUrl: options?.rewardsApiBaseUrl,
    feedbackSubmitUrl: options?.feedbackSubmitUrl,
    userSession: options?.userSession,
    isLoggedIn: options?.isLoggedIn
  });
  if (options?.isLoggedIn !== void 0) {
    feedbackIsLoggedIn = options.isLoggedIn;
  }
}
function resolveIsLoggedIn() {
  if (feedbackIsLoggedIn !== void 0) return feedbackIsLoggedIn;
  if (window.MYBHARAT_SHELL?.footer?.isLoggedIn !== void 0) {
    return !!window.MYBHARAT_SHELL.footer.isLoggedIn;
  }
  const form = document.getElementById("feedbackFrm");
  return form ? !form.querySelector("#user_name") : false;
}
function resolveRequiresCaptcha() {
  if (resolveIsLoggedIn()) return false;
  return !!document.querySelector("#feed_back .mb-common-footer__recaptcha[data-sitekey]");
}
function fieldElement(fieldKey) {
  if (fieldKey === "user_rating:checked") {
    return document.querySelector(
      '#feedbackFrm input[name="user_rating"]:checked'
    );
  }
  return document.getElementById(fieldKey);
}
function fieldValue(fieldKey) {
  const el = fieldElement(fieldKey);
  if (!el) return "";
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    return el.value.trim();
  }
  return (el.textContent ?? "").trim();
}
function setFieldError(fieldKey, label, hasError, message) {
  if (fieldKey === "user_rating:checked") {
    const errEl2 = document.querySelector(".Ratingerr");
    if (hasError) {
      fieldElement(fieldKey)?.classList.add("vError");
      if (errEl2) errEl2.textContent = message ?? `Please enter your ${label}`;
    } else {
      document.querySelectorAll('#feedbackFrm input[name="user_rating"]').forEach((input) => {
        input.classList.remove("vError");
      });
      if (errEl2) errEl2.textContent = "";
    }
    return;
  }
  const el = document.getElementById(fieldKey);
  const errEl = document.querySelector(`.${label}err`);
  if (hasError) {
    el?.classList.add("vError");
    if (errEl) errEl.textContent = message ?? `Please enter your ${label}`;
  } else {
    el?.classList.remove("vError");
    if (errEl) errEl.textContent = "";
  }
}
function validateGuestFieldFormat(fieldKey, label, value) {
  if (fieldKey === "user_email") {
    if (!validateEmail(value)) {
      setFieldError(fieldKey, label, true, "Please enter a valid Email Id");
      return false;
    }
    setFieldError(fieldKey, label, false);
    return true;
  }
  if (fieldKey === "user_mobile") {
    if (!validatePhone(value)) {
      setFieldError(fieldKey, label, true, "Please enter a valid 10-digit Mobile Number");
      return false;
    }
    setFieldError(fieldKey, label, false);
    return true;
  }
  return true;
}
function validateFeedbackForm(requireCaptcha = resolveRequiresCaptcha()) {
  const fields = resolveIsLoggedIn() ? LOGGED_IN_VALIDATION_FIELDS : GUEST_VALIDATION_FIELDS;
  let validCount = fields.length;
  for (const [fieldKey, label] of fields) {
    const value = fieldValue(fieldKey);
    if (value === "") {
      setFieldError(fieldKey, label, true);
      validCount -= 1;
      continue;
    }
    if (!resolveIsLoggedIn() && !validateGuestFieldFormat(fieldKey, label, value)) {
      validCount -= 1;
      continue;
    }
    setFieldError(fieldKey, label, false);
  }
  if (requireCaptcha) {
    const captchaEl = document.getElementById("g-recaptcha-response");
    const captchaVal = captchaEl?.value.trim() ?? "";
    const captchaErr = document.querySelector(".captchaerr");
    if (!captchaVal) {
      if (captchaErr) captchaErr.textContent = "Please check the reCAPTCHA checkbox.";
      return false;
    }
    if (captchaErr) captchaErr.textContent = "";
  }
  return validCount === fields.length;
}
function showFeedbackAlert(msg, type) {
  const el = document.getElementById("feedback_alert");
  if (!el) return;
  el.style.display = "";
  el.className = `alert alert-${type}`;
  el.innerHTML = `<small>${msg}</small>`;
  window.setTimeout(() => {
    el.style.display = "none";
  }, 1e4);
}
function closeFeedbackModals() {
  hideBootstrapModal("feed_back");
  hideBootstrapModal("feed_back1");
  cleanupOrphanModalBackdrop();
}
function resetFeedbackForm() {
  const fields = resolveIsLoggedIn() ? LOGGED_IN_VALIDATION_FIELDS : GUEST_VALIDATION_FIELDS;
  for (const [fieldKey, label] of fields) {
    if (fieldKey !== "user_rating:checked") {
      const el = document.getElementById(fieldKey);
      if (el) {
        el.value = "";
        el.classList.remove("vError");
      }
    }
    const errEl = document.querySelector(`.${label}err`);
    if (errEl) errEl.textContent = "";
  }
  const charCnt = document.getElementById("char_left_cnt");
  if (charCnt) charCnt.textContent = "";
  if (resolveRequiresCaptcha()) {
    const captchaErr = document.querySelector(".captchaerr");
    if (captchaErr) captchaErr.textContent = "";
    resetFeedbackRecaptchaSafely();
  }
}
function readFeedbackFormValues() {
  const form = document.getElementById("feedbackFrm");
  const captchaEl = document.getElementById("g-recaptcha-response");
  const typeInput = form?.querySelector('input[name="type"]');
  const ratingInput = form?.querySelector('input[name="user_rating"]:checked');
  return {
    type: typeInput?.value.trim() || "web",
    user_rating: ratingInput?.value.trim() ?? "",
    user_feedback: fieldValue("user_feedback"),
    user_name: fieldValue("user_name"),
    user_email: fieldValue("user_email"),
    user_mobile: fieldValue("user_mobile"),
    feedback_captcha_name: fieldValue("feedback_captcha_name"),
    feedback_captcha_value: fieldValue("feedback_captcha_value"),
    "g-recaptcha-response": captchaEl?.value.trim() ?? ""
  };
}
function triggerFirebaseFeedbackEvent(event) {
  const setup = window.setupFirebaseUserAjaxEvents;
  const encode = window.encodeIdentifier;
  if (!setup || !encode) return;
  const userId = window.USER_DATA?.ID ?? window.__MYBHARAT_LOGIN_USER_ID__ ?? "";
  setup(event, encode(String(userId)));
}
function setFormC2Visible(visible) {
  const el = document.getElementById("form_c2");
  if (el) el.style.display = visible ? "" : "none";
}
function setFeedbackSubmitting(submitting) {
  const form = document.getElementById("feedbackFrm");
  const loader = document.getElementById("mb-common-footer-feedback-loader");
  const cancelBtn = document.getElementById("form_cl");
  form?.classList.toggle("mb-common-footer__feedback-form--submitting", submitting);
  loader?.classList.toggle("is-visible", submitting);
  if (loader) loader.setAttribute("aria-hidden", submitting ? "false" : "true");
  if (cancelBtn instanceof HTMLImageElement) {
    cancelBtn.style.pointerEvents = submitting ? "none" : "";
    cancelBtn.style.opacity = submitting ? "0.45" : "";
  }
}
function showFeedbackLoader() {
  setFeedbackSubmitting(true);
}
function hideFeedbackLoader() {
  setFeedbackSubmitting(false);
}
async function onFormC2Click(e) {
  e.preventDefault();
  if (submitInFlight) return;
  setFormC2Visible(false);
  const requireCaptcha = resolveRequiresCaptcha();
  if (!validateFeedbackForm(requireCaptcha)) {
    setFormC2Visible(true);
    return;
  }
  submitInFlight = true;
  showFeedbackLoader();
  try {
    const res = await saveUserFeedback(readFeedbackFormValues());
    if (isFeedbackSubmitSuccess(res)) {
      hideBootstrapModal("feed_back");
      showBootstrapModal("successToaster");
      window.setTimeout(() => hideBootstrapModal("successToaster"), 1e4);
      resetFeedbackForm();
      triggerFirebaseFeedbackEvent("user_feedback_success");
    } else {
      showFeedbackAlert(
        resolveUserFacingApiError({
          data: res.data,
          message: res.message,
          status_code: res.status_code
        }),
        "danger"
      );
      triggerFirebaseFeedbackEvent("user_feedback_failure");
      setFormC2Visible(true);
    }
  } catch (err) {
    const msg = err instanceof Error ? resolveUserFacingApiError({ message: err.message }) : resolveUserFacingApiError(null);
    showFeedbackAlert(msg, "danger");
    triggerFirebaseFeedbackEvent("user_feedback_failure");
    setFormC2Visible(true);
  } finally {
    submitInFlight = false;
    hideFeedbackLoader();
  }
}
function onDocumentClick3(e) {
  const target = e.target;
  if (!target) return;
  if (target.closest("#form_c2")) {
    void onFormC2Click(e);
    return;
  }
  if (target.closest("#form_cl")) {
    e.preventDefault();
    e.stopPropagation();
    closeFeedbackModals();
    resetFeedbackForm();
    return;
  }
  if (target.closest("#feedback_mdl_btn")) {
    resetFeedbackForm();
  }
}
function isFooterFeedbackField(target) {
  return Boolean(target.closest("#feed_back, #feed_back1, #footer_external"));
}
function onDocumentInput2(e) {
  const target = e.target;
  if (!target || !isFooterFeedbackField(target)) return;
  if (target.id === "user_feedback") {
    const len = target.value.length;
    const charCnt = document.getElementById("char_left_cnt");
    if (!charCnt || len > FEEDBACK_MAX_CHARS) return;
    charCnt.textContent = len > 0 ? `Remaining characters: ${FEEDBACK_MAX_CHARS - len}` : `Remaining characters: ${FEEDBACK_MAX_CHARS}`;
  }
  if (target.id === "user_name") {
    const el = target;
    el.value = el.value.replace(/[^a-zA-Z ]/g, "").replace(/(\..*)\./g, "$1");
  }
  if (target.id === "user_mobile") {
    const el = target;
    el.value = el.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
  }
}
function syncFooterFeedbackConfigFromDom() {
  const footerEl = document.querySelector("mybharat-footer");
  if (!footerEl) return;
  const isLoggedInAttr = footerEl.getAttribute("is-logged-in");
  applyFooterFeedbackConfig({
    feedbackApiBaseUrl: footerEl.getAttribute("feedback-api-base-url") ?? void 0,
    rewardsApiBaseUrl: footerEl.getAttribute("rewards-api-base-url") ?? void 0,
    feedbackSubmitUrl: footerEl.getAttribute("feedback-submit-url") ?? void 0,
    isLoggedIn: isLoggedInAttr === "true" || isLoggedInAttr === "" ? true : isLoggedInAttr === "false" ? false : void 0
  });
}
function installFooterFeedbackFlow() {
  if (installed2) return () => void 0;
  installed2 = true;
  syncFooterFeedbackConfigFromDom();
  applyFooterFeedbackConfig({
    feedbackApiBaseUrl: window.MYBHARAT_SHELL?.footer?.feedbackApiBaseUrl,
    rewardsApiBaseUrl: window.MYBHARAT_SHELL?.footer?.rewardsApiBaseUrl,
    feedbackSubmitUrl: window.MYBHARAT_SHELL?.footer?.feedbackSubmitUrl,
    userSession: window.MYBHARAT_SHELL?.footer?.userSession ?? window.MYBHARAT_SHELL?.header?.userSession,
    isLoggedIn: window.MYBHARAT_SHELL?.footer?.isLoggedIn
  });
  document.addEventListener("click", onDocumentClick3, true);
  document.addEventListener("input", onDocumentInput2, true);
  return () => {
    installed2 = false;
    document.removeEventListener("click", onDocumentClick3, true);
    document.removeEventListener("input", onDocumentInput2, true);
  };
}

// src/components/footer/useFooterFeedbackShell.ts
function useFooterFeedbackShell({
  feedbackApiBaseUrl: feedbackApiBaseUrl2,
  rewardsApiBaseUrl: rewardsApiBaseUrl2,
  feedbackSubmitUrl,
  userSession,
  isLoggedIn,
  enabled = true
} = {}) {
  useLayoutEffect3(() => {
    if (!enabled) return void 0;
    applyFooterFeedbackConfig({
      feedbackApiBaseUrl: feedbackApiBaseUrl2,
      rewardsApiBaseUrl: rewardsApiBaseUrl2,
      feedbackSubmitUrl,
      userSession,
      isLoggedIn
    });
    return installFooterFeedbackFlow();
  }, [enabled, feedbackApiBaseUrl2, rewardsApiBaseUrl2, feedbackSubmitUrl, userSession, isLoggedIn]);
}

// src/components/FooterModals.tsx
import { useEffect as useEffect7, useRef as useRef2, useState as useState4 } from "react";
import { createPortal as createPortal4 } from "react-dom";

// src/components/footer/resolveRecaptchaSiteKey.ts
function resolveRecaptchaSiteKey(prop) {
  const fromProp = prop?.trim();
  if (fromProp) return fromProp;
  const fromShell = window.MYBHARAT_SHELL?.footer?.recaptchaSiteKey?.trim();
  if (fromShell) return fromShell;
  for (const selector of [
    'meta[name="google-site-key"]',
    'meta[name="google-recaptcha-site-key"]',
    'meta[name="recaptcha-site-key"]'
  ]) {
    const fromMeta = document.querySelector(selector)?.getAttribute("content")?.trim();
    if (fromMeta) return fromMeta;
  }
  const footerEl = document.querySelector("mybharat-footer");
  const fromAttr = footerEl?.getAttribute("recaptcha-site-key")?.trim();
  return fromAttr ?? "";
}

// src/components/footer/footerRecaptchaLoader.ts
var SCRIPT_ID = "mb-google-recaptcha-script";
var SCRIPT_ONLOAD = "__mbRecaptchaScriptOnload";
function flushRecaptchaReadyCallbacks() {
  const callbacks = window.__mbRecaptchaReadyCallbacks ?? [];
  window.__mbRecaptchaReadyCallbacks = [];
  callbacks.forEach((cb) => {
    try {
      cb();
    } catch {
    }
  });
}
function ensureRecaptchaScript() {
  if (document.getElementById(SCRIPT_ID)) return;
  window.__mbRecaptchaReadyCallbacks = window.__mbRecaptchaReadyCallbacks ?? [];
  window[SCRIPT_ONLOAD] = () => flushRecaptchaReadyCallbacks();
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = `${EXTERNAL_URLS.thirdParty.recaptchaApi}?onload=${SCRIPT_ONLOAD}&render=explicit`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}
function whenRecaptchaReady(timeoutMs = AUTH_CONFIG.recaptchaLoadTimeoutMs) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error("reCAPTCHA timed out while loading"));
    }, timeoutMs);
    const finish = () => {
      if (settled) return;
      const api = window.grecaptcha;
      if (!api?.render) {
        settled = true;
        window.clearTimeout(timeoutId);
        reject(new Error("reCAPTCHA API unavailable"));
        return;
      }
      const done = (resolved) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        resolve(resolved);
      };
      if (typeof api.ready === "function") {
        api.ready(() => done(api));
      } else {
        done(api);
      }
    };
    if (window.grecaptcha?.render) {
      finish();
      return;
    }
    ensureRecaptchaScript();
    window.__mbRecaptchaReadyCallbacks = window.__mbRecaptchaReadyCallbacks ?? [];
    window.__mbRecaptchaReadyCallbacks.push(finish);
    const pollForApi = (attempt = 0) => {
      if (settled) return;
      if (window.grecaptcha?.render) {
        finish();
        return;
      }
      if (attempt >= 200) return;
      window.setTimeout(() => pollForApi(attempt + 1), 50);
    };
    pollForApi();
  });
}
function preloadRecaptchaScript() {
  if (window.grecaptcha?.render) return;
  ensureRecaptchaScript();
}

// src/components/footer/footerRecaptchaWidget.ts
function hasRenderedWidget(container) {
  return !!container.querySelector('iframe[src*="recaptcha"], iframe[title*="reCAPTCHA"]');
}
async function renderFeedbackRecaptchaWidget(container, siteKey) {
  const key = siteKey.trim();
  if (!key) return null;
  if (hasRenderedWidget(container)) {
    return getFeedbackRecaptchaWidgetId();
  }
  try {
    const grecaptcha = await whenRecaptchaReady();
    if (hasRenderedWidget(container)) {
      return getFeedbackRecaptchaWidgetId();
    }
    container.replaceChildren();
    const widgetId = grecaptcha.render(container, { sitekey: key });
    setFeedbackRecaptchaWidgetId(widgetId);
    return widgetId;
  } catch {
    return null;
  }
}
function scheduleFeedbackRecaptchaRender(getContainer, siteKey, delayMs = 150) {
  window.setTimeout(() => {
    void (async () => {
      for (let attempt = 0; attempt < 8; attempt += 1) {
        const container = getContainer();
        if (container && hasRenderedWidget(container)) return;
        if (container && siteKey.trim()) {
          const widgetId = await renderFeedbackRecaptchaWidget(container, siteKey);
          if (widgetId != null) return;
        }
        await new Promise((resolve) => window.setTimeout(resolve, 200));
      }
    })();
  }, delayMs);
}

// src/components/FooterModals.tsx
import { Fragment as Fragment6, jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
function getBootstrapModal2() {
  return typeof window !== "undefined" && window.bootstrap?.Modal;
}
var FooterModals = ({
  cdnBase,
  isLoggedIn,
  recaptchaSiteKey,
  onRegisteredUserClick
}) => {
  const [portalReady, setPortalReady] = useState4(false);
  const captchaContainerRef = useRef2(null);
  const captchaSiteKey = resolveRecaptchaSiteKey(recaptchaSiteKey);
  const showGuestFeedbackRow = !isLoggedIn;
  const canRenderCaptcha = showGuestFeedbackRow && Boolean(captchaSiteKey);
  const queueCaptchaRender = () => {
    if (!canRenderCaptcha) return;
    scheduleFeedbackRecaptchaRender(() => captchaContainerRef.current, captchaSiteKey, 150);
  };
  useEffect7(() => {
    setPortalReady(true);
  }, []);
  useEffect7(() => {
    if (!canRenderCaptcha) return void 0;
    preloadRecaptchaScript();
    return void 0;
  }, [canRenderCaptcha]);
  useEffect7(() => {
    const modalEl = document.getElementById("feed_back");
    if (!modalEl || !canRenderCaptcha) return void 0;
    const onShown = () => {
      queueCaptchaRender();
    };
    const onHidden = () => {
      resetFeedbackRecaptchaSafely();
      cleanupOrphanModalBackdrop();
    };
    modalEl.addEventListener("shown.bs.modal", onShown);
    modalEl.addEventListener("hidden.bs.modal", onHidden);
    if (modalEl.classList.contains("show")) {
      queueCaptchaRender();
    }
    return () => {
      modalEl.removeEventListener("shown.bs.modal", onShown);
      modalEl.removeEventListener("hidden.bs.modal", onHidden);
    };
  }, [canRenderCaptcha, captchaSiteKey]);
  useEffect7(() => {
    const modalEl = document.getElementById("feed_back1");
    if (!modalEl) return void 0;
    const onHidden = () => {
      cleanupOrphanModalBackdrop();
    };
    modalEl.addEventListener("hidden.bs.modal", onHidden);
    return () => {
      modalEl.removeEventListener("hidden.bs.modal", onHidden);
    };
  }, []);
  const hideChoiceShowForm = () => {
    const Modal2 = getBootstrapModal2();
    const el1 = document.getElementById("feed_back1");
    const elForm = document.getElementById("feed_back");
    if (!Modal2 || !el1 || !elForm) return;
    Modal2.getInstance(el1)?.hide();
    window.setTimeout(() => {
      Modal2.getOrCreateInstance(elForm).show();
      queueCaptchaRender();
    }, 200);
  };
  const hideChoiceOpenRegistered = () => {
    const Modal2 = getBootstrapModal2();
    Modal2?.getInstance(document.getElementById("feed_back1"))?.hide();
    onRegisteredUserClick?.();
    window.setTimeout(() => {
      if (document.getElementById("loginWithOtpModal")) {
        openLoginWithOtpModal();
      }
    }, 200);
  };
  const feedbackActions = /* @__PURE__ */ jsxs11("div", { className: "cross_ico mb-common-footer__feedback-actions", children: [
    /* @__PURE__ */ jsx12("img", { src: resolveCdnAssetUrl(cdnBase, "assets/img/yuva_landing/mega_checkcircle1.png"), id: "form_cl", "data-bs-dismiss": "modal", alt: "" }),
    /* @__PURE__ */ jsx12("a", { id: "form_c2", href: "#", className: "d-inline-block", children: /* @__PURE__ */ jsx12("img", { src: resolveCdnAssetUrl(cdnBase, "assets/img/yuva_landing/mega_checkcircle.png"), alt: "" }) })
  ] });
  const content = /* @__PURE__ */ jsxs11(Fragment6, { children: [
    /* @__PURE__ */ jsx12("div", { className: "modal fade", id: "feed_back1", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx12("div", { className: "modal-dialog", children: /* @__PURE__ */ jsx12("div", { className: "modal-content", children: /* @__PURE__ */ jsx12("div", { className: "modal-body", style: { borderRadius: 8 }, children: /* @__PURE__ */ jsxs11("div", { className: "row", id: "pls_select", children: [
      /* @__PURE__ */ jsx12("div", { className: "col-sm-12", children: /* @__PURE__ */ jsx12(
        "img",
        {
          src: resolveCdnAssetUrl(cdnBase, "assets/img/yuva_landing/XCircle_n.png"),
          alt: "",
          className: "btn-close",
          "data-bs-dismiss": "modal"
        }
      ) }),
      /* @__PURE__ */ jsxs11("div", { className: "col-sm-12", children: [
        /* @__PURE__ */ jsx12("h3", { children: "Please Select" }),
        /* @__PURE__ */ jsx12("button", { type: "button", id: "guest_usr", className: "btn btn-success", name: "Guest User", onClick: hideChoiceShowForm, children: "Guest User" }),
        /* @__PURE__ */ jsx12("button", { type: "button", id: "regi_usr", className: "btn btn-info", name: "Registered User", onClick: hideChoiceOpenRegistered, children: "Registered User" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx12("div", { className: "modal fade", id: "feed_back", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx12("div", { className: "modal-dialog", children: /* @__PURE__ */ jsx12("div", { className: "modal-content", children: /* @__PURE__ */ jsxs11("div", { className: "modal-body", style: { borderRadius: 8 }, children: [
      /* @__PURE__ */ jsxs11("form", { id: "feedbackFrm", children: [
        /* @__PURE__ */ jsx12("input", { type: "hidden", name: "type", value: "web" }),
        /* @__PURE__ */ jsxs11("div", { className: "row pb-10", children: [
          /* @__PURE__ */ jsxs11("div", { className: "col-sm-12", children: [
            /* @__PURE__ */ jsx12("div", { className: "tt_yuvr", children: Array.from({ length: 10 }, (_, i) => {
              const n = i + 1;
              return /* @__PURE__ */ jsx12("div", { className: "radio-tile-group", children: /* @__PURE__ */ jsxs11("div", { className: "input-container", children: [
                /* @__PURE__ */ jsx12("input", { type: "radio", name: "user_rating", id: `user_rating_${n}`, value: String(n), defaultChecked: n === 10 }),
                /* @__PURE__ */ jsx12("div", { className: "radio-tile", children: /* @__PURE__ */ jsx12("label", { className: "label-text-space", htmlFor: `user_rating_${n}`, children: n }) })
              ] }) }, n);
            }) }),
            /* @__PURE__ */ jsx12("p", { className: "vErrormsg Ratingerr" })
          ] }),
          /* @__PURE__ */ jsx12("div", { className: "col-sm-12", children: /* @__PURE__ */ jsxs11("div", { className: "form-group text-left", children: [
            /* @__PURE__ */ jsx12("label", { htmlFor: "user_feedback", children: "Write a feedback*" }),
            /* @__PURE__ */ jsx12("small", { id: "char_left_cnt" }),
            /* @__PURE__ */ jsx12(
              "textarea",
              {
                id: "user_feedback",
                name: "user_feedback",
                rows: 4,
                cols: 50,
                className: "form-control",
                placeholder: "Write here (250 characters)",
                maxLength: 250
              }
            ),
            /* @__PURE__ */ jsx12("p", { className: "vErrormsg Feedbackerr" })
          ] }) }),
          !isLoggedIn ? /* @__PURE__ */ jsxs11(Fragment6, { children: [
            /* @__PURE__ */ jsx12("input", { type: "hidden", id: "feedback_captcha_name", name: "feedback_captcha_name", value: "" }),
            /* @__PURE__ */ jsx12("div", { className: "col-sm-4", children: /* @__PURE__ */ jsxs11("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx12(
                "input",
                {
                  type: "text",
                  className: "form-control",
                  id: "user_name",
                  name: "user_name",
                  placeholder: "Name*",
                  maxLength: 100
                }
              ),
              /* @__PURE__ */ jsx12("p", { className: "vErrormsg Nameerr" })
            ] }) }),
            /* @__PURE__ */ jsx12("div", { className: "col-sm-4", children: /* @__PURE__ */ jsxs11("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx12(
                "input",
                {
                  type: "text",
                  className: "form-control",
                  id: "user_mobile",
                  name: "user_mobile",
                  placeholder: "Mobile*",
                  maxLength: 10
                }
              ),
              /* @__PURE__ */ jsx12("p", { className: "vErrormsg Mobileerr" })
            ] }) }),
            /* @__PURE__ */ jsx12("div", { className: "col-sm-4", children: /* @__PURE__ */ jsxs11("div", { className: "form-group", children: [
              /* @__PURE__ */ jsx12("input", { type: "email", className: "form-control", id: "user_email", name: "user_email", placeholder: "Email*", maxLength: 100 }),
              /* @__PURE__ */ jsx12("p", { className: "vErrormsg Emailerr" })
            ] }) })
          ] }) : null
        ] }),
        showGuestFeedbackRow ? /* @__PURE__ */ jsxs11("div", { className: "row align-items-end mb-common-footer__feedback-footer-row", children: [
          /* @__PURE__ */ jsxs11("div", { className: "col-sm-8 col-md-9", children: [
            /* @__PURE__ */ jsx12(
              "div",
              {
                ref: (node) => {
                  captchaContainerRef.current = node;
                  if (node && canRenderCaptcha) {
                    const modalEl = document.getElementById("feed_back");
                    if (modalEl?.classList.contains("show")) {
                      scheduleFeedbackRecaptchaRender(() => node, captchaSiteKey, 0);
                    }
                  }
                },
                className: "mb-common-footer__recaptcha",
                "data-sitekey": captchaSiteKey || void 0
              }
            ),
            /* @__PURE__ */ jsx12("p", { className: "vErrormsg captchaerr" })
          ] }),
          /* @__PURE__ */ jsx12("div", { className: "col-sm-4 col-md-3", children: feedbackActions })
        ] }) : /* @__PURE__ */ jsx12("div", { className: "row mb-common-footer__feedback-footer-row", children: /* @__PURE__ */ jsx12("div", { className: "col-sm-12 d-flex justify-content-end", children: feedbackActions }) })
      ] }),
      /* @__PURE__ */ jsx12(
        "div",
        {
          id: "mb-common-footer-feedback-loader",
          className: "mb-common-footer__feedback-loader",
          "aria-hidden": "true",
          "aria-live": "polite",
          children: /* @__PURE__ */ jsxs11("div", { className: "mb-common-footer__feedback-loader-inner", children: [
            /* @__PURE__ */ jsx12("div", { className: "mb-common-footer__feedback-spinner", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx12("span", { className: "mb-common-footer__feedback-loader-text", children: "Submitting\u2026" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx12("div", { className: "row", children: /* @__PURE__ */ jsx12("div", { className: "col-sm-12", children: /* @__PURE__ */ jsx12("div", { id: "feedback_alert", className: "alert", role: "alert", style: { display: "none" } }) }) })
    ] }) }) }) }),
    /* @__PURE__ */ jsx12("div", { className: "modal fade", id: "successToaster", tabIndex: -1, "aria-hidden": "true", children: /* @__PURE__ */ jsx12("div", { className: "modal-dialog", style: { width: "fit-content" }, children: /* @__PURE__ */ jsx12("div", { className: "modal-content", style: { border: "2px solid #0fbd5f" }, children: /* @__PURE__ */ jsx12("div", { className: "modal-header", style: { borderBottom: "none" }, children: /* @__PURE__ */ jsxs11("h4", { className: "modal-title", style: { color: "#0fbd5f", fontSize: 16, fontWeight: 400 }, children: [
      /* @__PURE__ */ jsx12("img", { src: resolveCdnAssetUrl(cdnBase, "assets/img/yuva_landing/mega_checkcircle.png"), alt: "" }),
      " Feedback has been submitted Successfully"
    ] }) }) }) }) })
  ] });
  if (!portalReady) return null;
  return createPortal4(content, document.body);
};
var FooterModals_default = FooterModals;

// src/components/Footer.tsx
import { Fragment as Fragment7, jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
var footerIntroDefault = "MY Bharat is an initiative of Ministry of Youth Affairs & Sports to empower Indian youth through social mobility, educational equity, and practical skills.";
var dicLineDefault = "Digital India Corporation (DIC) Ministry of Electronics & IT (MeitY) Government of India";
var copyrightDefault = "\xA9 2023 - MY Bharat @ All rights reserved | Ministry of Youth Affairs and Sports, Govt. of India\xAE";
function formatLastUpdated() {
  const d = /* @__PURE__ */ new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}
var Footer = ({
  cdnBase,
  isLoggedIn,
  recaptchaSiteKey,
  feedbackApiBaseUrl: feedbackApiBaseUrl2,
  rewardsApiBaseUrl: rewardsApiBaseUrl2,
  feedbackSubmitUrl,
  userSession,
  onRegisteredUserClick
}) => {
  useRequiredClientConfig({ cdnBase });
  const cdn = resolveCdnBase({ cdnBase });
  const feedbackModalTarget = isLoggedIn ? "#feed_back" : "#feed_back1";
  useFooterFeedbackShell({
    feedbackApiBaseUrl: feedbackApiBaseUrl2,
    rewardsApiBaseUrl: rewardsApiBaseUrl2,
    feedbackSubmitUrl,
    userSession,
    isLoggedIn
  });
  return /* @__PURE__ */ jsxs12(Fragment7, { children: [
    /* @__PURE__ */ jsxs12("footer", { id: "footer_external", className: "footer-area-1 mb-common-footer", children: [
      /* @__PURE__ */ jsx13("div", { className: "footer-top py-3", children: /* @__PURE__ */ jsx13("div", { className: "container", children: /* @__PURE__ */ jsxs12("div", { className: "row", children: [
        /* @__PURE__ */ jsxs12("div", { className: "col-lg-3 col-md-6 footer-contact pt-4", children: [
          /* @__PURE__ */ jsxs12("div", { className: "d-flex flex-wrap align-items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx13("a", { href: "/", children: /* @__PURE__ */ jsx13(
              "img",
              {
                src: resolveCdnAssetUrl(cdn, "assets/img/yuva_landing/YASLogo_opt_2x.png"),
                alt: "",
                className: "img-responsive cursor",
                style: { width: 100 }
              }
            ) }),
            /* @__PURE__ */ jsx13("span", { className: "text-muted d-none d-sm-inline", "aria-hidden": "true", children: "|" }),
            /* @__PURE__ */ jsx13("a", { href: "/", children: /* @__PURE__ */ jsx13(
              "img",
              {
                src: resolveCdnAssetUrl(cdn, "assets/img/yuva_landing/mybharatlogo_opt_2x.png"),
                alt: "MY Bharat",
                className: "img-responsive cursor",
                style: { width: 100 }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx13("p", { className: "lang_footer_page_col_one foot_p1 fontchange14", children: /* @__PURE__ */ jsx13("small", { children: footerIntroDefault }) }),
          /* @__PURE__ */ jsxs12("p", { className: "foot1w fontchange14", children: [
            /* @__PURE__ */ jsx13("span", { className: "lang_footer_page_last_update", children: "Last updated: " }),
            " ",
            formatLastUpdated()
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { className: "col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__link-col", children: [
          /* @__PURE__ */ jsx13("h6", { className: "img_link lang_footer_heading_import fontchange mb-2", children: "Important Links" }),
          /* @__PURE__ */ jsxs12("ul", { className: "foot_p2 list-unstyled mb-0", children: [
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/mega_events", className: "litext lang_mega_event fontchange", children: "Mega Events" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/pages/experiential_learning?mode=I", className: "litext lang_exp_lrn01 fontchange", children: "Experiential Learning" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { className: "litext lang_event fontchange", href: "/pages/events", children: "Volunteer for Bharat" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { className: "litext lang_about fontchange", href: "/pages/about_mybharat", children: "About" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { className: "col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__link-col", children: [
          /* @__PURE__ */ jsx13("h6", { className: "img_link lang_footer_heading_useful fontchange mb-2", children: "Useful Links" }),
          /* @__PURE__ */ jsxs12("ul", { className: "list-unstyled mb-0", children: [
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/pages/policy", className: "litext lang_policy_page_header fontchange", children: "Privacy Policy" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/resources-list", className: "litext lang_resources_list_ftr fontchange", children: "Resources" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/pages/support", className: "litext lang_contact_page_contact_us_ftr fontchange", children: "Support" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13("a", { href: "/sitemap", className: "litext lang_sitemap fontchange", children: "Sitemap" }) }),
            /* @__PURE__ */ jsx13("li", { className: "mb-2 fw-normal", children: /* @__PURE__ */ jsx13(
              "p",
              {
                className: "litext lang_content_Feedback mb-0 border-0 bg-transparent",
                id: "feedback_mdl_btn",
                "data-bs-toggle": "modal",
                "data-bs-target": feedbackModalTarget,
                style: { cursor: "pointer" },
                role: "button",
                tabIndex: 0,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.target.click();
                  }
                },
                children: "Feedback"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { className: "col-lg-3 col-md-6 footer-links pt-4 mb-common-footer__follow-col", children: [
          /* @__PURE__ */ jsx13("h6", { className: "img_link lang_footer_heading_follow fontchange mb-2", children: "Follow Us" }),
          /* @__PURE__ */ jsxs12("div", { className: "social-icons mb-20 mb-common-footer__social-row", children: [
            /* @__PURE__ */ jsx13("a", { href: "https://x.com/MYBharatHQ", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: resolveCdnAssetUrl(cdn, "assets/img/icon/twitter_v10.png"), alt: "Twitter" }),
              /* @__PURE__ */ jsx13("span", { className: "twitter-color", children: "Twitter" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://www.instagram.com/mybharatgov/", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: resolveCdnAssetUrl(cdn, "assets/img/icon/instagram_v10.png"), alt: "Instagram" }),
              /* @__PURE__ */ jsx13("span", { className: "instagram-color", children: "Instagram" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://www.facebook.com/mybharathq/", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: resolveCdnAssetUrl(cdn, "assets/img/icon/facebook_v10.png"), alt: "Facebook" }),
              /* @__PURE__ */ jsx13("span", { className: "facebook-color", children: "Facebook" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://www.linkedin.com/company/mybharatgov/", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: resolveCdnAssetUrl(cdn, "assets/img/icon/linkedin_v10.png"), alt: "Linkedin" }),
              /* @__PURE__ */ jsx13("span", { className: "linkedin-color", children: "Linkedin" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://whatsapp.com/channel/0029VaI9Yoj9WtCA717aAd0h", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: resolveCdnAssetUrl(cdn, "assets/img/icon/whatsapp_v10.png"), alt: "WhatsApp" }),
              /* @__PURE__ */ jsx13("span", { className: "whatsapp-color", children: "WhatsApp" })
            ] }) }),
            /* @__PURE__ */ jsx13("a", { href: "https://www.youtube.com/@MyBharatHQ", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxs12("div", { className: "icon", children: [
              /* @__PURE__ */ jsx13("img", { src: resolveCdnAssetUrl(cdn, "assets/img/icon/youtube_v10.png"), alt: "YouTube" }),
              /* @__PURE__ */ jsx13("span", { className: "youtube-color", children: "YouTube" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx13("p", { className: "fw-normal mb-common-footer__powered-by mb-0", children: /* @__PURE__ */ jsxs12("small", { className: "mb-common-footer__powered-inner", children: [
            /* @__PURE__ */ jsx13("span", { className: "lang_footer_page_col_powered_by", children: "Powered by:" }),
            /* @__PURE__ */ jsx13(
              "a",
              {
                className: "whitetext text-decoration-none mb-common-footer__powered-logo",
                href: "https://digitalindia.gov.in/",
                target: "_blank",
                rel: "noreferrer",
                children: /* @__PURE__ */ jsx13(
                  "img",
                  {
                    src: resolveCdnAssetUrl(cdn, "assets/img/yuva_landing/DigitalIndiamybharat.svg"),
                    alt: "Digital India",
                    style: { width: 100, height: "auto", display: "block" }
                  }
                )
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx13("p", { className: "footertext mt-2 lang_footer_page_col_five_desc foot_p1 fontchange14", children: dicLineDefault })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx13("section", { className: "pricy1_a py-2", children: /* @__PURE__ */ jsx13("div", { className: "container", children: /* @__PURE__ */ jsxs12("div", { className: "row align-items-center flex-column flex-sm-row text-center text-sm-start", children: [
        /* @__PURE__ */ jsx13("div", { className: "col-sm-8", children: /* @__PURE__ */ jsx13("a", { href: "https://yas.gov.in/", target: "_blank", rel: "noreferrer", className: "text-decoration-none", children: /* @__PURE__ */ jsx13("small", { className: "lang_copyryt fontchange12", children: copyrightDefault }) }) }),
        /* @__PURE__ */ jsx13("div", { className: "col-sm-4 pricy_a", children: /* @__PURE__ */ jsx13("small", { children: /* @__PURE__ */ jsxs12("ul", { children: [
          /* @__PURE__ */ jsx13("li", { children: /* @__PURE__ */ jsx13("a", { href: "/pages/terms_of_use", className: "pricy_a lang_trms fontchange12", children: "Terms & Conditions" }) }),
          /* @__PURE__ */ jsx13("li", { children: /* @__PURE__ */ jsx13("a", { href: "/pages/policy", className: "lang_policy_page_header fontchange12", children: "Privacy Policy" }) })
        ] }) }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx13(
      FooterModals_default,
      {
        cdnBase: cdn,
        isLoggedIn,
        recaptchaSiteKey,
        onRegisteredUserClick
      }
    )
  ] });
};
var Footer_default = Footer;

// src/navigation/filterUnsafeNavTree.ts
function filterUnsafeNavTree(items) {
  return items.map((item) => {
    if (item.type === "link") return isSafeNavHref(item.href) ? item : null;
    const children = filterUnsafeNavTree(item.children);
    return children.length ? { ...item, children } : null;
  }).filter((item) => item !== null);
}

// src/navigation/navApiNormalize.ts
var LABEL_KEYS = ["label", "name", "title", "text", "menu_label", "menu_name", "display_name"];
var HREF_KEYS = ["href", "url", "path", "link", "route", "slug", "menu_url"];
var CHILD_KEYS = [
  "children",
  "submenu",
  "items",
  "nodes",
  "child_menus",
  "menu_items",
  "sub_menus"
];
function isPlainRecord2(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
function pickFirstString(obj, keys) {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
}
function pickChildArray(raw) {
  for (const k of CHILD_KEYS) {
    const v = raw[k];
    if (Array.isArray(v) && v.length) return v;
  }
  return [];
}
function normalizeHrefForNav(href) {
  if (typeof href !== "string") return "";
  const t = href.trim();
  if (!t) return "";
  if (/^\s*(javascript:|data:|vbscript:)/i.test(t)) return "";
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith("mailto:") || t.startsWith("tel:")) return t;
  if (t.startsWith("/")) return t.startsWith("//") ? "" : t;
  return `/${t.replace(/^\.\//, "")}`;
}
function normalizeApiMenuNode(raw, depth, maxDepth) {
  if (depth > maxDepth) return null;
  if (!isPlainRecord2(raw)) return null;
  const rawType = typeof raw.type === "string" ? raw.type.trim().toLowerCase() : "";
  const childSource = pickChildArray(raw);
  const children = childSource.map((c) => normalizeApiMenuNode(c, depth + 1, maxDepth)).filter((n) => n !== null);
  const label = pickFirstString(raw, LABEL_KEYS);
  const hrefRaw = pickFirstString(raw, HREF_KEYS);
  const treatAsGroup = rawType === "group" || rawType !== "link" && children.length > 0;
  if (treatAsGroup) {
    if (!children.length) return null;
    return { type: "group", label: label || "More", children };
  }
  const href = normalizeHrefForNav(hrefRaw);
  const link = {
    type: "link",
    label: label || href || "Link",
    href: href || "/"
  };
  if (typeof raw.linkClassName === "string") link.linkClassName = raw.linkClassName;
  if (typeof raw.spanClassName === "string") link.spanClassName = raw.spanClassName;
  if (typeof raw.external === "boolean") link.external = raw.external;
  return link;
}
function normalizeApiMenuTree(items, options) {
  const maxDepth = options?.maxDepth ?? 32;
  if (!Array.isArray(items)) return [];
  return items.map((raw) => normalizeApiMenuNode(raw, 0, maxDepth)).filter((n) => n !== null);
}

// src/navigation/unwrapMenuList.ts
var MENU_LIST_KEYS = [
  "items",
  "children",
  "menus",
  "menu_items",
  "nodes",
  "data",
  "tree",
  "mainNavItems",
  "nav",
  "navigation"
];
function unwrapMenuListFromPayload(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return null;
  const obj = data;
  for (const k of MENU_LIST_KEYS) {
    const v = obj[k];
    if (Array.isArray(v) && v.length) return v;
  }
  return null;
}

// src/navigation/requireMainNavItems.ts
var alerted2 = /* @__PURE__ */ new Set();
function alertOnceNav(key, message) {
  if (typeof window === "undefined" || alerted2.has(key)) return;
  alerted2.add(key);
  window.alert(message);
}
function alertMainNavLoadFailed(source) {
  alertOnceNav(
    `nav:${source}:load-failed`,
    `${source}: failed to load nav JSON. Check your API/CDN URL and network.`
  );
}
function isPlainRecord3(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function validateStrictNavItem(item, path) {
  if (!isPlainRecord3(item)) {
    return `${path}: must be an object with type "link" or "group"`;
  }
  const type = typeof item.type === "string" ? item.type.trim().toLowerCase() : "";
  if (type !== "link" && type !== "group") {
    return `${path}: missing or invalid "type" (expected "link" or "group")`;
  }
  if (typeof item.label !== "string" || !item.label.trim()) {
    return `${path}: missing or empty "label"`;
  }
  if (type === "link") {
    if (typeof item.href !== "string" || !item.href.trim()) {
      return `${path}: missing or empty "href"`;
    }
    if (!isSafeNavHref(item.href)) {
      return `${path}: unsafe or invalid "href"`;
    }
    return null;
  }
  if (!Array.isArray(item.children) || item.children.length === 0) {
    return `${path}: "group" must have a non-empty "children" array`;
  }
  for (let i = 0; i < item.children.length; i += 1) {
    const childError = validateStrictNavItem(item.children[i], `${path}.children[${i}]`);
    if (childError) return childError;
  }
  return null;
}
function describeLooseNavItemError(item, path) {
  if (!isPlainRecord3(item)) {
    return `${path}: must be an object`;
  }
  const hasLabel = ["label", "name", "title", "text", "menu_label", "menu_name", "display_name"].some(
    (key) => typeof item[key] === "string" && String(item[key]).trim()
  );
  const hasHref = ["href", "url", "path", "link", "route", "slug", "menu_url"].some(
    (key) => typeof item[key] === "string" && String(item[key]).trim()
  );
  const childKeys = ["children", "submenu", "items", "nodes", "child_menus", "menu_items", "sub_menus"];
  const hasChildren = childKeys.some((key) => Array.isArray(item[key]) && item[key].length > 0);
  if (!hasLabel && !hasHref && !hasChildren) {
    return `${path}: missing menu fields (need label/name, href/url, or children/submenu)`;
  }
  if (hasChildren) {
    for (const key of childKeys) {
      const children = item[key];
      if (!Array.isArray(children)) continue;
      for (let i = 0; i < children.length; i += 1) {
        const childError = describeLooseNavItemError(children[i], `${path}.${key}[${i}]`);
        if (childError) return childError;
      }
    }
  }
  if (hasHref) {
    const hrefKey = ["href", "url", "path", "link", "route", "slug", "menu_url"].find(
      (key) => typeof item[key] === "string" && String(item[key]).trim()
    );
    const href = hrefKey ? String(item[hrefKey]) : "";
    if (href && !isSafeNavHref(href)) {
      return `${path}: unsafe or invalid href`;
    }
  }
  return null;
}
function findFirstNavJsonError(list) {
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    const path = `[${i}]`;
    if (isPlainRecord3(item) && (item.type === "link" || item.type === "group")) {
      const strictError = validateStrictNavItem(item, path);
      if (strictError) return strictError;
    } else {
      const looseError = describeLooseNavItemError(item, path);
      if (looseError) return looseError;
    }
  }
  return null;
}
function requireMainNavItems(raw, options) {
  const source = options?.source?.trim() || "Header nav";
  const alertKey = `nav:${source}`;
  if (raw === void 0 || raw === null) {
    alertOnceNav(
      `${alertKey}:missing`,
      `${source}: nav JSON is not passed. Provide a non-empty JSON array via mainNavItems, nav-json-id, or MYBHARAT_SHELL.header.navItems.`
    );
    return [];
  }
  const list = unwrapMenuListFromPayload(raw);
  if (!list) {
    alertOnceNav(
      `${alertKey}:not-array`,
      `${source}: nav JSON must be a non-empty array (or an object wrapping one, e.g. { "data": [...] }).`
    );
    return [];
  }
  if (!list.length) {
    alertOnceNav(`${alertKey}:empty`, `${source}: nav JSON array is empty.`);
    return [];
  }
  const shaped = normalizeApiMenuTree(list, { maxDepth: options?.maxDepth });
  const safe = filterUnsafeNavTree(shaped);
  if (safe.length) return safe;
  const detail = findFirstNavJsonError(list);
  alertOnceNav(
    `${alertKey}:invalid`,
    detail ? `${source}: invalid nav JSON \u2014 ${detail}` : `${source}: nav JSON has no usable menu items after validation.`
  );
  return [];
}
function resolveMainNavItemsFromProp(items, source) {
  return requireMainNavItems(items, { source });
}

// src/navigation/prepareMainNavItems.ts
function prepareMainNavItems(raw, options) {
  return requireMainNavItems(raw, options);
}

// src/navigation/useMainNavItems.ts
import { useEffect as useEffect8, useRef as useRef3, useState as useState5 } from "react";

// src/navigation/navLoadCache.ts
var resultCache = /* @__PURE__ */ new Map();
var inflightCache = /* @__PURE__ */ new Map();
function navLoadCacheKey(source, maxDepth) {
  return `${source}::${maxDepth ?? "default"}`;
}
function readCachedNavItems(key) {
  return resultCache.get(key);
}
function runCachedNavLoad(key, load) {
  const cached = resultCache.get(key);
  if (cached) return Promise.resolve(cached);
  let inflight = inflightCache.get(key);
  if (!inflight) {
    inflight = load().then((items) => {
      resultCache.set(key, items);
      return items;
    }).finally(() => {
      inflightCache.delete(key);
    });
    inflightCache.set(key, inflight);
  }
  return inflight;
}

// src/navigation/useMainNavItems.ts
function useMainNavItems(options) {
  const { load, select, maxDepth, source = "Header nav" } = options;
  const [nav, setNav] = useState5([]);
  const loadRef = useRef3(load);
  const selectRef = useRef3(select);
  loadRef.current = load;
  selectRef.current = select;
  useEffect8(() => {
    let cancelled = false;
    const cacheKey = navLoadCacheKey(source, maxDepth);
    const cached = readCachedNavItems(cacheKey);
    if (cached) {
      setNav(cached);
      return;
    }
    runCachedNavLoad(cacheKey, async () => {
      const raw = await loadRef.current();
      const selectFn = selectRef.current;
      const slice = selectFn ? selectFn(raw) : raw;
      return prepareMainNavItems(slice, { maxDepth, source });
    }).then((items) => {
      if (!cancelled) setNav(items);
    }).catch(() => {
      if (!cancelled) {
        alertMainNavLoadFailed(source);
        setNav([]);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [maxDepth, source]);
  return nav;
}

// src/index.ts
var MYBHARAT_COMMON_FRONTEND_VERSION = "1.0.246";
var index_default = { Header: Header_default, Header2: Header2_default, Footer: Footer_default };
export {
  APP_ROUTES,
  AUTH_CONFIG,
  BHASHINI_WIDGET_SELECTORS,
  DEFAULT_API_ERROR_MESSAGE,
  DEFAULT_LOGIN_API_ERROR,
  DEV_API_PROXY_PREFIXES,
  DesktopMainNav,
  EXTERNAL_URLS,
  Footer_default as Footer,
  GATEWAY_PATHS,
  HEADER_LOGIN_SIGN_IN_SELECTORS,
  Header_default as Header,
  Header2_default as Header2,
  HeaderAuthControls,
  HeaderLoginShellPortal,
  HeaderProfileMenu,
  INTERNAL_PATHS,
  MYBHARAT_COMMON_FRONTEND_VERSION,
  OTP_MESSAGES,
  PORTAL_PATHS,
  PROXY_REWRITES,
  SAVE_FEEDBACK_DATA_PATH,
  alertMainNavLoadFailed,
  applyFooterFeedbackApiConfig,
  applyFooterFeedbackConfig,
  applyShellLoginApiConfig,
  assertRequiredClientConfig,
  buildHeaderProfileMenuItems,
  buildShellApiUrl,
  clearShellInternalAuthCache,
  completeForgotPasswordUpdate,
  completeLoginWithOtp,
  completeLoginWithOtp as completeLoginWithOtpFlow,
  completePasswordSignIn,
  index_default as default,
  fetchInternalGuestOauthAccessToken,
  fetchInternalKeycloakClientAccessToken,
  filterUnsafeNavTree,
  findBhashiniWidget,
  getKeycloakClientAccessToken,
  getShellApiFetchBaseUrl,
  installFooterFeedbackFlow,
  installHeaderAccessibilityFont,
  installHeaderLoginFlow,
  isFeedbackSubmitSuccess,
  isGuestHeaderUserPayload,
  isHeaderUserLoggedIn,
  isLoginOtpRedirectResult,
  isNavGroupItem,
  isNavLinkItem,
  isSafeNavHref,
  loadBhashiniScript,
  mergeRequiredClientConfig,
  navTreeItemKey,
  normalizeApiMenuTree,
  normalizeHrefForNav,
  normalizeNavTree,
  openLoginWithOtpModal,
  openSignInPasswordModal,
  parseHeaderUserSession,
  prepareMainNavItems,
  readClientEnvironment,
  readMbAppTokenFromGatewayResponse,
  readShellCookieDomain,
  requireMainNavItems,
  resolveBrowserApiBaseUrl,
  resolveCdnAssetUrl,
  resolveCdnBase,
  resolveEstablishSessionAction,
  resolveMainNavItemsFromProp,
  resolveShellLoginConfig,
  saveUserFeedback,
  setMbAuthSessionCookies,
  submitEstablishSessionForm,
  submitOtpLoginFromModal,
  triggerGeneralFeedbackReward,
  unwrapMenuListFromPayload,
  useBhashiniWidgetPlacement,
  useFooterFeedbackShell,
  useHeaderAccessibilityFont,
  useMainNavItems,
  useRequiredClientConfig,
  validateFeedbackForm,
  validateOtpLoginForm
};
/*! Bundled license information:

bootstrap/dist/js/bootstrap.esm.js:
  (*!
    * Bootstrap v5.3.8 (https://getbootstrap.com/)
    * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
    *)
*/
