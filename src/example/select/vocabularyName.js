"use strict";

import Select from "../select";

import { TYPE_VOCABULARY_NAME, SYMBOL_VOCABULARY_NAME }  from "../../vocabularyNames";

export default class VocabularyNameSelect extends Select {
  getVocabularyName() {
    const value = this.getValue(),
          vocabularyName = value; ///

    return vocabularyName;
  }

  childElements() {
    const vocabularyNames = [
            TYPE_VOCABULARY_NAME,
            SYMBOL_VOCABULARY_NAME
          ],
          options  = vocabularyNames.map((vocabularyName, index) => {
            const value = vocabularyName,
                  selected = (index === 0);

            return (

              <option value={value} selected={selected} >
                {vocabularyName}
              </option>

            );
          }),
          childElements = [
            ...options
          ];


    return childElements;
  }

  parentContext() {
    const getVocabularyName = this.getVocabularyName.bind(this); ///

    return ({
      getVocabularyName
    });
  }

  static defaultProperties = {
    className: "rule-name",
    spellCheck: "false"
  }
}
