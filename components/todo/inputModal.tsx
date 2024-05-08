import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FbDatabase from "services/firebase/database";

export const InputModal = ({
  uId,
  postId,
  defaultTitle,
  defaultContent,
  successCallback,
  isAdmin,
  status,
  isOpen,
  onOpen,
  onClose,
}) => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [isNew, setIsNew] = useState(true);
  const db = new FbDatabase(isAdmin);

  useEffect(() => {
    // 기존에 등록된 내용이 있을 경우 셋팅
    if (postId) {
      setTitle(defaultTitle);
      setContent(defaultContent);
      // 업데이트라는것으로 인지
      setIsNew(false);
      // 업데이트일 경우에는 팝업창을 바로띄운다.
    } else {
      setTitle("");
      setContent("");
      setIsNew(true);
    }
  }, [defaultContent, defaultTitle]);

  const handleSubmit = () => {
    if (title === "") {
      alert("제목을 입력해주세요");
      return;
    } else if (content === "") {
      alert("내용을 입력해주세요");
      return;
    }
    if (isNew) {
      db.writePost(uId, title, content)
        .then((result) => {
          successCallback(result ? "등록 완료" : "등록 실패");
          setTitle("");
          setContent("");
        })
        .catch(() => {
          successCallback("등록 실패");
        })
        .finally(() => {
          onClose();
        });
    } else {
      db.updatePost(uId, postId, title, content, status)
        .then((result) => {
          successCallback(result ? "수정 완료" : "수정 실패");
          setTitle("");
          setContent("");
        })
        .catch(() => {
          successCallback("수정 실패");
        })
        .finally(() => {
          onClose();
        });
    }
  };

  // 관리자일 경우만 동작가능
  const completeRequirement = () => {
    db.updatePost(uId, postId, title, content, "complete")
      .then(() => {
        successCallback("처리 완료");
      })
      .catch(() => {
        successCallback("처리 실패");
      })
      .finally(() => {
        onClose();
      });
  };

  const reverComplete = () => {
    db.updatePost(uId, postId, title, content, "draft")
      .then(() => {
        successCallback("처리 완료");
      })
      .catch(() => {
        successCallback("처리 실패");
      })
      .finally(() => {
        onClose();
      });
  };

  const handleDelete = () => {
    if (confirm("삭제하시겠습니까?")) {
      db.deletePost(uId, postId)
        .then((result) => {
          successCallback(result ? "삭제 완료" : "삭제 실패");
          setTitle("");
          setContent("");
        })
        .catch(() => {
          successCallback("삭제 실패");
        });
    }
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title === "" ? "Create TODO" : "Edit TODO"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Stack spacing={4}>
                <FormControl id="title">
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="content">
                  <FormLabel>Content</FormLabel>
                  <Input
                    type="text"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                </FormControl>
                <Stack spacing={6} direction={["column", "row"]}>
                  {isAdmin && !isNew && (
                    <>
                      {status === "draft" || status === undefined ? (
                        <Button
                          bg={"green.400"}
                          color={"white"}
                          w="full"
                          _hover={{
                            bg: "green.500",
                          }}
                          onClick={completeRequirement}
                        >
                          Complete
                        </Button>
                      ) : (
                        <Button
                          bg={"yellow.400"}
                          color={"white"}
                          w="full"
                          _hover={{
                            bg: "yellow.500",
                          }}
                          onClick={reverComplete}
                        >
                          Draft
                        </Button>
                      )}
                    </>
                  )}
                  {!isNew && (status === "draft" || isAdmin) && (
                    <>
                      <Button
                        bg={"red.400"}
                        color={"white"}
                        w="full"
                        _hover={{
                          bg: "red.500",
                        }}
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        w="full"
                        _hover={{
                          bg: "blue.500",
                        }}
                        onClick={handleSubmit}
                      >
                        Update
                      </Button>
                    </>
                  )}
                  {isNew && (
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      w="full"
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={handleSubmit}
                    >
                      Create
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
