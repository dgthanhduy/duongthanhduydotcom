import debounce from 'lodash/debounce';
import { useCallback } from 'react';

import usePostSearch from '../../hooks/usePostSearch';

const SearchForm = () => {
    const { doSearch, isIndexing, results } = usePostSearch();

    const handleSearch = useCallback(
        (e) => {
            const query = e.target.value;
            if (query.length) {
                doSearch(query);
            }
        },
        [doSearch],
    );

    return (
        <>
            <input
                className="text-black"
                disabled={isIndexing}
                onChange={debounce(handleSearch, 500)}
            />

            <p>{JSON.stringify(results)}</p>
        </>
    );
};

export default SearchForm;
