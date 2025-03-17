// 全局 String 原型扩展及声明
declare global {
    interface String {
        isSpace(): boolean;
        isIdentifierPart(): boolean;
        cut(lef: number[], rig: number[], ind: number): string;
        safeIndexOf(ch: string, ind: number): number;
    }
}

// ...existing code: isSpace...
String.prototype.isSpace = function (): boolean {
    return this === ' ' || this === '\t' || this === '\n' || this === '\r' || this === '\v' || this === '\f';
};

// ...existing code: isIdentifierPart...
String.prototype.isIdentifierPart = function (): boolean {
    return (this >= 'a' && this <= 'z') ||
        (this >= 'A' && this <= 'Z') ||
        (this >= '0' && this <= '9') ||
        this === '$' || this === '_';
};

// ...existing code: cut...
String.prototype.cut = function (lef: number[], rig: number[], ind: number): string {
    return this.substring(lef[ind], rig[ind] + 1);
};

// ...existing code: safeIndexOf...
String.prototype.safeIndexOf = function (ch: string, ind: number): number {
    while (ind !== this.length && !(this[ind].isSpace())) {
        if (this[ind] === ch) {
            return ind;
        }
        ++ind;
    }
    return -1;
};

export { };  // 确保此文件为模块
