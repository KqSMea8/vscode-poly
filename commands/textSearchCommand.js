const vscode = require('vscode');
const { searchText } = require('../utils/search');

const opc = vscode.window.createOutputChannel('textSearch');

let textSearchCommand = vscode.commands.registerTextEditorCommand('extension.textSearch', function(textEditor, edit) {
  const text = textEditor.document.getText(textEditor.selection);

  if (!text) {
    vscode.window.showErrorMessage('没有选中任何文本');
    return;
  }

  searchText(text).then((result = {}) => {
    opc.clear();
    opc.appendLine(`${text}  的相似文案：`);
    formatResult(result).forEach(line => opc.appendLine(line));
    opc.show();
  });
});

/**
 *
 *
 * @author liubin.frontend
 * @param {{[filename:string]: {matches: string[], count: number, line: string[]}}} result {}
 * @returns
 */
function formatResult(result) {
  const formatted = [];
  Object.keys(result).forEach(filename => {
    const match = result[filename];

    formatted.push(`  ${filename}    ${match.count} 个匹配结果：`);
    formatted.push(...match.line.map((line, index) => `      ${index + 1}.   ${line}`));
  });
  return formatted;
}

module.exports = textSearchCommand;
