"use client";

import { Box, Flex } from "@chakra-ui/react";
import { BlogBox } from "components/blog/blogBox";
import { SearchBox } from "components/common/searchBox";
import { useEffect, useState } from "react";
import { BlogPost } from "type/contentful.types";

const BlogMain = ({ children }: { children: BlogPost[] }) => {
  const [bloglist, setBlogList] = useState([]);

  // 검색 필터 설정
  const filterSearch = (search: string) => {
    //console.log(search);
    const filterList = children.filter((d) => search === "" || d.title.toLowerCase().includes(search.toLowerCase()));
    if (filterList.length === 0) {
      setBlogList([]);
    } else if (filterList.length > 0) {
      setBlogList(filterList);
    } else {
      setBlogList(children);
    }
  };

  const filterSearchTag = (e) => {
    const search = e.target.textContent;
    const filterList = children.filter((d) => search === "" || d.tags.includes(search));
    if (filterList.length === 0) {
      setBlogList([]);
    } else if (filterList.length > 0) {
      setBlogList(filterList);
    } else {
      setBlogList(children);
    }
  };

  useEffect(() => {
    setBlogList(children);
  }, []);

  const renderBlogList = (entries) =>
    entries.map((entry, i) => {
      return (
        <>
          <BlogBox
            key={i}
            id={entry.id}
            slug={entry.slug}
            imageUrl={entry.heroImage.imageUrl}
            title={entry.title}
            author={entry.author?.name}
            description={entry.description}
            tags={entry.tags}
            parentCallback={filterSearchTag}
          />
        </>
      );
    });

  return (
    <>
      <Box alignSelf="center">
        <Box p={6} width={"50%"}>
          <SearchBox props={filterSearch} />
        </Box>

        <Flex width="100%" flexWrap={"wrap"} justifyContent="center" gap={100}>
          {bloglist.length > 0 && renderBlogList(bloglist)}
          {bloglist.length == 0 && (
            <div>
              <h2>nothing...</h2>
            </div>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default BlogMain;
