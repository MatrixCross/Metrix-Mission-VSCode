import * as vscode from "vscode";
import { TodoListWebView } from "./webview";

export function activate(context: vscode.ExtensionContext) {
  const todolistWebview = new TodoListWebView();

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      TodoListWebView.viewId,
      todolistWebview
    )
  );
}

export function deactivate() {}
