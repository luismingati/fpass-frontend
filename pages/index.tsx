import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import Search from "../components/Search";

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCharacterRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setOffset((prevOffset) => prevOffset + 20);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const publicKey = "575e3d01e1ac70c961d5870e77e26998";
      const privateKey = "fad54af7eb64b20bbb019d6c263ffe9b89b4f1c2";
      const ts = new Date().getTime();
      const hash = require("crypto")
        .createHash("md5")
        .update(ts + privateKey + publicKey)
        .digest("hex");

      const result = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );

      setData((prevData) => [...prevData, ...result.data.data.results]);
      setLoading(false);
    };

    fetchData();
  }, [offset]);

  return (
    <div>
      <Search />
      {data.map((character, index) => {
        if (data.length === index + 1) {
          return (
            <div ref={lastCharacterRef} key={character.id}>
              <Link href={`/character/${character.id}`}>
                  <img
                    src={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
                    alt={character.name}
                    width={500}
                    height={500}
                  />
                  <h2>{character.name}</h2>
              </Link>
            </div>
          );
        } else {
          return (
            <div key={character.id}>
              <Link href={`/character/${character.id}`}>
                  <img
                    src={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
                    alt={character.name}
                    width={500}
                    height={500}
                  />
                  <h2>{character.name}</h2>
              </Link>
            </div>
          );
        }
      })}
      {loading && <p>Loading...</p>}
    </div>
  );
}
