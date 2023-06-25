import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

interface CardProps {
  character: any;
  isLast: boolean;
  refProp?: (node: HTMLDivElement) => void;
}

const CardContainer = styled.div`
  border: 1px solid lightgray;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 2px 10pxrgba(0,0,0,0.1);
    padding: 20px;
    width: 100%;
    max-width: 350px;
    
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
  }
`;

const CardImage = styled(Image)`
  object-fit: cover;
  border-radius: 10px;
`;

const ImageWrapper = styled.div`
  aspect-ratio: 2/3;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
`;

const CardTitle = styled.h2`
  text-align: center;
  padding-top: 20px;
  font-size: 22px;
  color: #130f0f;
  margin: 0;
`;

const Card: React.FC<CardProps> = ({ character, isLast, refProp }) => {
  return (
    <CardContainer ref={isLast ? refProp : null} key={character.id}>
      <Link href={`/character/${character.id}`}>
        <ImageWrapper>
          <CardImage
            src={`${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`}
            alt={character.name}
            fill={true}
          />
        </ImageWrapper>
        <CardTitle>{character.name}</CardTitle>
      </Link>
    </CardContainer>
  );
};

export default Card;
