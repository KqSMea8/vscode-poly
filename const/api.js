const host = 'https://poly.bytedance.net';

const api = {
  get_template: '/api/get_template',
  post_template: '/api/post_template',
  upload_draft: '/api/trans/draft/upload',
};

const result = Object.keys(api).reduce((result, key) => {
  result[key] = host + api[key];
  return result;
}, {});

module.exports = result;
