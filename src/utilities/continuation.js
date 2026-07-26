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
        length = array.length;

  let index = -1,
      count = 0;

  function next(...callbackArguments) {
    index++;

    let success;

    if (index === length) {
      success = (count > 0);

      if (!success) {
        return success;
      }

      return continuation(...callbackArguments);
    }

    const element = array[index];

    success = callback(element, ...callbackArguments, (...callbackArguments) => {
      count++;

      return next(...callbackArguments);
    });

    return success;
  }

  const callbackArguments = initialArguments; ///

  return next(...callbackArguments);
}

export function every(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        length = array.length;

  let index = -1;

  function next(...callbackArguments) {
    index++;

    let success;

    if (index === length) {
      return continuation(...callbackArguments);
    }

    const element = array[index];

    success = callback(element, ...callbackArguments, (...callbackArguments) => {
      return next(...callbackArguments);
    });

    return success;
  }

  const callbackArguments = initialArguments; ///

  return next(...callbackArguments);
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
