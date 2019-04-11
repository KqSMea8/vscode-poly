const vscode = require('vscode');
const search = require('../utils/search');

function defaultHover(document, position, token) {
  console.log('defaultHover');
  const line = document.lineAt(position).text;
  const word = document.getText(document.getWordRangeAtPosition(position));

  // 光标所在文案是poly key
  if (search.isI18nKey(word, line)) {
    return new vscode.Hover(search.getHoverTextOfKey(word, '#### 已有翻译: \n'));
  }

  const textEditor = vscode.window.activeTextEditor;
  if (!textEditor) {
    return;
  }

  const text = textEditor.document.getText(textEditor.selection);

  if (!text) {
    return;
  }
  // 存在选中文字，如果存在翻译文案，展示hover
  const hoverText = search.getHoverTextOfKey(text);
  if (hoverText) {
    return new vscode.Hover(`#### 已有翻译: \n${hoverText}`);
  }
}

const defaultHoverDisposable = vscode.languages.registerHoverProvider(['javascript', 'vue'], {
  provideHover: defaultHover,
});

exports.defaultHover = defaultHoverDisposable;
