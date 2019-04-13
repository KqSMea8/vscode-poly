const vscode = require('vscode');

function getConfig() {
  const config = vscode.workspace.getConfiguration();
  const root = config.get('vscodepoly.root');
  const includes = config.get('vscodepoly.includes');
  const sid = config.get('vscodepoly.sid');
  const projectId = config.get('vscodepoly.projectid');

  return {
    root, // 翻译文件根目录
    includes: new RegExp(includes),
    sid,
    projectId,
  };
}

module.exports = getConfig;
