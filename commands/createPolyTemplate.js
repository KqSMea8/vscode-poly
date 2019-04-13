const { commands, window } = require('vscode');
const { createTemplate } = require('../utils/polyUtil.js');
const helper = require('./helper');

let createPolyTemplate = commands.registerTextEditorCommand('extension.createPolyTemplate', async function(textEditor, edit) {
  const name = await helper.showTextInput('请输入模板名称(必填)');
  if (name === undefined) {
    return;
  }

  const description = await helper.showTextInput('请输入模板描述(必填)');
  if (description === undefined) {
    return;
  }

  let category = await helper.showTextInput('请输入模板类目(可选，输入空格以跳过)');
  if (category === undefined) {
    return;
  }
  category = /^\s+$/.test(category) ? undefined : category;

  const keyPrefix = await helper.showTextInput('请输入key值前缀(必填)');
  if (keyPrefix === undefined) {
    return;
  }

  createTemplate(name, keyPrefix, category, description);
});

module.exports = createPolyTemplate;
