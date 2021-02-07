const { request } = require('undici');

const getPageHTML = async (url) => {
  let pageHTML = '';

  const { body } = await request(url);

  try {
    for await (const data of body) {
      const pageChunk = String(data);
      pageHTML += pageChunk;
    }
  } catch (error) {
    console.log(error);
  }

  return pageHTML;
};

module.exports = {
  getPageHTML,
};
