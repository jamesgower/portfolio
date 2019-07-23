interface ModalProps {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
}

interface CarouselImage {
  src: string;
  altText: string;
  caption: string;
}

export { ModalProps as default, CarouselImage };
