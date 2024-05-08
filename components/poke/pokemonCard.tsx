import React from "react";
import { PoketInfo } from "type/poke.types";
import { Container, Pokemon, PokemonName, PokemonNumber, PokemonType } from "./style";
import Image from "next/image";

const PokemonCard = ({ poke, koName, onClick }: { poke: PoketInfo; koName: string; onClick: any }) => {
  return (
    <Container
      color={poke.color}
      onClick={() => {
        onClick(poke);
      }}
    >
      <Pokemon>
        <PokemonNumber>#{poke.id}</PokemonNumber>
        <PokemonName>{koName}</PokemonName>
        {poke.types && (
          <div>
            {poke.types.map((type) => [
              <PokemonType color={poke.color} key={poke.name}>
                <span>{type.type.name}</span>
              </PokemonType>,
            ])}
          </div>
        )}
      </Pokemon>
      {poke.img && (
        <Image
          src={poke.img.artwork}
          alt={`Image do pokemon ${poke.name}`}
          style={{ border: "0px !important" }}
          width={210}
          height={210}
        ></Image>
      )}
    </Container>
  );
};

export default PokemonCard;
