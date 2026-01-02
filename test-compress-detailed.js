const { compress } = require('./out/compress');

const tests = [
    'template <class mint, int g = internal::primitive_root<mint::mod()>, internal::is_static_modint_t<mint> * = nullptr>',
    'int * = nullptr',
    'T * = nullptr',
    'Type* = nullptr',
    'Type * = nullptr',
    'a *= b',  // This should stay as *= (multiply-assign)
    'int*p=0', // pointer declaration
];

console.log('Testing compression...\n');
tests.forEach((test, i) => {
    const result = compress(test);
    console.log(`Test ${i + 1}:`);
    console.log(`  Input:  ${test}`);
    console.log(`  Output: ${result}`);
    console.log('');
});
