const isRelativeUrl = require('is-relative-url');
const urljoin = require('url-join');
const chalk = require('chalk');
const program = require('commander');

const enforceHttpsUrl = (url) => {
  if (typeof url !== 'string') {
    return null;
  }

  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    return `https://${url}`;
  }

  return url.replace(/^(https?:)?\/\//, 'https://');
};

const logResults = (results) => {
  const resultPairs = Object.entries(results);
  const nonEmptyPairs = resultPairs.filter((pair) => pair[1]);

  console.log(`Crawled ${resultPairs.length} pages. Found ${nonEmptyPairs.length} pages with the term ‘${program.args[1]}’:`);

  nonEmptyPairs.forEach((pair) => {
    const [link, matches] = pair;

    matches.forEach((match) => console.log(`${chalk.blue(link)} => '${match}'`));
  });
};

const getLinkDepth = (url) => url.split(/[?#]/).shift().match(/\/[^/]+?/g).length;

const stripQueryFromLink = (link) => {
  const startOfQuery = link.indexOf('?');

  return (
    startOfQuery === -1
      ? link
      : link.slice(0, startOfQuery)
  );
};

const stripAnchorFromLink = (link) => {
  const startOfAnchor = link.indexOf('#');

  return (
    startOfAnchor === -1
      ? link
      : link.slice(0, startOfAnchor)
  );
};

const getAbsoluteLink = (rootLink, link) => (
  isRelativeUrl(link)
    ? urljoin(rootLink, link)
    : link
);

module.exports = {
  stripQueryFromLink,
  stripAnchorFromLink,
  getAbsoluteLink,
  enforceHttpsUrl,
  getLinkDepth,
  logResults,
};
