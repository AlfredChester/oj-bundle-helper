// 核心压缩逻辑
import { processTrigraph, processLineBreak, processMultilineCommentAndReplaceMark, check } from "./utilities";

const endl: string = '\n';

// ...existing code: compress...
export function compress(input: { src: string }): string {
    const str = String(input.src);
    return $compress($compress(str));
}

function $compress(str: string): string {
    let ret = '';
    let lst = 0;
    const patternS = 'R"(';
    const patternT = ')"';
    while (lst !== str.length) {
        const ind = str.indexOf(patternS, lst);
        if (ind === -1) {
            break;
        }
        ret += compressSingle(str.substring(lst, ind));
        const rig = str.indexOf(patternT, ind + patternS.length);
        if (rig === -1) {
            ret += str.substring(ind);
            lst = str.length;
            break;
        }
        lst = rig + patternT.length;
        ret += str.substring(ind, lst);
    }
    ret += compressSingle(str.substring(lst));
    return ret;
}

// 新增辅助函数：对单行进行分词处理
function tokenizeLine(line: string): { lef: number[], rig: number[] } {
    let i = 0;
    const lef: number[] = [];
    const rig: number[] = [];
    lex: while (true) {
        while (i !== line.length && line[i].isSpace()) { ++i; }
        if (i === line.length) {
            break;
        }
        lef.push(i);
        let stringBegin = '';
        let esc = false;
        let inString = false;
        while (i !== line.length && (inString || (!line[i].isSpace()))) {
            if (inString) {
                if (!esc && line[i] === stringBegin) { inString = false; }
            } else if (line[i] === '"' || line[i] === '\'') {
                inString = true;
                stringBegin = line[i];
            } else if (line[i] === '/' && i !== line.length - 1 && line[i + 1] === '/') {
                rig.push(i - 1);
                lef.push(i);
                rig.push(line.length - 1);
                break lex;
            }
            ++i;
            if (i === line.length) {
                break;
            }
            esc = line[i] === '\\';
        }
        rig.push(i - 1);
    }
    return { lef, rig };
}

// 修改 compressSingle 以提高可读性
function compressSingle(str: string): string {
    str = processTrigraph(str);
    str = processLineBreak(str);
    str = processMultilineCommentAndReplaceMark(str);

    const arr = str.split(endl);
    let ret = "";
    let forceNewline = true;
    let last = '\0';
    for (let w = 0; w < arr.length; ++w) {
        const line = arr[w];
        if (line.length === 0) { continue; }
        const { lef, rig } = tokenizeLine(line);
        const n = lef.length;
        if (!n) { continue; }

        // 处理行首衔接逻辑
        const originLast = last;
        const originForceNewline: boolean = forceNewline;
        if (last !== '\0') {
            if (forceNewline) {
                ret += endl;
            } else if (check(last, line[lef[0]])) {
                ret += ' ';
            }
        }
        last = line[rig[n - 1]];
        let j = 0;
        if (line[lef[0]] === '#') {
            if (!forceNewline) { ret += endl; }
            forceNewline = true;
            if (!line[lef[0] + 1]) {
                lef[j = 1] = lef[0]; // ...existing code...
            }
            ret += line.cut(lef, rig, j);
            if (line[lef[j] + 1] === 'd' && line.safeIndexOf('(', lef[j + 1]) === -1) {
                ret += ' ' + line.cut(lef, rig, ++j);
                if (j + 1 < n) {
                    ret += ' ' + line.cut(lef, rig, ++j);
                }
            }
            ++j;
        } else {
            forceNewline = false;
        }
        for (; j < n; ret += line.cut(lef, rig, j++)) {
            if (lef[j] + 2 <= line.length) {
                if (line.substring(lef[j], lef[j] + 2) === '//') {
                    if (j === 0) { forceNewline = originForceNewline; }
                    break;
                }
            }
            if (j && check(line[rig[j - 1]], line[lef[j]])) { ret += ' '; }
        }
        last = j ? line[rig[j - 1]] : originLast;
    }
    return ret;
}
