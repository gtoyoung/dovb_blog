"use client";

import { PoketInfo } from "type/poke.types";
import { Pokemons } from "./indexStyle";
import PokemonCard from "./pokemonCard";
import { useEffect, useRef, useState } from "react";
import { PokeApi } from "services/poke";
import { Box, Spacer } from "@chakra-ui/react";

const pokeApi = new PokeApi();

const perPage = 21;
let currentPage = 21;

export const PokeMain = ({ children }: { children: PoketInfo[] }) => {
  const [loaded, setLoaded] = useState(false);
  // const [selectPoke, setSelectPoke] = useState(null as PoketInfo);
  const [pokemons, setPokemons] = useState([] as PoketInfo[]);
  const cardListRef = useRef(null);
  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      pokeApi
        .getPoketList(currentPage, perPage)
        .then((res) => {
          if (res != null) {
            setPokemons((prev) => [...prev, ...res]);
          } else {
            setLoaded(true);
          }
        })
        .catch(() => {
          setLoaded(true);
        })
        .finally(() => {
          currentPage += perPage;
          observer.observe(entry.target);
        });
    }
  };

  // 초기데이터 셋팅
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.5,
      rootMargin: "0px 0px 800px 0px",
    });
    observer.observe(cardListRef.current);
    setPokemons(children);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Box>
        <Spacer p={10} />
      </Box>
      <Pokemons>
        {pokemons.map((item, i) => {
          return (
            <PokemonCard
              key={i}
              //   koName={convertKorName(item.name) ? convertKorName(item.name) : item.name}
              koName={item.name}
              poke={item}
              onClick={null}
              //   onClick={(pokeInfo) => {
              //     setDrawer(true);
              //     setSelectPoke(pokeInfo);
              //   }}
            />
          );
        })}
      </Pokemons>
      <Box>
        {!loaded && (
          <div ref={cardListRef}>
            <h3>Loading...</h3>
          </div>
        )}
      </Box>
    </>
  );
};
