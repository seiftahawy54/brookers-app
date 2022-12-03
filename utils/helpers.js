/**
 * @description
 * @param {[{param: string, msg: string}]} expressValidatorArray
 * @returns [{field: string, reason: string}]
 */

export const extractErrorMessages = (expressValidatorArray) => {
  return expressValidatorArray.map((errObj) =>
    constructError(errObj.param, errObj.msg)
  );
};

/**
 * @description
 * @param {[{path: [string], message: string}]} expressValidatorArray
 * @returns [{field: string, reason: string}]
 */

export const extractErrorMessagesForSchemas = (expressValidatorArray) => {
  return expressValidatorArray.map((errObj) =>
    constructError(errObj.path[0], errObj.message)
  );
};

/**
 * @description check whether the object passed is empty or not.
 * @param {object} obj
 * @returns - true if object is empty
 *          - false if object is not empty
 */

export const isEmpty = (obj) => Object.keys(obj).length === 0;

/**
 * @description Construct the global object of errors
 * @param {string} field
 * @param {string} message
 * @returns - { field: string, reason: string }
 */

export const constructError = (field, message) => ({ field, reason: message });

/**
 * @description Construct the filters for searching in posts
 * @param {object} dataObj
 * @returns - { field: string, reason: string }
 */

export const constructSelectors = (dataObj) =>
  Object.keys(dataObj).map((prop) => ({ [prop]: 1 }));
