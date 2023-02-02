import * as vscode from "vscode";
import * as fs from "fs";
import path = require("path");

export class TodoListWebView implements vscode.WebviewViewProvider {
  public static viewId: string = "todolist-view";

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };

    // const cssUri = webviewView.webview.asWebviewUri(
    //   vscode.Uri.joinPath(
    //     this.context.extensionUri,
    //     "src",
    //     "vue",
    //     "dist",
    //     "assets",
    //     "index-fdf0c69c.css"
    //   )
    // );
    // const scriptUri = webviewView.webview.asWebviewUri(
    //   vscode.Uri.joinPath(
    //     this.context.extensionUri,
    //     "src",
    //     "vue",
    //     "dist",
    //     "assets",
    //     "index-6ad36bf8.js"
    //   )
    // );

    // const distUri = webviewView.webview.asWebviewUri(
    //   vscode.Uri.joinPath(this.context.extensionUri, "src", "vue", "dist")
    // );

    // console.log("distUri", distUri);

    // const distPath = path.join(
    //   this.context.extensionPath,
    //   "src",
    //   "vue",
    //   "dist"
    // );
    // const srcpathuri = vscode.Uri.file(distPath);
    // const baseuri = webviewView.webview.asWebviewUri(srcpathuri);
    // const indexpath = path.join(distPath, "index.html");
    // let indexhtml = fs.readFileSync(indexpath, "utf8");

    // // console.log("htmlUri", htmlUri);

    // // let indexhtml = fs.readFileSync(htmlUri.toString(), "utf8");

    // console.log("indexhtml", indexhtml);

    // indexhtml = indexhtml.replace(/=\"\//g, '="' + distUri.toString() + "/");

    // console.log("indexhtml", indexhtml);

    let indexhtml = getWebViewContent(this.context, "/src/vue/dist/index.html");

    console.log(indexhtml);

    webviewView.webview.html = indexhtml;
  }
}

function getWebViewContent(
  context: vscode.ExtensionContext,
  templatePath: string
) {
  const resourcePath = path.join(context.extensionPath, templatePath);
  const dirPath = path.dirname(resourcePath);
  let html = fs.readFileSync(resourcePath, "utf-8");
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<iframe.+?src="|<img.+?src=")(.+?)"/g,
    (m, $1, $2) => {
      if ($2.indexOf("https://") < 0) {
        return (
          $1 +
          vscode.Uri.file(path.resolve(dirPath, $2))
            .with({ scheme: "vscode-resource" })
            .toString() +
          '"'
        );
      } else {
        return $1 + $2 + '"';
      }
    }
  );
  return html;
}
