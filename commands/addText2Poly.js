const { commands, window } = require('vscode');
const { uploadDraft } = require('../utils/polyUtil.js');
const helper = require('./helper');

let addText2Poly = commands.registerTextEditorCommand('extension.addText2Poly', async function(textEditor, edit) {
  const polyTrans = textEditor.document.getText(textEditor.selection);

  if (!polyTrans) {
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

  const polyKey = await helper.showTextInput('最后一步： 输入poly key(无需前缀，插件会自动帮忙添加)'); // 最后一步： 输入poly key
  if (polyKey === undefined) {
    return;
  }

  uploadDraft(
    template.id,
    {
      [`${template.keyPrefix}_${polyKey}`]: polyTrans,
    },
    lang,
  );
});

module.exports = addText2Poly;
