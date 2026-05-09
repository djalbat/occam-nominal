"use strict";

import elements from "./elements";

import { FRAME_META_TYPE_NAME, REFERENCE_META_TYPE_NAME, STATEMENT_META_TYPE_NAME } from "./metaTypeNames";

let frameMetaType = null,
    referenceMetaType = null,
    statementMetaType = null;

export function getMetaTypes() {
  const frameMetaType = frameMetaTypeFromNothing(),
        referenceMetaType = referenceMetaTypeFromNothing(),
        statementMetaType = statementMetaTypeFromNothing(),
        metaTypes = [
          frameMetaType,
          referenceMetaType,
          statementMetaType
        ];

  return metaTypes;
}

export function findMetaTypeByMetaTypeName(metaTypeName) {
  const metaTypes = getMetaTypes(),
        metaType = metaTypes.find((metaType) => {
          const metaTypeComparesToMetaTypeName = metaType.compareMetaTypeName(metaTypeName);

          if (metaTypeComparesToMetaTypeName) {
            return true;
          }
        }) || null;

  return metaType;
}

function frameMetaTypeFromNothing() {
  if (frameMetaType === null) {
    const { MetaType } = elements,
          name = FRAME_META_TYPE_NAME,  ///
          context = null;

    frameMetaType = MetaType.fromName(name, context);
  }

  return frameMetaType;
}

function statementMetaTypeFromNothing() {
  if (statementMetaType === null) {
    const { MetaType } = elements,
          name = STATEMENT_META_TYPE_NAME,  ///
          context = null;

    statementMetaType = MetaType.fromName(name, context);
  }

  return statementMetaType;
}

function referenceMetaTypeFromNothing() {
  if (referenceMetaType === null) {
    const { MetaType } = elements,
          name = REFERENCE_META_TYPE_NAME,  ///
          context = null;

    referenceMetaType = MetaType.fromName(name, context);
  }

  return referenceMetaType;
}
