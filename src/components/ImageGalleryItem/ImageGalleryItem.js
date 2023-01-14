import PropTypes from 'prop-types';
import { GallaryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, openModal }) => {
  return images.map(({ id, webformatURL, tags, largeImageURL }) => {
    return (
      <GallaryItem key={id} onClick={openModal}>
        <img src={webformatURL} alt={tags} data-img-url={largeImageURL} />
      </GallaryItem>
    );
  });
};

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
