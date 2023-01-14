import PropTypes from 'prop-types';
import { LMButton } from './LoadMoreButton.styled';

export const LoadMoreButton = ({ loadOnClick }) => {
  return (
    <LMButton type="button" onClick={loadOnClick}>
      Load More
    </LMButton>
  );
};

LoadMoreButton.propTypes = {
  loadOnClick: PropTypes.func.isRequired,
};
