import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styled from 'styled-components'


const SearchContainer = styled.div`
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background: #0070f3;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #0051a1;
  }
`;

const SuggestionsContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 80vh; 
  overflow-y: auto;
  background: white;
  padding: 0;
  margin: 0;
  list-style: none;
  border-radius: 5px;
  z-index: 1000; 
`;

const SuggestionItem = styled.li`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  &:hover {
    background: #f7f7f7;
  }
  a {
    display: flex;
    align-items: center;
  }
`;

const SuggestionImage = styled(Image)`
  border-radius: 50%;
  margin-right: 10px;
`;

const Search = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const searchCharacters = async () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }

      const publicKey = process.env.PUBLIC_KEY;
      const privateKey = process.env.PRIVATE_KEY;
      const ts = new Date().getTime();
      const hash = require("crypto")
        .createHash("md5")
        .update(ts + privateKey + publicKey)
        .digest("hex");

      const result = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchTerm}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );

      setSuggestions(result.data.data.results);
    };

    searchCharacters();
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/searchResults?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Pesquisar personagem"
        />
        <SearchButton type="submit">Pesquisar</SearchButton>
      </SearchForm>
      <SuggestionsContainer>
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem key={suggestion.id}>
              <Link href={`/character/${suggestion.id}`}>
                  <SuggestionImage
                    src={`${suggestion.thumbnail.path}/portrait_incredible.${suggestion.thumbnail.extension}`}
                    alt={suggestion.name}
                    width={50}
                    height={50}
                  />
                  {suggestion.name}
              </Link>
            </SuggestionItem>
          ))}
        </SuggestionsList>
      </SuggestionsContainer>
    </SearchContainer>
  );
};

export default Search;
