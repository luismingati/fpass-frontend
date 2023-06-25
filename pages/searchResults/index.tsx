import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query;
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const publicKey = "575e3d01e1ac70c961d5870e77e26998";
      const privateKey = "fad54af7eb64b20bbb019d6c263ffe9b89b4f1c2";
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
      <h1>Resultados da busca: {query}</h1>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <Link href={`/character/${result.id}`}>
                <Image
                  src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`}
                  alt={result.name}
                  width={500}
                  height={500}
                />
                <h2>{result.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
