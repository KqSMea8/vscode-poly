const vscode = require('vscode');
const commands = require('./commands');
const hovers = require('./hovers');
const definitions = require('./definitions');
const { loadLang } = require('./utils/loadLang');
const { getTemplates } = require('./utils/polyUtil');

/**
 * this method is called when your extension is activated
 * your extension is activated the very first time the command is executed
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('vscode-poly: activated');
  getTemplates();
  vscode.window.setStatusBarMessage('vscode-poly: 开始加载文案');
  loadLang();
  vscode.window.setStatusBarMessage('vscode-poly: 文案加载完成');

  context.subscriptions.push(...commands, ...hovers, ...definitions);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
