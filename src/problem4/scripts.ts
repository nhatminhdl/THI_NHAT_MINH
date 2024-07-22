//Implementation 1: Iterative Approach


function sumToN_iterative(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
}

console.log('sumToN_iterative', sumToN_iterative(5))

  
  /*
  Complexity and Efficiency:

    * Time Complexity: O(n) - The function iterates from 1 to n, performing a constant-time addition in each iteration.
    * Space Complexity: O(1) - The function uses a fixed amount of space regardless of the input size.
    * Efficiency: This approach is straightforward and easy to understand. However, it can be inefficient for very large values of n due to the linear time complexity.
  */


//Implementation 2: Mathematical Formula 
function sumToN_formula(n: number): number {
    return (n * (n + 1)) / 2;
}
console.log('sumToN_formula', sumToN_formula(5))
/*
Complexity and Efficiency:

    * Time Complexity: O(1) - The function performs a fixed number of arithmetic operations regardless of the input size.
    * Space Complexity: O(1) - The function uses a fixed amount of space.
    * Efficiency: This approach is highly efficient both in terms of time and space. It leverages the well-known mathematical formula for the sum of the first n natural numbers.

*/

//Implementation 3: Recursive Approach

function sumToN_recursive(n: number): number {
    if (n <= 1) {
      return n;
    }
    return n + sumToN_recursive(n - 1);
  }
  console.log('sumToN_recursive', sumToN_recursive(5))
  /*
  
  Complexity and Efficiency:

    * Time Complexity: O(n) - The function makes a recursive call for each number from n down to 1.
    * Space Complexity: O(n) - The function uses stack space proportional to the input size due to recursion.
    * Efficiency: This approach is less efficient due to the overhead of recursive calls and increased space complexity. It is not suitable for very large values of n because it can lead to stack overflow.
  
  */
  
  