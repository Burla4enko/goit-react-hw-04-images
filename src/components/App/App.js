import { Component } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchImages } from 'utils/fetch-image';
import { toggleScroll } from 'utils/toggle-scroll';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalPages: null,
    loading: false,
    modalIsOpen: false,
    modalImgProp: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, modalImgProp } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ loading: true });

      const response = await (await fetchImages(query, page)).data;
      const imagesArray = response.hits;

      const totalPages = Math.ceil(response.totalHits / 12);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...imagesArray],

          totalPages,
          loading: false,
        };
      });

      if (imagesArray.length === 0) {
        this.setState({
          images: [],
          page: 1,
          loading: false,
        });

        return toast.error(
          "Sorry, but we din't find any images, try it again."
        );
      }
    }

    if (page !== 1 && !modalImgProp) {
      window.scrollBy({ top: window.innerHeight - 135, behavior: 'smooth' });
    }
  }

  getQuery = e => {
    e.preventDefault();

    const { query } = this.state;
    const searchQuery = e.target.elements.search.value.trim().toLowerCase();

    if (searchQuery.length === 0) {
      return toast.error('Please, enter something.');
    }

    if (searchQuery !== query) {
      this.setState({
        query: searchQuery,
        images: [],
        page: 1,
        totalPages: null,
        modalImgProp: null,
      });
    }
  };

  loadMorePage = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        modalImgProp: null,
      };
    });
  };

  openModal = e => {
    const largeImgUrl = e.target.dataset.imgUrl;
    const imgAlt = e.target.alt;

    if (!largeImgUrl) {
      return;
    }

    this.setState({
      modalIsOpen: true,
      modalImgProp: {
        url: largeImgUrl,
        alt: imgAlt,
      },
    });

    document.addEventListener('keydown', this.closeModalOnEsc);
    toggleScroll.scrollOff();
  };

  closeModal = e => {
    document.removeEventListener('keydown', this.closeModalOnEsc);
    this.setState({ modalIsOpen: false });
    toggleScroll.scrollOn();
  };

  closeModalOnClick = e => {
    if (e.target.dataset.modal) {
      this.closeModal();
    }
  };
  closeModalOnEsc = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  render() {
    const { page, totalPages, loading, modalIsOpen, modalImgProp } = this.state;
    return (
      <>
        <Toaster />
        <Searchbar onSubmit={this.getQuery} />
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {totalPages > page && (
          <LoadMoreButton loadOnClick={this.loadMorePage} />
        )}
        {modalIsOpen && (
          <Modal
            modalImgProp={modalImgProp}
            closeModal={this.closeModalOnClick}
          />
        )}
        {loading && <Loader />}
      </>
    );
  }
}
