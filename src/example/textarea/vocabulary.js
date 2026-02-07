"use strict";

import Textarea from "../textarea";

export default class VocabularyTextarea extends Textarea {
  getVocabulary() {
    const value = this.getValue(),
          vocabulary = value; ///

    return vocabulary;
  }

  setVocabulary(vocabulary) {
    const value = vocabulary; ///

    this.setValue(value);
  }

  parentContext() {
    const getVocabulary = this.getVocabulary.bind(this),
          setVocabulary = this.setVocabulary.bind(this);

    return ({
      getVocabulary,
      setVocabulary
    });
  }

  static defaultProperties = {
    className: "vocabulary",
    spellCheck: "false"
  };
}
