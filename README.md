# vscode-poly

用于多语言文案管理Poly的vscode插件。

## 特性

* 自动展示key对应的已有翻译文案
* 添加key到poly草稿
* 添加文案到poly草稿
* 批量将JSON文案添加到poly草稿
* 查找相似的翻译
* 创建poly模板
* 一些相关的snippets

## 配置

插件依赖于一些配置项才能起作用：

| 名称      | 描述                                            | 默认值               |
| --------- | ----------------------------------------------- | -------------------- |
| root      | 本地poly文案的根目录                            | `src/lang/_poly`     |
| includes  | 正则过滤器，只加载根目录下匹配的文件            | `(en|zh|ja)\\.json$` |
| sid       | poly用户id，进入poly站点查看`polysid`这个cookie | 217                  |
| projectid | poly项目id,可在站点`url`上得到                  | 49（表示tiktok ads） |

## 用法

注：当前只配置了插件在`js`、`vue`、`json`文件里生效，若有需求在其他类型文件生效可联系我😺

* 自动展示key对应的已有翻译文案
  * 当鼠标悬停在一个`vue-i18n`插件的`key`上时，自动展示这个key对应的文案翻译

  ![hover-on-i18n-key](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/hover-on-i18n-key.gif)

  * 当选中一些文本时并`hover`时，会自动将这些文本当做`key`并展示对应文案翻译

  ![hover-on-selection](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/hover-on-selection.gif)

* 添加key到poly草稿

  ![add_key_2_poly](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/add_key_2_poly.gif)

* 添加文案到poly草稿

  ![add_text_2_poly](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/add_text_2_poly.gif)

* 批量将JSON文案添加到poly草稿

  ![add_json_2_poly](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/add_json_2_poly.gif)

* 查找相似的翻译（快捷键`Command + F10`）

  ![relative_trans](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/relative_trans.gif)

* 创建poly模板

  ![create_template](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/create_template.gif)

* 一些相关的snippets

  ![snippets](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/snippets.gif)

  snippets的具体信息如下：

  | prefix | snippets content        |
  | ------ | ----------------------- |
  | `t'`   | `this.$t('key')`        |
  | `te'`  | `this.$te('key')`       |
  | `ct'`  | `const { $t } = this;`  |
  | `cte'` | `const { $te } = this;` |


可使用`Command + Option + P`吊起命令面板后，输入`poly`以查找相关支持的命令：

![commands](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/commands.png)

同时也将这些命令加入了右键菜单(需要选中一些文本才会出现poly菜单命令)：

![menu_cmd](https://code.byted.org/liubin.frontend/vscode-poly/raw/master/assets/menu_cmd.png)
