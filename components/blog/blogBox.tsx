import Image from "next/image";
import { Box, Center, Heading, Text, Stack, Avatar, useColorModeValue, Tag, HStack, Divider } from "@chakra-ui/react";
import Link from "next/link";

const defaultProps = {
  author: "",
  description: "",
  publishedDate: "",
  readingTime: "",
  className: "",
};

type BlogBoxProps = {
  id: string;
  slug: string;
  imageUrl: string;
  title: string;
  tags?: Array<string>;
  parentCallback: Function;
} & typeof defaultProps;

export const BlogBox = (props: BlogBoxProps) => {
  const onTrigger = (e) => {
    props.parentCallback(e);
    e.preventDefault();
  };

  return (
    <Center py={6}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
          <Image src={props.imageUrl} layout={"fill"} alt="test" />
        </Box>
        <Stack>
          <Text color={"green.500"} textTransform={"uppercase"} fontWeight={800} fontSize={"sm"} letterSpacing={1.1}>
            Blog
          </Text>
          <Heading color={useColorModeValue("gray.700", "white")} fontSize={"2xl"} fontFamily={"body"}>
            <Link href={`/blog/${props.slug}`}>{props.title}</Link>
          </Heading>
          <Text color={"gray.500"}>{props.description}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar bg="teal.500" />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>by {props.author === "" ? "DOVB" : props.author}</Text>
            <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack>
        <Divider paddingTop={1} />
        <HStack paddingTop={2}>
          {props.tags.map((tag, i) => {
            return (
              <Tag key={i} cursor="pointer" onClick={onTrigger}>
                {tag}
              </Tag>
            );
          })}
        </HStack>
      </Box>
    </Center>
  );
};

BlogBox.defaultProps = defaultProps;
