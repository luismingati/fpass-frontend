import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Search from "../components/Search";
import Card from "../components/Card";
import styled from 'styled-components';
import Loading from "../components/Loading";

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
      const publicKey = process.env.PUBLIC_KEY;
      const privateKey = process.env.PRIVATE_KEY;
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
    <CardList>
      {data.map((character, index) => (
        <Card 
          key={character.id} 
          character={character} 
          isLast={data.length === index + 1} 
          refProp={lastCharacterRef}
        />
      ))}
    </CardList>
    {loading && <Loading />}
    </div>
  );
}
