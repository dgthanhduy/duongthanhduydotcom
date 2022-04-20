import { useCallback, useState } from "react";

const SearchForm = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const handleInputChange = useCallback(
    (e) => {
      const query = e.target.value;
      setQuery(query);
      if (query.length) {
        fetch(searchEndpoint(query))
          .then((res) => res.json())
          .then((res) => {
            setResults(res.results);
          });
      } else {
        setResults([]);
      }
    },
    [query]
  );

  return (
    <>
      <input onBlur={handleInputChange}></input>

      <p>{JSON.stringify(results)}</p>
    </>
  );
};

export default SearchForm;
