import * as assert from 'assert';
import '../string-extensions';

suite('String.prototype.isSpace', () => {
    test('returns true for space characters', () => {
        assert.strictEqual(' '.isSpace(), true);
        assert.strictEqual('\t'.isSpace(), true);
        assert.strictEqual('\n'.isSpace(), true);
        assert.strictEqual('\r'.isSpace(), true);
        assert.strictEqual('\v'.isSpace(), true);
        assert.strictEqual('\f'.isSpace(), true);
    });

    test('returns false for non-space characters', () => {
        assert.strictEqual('a'.isSpace(), false);
        assert.strictEqual('0'.isSpace(), false);
        assert.strictEqual('$'.isSpace(), false);
        assert.strictEqual('_'.isSpace(), false);
    });
});

suite('String.prototype.isIdentifierPart', () => {
    test('returns true for valid identifier characters', () => {
        assert.strictEqual('a'.isIdentifierPart(), true);
        assert.strictEqual('Z'.isIdentifierPart(), true);
        assert.strictEqual('0'.isIdentifierPart(), true);
        assert.strictEqual('$'.isIdentifierPart(), true);
        assert.strictEqual('_'.isIdentifierPart(), true);
    });

    test('returns false for invalid identifier characters', () => {
        assert.strictEqual(' '.isIdentifierPart(), false);
        assert.strictEqual('@'.isIdentifierPart(), false);
        assert.strictEqual('-'.isIdentifierPart(), false);
    });
});

suite('String.prototype.cut', () => {
    test('returns substring based on left and right indices arrays', () => {
        const str = "Hello, world!";
        const lef = [0, 7];
        const rig = [4, 11];
        // For index 0, expect "Hello"
        assert.strictEqual(str.cut(lef, rig, 0), "Hello");
        // For index 1, expect "world"
        assert.strictEqual(str.cut(lef, rig, 1), "world");
    });
});

suite('String.prototype.safeIndexOf', () => {
    test('finds the character when test appears before any whitespace', () => {
        const str = "abc-def";
        // starting at index 0, looking for '-' should find test at index 3.
        assert.strictEqual(str.safeIndexOf('-', 0), 3);
    });

    test('returns -1 if a whitespace is encountered before the character', () => {
        const str = "abc def";
        // starting at index 0, the scan stops at space index 3 before finding 'd'.
        assert.strictEqual(str.safeIndexOf('d', 0), -1);
    });

    test('finds the character when starting after a whitespace', () => {
        const str = "abc def";
        // starting at index 4, letter 'd' is immediately found.
        assert.strictEqual(str.safeIndexOf('d', 4), 4);
    });

    test('returns -1 if the character is not present in the segment', () => {
        const str = "abcdef";
        // starting at index 1, letter 'z' is not found.
        assert.strictEqual(str.safeIndexOf('z', 1), -1);
    });
});