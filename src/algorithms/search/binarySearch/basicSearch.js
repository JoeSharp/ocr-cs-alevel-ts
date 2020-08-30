import { NO_MATCH } from "../common";

/**
 * Executes a binary search.
 * This is the recursive form of the function.
 *
 * Based on pseudocode from
 * https://www.geeksforgeeks.org/binary-search/
 *
 * @param data The data to search through
 * @param match A function that can be used to compare any item with our criteria
 * @param left The left pointer, bounds this segment (part of the recursion)
 * @param right The right pointer, bounds this segment (part of the recursion)
 */
function binarySearchR(data, match, left, right) {
  // Exit condition...
  if (right < left) {
    return NO_MATCH;
  }

  // Calculate the mid point
  const mid = Math.floor(left + (right - left) / 2);

  // Compare the midpoint to our criteria
  const compareMid = match(data[mid], mid);

  // If the element is present in the middle itself
  if (compareMid === 0) {
    return mid;
  } else if (compareMid < 0) {
    // If element is smaller than mid, then
    // it can only be present in left subarray
    return binarySearchR(data, match, left, mid - 1);
  } else {
    // Else the element can only be present
    // in right subarray
    return binarySearchR(data, match, mid + 1, right);
  }
}

function binarySearch(data, match) {
  return binarySearchR(data, match, 0, data.length - 1);
}

export default binarySearch;
