"use client";

import Image from "next/image";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  addToast,
  useDisclosure,
} from "@heroui/react";

import { DeleteIcon } from "@/assets/icons";
import { deleteArticle } from "@/lib/actions/article.actions";

export default function DeleteModal({ articleId }: { articleId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        aria-label="Delete"
        color="danger"
        variant="flat"
        disableAnimation
        onPress={onOpen}
      >
        <Tooltip content="Delete">
          <Image
            src={DeleteIcon}
            width={20}
            height={20}
            alt="Delete article icon"
            priority={true}
          />
        </Tooltip>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this article?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    deleteArticle(articleId);
                    addToast({
                      title: "Article deleted successfully",
                      color: "success",
                    });
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
