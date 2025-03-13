// 深度合并对象和数组的功能，当遇到数组是需要将两个数组合并成一个新数组
export function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) {
    throw new TypeError('Both arguments must be objects');
  }

  const result = Array.isArray(target) ? [] : {};

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (typeof target[key] === 'object' && target[key] !== null) {
          // Both are objects or arrays, recurse
          result[key] = deepMerge(target[key], source[key]);
        } else {
          // Only source is an object or array, use it
          result[key] = source[key];
        }
      } else if (Array.isArray(source[key])) {
        // Handle arrays
        if (Array.isArray(target[key])) {
          // Both are arrays, merge them
          result[key] = target[key].concat(source[key]);
        } else {
          // Only source is an array, use it
          result[key] = source[key];
        }
      } else {
        // Primitives, use source value
        result[key] = source[key];
      }
    }
  }

  // Copy remaining properties from target
  for (const key in target) {
    if (target.hasOwnProperty(key) && !(key in result)) {
      result[key] = target[key];
    }
  }

  return result;
}
