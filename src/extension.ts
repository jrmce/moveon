'use strict';

import * as vscode from 'vscode';
import { MoveOn } from './moveon';

export function activate(context: vscode.ExtensionContext) {
    const moveOn = new MoveOn();
    context.subscriptions.push(moveOn);
}
