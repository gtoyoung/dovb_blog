"use client";

import { Box, Center, Heading } from "@chakra-ui/react";
import { useImgIObserver } from "hook/useImgIObserver";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NasaApi } from "services/nasa";
import { NasaPicture } from "type/nasa.types";
import InfiniteScroll from "react-infinite-scroll-component";

interface NasaPhoto {
  index: number;
  original: string;
  thumbnail: string;
  width: number;
  height: number;
  description: string;
  caption: string;
}

export default function SpacePicture({ children }: { children: NasaPicture[] }) {
  // img 태그 자체를 콜백형태로 useImgIObserver로 전달한다.
  const [target, setTarget] = useState(null);
  // 이미지 리스트
  const [photos, setPhotos] = useState([] as Array<NasaPhoto>);

  // 페칭된 데이터를 NasaPhoto 타입으로 변환한다.
  const convertNasaPhoto = (nasaPhotos: NasaPicture[], lastIndex: number): NasaPhoto[] => {
    var photos = [] as Array<NasaPhoto>;
    nasaPhotos.map((photo, i) => {
      photos.push({
        index: lastIndex + i,
        original: photo.hdurl,
        width: 1000,
        height: 1000,
        thumbnail: photo.url,
        description: photo.title,
        caption: photo.explanation,
      });
    });
    return photos;
  };

  // 스크롤이 로딩된 데이터 끝일에 도달했을때 실행되는 비동기 함수
  // 추가로 10개의 데이터를 가져오도록 한다.
  const getMorePhotos = async () => {
    const api = new NasaApi();
    const result = await api.getNasaPicture(10);
    const convertDatas = convertNasaPhoto(result, photos.length);
    setPhotos((photo) => [...photo, ...convertDatas]);
  };

  // 처음 페이지 로드시 실행
  useEffect(() => {
    const temp = [];
    children.map((pic, i) => {
      if (pic.hdurl) {
        const photo: NasaPhoto = {
          index: i,
          original: pic.hdurl,
          width: 1000,
          height: 1000,
          thumbnail: pic.url,
          description: pic.title,
          caption: pic.explanation,
        };

        temp.push(photo);
      }
    });
    setPhotos(temp);
  }, []);

  // url로 가져온 이미지중에서 유효하지 않은 url을 가졌을 경우 숨기도록 한다.
  const imgLoadError = (e) => {
    e.target.style.display = "none";
  };

  // 이미지가 고화질이기 때문에 img의 data-src데이터를 사용하여 Observer로 인식하며 src로 값을 셋팅해준다.
  // ref로 현재의 img 객체를 참조하여 콜백형태로 hook에 전달한다.
  // 일반 NasaPhoto객체로 전달할 경우에는 Observer가 동작하지 않으므로 실제 img 참조를 넘겨야 한다.
  useImgIObserver(target);

  return (
    <Center py={6}>
      <Box
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&::-webkit-scrollbar-track": {
            display: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            display: "none",
          },
        }}
      >
        <InfiniteScroll
          dataLength={photos.length}
          next={getMorePhotos}
          hasMore={true}
          loader={<Heading>Loading...</Heading>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          {photos.map((photo) => {
            return (
              <>
                <Box p={10} width={"auto"}>
                  <Image
                    src={photo.original}
                    alt=""
                    width={photo.width}
                    height={photo.height}
                    onError={imgLoadError}
                    loading="eager"
                  />
                  {/* 추후에 react bottom sheet같은 컴포넌트를 사용하여 스크롤에 따른 내용 변경을 진행해보도록 하겠다. */}
                </Box>
              </>
            );
          })}
        </InfiniteScroll>
      </Box>
    </Center>
  );
}
