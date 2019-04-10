const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // vscode.window.showInformationMessage('是否要打开小茗同学的博客？', '是', '否', '不再提示').then(result => {
  //   if (result === '是') {
  //   } else if (result === '不再提示') {
  //     // 其它操作
  //   }
  // });

  let poly = vscode.commands.registerCommand('extension.poly', function() {
    const options = {
      ignoreFocusOut: true,
      password: false,
      prompt: 'Please type your city (eg.beijing or 北京)',
    };

    vscode.window.showInputBox(options).then(value => {
      if (value === undefined || value.trim() === '') {
        vscode.window.showInformationMessage('Please type your city.');
      } else {
        const cityName = value.trim();
        vscode.window.showInformationMessage(`your city name: ${cityName}`);
      }
    });
  });

  function provideDefinition(document, position, token) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);

    console.log('====== 进入 provideDefinition 方法 ======');
    console.log('fileName: ' + fileName); // 当前文件完整路径
    console.log('workDir: ' + workDir); // 当前文件所在目录
    console.log('word: ' + word); // 当前光标所在单词
    console.log('line: ' + line.text); // 当前光标所在行
    // 只处理package.json文件
    if (/\/package\.json$/.test(fileName)) {
      console.log(word, line.text);
      const json = document.getText();
      if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
        let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
        if (fs.existsSync(destPath)) {
          // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
          return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
        }
      }
    }
  }

  function provideHover(document, position, token) {
    const fileName = document.fileName;
    const workDir = path.dirname(fileName);
    const word = document.getText(document.getWordRangeAtPosition(position));

    if (/\/package\.json$/.test(fileName)) {
      console.log('进入provideHover方法');
      const json = document.getText();
      if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
        let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
        if (fs.existsSync(destPath)) {
          const content = require(destPath);
          console.log('hover已生效');
          // hover内容支持markdown语法
          return new vscode.Hover(`* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`);
        }
      }
    }
  }

  const definition = vscode.languages.registerDefinitionProvider(['json'], {
    provideDefinition,
  });

  const hover = vscode.languages.registerHoverProvider('json', {
    provideHover,
  });

  context.subscriptions.push(poly, definition, hover);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
