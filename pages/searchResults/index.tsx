import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Card from "../../components/Card";
import styled from 'styled-components'
import Search from "../../components/Search";

const Title = styled.h1`
  text-align: center;
  margin: 0 0 32px 0;
  font-size: 32px;
  font-weight: bold;
`;

const CardList = styled.div`
  margin: 0 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 20px;
  justify-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    margin: 0 16px;
  }
`;

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query;
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const publicKey = process.env.PUBLIC_KEY;
      const privateKey = process.env.PRIVATE_KEY;
      const ts = new Date().getTime();
      const hash = require("crypto")
        .createHash("md5")
        .update(ts + privateKey + publicKey)
        .digest("hex");

      const result = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );

      setSearchResults(result.data.data.results);
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  if (!query) {
    return null;
  }

  return (
    <div>
      <Search />
      <Title>Resultados da busca: {query}</Title>
      <CardList>
      {searchResults.map((result, index) => (
        <Card 
          key={result.id}
          character={result} 
          isLast={searchResults.length === index + 1}
        />
      ))}
      </CardList>
    </div>
  );
};

export default SearchResults;
