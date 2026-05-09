"use strict";

import { BreakPoint } from "occam-languages";

export function breakPointFromJSON(json) {
  let breakPoint;

  ({ breakPoint } = json);

  if (breakPoint !== null) {
    const breakPointJSON = breakPoint;  ///

    json = breakPointJSON;  ///

    breakPoint = BreakPoint.fromJSON(json);  ///
  }

  return breakPoint;
}

export function breakPointToBreakPointJSON(breakPoint) {
  let breakPointJSON = null;

  if (breakPoint !== null) {
    breakPointJSON = breakPoint.toJSON();
  }

  return breakPointJSON;
}
