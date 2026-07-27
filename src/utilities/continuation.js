"use strict";

export function one(array, callback, ...initialArguments) {
  let success = false;

  const continuation = initialArguments.pop(),
        length = array.length;

  let count = 0;

  for (let index = 0; index < length; index++) {
    const element = array[index];

    success = callback(element, ...initialArguments, continuation);

    if (success) {
      count++;

      if (count > 1) {
        break;
      }
    }
  }

  success = (count === 1);

  return success;
}

export function some(array, callback, ...initialArguments) {
  let success = false;

  const continuation = initialArguments.pop(),
        length = array.length;

  for (let index = 0; index < length; index++) {
    const element = array[index];

    success = callback(element, ...initialArguments, continuation);

    if (success) {
      break;
    }
  }

  return success;
}

export function each(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        callbackArguments = initialArguments, ///
        length = array.length,
        index = 0;

  function next(index, ...callbackArguments) {
    let success;

    if (index === length) {
      success = (length > 0) ?
                  continuation(...callbackArguments) :
                    false;
    } else {
      const element = array[index];

      success = callback(element, ...callbackArguments, (...callbackArguments) => {
        return next(index + 1, ...callbackArguments);
      });
    }

    return success;
  }

  return next(index, ...callbackArguments);
}

export function every(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        callbackArguments = initialArguments, ///
        length = array.length,
        index = 0;

  function next(index, ...callbackArguments) {
    let success;

    if (index === length) {
      success =  continuation(...callbackArguments);
    } else {
      const element = array[index];

      success = callback(element, ...callbackArguments, (...callbackArguments) => {
        return next(index + 1, ...callbackArguments);
      });
    }

    return success;
  }

  return next(index, ...callbackArguments);
}

export function filter(array, callback, ...initialArguments) {
  const deletedElements = [],
        continuation = initialArguments.pop(),
        length = array.length;

  for (let index = length - 1; index >= 0 ; index--) {
    const element = array[index],
          success = callback(element, ...initialArguments, continuation);

    if (!success) {
      const startIndex = index, ///
            deleteCount = 1,
            deletedElement = element; ///

      array.splice(startIndex, deleteCount);

      deletedElements.unshift(deletedElement);
    }
  }

  return deletedElements;
}

export function match(arrayA, arrayB, callback, ...initialArguments) {
  const arrayALength = arrayA.length,
        arrayBLength = arrayB.length;

  if (arrayALength !== arrayBLength) {
    const success = false;

    return success;
  }

  const continuation = initialArguments.pop(),
        callbackArguments = initialArguments, ///
        length = arrayALength,  ///
        index = 0;

  function next(index, ...callbackArguments) {
    let success;

    if (index === length) {
      success = continuation(...callbackArguments);
    } else {
      const elementA = arrayA[index],
            elementB = arrayB[index];

      success = callback(elementA, elementB, ...callbackArguments, (...callbackArguments) => {
        return next(index + 1, ...callbackArguments);
      });
    }

    return success;
  }

  return next(index, ...callbackArguments);
}

export function all(callbacks, ...initialArguments) {
  return every(callbacks, (callback, ...callbackArguments) => {
    return callback(...callbackArguments);
  }, ...initialArguments);
}

export function exists(callbacks, ...initialArguments) {
  return some(callbacks, (callback, ...callbackArguments) => {
    return callback(...callbackArguments);
  }, ...initialArguments);
}
