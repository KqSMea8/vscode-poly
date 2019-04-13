const vscode = require('vscode');
const axios = require('axios');
const getConfig = require('./getConfig');

const instance = axios.create();

instance.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
instance.defaults.headers.common['Cookie'] = `polysid=${getConfig().sid}`;

const defaultOptions = {
  resHandleFunc: response => {
    const { data } = response;
    if ((data.message && data.message !== 'success') || (data.code && data.code !== 0)) {
      return Promise.reject(response);
    }

    return data.data;
  },
  resErrorFunc: error => {
    vscode.window.showErrorMessage(error);
    return Promise.reject(error);
  },
};

instance.interceptors.response.use(response => defaultOptions.resHandleFunc(response), error => defaultOptions.resErrorFunc(error));

module.exports = {
  get(url, data, config = {}) {
    return instance.get(
      url,
      Object.assign({}, config, {
        params: data,
      }),
    );
  },

  post(url, data, config) {
    return instance.post(url, data, config);
  },
};
