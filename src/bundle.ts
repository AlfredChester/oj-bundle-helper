import { workspace, window } from "vscode";
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

function createTempFile(src: string): string {
    const tempDir = os.tmpdir();
    const fileName = `oj-bundle-temp-${Date.now()}-${Math.floor(Math.random() * 10000)}.cpp`;
    const filePath = path.join(tempDir, fileName);

    fs.writeFileSync(filePath, src, 'utf8');
    return filePath;
}

export type Run = {
    stdout: string;
    stderr: string;
    code: number | null;
};

export const bundle = (src: string): Promise<Run> => {
    const file = createTempFile(src);
    const config = workspace.getConfiguration('oj-bundle');
    const executable = config.get('executable', 'oj-bundle');
    const argsStr: string = config.get('args', '');
    const args = argsStr ? argsStr.split(/\s+/) : [];
    const editor = window.activeTextEditor;
    if (editor) {
        const filePath = editor.document.uri.path;
        // get its father directory
        const workspaceDir = path.dirname(filePath);
        // -I <workspacePath> is added to the args
        console.log("[oj-bundle] Workspace Path:", workspaceDir);
        args.push('-I', workspaceDir);
    }
    args.push(file);
    console.log("[oj-bundle] Command:", executable, args);
    return new Promise((resolve, reject) => {
        const cp: ChildProcessWithoutNullStreams = spawn(executable, args);
        let stdout = '';
        let stderr = '';
        cp.stdout.on('data', (data: Buffer) => {
            stdout += data.toString();
        });
        cp.stderr.on('data', (data: Buffer) => {
            stderr += data.toString();
        });
        cp.on('error', (error) => {
            reject(error);
        });
        cp.on('close', (code: number) => {
            resolve({
                stdout,
                stderr,
                code
            });
        });
    });
};