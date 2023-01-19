import PropTypes from 'prop-types';
import { GallaryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  openModal,
}) => {
  return (
    <GallaryItem onClick={openModal}>
      <img src={webformatURL} alt={tags} data-img-url={largeImageURL} />
    </GallaryItem>
  );
};

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
