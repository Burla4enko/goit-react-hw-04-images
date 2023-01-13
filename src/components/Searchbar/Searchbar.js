import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = () => {
  return (
    <SearchbarHeader>
      <SearchForm>
        <SearchFormButton type="submit">
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};
