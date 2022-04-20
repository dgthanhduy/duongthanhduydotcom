import elasticlunr from "elasticlunr";

require("../../lib/lunr-languages/lunr.stemmer.support.js")(elasticlunr);
require("../../lib/lunr-languages/lunr.vi.js")(elasticlunr);
require("../../lib/lunr-languages/lunr.multi.js")(elasticlunr);
elasticlunr.multiLanguage("en", "vi");

import { useCallback, useState, useEffect } from "react";

let postIndexDump = null;

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isIndexing, setIsIndexing] = useState(true);

  useEffect(() => {
    if (!postIndexDump) {
      fetch("/indexes/blog.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          res.json().then((data) => {
            postIndexDump = elasticlunr.Index.load(data);
            setIsIndexing(false);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const query = e.target.value;
      setQuery(query);
      if (query.length) {
        const refResult = postIndexDump.search(query, {}) ?? [];
        const results = refResult.map(({ ref }) =>
          postIndexDump.documentStore.getDoc(ref)
        );
        setResults(results);
      } else {
        setResults([]);
      }
    },
    [query]
  );

  return (
    <>
      <input disabled={isIndexing} onChange={handleInputChange}></input>

      <p>{JSON.stringify(results)}</p>
    </>
  );
};

export default SearchForm;
