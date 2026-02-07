"use strict";

import Select from "../select";

import { DEFAULT_CUSTOM_GRAMMAR_NAME, USER_DEFINED_CUSTOM_GRAMMAR_NAME } from "../grammarNames";

export default class NameSelect extends Select {
  getName() {
    const value = this.getValue(),
          name = value; ///

    return name;
  }

  childElements() {
    const names = [
            DEFAULT_CUSTOM_GRAMMAR_NAME,
            USER_DEFINED_CUSTOM_GRAMMAR_NAME
          ],
          options = names.map((name, index) => {
            const value = name,
                  selected = (index === 0);

            return (

              <option value={value} selected={selected} >
                {name}
              </option>

            );
          }),
          childElements = [
            ...options
          ];

    return childElements;
  }

  parentContext() {
    const getName = this.getName.bind(this); ///

    return ({
      getName
    });
  }

  static defaultProperties = {
    className: "name",
    spellCheck: "false"
  }
}
