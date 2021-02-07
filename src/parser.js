const { getPageHTML } = require('./api');
const { extractLinks } = require('./linksExtractor');
const { extractMatches } = require('./matchesExtractor');

async function parseLink({ allLinks,link, rootLink, matchesByLink }) {
  if (matchesByLink[link]) {
    return null;
  }

  const pageHTML = await getPageHTML(link);

  matchesByLink[link] = extractMatches(pageHTML, link);

  const pageLinks = extractLinks({
    pageLink: link,
    pageHTML,
    allLinks,
    rootLink,
  });

  allLinks.push(...pageLinks);
  return pageLinks;
}

async function parseLinks({ allLinks, links, rootLink, matchesByLink }) {
  return (
    await Promise.all(
      links.map((link) => parseLink({
        allLinks,
        link,
        rootLink,
        matchesByLink,
      })),
    )
  ).flat(Infinity);
}

async function getMatchesByLink(startLink) {
  let links = [startLink];
  const allLinks = [];
  const matchesByLink = {};

  while (true) {
    links = await parseLinks({
      allLinks,
      links,
      matchesByLink,
      rootLink: startLink,
    });

    if (!links.length) {
      break;
    }
  }

  return matchesByLink;
}

module.exports = {
  getMatchesByLink,
};
