import { ModalOverlay } from 'components/Modal/Modal.styled';
import { FadeLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <ModalOverlay>
      <FadeLoader color="#3f51b5" />
    </ModalOverlay>
  );
};
