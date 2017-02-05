import * as vscode from 'vscode';

export class MoveOn {
    private disposable: vscode.Disposable;
    private position: vscode.Position;
    private line: vscode.TextLine;
    private config: vscode.WorkspaceConfiguration;
    private moveOnChars: string[];
    private disabled: boolean;

    constructor() {
        this.config = vscode.workspace.getConfiguration('moveOn');
        this.moveOnChars = this.config.get('moveOnFrom') as string[];
        this.disabled = this.config.get('disabled') as boolean;

        if (!this.disabled) {
            this.registerCommands();
        }
    }

    execute(editor: vscode.TextEditor, edit: vscode.TextEditorEdit, args: any[]) {
        if (this.disabled) {
            this.skip();
            return;
        }

        this.position = editor.selection.active;
        this.line = editor.document.lineAt(this.position);

        if (this.validLocation(editor.document)) {
            this.moveCursor(editor);
        } else {
            this.skip();
            return;
        }
    }

    dispose(): void {
        this.disposable.dispose();
    }

    private registerCommands(): void {
        if (this.disposable != null) {
            return;
        }

        const execute: vscode.Disposable = vscode.commands.registerTextEditorCommand('moveOn.execute', this.execute, this);
        const disable: vscode.Disposable  = vscode.commands.registerCommand('moveOn.disable', this.disable, this);
        const enable: vscode.Disposable  = vscode.commands.registerCommand('moveOn.enable', this.enable, this);
        this.disposable = vscode.Disposable.from(...[execute, disable]);
    }

    private disable(): void {
        this.disabled = true;
    }

    private enable(): void {
        this.registerCommands();
        this.disabled = false;
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

    private skip(): void {
        vscode.commands.executeCommand('tab');
    }
}
