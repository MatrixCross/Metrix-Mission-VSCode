import * as vscode from "vscode";
import * as fs from 'fs';

export class TodoListWebView implements vscode.WebviewViewProvider {
  public static viewId: string = "todolist-view";

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };

    const cssUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "src",
        "vue",
        "dist",
        "assets",
        "index-97aa2ab7.css"
      )
    );
    const scriptUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "src",
        "vue",
        "dist",
        "assets",
        "index-c6d79097.js"
      )
    );

    webviewView.webview.html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + Vue + TS</title>
        <script type="module" crossorigin src="${scriptUri}"></script>
        <link rel="stylesheet" href="${cssUri}">
      </head>
      <body>
        <div id="app"></div>
        
      </body>
    </html>    
    `;
  }
}
