const program = require('commander');
const { stripHtml } = require('string-strip-html');

const searchPhrase = program.args[1];

const LINE_BREAKS_REGEXP = /(?:\r\n|\r|\n|\t)/g;

const STRIP_HTML_OPTS = [
  'head',
  'script',
  'style',
  'xml',
  'pre',
];

const extractMatches = (html) => {
  const text = stripHtml(html, {
    stripTogetherWithTheirContents: STRIP_HTML_OPTS,
  }).result.replace(LINE_BREAKS_REGEXP, ' ');

  const findPattern = new RegExp(`(?:\\w+)?(?:\\W+)?\\w*${searchPhrase}\\w*(?:\\W+)?(?:\\w+)?`, 'ig');
  return text.match(findPattern);
};

module.exports = {
  extractMatches,
};
