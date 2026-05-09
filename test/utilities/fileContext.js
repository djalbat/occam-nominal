"use strict";

const { filePathUtilities } = require("occam-model"),
      { FurtleFileContext } = require("occam-furtle"),
      { NominalFileContext } = require("../../lib/index");  ///

const { isFilePathFurtleFilePath, isFilePathNominalFilePath } = filePathUtilities;

function FileContextFromFilePath(filePath) {
  let FileContext = null;

  const filePathFurtleFilePath = isFilePathFurtleFilePath(filePath),
        filePathNominalFilePath = isFilePathNominalFilePath(filePath);

  if (filePathFurtleFilePath) {
    FileContext = FurtleFileContext;  ///
  }

  if (filePathNominalFilePath) {
    FileContext = NominalFileContext; ///
  }

  return FileContext;
}

module.exports = {
  FileContextFromFilePath
};
