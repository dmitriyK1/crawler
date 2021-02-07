const uniq = require('lodash.uniq');
const { parse } = require('node-html-parser');

const { filterIrrelevantLinks } = require('./filters');
const { stripAnchorFromLink, stripQueryFromLink, getAbsoluteLink } = require('./utils');

const extractLinks = ({ pageLink, pageHTML, allLinks, rootLink }) => {
  const absoluteLinks = uniq(
    parse(pageHTML)
      .querySelectorAll('a')
      .map((link) => link.getAttribute('href'))
      .filter(Boolean)
      .map((link) => stripQueryFromLink(stripAnchorFromLink(link))),
  )
    .map((link) => getAbsoluteLink(rootLink, link));

  return absoluteLinks.filter((link) => filterIrrelevantLinks({
    absoluteLink: link,
    pageLink,
    allLinks,
    rootLink,
  }));
};

module.exports = {
  extractLinks,
};
