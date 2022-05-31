const isTextVdom = (vdom) => {
  return typeof vdom === "string" || typeof vdom === "number";
};

const isElementVdom = (vdom) => {
  return typeof vdom === "object" || vdom.type === "string";
};

const isComponentVdom = (vdom) => {
    return typeof vdom.type === "function";
}

const setAttribute = (dom, key, value) => {
  if (typeof value == "function" && key.startsWith("on")) {
    const eventType = key.slice(2).toLowerCase();
    dom.addEventListener(eventType, value);
  } else if (key == "style" && typeof value == "object") {
    Object.assign(dom.style, value);
  } else if (typeof value != "object" && typeof value != "function") {
    if (key === "className") {
      key = "class";
    }
    dom.setAttribute(key, value);
  }
};

const render = (vdom, parent = null) => {
  const mount = parent ? (el) => parent.appendChild(el) : (el) => el;
  if (isTextVdom(vdom)) {
    return mount(document.createTextNode(vdom));
  } else if (isComponentVdom(vdom)){
    const componentVdom = vdom.type(vdom.props);
    return render(componentVdom, parent);
  } else if (isElementVdom(vdom)) {
    const dom = mount(document.createElement(vdom.type));
    const children = vdom.props.children;
    if (isTextVdom(vdom.props.children)) {
      render(children, dom);
    } else {
      for (const child of children) {
        render(child, dom);
      }
    }

    for (const prop in vdom.props) {
      if (prop !== "children") {
        setAttribute(dom, prop, vdom.props[prop]);
      }
    }
    return dom;
  }
};

export { render };
