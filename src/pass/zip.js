"use strict";

import { ZipPass as ZipPassBase } from "occam-languages";

export default class ZipPass extends ZipPassBase {
  run(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments) {
    let success = false;

    const generalChildNodes = generalNonTerminalNode.getChildNodes(), ///
          specificChildNodes = specificNonTerminalNode.getChildNodes(), ///
          descended = this.descend(generalChildNodes, specificChildNodes, ...remainingArguments);

    if (descended) {
      success = true;
    }

    return success;
  }
}
