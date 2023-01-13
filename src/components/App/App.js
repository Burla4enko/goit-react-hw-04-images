import { ImageGallery } from 'components/ImageGallery/ImageGallery';
// import { Loader } from 'components/Loader/Loader';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
// import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';

export class App extends Component {
  state = {
    query: '',
    largeImageURL: '',
    page: 1,
  };
  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery />
        <LoadMoreButton />
        {/* <Modal /> */}
        {/* <Loader/> */}
      </>
    );
  }
}
