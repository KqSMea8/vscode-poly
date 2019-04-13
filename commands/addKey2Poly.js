const { commands, window } = require('vscode');
const { uploadDraft } = require('../utils/polyUtil.js');
const helper = require('./helper');

let addKey2Poly = commands.registerTextEditorCommand('extension.addKey2Poly', async function(textEditor, edit) {
  const polyKey = textEditor.document.getText(textEditor.selection);

  if (!polyKey) {
    window.showErrorMessage('没有选中任何文本');
    return;
  }

  const lang = await helper.showLangQuickPick(); // 第一步：选择语言
  if (lang === undefined) {
    return;
  }

  const template = await helper.showTemplateQuickPick(); // 第二步：选择模板
  if (template === undefined) {
    return;
  }

  const polyTrans = await helper.showTextInput('最后一步： 输入文案'); // 最后一步： 输入文案
  if (polyTrans === undefined) {
    return;
  }

  uploadDraft(
    template.id,
    {
      [polyKey.trim()]: polyTrans.trim(),
    },
    lang,
  );
});

module.exports = addKey2Poly;
