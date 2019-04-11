const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const getConfig = require('./getConfig');

const langCache = {};

/**
 *
 *
 * @author liubin.frontend
 * @param {string} polyRoot
 * @param {*} [polyLang={}]
 * @returns 所有polyRoot下的json翻译内容。  key为文件名，value为文件内容
 */
function doLoad(polyRoot, polyLang = {}) {
  const stat = fs.statSync(polyRoot);
  // 只加载json文件
  if (stat.isFile() && polyRoot.endsWith('.json')) {
    polyLang[polyRoot] = require(polyRoot);
  } else if (stat.isDirectory()) {
    fs.readdirSync(polyRoot).forEach(filename => {
      const filepath = path.resolve(polyRoot, filename);

      if (fs.existsSync(filepath)) {
        doLoad(filepath, polyLang);
      }
    });
  }
  return polyLang;
}

/**
 * 加载目录下所有的json翻译文件
 *
 * @author liubin.frontend
 */
function loadLang() {
  const root = getConfig().root;
  if (!root) {
    vscode.window.showErrorMessage('没有设置根目录root');
    return {};
  }

  if (langCache[root]) {
    return langCache[root];
  }

  const folders = vscode.workspace.workspaceFolders;
  if (!folders) {
    vscode.window.showErrorMessage('没有打开任何文件夹');
    langCache[root] = {};
    return {};
  }

  const workspaceRoot = folders.find(folder => fs.existsSync(path.resolve(folder.uri.fsPath, root)));
  if (workspaceRoot) {
    const polyRoot = path.resolve(workspaceRoot.uri.fsPath, root);
    langCache[root] = doLoad(polyRoot);
  } else {
    vscode.window.showErrorMessage('找不到根目录root');
    langCache[root] = {};
  }

  return langCache[root];
}

module.exports = loadLang;
