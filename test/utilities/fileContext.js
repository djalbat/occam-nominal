"use strict";

const { filePathUtilities } = require("occam-model"),
      { NominalFileContext } = require("../../lib/index");  ///

const { isFilePathNominalFilePath } = filePathUtilities;

function FileContextFromFilePath(filePath) {
  let FileContext = null;

  const filePathNominalFilePath = isFilePathNominalFilePath(filePath);

  if (filePathNominalFilePath) {
    FileContext = NominalFileContext; ///
  }

  return FileContext;
}

module.exports = {
  FileContextFromFilePath
};
