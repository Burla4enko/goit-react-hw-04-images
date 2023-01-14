import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarHeader>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          <GoSearch size="24" />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="search"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
