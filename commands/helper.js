const { window } = require('vscode');
const { getTemplates } = require('../utils/polyUtil.js');

function showLangQuickPick() {
  return window.showQuickPick(['en', 'zh', 'ja'], {
    placeHolder: '第一步：选择语言',
  });
}

function showTemplateQuickPick() {
  return getTemplates().then((templates = []) => {
    const quickPickItems = templates.map(template => {
      const { id, name, description, category, key_prefix } = template;
      return {
        description: description,
        detail: category ? `key值前缀：${key_prefix} ,类目： ${category}` : `key值前缀：${key_prefix}`,
        label: name,
        id,
        keyPrefix: key_prefix,
      };
    });
    return window
      .showQuickPick(quickPickItems, {
        placeHolder: '第二步：选择模板',
      })
      .then(selected => {
        return selected !== undefined ? selected : undefined;
      });
  });
}

function showTextInput(prompt) {
  return window.showInputBox({
    ignoreFocusOut: true,
    password: false,
    prompt,
  });
}

module.exports = {
  showLangQuickPick,
  showTemplateQuickPick,
  showTextInput,
};
