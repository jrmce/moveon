'use strict';

import * as vscode from 'vscode';
import { MoveOn } from './moveon';

export function activate(context: vscode.ExtensionContext) {
    const moveOn = new MoveOn();

    if (!moveOn.disabled) {
        const execute = vscode.commands.registerTextEditorCommand('moveOn.execute', moveOn.execute, moveOn);
        context.subscriptions.push(execute);
    }
}

export function deactivate() { }
