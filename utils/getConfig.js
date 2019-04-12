const vscode = require('vscode');

function getConfig() {
  const config = vscode.workspace.getConfiguration();
  const root = config.get('vscodepoly.root');
  const includes = config.get('vscodepoly.includes');

  return {
    root, // 翻译文件根目录
    includes: new RegExp(includes),
  };
}

module.exports = getConfig;
