const vscode = require('vscode');
const search = require('../utils/search');

// 展示poly key对应的文本翻译
function hover(document, position, token) {
  const line = document.lineAt(position).text;
  const positionWord = document.getText(document.getWordRangeAtPosition(position));
  const isPositionWordI18nKey = search.isI18nKey(positionWord, line);

  // 判断是否存在选中文字，同时选中文字存在对应翻译文案，则展示hover
  let selectionHoverText = '';
  let selectionText = '';
  const textEditor = vscode.window.activeTextEditor;

  if (textEditor && (selectionText = textEditor.document.getText(textEditor.selection))) {
    const temp = search.getHoverTextOfKey(selectionText);
    selectionHoverText = temp ? `**${selectionText}对应的已有翻译:** \n${temp}` : `**没有找到${selectionText}对应的已有翻译。** \n`;
  }

  // 光标所在文字是poly key
  if (isPositionWordI18nKey) {
    // 选中文字和光标文字一致，只显示一个即可
    if (selectionText === positionWord) {
      return new vscode.Hover(selectionHoverText);
    } else {
      // 选中文字和光标文字不一致，二者对应的翻译文案都显示
      const positionHoverText = search.getHoverTextOfKey(positionWord, `**${positionWord}对应的已有翻译:** \n`);
      return new vscode.Hover(`${selectionHoverText}\n${positionHoverText}`);
    }
  } else if (selectionHoverText) {
    // 光标所在文字不是poly key，但是选中文字存在翻译文案
    return new vscode.Hover(selectionHoverText);
  }
}

const key2textHoverDisposable = vscode.languages.registerHoverProvider(['javascript', 'vue'], {
  provideHover: hover,
});

exports.key2textHover = key2textHoverDisposable;
