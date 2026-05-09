"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateProperty } from "../process/instantiate";
import { nameFromPropertyNode } from "../utilities/element";
import { typeFromJSON, typeToTypeJSON } from "../utilities/json";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

export default define(class Property extends Element {
  constructor(context, string, node, breakPoint, name, type) {
    super(context, string, node, breakPoint);

    this.name = name;
    this.type = type;
  }

  getName() {
    return this.name;
  }

  getType() {
    return this.type;
  }

  getPropertyNode() {
    const node = this.getNode(),
          properetyNode = node; ///

    return properetyNode;
  }

  setName(name) {
    this.name = name;
  }

  setType(type) {
    this.type = type;
  }

  isEqualTo(property) {
    const propertyNode = property.getNode(),
          propertyNodeMatches = this.matchPropertyNode(propertyNode),
          equalTo = propertyNodeMatches;  ///

    return equalTo;
  }

  matchPropertyNode(propertyNode) {
    const node = propertyNode, ///
          nodeMatches = this.matchNode(node),
          propertyNodeMatches = nodeMatches; ///

    return propertyNodeMatches;
  }

  comparePropertyName(propertyName) {
    const comparesToPropertyName = (this.name === propertyName);

    return comparesToPropertyName;
  }

  verify(properties, context) {
    let verifies = false;

    const propertyString = this.getString();  ///

    context.trace(`Verifying the '${propertyString}' property...`);

    const naemVerifies = this.verifyName(properties, context);

    if (naemVerifies) {
      verifies = true;
    }

    if (verifies) {
      context.debug(`...verified the '${propertyString}' property.`);
    }

    return verifies;
  }

  verifyName(properties, context) {
    let naemVerifies = false;

    const propertyString = this.getString();

    context.trace(`Verifying the '${propertyString}' property's name...`);

    const propertyName = this.name, ///
          count = properties.reduce((count, property) => {
            if (property !== this) {
              const propertyComparesToPropertyName = property.comparePropertyName(propertyName);

              if (propertyComparesToPropertyName) {
                count++;
              }
            }

            return count;
          }, 0);

    if (count === 0) {
      naemVerifies = true;
    } else {
      context.debug(`The '${propertyString}' property appears more than once.`);
    }

    if (naemVerifies) {
      context.debug(`...verified the '${propertyString}' property's name.`);
    }

    return naemVerifies;
  }

  findValidProperty(context) {
    const propertyNode = this.getPropertyNode(),
          property = context.findPropertyByPropertyNode(propertyNode),
          validProperty = property; ///

    return validProperty;
  }

  validate(context, validateForwards) {
    let property = null;

    const propertyString = this.getString();  ///

    context.trace(`Validating the '${propertyString}' property...`);

    let validates = false;

    const validProperty = this.findValidProperty(context);

    if (validProperty !== null) {
      property = validProperty; ///

      const validatesForward = validateForwards(property, context);

      if (validatesForward) {
        validates = true;

        context.debug(`...the '${propertyString}' property is already valid.`);
      } else {
        property = null;
      }
    } else {
      {
        const property = this,  ///
              validatesForward = validateForwards(property, context);

        if (validatesForward) {
          validates = true;
        }
      }

      if (validates) {
        property = this;  ///

        context.addProperty(property);
      }
    }

    if (validates) {
      context.debug(`...validated the '${propertyString}' property.`);
    }

    return property;
  }

  validateGivenType(type, context) {
    let property;

    const typeString = type.getString(),
          propertyString = this.getString();  ///

    context.trace(`Validating the '${propertyString}' property given the '${typeString}' type...`);

    let validatesGivenType = false;

    property = this.validate(context, (property, context) => {
      let validatesForwards = false;

      const propertyName = property.getName(),
            typeProperties = type.getProperties(),
            typeProperty = typeProperties.find((typeProperty) => {
              const typePropertyComparesToPropertyName = typeProperty.comparePropertyName(propertyName);

              if (typePropertyComparesToPropertyName) {
                return true;
              }
            }) || null;

      if (typeProperty !== null) {
        const type = typeProperty.getType();

        property.setType(type);

        validatesForwards = true;
      }

      return validatesForwards;
    });

    if (property !== null) {
      validatesGivenType = true;
    }

    if (validatesGivenType) {
      context.debug(`...validated the '${propertyString}' property given the '${typeString}' type.`);
    }

    return property;
  }

  toJSON() {
    const typeJSON = typeToTypeJSON(this.type),
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const type = typeJSON,  ///
          json = {
            string,
            breakPoint,
            type
          };

    return json;
  }

  static name = "Property";

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            propertyNode = instantiateProperty(string, context),
            node = propertyNode,  ///
            breakPoint = breakPointFromJSON(json),
            name = nameFromPropertyNode(propertyNode, context),
            type = typeFromJSON(json, context);

      context = null;

      const property = new Property(context, string, node, breakPoint, name, type);

      return property;
    }, context);
  }
});
