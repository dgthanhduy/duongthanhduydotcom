import elasticlunr from "elasticlunr";
require("../lib/lunr-languages/lunr.stemmer.support.js")(elasticlunr);
require("../lib/lunr-languages/lunr.vi.js")(elasticlunr);
require("../lib/lunr-languages/lunr.multi.js")(elasticlunr);
import fs from "fs";
import { cachedPostData } from "../lib/utils";

// First step
const blogContent = await cachedPostData("blog");

// Second step
function createBlogCache(filename) {
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

createBlogCache("blog");
