import * as vscode from 'vscode';

export class MoveOn {
    position: vscode.Position;
    line: vscode.TextLine;
    config: vscode.WorkspaceConfiguration;
    moveOnChars: string[];
    disabled: boolean;

    constructor() {
        this.config = vscode.workspace.getConfiguration('moveOn');
        this.moveOnChars = this.config.get('moveOnFrom') as string[];
        this.disabled = this.config.get('disabled') as boolean;
    }

    execute(editor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
        this.position = editor.selection.active;
        this.line = editor.document.lineAt(this.position);

        if (this.validLocation(editor.document)) {
            this.moveCursor(editor);
        } else {
            vscode.commands.executeCommand('tab');
            return;
        }
    }

    private validLocation(doc: vscode.TextDocument) {
        if (this.line.text === '') {
            return false;
        }

        const nextChar = this.line.text[this.position.character];

        if (this.moveOnChars.indexOf(nextChar) === -1) {
            return false;
        }

        return true;
    }

    private moveCursor(editor: vscode.TextEditor): void {
        const position = this.getNewCursorPosition();
        editor.selection = new vscode.Selection(position, position);
    }

    private getNewCursorPosition(): vscode.Position {
        return new vscode.Position(this.position.line, this.position.character + 1);
    }
}
