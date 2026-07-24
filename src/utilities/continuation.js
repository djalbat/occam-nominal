"use strict";

export function one(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        length = array.length;

  let count = 0,
      index = -1;

  function next(...callbackArguments) {
    index++;

    if (index === length) {
      const success = (count === 1);

      return success;
    }

    const element = array[index];

    return callback(element, ...callbackArguments, (success, ...intermediateArguments) => {
      if (success) {
        success = continuation(success, ...intermediateArguments);
      }

      if (!success) {
        const callbackArguments = initialArguments; ///

        return next(...callbackArguments);
      }

      if (count === 1) {
        const success = false;

        return success;
      }

      count++;

      const callbackArguments = initialArguments; ///

      return next(...callbackArguments);
    });
  }

  const callbackArguments = initialArguments; ///

  return next(...callbackArguments);
}

export function some(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        length = array.length;

  let index = -1;

  function next(...callbackArguments) {
    index++;

    if (index === length) {
      const success = false;

      return success;
    }

    const element = array[index];

    return callback(element, ...callbackArguments, (success, ...intermediateArguments) => {
      if (success) {
        success = continuation(success, ...intermediateArguments);
      }

      if (!success) {
        const callbackArguments = initialArguments; ///

        return next(...callbackArguments);
      }

      return success;
    });
  }

  const callbackArguments = initialArguments; ///

  return next(...callbackArguments);
}

export function each(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        length = array.length;

  let index = -1,
      count = 0;

  function next(...callbackArguments) {
    index++;

    if (index === length) {
      const success = (count > 0);

      if (!success) {
        return success;
      }

      const finalArguments = callbackArguments; ///

      return continuation(success, ...finalArguments);
    }

    const element = array[index];

    return callback(element, ...callbackArguments, (success, ...intermediateArguments) => {
      if (!success) {
        return success;
      }

      count++;

      const callbackArguments = intermediateArguments; ///

      return next(...callbackArguments);
    });
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

    if (index === length) {
      const success = true,
            finalArguments = callbackArguments; ///

      return continuation(success, ...finalArguments);
    }

    const element = array[index];

    return callback(element, ...callbackArguments, (success, ...intermediateArguments) => {
      if (!success) {
        return success;
      }

      const callbackArguments = intermediateArguments; ///

      return next(...callbackArguments);
    });
  }

  const callbackArguments = initialArguments; ///

  return next(...callbackArguments);
}

export function filter(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        length = array.length;

  const deletedElements = [];

  let index = length;

  function next(...callbackArguments) {
    index--;

    if (index === -1) {
      const finalArguments = callbackArguments; ///

      return continuation(deletedElements, ...finalArguments);
    }

    const element = array[index];

    return callback(element, ...callbackArguments, (passed, ...intermediateArguments) => {
      if (!passed) {
        const startIndex = index, ///
              deleteCount = 1,
              deletedElement = element; ///

        array.splice(startIndex, deleteCount);

        deletedElements.unshift(deletedElement);
      }

      const callbackArguments = intermediateArguments; ///

      return next(...callbackArguments);
    });
  }

  const callbackArguments = initialArguments; ///

  return next(...callbackArguments);
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
