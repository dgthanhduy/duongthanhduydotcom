import elasticlunr from 'elasticlunr';
require('../lib/lunr-languages/lunr.stemmer.support.js')(elasticlunr);
require('../lib/lunr-languages/lunr.vi.js')(elasticlunr);
require('../lib/lunr-languages/lunr.multi.js')(elasticlunr);
elasticlunr.multiLanguage('en', 'vi');

import { useState, useEffect } from 'react';
import { Post } from '../types';

let postIndexDump = null;
const defaultResults: Post[] = [];

const usePostSearch = () => {
    const [results, setResults] = useState(defaultResults);
    const [isIndexing, setIsIndexing] = useState(true);

    const [query, setQuery] = useState('');

    useEffect(() => {
        //* Indexing
        //!TODO : move index to another better place
        if (postIndexDump === null || postIndexDump === undefined) {
            fetch('/indexes/blog.json', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
        } else {
            setIsIndexing(false);
        }
    }, []);

    useEffect(() => {
        if (query.length) {
            const refResult = postIndexDump.search(query, {
                bool : "AND",
                expand : true
            }) ?? [];
            const results = refResult.map(({ ref }) =>
                postIndexDump.documentStore.getDoc(ref),
            );
            setResults(results);
        } else {
            setResults([]);
        }
    }, [query]);

    return {
        results,
        isIndexing,
        doSearch: setQuery,
    };
};

export default usePostSearch;
