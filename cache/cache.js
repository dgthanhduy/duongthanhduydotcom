import elasticlunr from "elasticlunr";
import { cachedPostData } from "../lib/utils.js";
require("../lib/lunr-languages/lunr.stemmer.support.js")(elasticlunr);
require("../lib/lunr-languages/lunr.vi.js")(elasticlunr);
require("../lib/lunr-languages/lunr.multi.js")(elasticlunr);
const fs = require("fs");

function createBlogCache(filename, posts) {
  const blogContent = cachedPostData(posts);
  let index = elasticlunr(function () {
    this.use(elasticlunr.multiLanguage("en", "vi"));
    this.setRef("slug");
    this.addField("title");
  });

  blogContent.forEach((post) => {
    index.addDoc(post);
  });

  fs.writeFile(
    `./public/indexes/${filename}.json`,
    JSON.stringify(index),
    function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Blog index cache file written");
    }
  );
}

export default createBlogCache;
