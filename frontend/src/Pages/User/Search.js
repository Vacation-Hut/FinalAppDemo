import React, { useState } from 'react';
import axios from 'axios';

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/search', {
        params: { query: searchQuery },
      });

      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchbarbuttoncolor"
        />
        <button type="submit" className='landbtn'>Search</button>
      </form>
      <ul>
        {searchResults.map((result) => (
          <li key={result.cacheId}>
            <a href={result.link}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;