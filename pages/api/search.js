import postIndex from "../../cache/blog.json";
import elasticlunr from "elasticlunr";

require("../../lib/lunr-languages/lunr.stemmer.support.js")(elasticlunr);
require("../../lib/lunr-languages/lunr.vi.js")(elasticlunr);
require("../../lib/lunr-languages/lunr.multi.js")(elasticlunr);
elasticlunr.multiLanguage("en", "vi");

export default function handler(req, res) {
  //   console.log(typeof postIndex);
  try {
    const postIndexDump = elasticlunr.Index.load(postIndex);
    const refResult = postIndexDump.search(req.query.q, {}) ?? [];
    const results = refResult.map(({ ref }) =>
      postIndexDump.documentStore.getDoc(ref)
    );
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ results }));
  } catch (e) {
    console.log(e);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ e }));
  }
}
