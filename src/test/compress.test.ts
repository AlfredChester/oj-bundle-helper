import * as assert from 'assert';
import { compress } from '../compress';

suite('compress', () => {
    test('handles anonymous function pointer parameters with default values', () => {
        // This is the reported bug case
        const input = 'template <class mint, int g = internal::primitive_root<mint::mod()>, internal::is_static_modint_t<mint> * = nullptr>';
        const result = compress(input);
        
        // The key requirement is that * and = should not form the *= operator
        // So the output should have a space between * and =
        assert.ok(result.includes('* ='), 'Space should be preserved between * and =');
        assert.ok(!result.includes('*=nullptr'), '*= should not appear before nullptr');
    });

    test('handles simple pointer parameter with default value', () => {
        const input = 'void foo(int * = nullptr)';
        const result = compress(input);
        assert.ok(result.includes('* ='), 'Space should be preserved between * and =');
    });

    test('preserves compound assignment operators', () => {
        // Compound assignment operators should remain as-is when they are already together
        const input = 'a *= b';
        const result = compress(input);
        assert.strictEqual(result, 'a*=b', 'Compound assignment operator should be preserved');
    });

    test('handles pointer declarations', () => {
        const input = 'int * p = nullptr';
        const result = compress(input);
        // Should compress to int*p=nullptr (no space issues)
        assert.ok(result.includes('int*p'), 'Pointer declaration should be compressed');
    });

    test('preserves regular multiplication operator', () => {
        const input = 'y = a * b';
        const result = compress(input);
        assert.strictEqual(result, 'y=a*b', 'Multiplication should be preserved');
    });

    test('handles multiple pointer parameters with defaults', () => {
        const input = 'void foo(T * = nullptr, U * = nullptr)';
        const result = compress(input);
        // Both occurrences should have space preserved
        const matches = result.match(/\* =/g);
        assert.ok(matches && matches.length === 2, 'Both pointer parameters should have space preserved');
    });
});
