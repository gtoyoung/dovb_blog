"use client";
import React from "react";
import styled from "styled-components";
import { Toc } from "components/util/toc";
import { MarkDown } from "components/util/markdown";
import { BlogPost } from "type/contentful.types";
import {
  Box,
  Container,
  Heading,
  Spacer,
  Stack,
  StackDivider,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const TocDiv = styled.div`
  position: fixed;
  top: 5em;
  right: 6em;
`;

export const BlogDetail = ({ children }: { children: BlogPost }) => {
  const mainTag = children.tags.length > 0 ? children.tags[0] : "";
  return (
    <>
      <Container maxW={"7x1"}>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Spacer />
          <Box as={"header"}>
            <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
              {children.title}
            </Heading>
            <Text color={useColorModeValue("gray.900", "gray.400")} fontWeight={300} fontSize={"2xl"}>
              Written by {children.author?.name ? "DOVB" : children.author?.name} on{" "}
              {`${children.publishedDate}   realted tag ${mainTag}`}
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Box id="markdown">
                <MarkDown source={children.body} />
              </Box>
            </VStack>
          </Stack>
        </Stack>
        <TocDiv>
          <Toc content={children.body} />
        </TocDiv>
      </Container>
    </>
  );
};
