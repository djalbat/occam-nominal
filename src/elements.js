"use strict";

const elements = {};

export function define(Element) {
  const { name } = Element;

  elements[name] = Element;

  return Element;
}

export default elements;
