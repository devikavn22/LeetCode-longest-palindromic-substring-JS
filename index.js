var longestPalindrome = function (s) {
  if (s.length <= 1) return s;

  // Transform the input string to include special characters
  let modifiedString = "^#" + s.split("").join("#") + "#$";
  let palindromeLengths = new Array(modifiedString.length).fill(0);
  let center = 0;
  let right = 0;

  for (let i = 1; i < modifiedString.length - 1; i++) {
    let mirror = 2 * center - i;

    if (i < right) {
      palindromeLengths[i] = Math.min(right - i, palindromeLengths[mirror]);
    }

    // Attempt to expand the palindrome centered at i
    while (
      modifiedString[i + palindromeLengths[i] + 1] ===
      modifiedString[i - palindromeLengths[i] - 1]
    ) {
      palindromeLengths[i]++;
    }

    // If the expanded palindrome is rightmost, adjust center and right
    if (i + palindromeLengths[i] > right) {
      center = i;
      right = i + palindromeLengths[i];
    }
  }

  // Find the maximum element in palindromeLengths
  let maxLen = Math.max(...palindromeLengths);

  // Find the center of the longest palindrome
  let centerIndex = palindromeLengths.indexOf(maxLen);

  // Extract the palindrome substring from the modified string
  let start = (centerIndex - maxLen) / 2;
  let end = start + maxLen;

  return s.substring(start, end);
};

// Test cases
console.log(longestPalindrome("babad")); // Output: "bab" or "aba"
console.log(longestPalindrome("cbbd")); // Output: "bb"

// Time Complexity :
/*
The algorithm used in this solution is a dynamic programming approach, specifically a bottom-up approach for 
finding the longest palindromic substring. This approach uses a 2D array to store whether substrings 
are palindromic and leverages previously computed results to find the answer.

Time Complexity:
The time complexity of this solution is O(n^2), where n is the length of the input string `s`. 
This is because we have two nested loops:

1. The outer loop runs for substrings of lengths from 2 to n, which is O(n).
2. The inner loop runs for each character in the string, which is also O(n) in the worst case.

So, the overall time complexity is O(n^2), as we check all possible substrings in the worst case.

Space Complexity:
The space complexity of the solution is O(n^2) as well. This is because we use a 2D array `dp` of size n x n to 
store whether substrings are palindromic. Therefore, the space required is proportional to the square of the input string's length.

In summary, the provided dynamic programming solution has a time complexity of O(n^2) and a 
space complexity of O(n^2), making it an efficient way to find the longest palindromic substring in a given string.
*/
