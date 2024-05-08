import React, { useState } from "react";
import { Button, Input, InputGroup, InputLeftElement, InputRightAddon } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBox = ({ props }) => {
  const [searchText, setSearchText] = useState("");

  const changeText = (event) => {
    let searchText = event.target.value;
    setSearchText(searchText);
  };

  const result = () => {
    let resultText = searchText;
    props(resultText);
  };

  return (
    <>
      <InputGroup borderRadius={5} size="sm">
        <InputLeftElement pointerEvents="none">{<Search2Icon color="gray.600" />} </InputLeftElement>
        <Input type="text" placeholder="Search..." border="1px solid #949494" onChange={changeText} />
        <InputRightAddon p={0} border="none">
          <Button size="sm" borderLeftRadius={0} borderRightRadius={3.3} border="1px solid #949494" onClick={result}>
            Search
          </Button>
        </InputRightAddon>
      </InputGroup>
    </>
  );
};
