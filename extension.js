// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "errorsense" is now active!');

	// Register the ErrorSense command
	const disposable = vscode.commands.registerCommand('errorsense.helloWorld', function () {

		// Get active editor
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showWarningMessage('No active editor found.');
			return;
		}

		// Get selected text
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		if (!selectedText) {
			vscode.window.showWarningMessage('Please select an error message to explain.');
			return;
		}

		// Prepare explanation
		let explanation = '';

		if (selectedText.includes('TypeError')) {
			explanation =
				'TypeError:\n' +
				'You are trying to use something as a function, but it is not a function.\n' +
				'Check whether the variable or function is defined correctly.';
		}
		else if (selectedText.includes('SyntaxError')) {
			explanation =
				'SyntaxError:\n' +
				'There is a mistake in the structure of your code.\n' +
				'Check for missing brackets, quotes, or incorrect syntax.';
		}
		else if (selectedText.includes('ReferenceError')) {
			explanation =
				'ReferenceError:\n' +
				'You are using a variable that has not been defined.\n' +
				'Make sure the variable is declared before use.';
		}
		else {
			explanation =
				'ErrorSense:\n' +
				'This error type is not supported yet.';
		}

		// Create Output Panel
		const outputChannel = vscode.window.createOutputChannel('ErrorSense');

		// Show explanation in Output Panel
		outputChannel.clear();
		outputChannel.appendLine('=== ErrorSense Explanation ===\n');
		outputChannel.appendLine(explanation);
		outputChannel.show(true);
	});

	// Register command properly
	context.subscriptions.push(disposable);
}

// Called when extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
};
