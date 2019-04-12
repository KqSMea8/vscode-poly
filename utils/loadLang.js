const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const getConfig = require('./getConfig');

const langCache = {};

const fileFilter = getConfig().includes;

/**
 *
 *
 * @author liubin.frontend
 * @param {string} polyRoot
 * @param {*} [loaded={}]
 * @returns 所有polyRoot下的json翻译内容。  key为文件名，value为文件内容
 */
function doLoad(polyRoot, loaded = {}) {
  const stat = fs.statSync(polyRoot);
  loaded.polyLang = loaded.polyLang || {};
  loaded.includes = loaded.includes || [];

  // 只加载json文件
  if (stat.isFile() && fileFilter.test(polyRoot)) {
    loaded.polyLang[polyRoot] = require(polyRoot);
    loaded.includes.push(polyRoot);
  } else if (stat.isDirectory()) {
    fs.readdirSync(polyRoot).forEach(filename => {
      const filepath = path.resolve(polyRoot, filename);

      if (fs.existsSync(filepath)) {
        doLoad(filepath, loaded);
      }
    });
  }
  return loaded;
}

/**
 * 加载目录下所有的json翻译文件
 *
 * @author liubin.frontend
 */
function load() {
  const root = getConfig().root;
  const defaultValue = {
    includes: [],
    polyLang: {},
    polyRoot: null,
  };

  if (!root) {
    vscode.window.showErrorMessage('没有设置根目录root');
    return defaultValue;
  }

  if (langCache[root]) {
    return langCache[root];
  }

  const folders = vscode.workspace.workspaceFolders;

  if (!folders) {
    vscode.window.showErrorMessage('没有打开任何文件夹');
    langCache[root] = defaultValue;
    return langCache[root];
  }

  const workspaceRoot = folders.find(folder => fs.existsSync(path.resolve(folder.uri.fsPath, root)));
  if (workspaceRoot) {
    const polyRoot = path.resolve(workspaceRoot.uri.fsPath, root);
    const loaded = doLoad(polyRoot);
    langCache[root] = Object.assign({}, defaultValue, {
      polyLang: loaded.polyLang,
      includes: loaded.includes,
      polyRoot,
    });
  } else {
    vscode.window.showErrorMessage('找不到根目录root');
    langCache[root] = defaultValue;
  }

  return langCache[root];
}

function loadLang() {
  return load().polyLang;
}

function getIncludes() {
  return load().includes;
}

function getPolyRoot() {
  return load().polyRoot;
}

module.exports = {
  loadLang,
  getIncludes,
  getPolyRoot,
  fileFilter,
};
