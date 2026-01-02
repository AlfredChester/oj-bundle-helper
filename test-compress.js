const { compress } = require('./out/compress');

// Test case from the issue
const input = 'template <class mint, int g = internal::primitive_root<mint::mod()>, internal::is_static_modint_t<mint> * = nullptr>';
const result = compress(input);
console.log('Input:', input);
console.log('Output:', result);
console.log('');

// Check for the bug
if (result.includes('*=nullptr')) {
    console.log('BUG CONFIRMED: Space between * and = was removed!');
    console.log('The output contains: *=nullptr');
} else if (result.includes('* =')) {
    console.log('OK: Space is preserved');
} else {
    console.log('Result unclear');
}
