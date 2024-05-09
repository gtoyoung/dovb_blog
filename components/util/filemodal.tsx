import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FbStorage from "services/firebase/storage";
import {
  Box,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ImgList from "./imglist";
import GiphyGrid from "./giphy";

const FileModal = ({ uid, customClick, isOpen, onClose }) => {
  const [pictures, setPictures] = useState([] as any[]);
  const storage = new FbStorage();
  useEffect(() => {
    storage.getUserFileList(uid).then((result) => {
      setPictures(result);
    });
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.forEach((file) => {
      storage.upload(file, uid).then((file) => {
        const fileMetaData = {
          fileName: file.name,
          url: URL.createObjectURL(file),
          status: "loading",
        };
        setPictures((prev) => [...prev, fileMetaData]);
      });
    });
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/gif": [".gif"],
      "image/jpg": [".jpg"],
    },
  });

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>이미지 선택</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Tabs>
                <TabList>
                  <Tab>이미지 직접 선택</Tab>
                  <Tab>GIPHY</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box {...getRootProps}>
                      <Input {...getInputProps} />
                      {isDragActive ? <p>등록합니다.</p> : <p>이미지 파일만 올려주세요(ex).jpg, .gif etc...)</p>}
                    </Box>
                    <ImgList items={pictures} uid={uid} />
                  </TabPanel>
                  <TabPanel>
                    <Box
                      height={"350px"}
                      overflow={"scroll"}
                      overflowX={"hidden"}
                      css={{
                        "::-webkit-scrollbar": {
                          display: "none",
                        },
                      }}
                    >
                      <GiphyGrid uid={uid} customClick={customClick} />
                    </Box>
                    powered by <span style={{ fontWeight: "bold" }}>Giphy</span>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileModal;
