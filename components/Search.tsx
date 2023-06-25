import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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

      const publicKey = "575e3d01e1ac70c961d5870e77e26998";
      const privateKey = "fad54af7eb64b20bbb019d6c263ffe9b89b4f1c2";
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
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search characters"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <Link href={`/character/${suggestion.id}`}>
                <Image
                  src={`${suggestion.thumbnail.path}/portrait_incredible.${suggestion.thumbnail.extension}`}
                  alt={suggestion.name}
                  width={50}
                  height={50}
                />
                {suggestion.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
