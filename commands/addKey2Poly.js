const vscode = require('vscode');

let key2text = vscode.commands.registerTextEditorCommand('extension.key2text', function(textEditor, edit) {
  const text = textEditor.document.getText(textEditor.selection);

  if (!text) {
    vscode.window.showErrorMessage('没有选中任何文本');
    return;
  }

  console.log(text);

  vscode.commands.executeCommand('vscode.executeHoverProvider', textEditor.document.uri, textEditor.selection.start);
});

module.exports = key2text;
