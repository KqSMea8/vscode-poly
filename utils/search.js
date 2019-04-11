const path = require('path');
const loadLang = require('./loadLang');

const cache = {};

/**
 * 根据key查找对应的文案
 *
 * @author liubin.frontend
 * @param {*} key
 * @returns
 */
function searchText(key) {
  const polyLang = loadLang();

  if (cache[key]) {
    return cache[key];
  }

  cache[key] = cache[key] || [];

  const fileNames = Object.keys(polyLang);
  for (const name of fileNames) {
    const fileContent = polyLang[name];
    // TODO: 解决json层级嵌套问题
    if (fileContent[key] !== null && fileContent[key] !== undefined) {
      cache[key].push({
        text: fileContent[key],
        filename: name,
      });
    }
  }

  return cache[key];
}

/**
 * 判断是否为一个poly key
 *
 * @author liubin.frontend
 * @param {string} word 单词
 * @param {string} line 行本文
 * @example
 * isI18nKey('123', `this.$te("123")`) // true
 * isI18nKey('123', `this.$t("123")`) // true
 * isI18nKey('123', `this.$te("1234")`) // false
 * @returns
 */
function isI18nKey(word, line) {
  if (!word || !line) {
    return false;
  }
  return new RegExp(`\\$(t|te)\\(\\s*('|")${word}('|")\\s*\\)`).test(line);
}

/**
 * 获取一个poly key对应的翻译文案
 *
 * @author liubin.frontend
 * @param {string} key 要求是一个poly key
 * @returns
 */
function getHoverTextOfKey(key, init = '') {
  if (!key) {
    return '';
  }
  const textList = searchText(key) || [];

  const hoverText = textList.reduce((result, item) => {
    result += `* **${path.parse(item.filename).name}**: ${item.text}\n`;
    return result;
  }, init);
  return hoverText;
}

module.exports = {
  searchText,
  isI18nKey,
  getHoverTextOfKey,
};
