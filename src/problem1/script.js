function sum_to_n_a(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Example usage:
console.log(sum_to_n_a(5)); // Output: 15

function sum_to_n_b(n) {
    return (n * (n + 1)) / 2;
}

// Example usage:
console.log(sum_to_n_b(5)); // Output: 15

function sum_to_n_c(n) {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
}

// Example usage:
console.log(sum_to_n_c(5)); // Output: 15
