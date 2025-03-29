// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { compress } from './compress';
import { bundle, Run } from './bundle';

async function bundleAndPaste() {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const document = editor.document;
		const text = document.getText();
		try {
			const result: Run = await bundle(text);
			console.log("[oj-bundle] Result: ", result);
			if (result.code !== 0) {
				vscode.window.showErrorMessage(
					"Failed to bundle the code. Error: " + result.stderr
				);
				console.log("[oj-bundle] Error: ", result.stderr);
			} else {
				vscode.env.clipboard.writeText(compress(result.stdout));
				vscode.window.showInformationMessage('Successfully copied to clipboard.');
			}
		} catch (error) {
			vscode.window.showErrorMessage("Failed to bundle the code. Error: " + error);
		}
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'oj-bundle.bundle-and-paste', bundleAndPaste
	);
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
