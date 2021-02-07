const path = require('path');
const program = require('commander');

const { getLinkDepth } = require('./utils');

const urlDepth = program.opts().depth;

const isLinkTooDeep = (rootLink, link) => getLinkDepth(link) - getLinkDepth(rootLink) <= urlDepth;

const isAnchor = (rootLink, relativeLink) => relativeLink.startsWith('#') || relativeLink.startsWith('/#') || relativeLink === '/';

const isUpperLink = (rootLink, link) => getLinkDepth(link) < getLinkDepth(rootLink);

const isMailLink = (link) => link.includes('mailto:');
const isTelLink = (link) => link.includes('tel:');
const isTemplateLink = (link) => link.search(/{{.*}}/) !== -1;

const isValidFileLink = (link) => {
  const extension = path.extname(link);
  return extension === '' || extension === 'html' || extension === 'htm';
};

const isWSSLink = (link) => link.startsWith('wss');

const isValidAbsoluteLink = (link) => !isWSSLink(link);

const isMalformedLink = (relativeLink) => (
  relativeLink.startsWith('\\')
    || relativeLink.includes('://')
    || relativeLink.includes(':/')
);

const isSameDomainLink = (rootLink, link) => link.startsWith(rootLink);

const isDuplicateLink = (link, allLinks) => allLinks.includes(link);

const filterIrrelevantLinks = ({ pageLink, absoluteLink, allLinks, rootLink }) => {
  const relativeLink = absoluteLink.replace(pageLink, '');

  return (
    isSameDomainLink(pageLink, absoluteLink)
    && !isAnchor(pageLink, relativeLink)
    && !isMailLink(absoluteLink)
    && !isTelLink(absoluteLink)
    && !isTemplateLink(absoluteLink)
    && isValidFileLink(absoluteLink)
    && isValidAbsoluteLink(absoluteLink)
    && !isMalformedLink(relativeLink)
    && isLinkTooDeep(rootLink, absoluteLink)
    && !isUpperLink(rootLink, absoluteLink)
    && !isDuplicateLink(absoluteLink, allLinks)
  );
};

module.exports = {
  filterIrrelevantLinks,
};
