import * as assert from 'assert';

import * as vscode from 'vscode';
import * as myExtension from '../src/extension';

describe('MoveOn Tests', () => {
    let editor: vscode.TextEditor = vscode.window.activeTextEditor;
    const lineZero = 'function example() {\n';
    const lineOne = '\tconst string = \'my test string\';\n';
    const lineTwo = '}'

    before(() => {
        editor = vscode.window.activeTextEditor;

        return editor.edit((editBuilder: vscode.TextEditorEdit) => {
            editBuilder.insert(new vscode.Position(0, 0), `${lineZero}${lineOne}${lineTwo}`);
        });
    });

    it('moves on from single quotes', () => {
        const line = editor.document.lineAt(1);
        const position = new vscode.Position(1, line.text.length - 2);
        editor.selection = new vscode.Selection(position, position);

        vscode.commands.executeCommand('moveOn.execute');

        const currentSelection: vscode.Position = editor.selection.active;

        assert.equal(currentSelection.line, 1)
        assert.equal(currentSelection.character, line.text.length - 1);
    });

    it('moves on from parenthesis', () => {
        const line = editor.document.lineAt(0);
        const position = new vscode.Position(0, line.text.length - 3);
        editor.selection = new vscode.Selection(position, position);

        vscode.commands.executeCommand('moveOn.execute');

        const currentSelection: vscode.Position = editor.selection.active;

        assert.equal(currentSelection.line, 0)
        assert.equal(currentSelection.character, line.text.length - 2);
    });
});
