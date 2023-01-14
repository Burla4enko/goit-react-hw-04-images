import PropTypes from 'prop-types';
import { ModalBox, ModalOverlay } from './Modal.styled';

export const Modal = ({ modalImgProp: { url, alt }, closeModal }) => {
  return (
    <ModalOverlay onClick={closeModal} data-modal>
      <ModalBox>
        <img src={url} alt={alt} />
      </ModalBox>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImgProp: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};
