const vscode = require('vscode');
const axios = require('./axiosUtil');
const getConfig = require('./getConfig');
const api = require('../const/api');

const { projectId } = getConfig();

let templates;
function getTemplates() {
  if (templates) {
    return Promise.resolve(templates);
  }

  axios
    .get(api.get_template, {
      project_id: projectId,
    })
    .then(resp => {
      templates = resp.template_list;
      return resp.template_list;
    });
}

/**
 *
 * @param {string} name 必须
 * @param {string} keyPrefix 必须
 * @param {string} category
 * @param {string} description 必须
 */
function createTemplate(name, keyPrefix, category, description) {
  axios
    .post(`${api.post_template}?project_id=${projectId}`, {
      name,
      keyPrefix,
      category,
      description,
    })
    .then(() => vscode.window.showInformationMessage('创建成功'));
}

function uploadDraft(templateId, data = {}, lang = 'en') {
  return axios
    .post(api.upload_draft, {
      project_id: projectId,
      data,
      lang,
      region: '*',
      template_id: templateId,
    })
    .then(() => vscode.window.showInformationMessage('创建成功'));
}

module.exports = {
  getTemplates,
  createTemplate,
  uploadDraft,
};
