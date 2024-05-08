"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "services/authprovider";
import AuthService from "services/firebase/auth";
import FbDatabase from "services/firebase/database";
import { Post, PostDetail } from "type/google.types";
import { InputModal } from "./inputModal";
import { CustomToast } from "components/common/toast";
import Link from "next/link";

const authService = new AuthService();
const db = new FbDatabase(false);

export const TodoMain = () => {
  const { user } = useAuth();
  const [post, setPost] = useState(null as PostDetail);
  const [posts, setPosts] = useState([] as Post[]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postId, setPostId] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [resultMsg, setResultMsg] = useState("");
  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((result) => {
        if (result.claims.admin) {
          setIsAdmin(true);
        }
      });

      // 프로필 이미지 변경사항 실시간 감시
      var profileRef = db.getRef("/users/" + user.uid + "/profileImg");
      onValue(profileRef, () => {
        db.getProfileImg(user.uid).then((result) => {
          if (result === "") {
            setProfile(user.photoURL);
          } else {
            setProfile(result);
          }
        });
      });

      // 요구사항 변경사항 실시간 감시
      var postRef = db.getRef("/users/" + user.uid + "/posts");
      onValue(postRef, () => {
        db.getPosts(user.uid)
          .then((result) => {
            const userPost = [] as Post[];
            result.forEach((data) => {
              userPost.push({
                postId: data.postId,
                post: {
                  title: data.title,
                  content: data.content,
                  created: data.created,
                  modified: data.modified,
                  status: data.status,
                  postId: data.postId,
                },
              });
            });
            setPosts(userPost);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, [user]);

  const actionSuccess = (message: string) => {
    setResultMsg(message);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size={"md"}>{user?.displayName}`s ToDo List</Heading>
        </CardHeader>
        <CardBody>
          <Box>
            <Button
              onClick={() => {
                setPostId("");
                setPostStatus("");
                setPostContent("");
                setPostTitle("");
                onOpen();
              }}
            >
              등록하기
            </Button>
          </Box>
          <Stack divider={<StackDivider />} spacing={"4"}>
            {posts.map((post, index) => {
              return (
                <Box key={index}>
                  <Link
                    href="#"
                    onClick={() => {
                      setPostId(post.post.postId);
                      setPostStatus(post.post.status);
                      setPostContent(post.post.content);
                      setPostTitle(post.post.title);
                      onOpen();
                    }}
                  >
                    <Heading size={"xs"} textTransform={"uppercase"}>
                      {post.post.title}
                    </Heading>
                    <Text pt={"2"} fontSize={"sm"}>
                      {post.post.content}
                    </Text>
                  </Link>
                </Box>
              );
            })}
          </Stack>
        </CardBody>
      </Card>
      <InputModal
        uId={user?.uid}
        postId={postId}
        defaultTitle={postTitle}
        defaultContent={postContent}
        successCallback={actionSuccess}
        isAdmin={isAdmin}
        status={postStatus}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      {resultMsg !== "" && (
        <CustomToast
          title={"result"}
          description={resultMsg}
          status={"success"}
          duration={9000}
          isClosable={true}
          callback={() => {
            setResultMsg("");
          }}
        />
      )}
      ;
    </>
  );
};
