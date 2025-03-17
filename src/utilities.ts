// 辅助工具函数

// ...existing code: check...
export function check(a: string, b: string): boolean {
    return (a.isIdentifierPart() && b.isIdentifierPart()) ||
        ((a === ' + ' || a === '-') && a === b) ||
        (a === '/' && b === '*');
}

// 新增辅助函数：替换单个 trigraph
function replaceTrigraph(str: string, ch: string, replacement: string): string {
    let ret = '';
    let lst = 0;
    const pattern = "??" + ch;
    while (true) {
        const ind = str.indexOf(pattern, lst);
        if (ind === -1) {
            break;
        }
        ret += str.substring(lst, ind) + replacement;
        lst = ind + pattern.length;
    }
    ret += str.substring(lst);
    return ret;
}

// 修改 processTrigraph 以提高可读性
export function processTrigraph(str: string): string {
    const trigraphs: { [key: string]: string } = {
        '=': '#',
        '/': '\\',
        '\'': '^',
        '(': '[',
        ')': ']',
        '<': '{',
        '>': '}',
        '!': '|',
        '-': '~'
    };
    for (const ch in trigraphs) {
        str = replaceTrigraph(str, ch, trigraphs[ch]);
    }
    return str;
}

// 新增辅助函数：处理单行换行
function processSingleLine(line: string, endl: string): string {
    let j = line.length - 1;
    while (j >= 0 && line[j].isSpace()) { j--; }
    return (line[j] === '\\') ? line.substring(0, j) : line + endl;
}

// 修改 processLineBreak 以提高可读性
export function processLineBreak(str: string): string {
    const endl: string = '\n';
    const lines = str.split(endl);
    let ret = '';
    for (const line of lines) {
        ret += processSingleLine(line, endl);
    }
    if (ret.endsWith(endl)) { ret = ret.substring(0, ret.length - endl.length); }
    return ret;
}

// 新增辅助函数：替换多行注释
function replaceMultilineComment(str: string, start: number): { replacement: string, end: number } {
    const endIndex = str.indexOf('*/', start + 2);
    if (endIndex === -1) {
        return { replacement: str.substring(start), end: str.length };
    }
    return { replacement: ' ', end: endIndex + 2 };
}

// 新增辅助函数：替换标记
function replaceMark(str: string, start: number): { replacement: string, end: number } {
    return { replacement: "#", end: start + 2 };
}

// 修改 processMultilineCommentAndReplaceMark 以提高可读性
export function processMultilineCommentAndReplaceMark(str: string): string {
    let ret = '';
    let stringBegin = '';
    let esc = false;
    let inString = false;
    let lst = 0;
    for (let i = 0; i < str.length; ++i) {
        if (inString) {
            if (!esc && str[i] === stringBegin) {
                inString = false;
            }
        } else if (str[i] === '\'' || str[i] === '"') {
            inString = true;
            stringBegin = str[i];
        } else if (i + 1 < str.length) {
            if (str[i] === '/' && str[i + 1] === '*') {
                ret += str.substring(lst, i);
                const result = replaceMultilineComment(str, i);
                ret += result.replacement;
                i = result.end - 1;
                lst = result.end;
                continue;
            } else if (str[i] === '%' && str[i + 1] === ':') {
                ret += str.substring(lst, i);
                const result = replaceMark(str, i);
                ret += result.replacement;
                i = result.end - 1;
                lst = result.end;
                continue;
            }
        }
        esc = str[i] === '\\';
    }
    ret += str.substring(lst);
    return ret;
}
