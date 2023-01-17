import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchImages } from 'utils/fetch-image';
import { toggleScroll } from 'utils/toggle-scroll';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImgProp, setModalImgProp] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      const response = await (await fetchImages(query, page)).data;
      const imagesArray = response.hits;

      const pages = Math.ceil(response.totalHits / 12);

      setImages(prevImages => [...prevImages, ...imagesArray]);
      setTotalPages(pages);
      setLoading(false);

      if (imagesArray.length === 0) {
        setImages([]);
        setPage(1);
        setLoading(false);

        return toast.error(
          "Sorry, but we din't find any images, try it again."
        );
      }
    };

    query && getImages();
  }, [query, page]);

  useEffect(() => {
    if (page !== 1 && !modalImgProp) {
      window.scrollBy({ top: window.innerHeight - 135, behavior: 'smooth' });
    }
  });

  const getQuery = e => {
    e.preventDefault();

    const searchQuery = e.target.elements.search.value.trim().toLowerCase();

    if (searchQuery.length === 0) {
      return toast.error('Please, enter something.');
    }

    if (searchQuery !== query) {
      setQuery(searchQuery);
      setImages([]);
      setPage(1);
      setTotalPages(null);
      setModalImgProp(null);
    }
  };

  const loadMorePage = () => {
    setPage(prevPage => prevPage + 1);
    setModalImgProp(null);
  };

  const openModal = e => {
    const largeImgUrl = e.target.dataset.imgUrl;
    const imgAlt = e.target.alt;

    if (!largeImgUrl) {
      return;
    }

    setModalIsOpen(true);
    setModalImgProp({
      url: largeImgUrl,
      alt: imgAlt,
    });

    document.addEventListener('keydown', closeModalOnEsc);
    toggleScroll.scrollOff();
  };

  const closeModalOnEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const closeModal = e => {
    document.removeEventListener('keydown', closeModalOnEsc);
    setModalIsOpen(false);
    toggleScroll.scrollOn();
  };

  const closeModalOnClick = e => {
    if (e.target.dataset.modal) {
      closeModal();
    }
  };

  return (
    <>
      <Toaster />
      <Searchbar onSubmit={getQuery} />
      <ImageGallery images={images} openModal={openModal} />
      {totalPages > page && <LoadMoreButton loadOnClick={loadMorePage} />}
      {modalIsOpen && (
        <Modal modalImgProp={modalImgProp} closeModal={closeModalOnClick} />
      )}
      {loading && <Loader />}
    </>
  );
};
