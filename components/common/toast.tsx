import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

export const CustomToast = ({
  title,
  description,
  status,
  duration,
  isClosable,
  callback,
}: {
  title: string;
  description: string;
  status: any;
  duration: number;
  isClosable: boolean;
  callback: Function;
}) => {
  const toast = useToast();

  useEffect(() => {
    callback();
  }, []);

  return (
    <>
      {toast({
        title,
        description,
        status,
        duration,
        isClosable,
      })}
    </>
  );
};
