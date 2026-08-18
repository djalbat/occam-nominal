"use strict";

export function synchronousOne(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        length = array.length,
        index = 0;

  function next(index, ...nextArguments) {
    if (index === length) {
      const success = (count === 1),
            finalArguemnts = success ?
                               nextArguments : ///
                                 initialArguments; ///

      return continuation(success, ...finalArguemnts);
    }

    const element = array[index];

    return callback(element, ...initialArguments, (success, ...callbackArguments) => {
      if (success) {
        count++;

        if (count === 2) {
          const success = false,
                finalArguments = initialArguments;  ///

          return continuation(success, ...finalArguments);
        }

        return next(index + 1, ...callbackArguments);
      }

      return next(index + 1, ...nextArguments);
    });
  }

  let count = 0;

  return next(index, ...initialArguments);
}

export function synchronousSome(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        length = array.length,
        index = 0;

  function next(index) {
    if (index === length) {
      const success = false,
            finalArguments = initialArguments; ///

      return continuation(success, ...finalArguments);
    }

    const element = array[index];

    return callback(element, ...initialArguments, (success, ...callbackArguments) => {
      if (success) {
        const finalArguments = callbackArguments; //

        return continuation(success, ...finalArguments);
      }

      return next(index + 1);
    });
  }

  return next(index);
}

export function synchronousEach(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        length = array.length,
        index = 0;

  function next(index, ...nextArguments) {
    if (index === length) {
      const success = (count !== 0),
            finalArguments = success ?
                                nextArguments : ///
                                  initialArguments; ///

      return continuation(success, ...finalArguments);
    }

    const element = array[index];

    return callback(element, ...nextArguments, (success, ...callbackArguments) => {
      if (!success) {
        const finalArguments = initialArguments;  ///

        return continuation(success, ...finalArguments);
      }

      count++;

      return next(index + 1, ...callbackArguments);
    });
  }

  let count = 0;

  return next(index, ...initialArguments);
}

export function synchronousEvery(array, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        length = array.length,
        index = 0;

  function next(index, ...nextArguments) {
    if (index === length) {
      const success = true,
            finalArguments = nextArguments; ///

      return continuation(success, ...finalArguments);
    }

    const element = array[index];

    return callback(element, ...nextArguments, (success, ...callbackArguments) => {
      if (!success) {
        const finalArguments = initialArguments;  ///

        return continuation(success, ...finalArguments);
      }

      return next(index + 1, ...callbackArguments);
    });
  }

  return next(index, ...initialArguments);
}

export function synchronousMatch(arrayA, arrayB, callback, ...initialArguments) {
  const continuation = initialArguments.pop(),
        arrayALength = arrayA.length,
        arrayBLength = arrayB.length;

  if (arrayALength !== arrayBLength) {
    const success = false,
          finalArguments = initialArguments;  ///

    return continuation(success, ...finalArguments);
  }

  const length = arrayALength,  ///
        index = 0;

  function next(index, ...nextArguments) {
    if (index === length) {
      const success = true,
            finalArguments = nextArguments; ///

      return continuation(success, ...finalArguments);
    }

    const elementA = arrayA[index],
          elementB = arrayB[index];

    return callback(elementA, elementB, ...nextArguments, (success, ...callbackArguments) => {
      if (!success) {
        const finalArguments = initialArguments;  ///

        return continuation(success, ...finalArguments);
      }

      return next(index + 1, ...callbackArguments);
    });
  }

  return next(index, ...initialArguments);
}

export function synchronousAll(callbacks, ...initialArguments) {
  return synchronousEvery(callbacks, (callback, ...callbackArguments) => {
    return callback(...callbackArguments);
  }, ...initialArguments);
}

export function synchronousExists(callbacks, ...initialArguments) {
  return synchronousSome(callbacks, (callback, ...callbackArguments) => {
    return callback(...callbackArguments);
  }, ...initialArguments);
}
