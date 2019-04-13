const { commands, window } = require('vscode');
const { uploadDraft } = require('../utils/polyUtil.js');
const helper = require('./helper');

let addJson2Poly = commands.registerTextEditorCommand('extension.addJson2Poly', async function(textEditor, edit) {
  const text = textEditor.document.getText(textEditor.selection);

  if (!text) {
    window.showErrorMessage('没有选中任何文本');
    return;
  }

  let json = null;

  try {
    json = JSON.parse(text);
  } catch (e) {
    window.showErrorMessage('所选文本无法解析为JSON对象');
  }

  if (!json) {
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

  uploadDraft(template.id, json, lang);
});

module.exports = addJson2Poly;
