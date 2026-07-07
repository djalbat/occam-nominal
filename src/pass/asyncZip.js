"use strict";

import { AsyncZipPass as AsyncZipPassBase } from "occam-languages";

export default class AsyncZipPass extends AsyncZipPassBase {
  async run(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments) {
    let success = false;

    const generalChildNodes = generalNonTerminalNode.getChildNodes(), ///
          specificChildNodes = specificNonTerminalNode.getChildNodes(), ///
          descended = await this.descend(generalChildNodes, specificChildNodes, ...remainingArguments);

    if (descended) {
      success = true;
    }

    return success;
  }
}
