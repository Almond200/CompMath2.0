// Versioned classic scripts also work from a local copy opened with file://.
(function (root) {
  "use strict";
  const assetGroups = new Map(), chapterAssets = new Map(), solutionAssets = new Map(), assetRequests = new Map(), loadedAssets = new Set();
  document.getElementById("on-demand-scripts").content.querySelectorAll("script[src]").forEach(tag => {
    const src = tag.getAttribute("src"), group = tag.dataset.group;
    if (group === "solutions") solutionAssets.set(+tag.dataset.decade, src);
    if (group === "chapters") {
      const [, book, code] = src.match(/learn\/([^/]+)\/([^/.]+)\.js/);
      chapterAssets.set(book + "/" + code, src);
    } else {
      if (!assetGroups.has(group)) assetGroups.set(group, []);
      assetGroups.get(group).push(src);
    }
  });
  function loadAsset(src) {
    if (!assetRequests.has(src)) assetRequests.set(src, new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => { loadedAssets.add(src); resolve(); };
      script.onerror = () => {
        assetRequests.delete(src);
        script.remove();
        reject(new Error("Could not load " + src));
      };
      document.head.appendChild(script);
    }));
    return assetRequests.get(src);
  }
  function loadAssets(group) {
    return Promise.all(assetGroups.get(group).map(loadAsset));
  }
  const chapterAsset = (book, chapter) => chapterAssets.get(book.id + "/" + chapter.code.toLowerCase());
  function loadChapter(book, chapter) {
    const src = chapterAsset(book, chapter);
    return src ? loadAsset(src) : Promise.resolve();
  }
  function solutionRequirements(years) {
    const assets = years ? [...new Set(years.map(year => solutionAssets.get(Math.floor(year / 10) * 10)))] : [...solutionAssets.values()];
    return assets.filter(src => src && !loadedAssets.has(src)).map(loadAsset);
  }
  root.AppAssets = { loadAsset, loadAssets, loadedAssets, assetGroups, chapterAsset, loadChapter, solutionRequirements };
})(window);
