const vscode = require('vscode');

function getConfig() {
  const root = vscode.workspace.getConfiguration().get('vscodepoly.root');
  return {
    root, // 翻译文件根目录
  };
}

module.exports = getConfig;
