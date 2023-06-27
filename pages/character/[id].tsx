import Image from "next/image";
import axios from "axios";
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:0 32px;
  font-family: Arial, sans-serif;
`;

const ImageContainer = styled.div`
  margin: 20px 0;
  width: 100%;
  max-width: 500px;
  height: 500px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 24px 0 12px 0;
  color: black;
`;

const Description = styled.p`
  font-size: 16px;
  text-align: justify;
  line-height: 1.5;
  margin: 0 0 24px 0;
  max-width: 450px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin: 0;
  margin-top: 20px;
`;

const SectionList = styled.ul`
  margin: 0 0 32px 0;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 14px;
  line-height: 1.4;
`;

export default function Character({ character }) {
  return (
    <PageContainer>
      <ImageContainer>
        <Image
          src={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
          alt={character.name}
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>
      <Title>{character.name}</Title>
      <Description>{character.description}</Description>
      {character.comics.items.length > 0 && (
        <>
          <SectionTitle>Histórias em Quadrinhos</SectionTitle>
          <SectionList>
            {character.comics.items.map((comic, index) => (
              <ListItem key={index}>{comic.name}</ListItem>
            ))}
          </SectionList>
        </>
      )}
      {character.stories.items.length > 0 && (
        <>
          <SectionTitle>Histórias</SectionTitle>
          <SectionList>
            {character.stories.items.map((story, index) => (
              <ListItem key={index}>{story.name}</ListItem>
            ))}
          </SectionList>
        </>
      )}
      {character.events.items.length > 0 && (
        <>
          <SectionTitle>Eventos</SectionTitle>
          <SectionList>
            {character.events.items.map((event, index) => (
              <ListItem key={index}>{event.name}</ListItem>
            ))}
          </SectionList>
        </>
      )}
      {character.series.items.length > 0 && (
        <>
          <SectionTitle>Séries</SectionTitle>
          <SectionList>
            {character.series.items.map((series, index) => (
              <ListItem key={index}>{series.name}</ListItem>
            ))}
          </SectionList>
        </>
      )}
    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  
  const publicKey = process.env.PUBLIC_KEY;
  const privateKey = process.env.PRIVATE_KEY;
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
