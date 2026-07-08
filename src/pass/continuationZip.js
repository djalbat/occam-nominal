"use strict";

import { ContinuationZipPass as ContinuationZipPassBase } from "occam-languages";

export default class ContinuationZipPass extends ContinuationZipPassBase {
  run(generalNonTerminalNode, specificNonTerminalNode, ...remainingArguments) {
    const continuation = remainingArguments.pop(),
          generalChildNodes = generalNonTerminalNode.getChildNodes(), ///
          specificChildNodes = specificNonTerminalNode.getChildNodes(); ///

    this.descend(generalChildNodes, specificChildNodes, ...remainingArguments, continuation);
  }
}
