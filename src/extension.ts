// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { compress } from './compress';

function bundleAndPaste() {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const document = editor.document;
		try {
			var text = document.getText();
			vscode.env.clipboard.writeText(compress(text));
			vscode.window.showInformationMessage('Successfully copied to clipboard.');
		} catch (error) {
			console.log(error);
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
