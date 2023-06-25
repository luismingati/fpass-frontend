'use client';
import Image from "next/image";
import axios from "axios";

export default function Character({ character }) {
  return (
    <div>
      <Image
        src={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
        alt={character.name}
        width={500}
        height={500}
      />
      <h2>{character.name}</h2>
      <p>{character.description}</p>
      {character.comics.items.length > 0 && (
        <>
          <h3>Comics</h3>
          <ul>
            {character.comics.items.map((comic, index) => (
              <li key={index}>{comic.name}</li>
            ))}
          </ul>
        </>
      )}
      {character.stories.items.length > 0 && (
        <>
          <h3>Stories</h3>
          <ul>
            {character.stories.items.map((story, index) => (
              <li key={index}>{story.name}</li>
            ))}
          </ul>
        </>
      )}
      {character.events.items.length > 0 && (
        <>
          <h3>Events</h3>
          <ul>
            {character.events.items.map((event, index) => (
              <li key={index}>{event.name}</li>
            ))}
          </ul>
        </>
      )}
      {character.series.items.length > 0 && (
        <>
          <h3>Series</h3>
          <ul>
            {character.series.items.map((series, index) => (
              <li key={index}>{series.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  
  const publicKey = "575e3d01e1ac70c961d5870e77e26998";
  const privateKey = "fad54af7eb64b20bbb019d6c263ffe9b89b4f1c2";
  const ts = new Date().getTime();
  const hash = require('crypto').createHash('md5').update(ts + privateKey + publicKey).digest('hex');
  
  const res = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
  
  const character = res.data.data.results[0];

  return {
    props: {
      character,
    },
  };
}
