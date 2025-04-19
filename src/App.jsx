import { useEffect, useState } from 'react';
import { fetchPhotos } from './unsplash-api';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Section from './components/Section/Section';
import Container from './components/Container/Container';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEndOfCollection, setIsEndOfCollection] = useState(false);

  const id = nanoid();

  const handleSearch = searchQuery => {
    setPage(1);
    setImages([]);
    setIsEndOfCollection(false);
    setSearchQuery(`${searchQuery}/${id}`);
  };

  useEffect(() => {
    if (searchQuery === '') return;

    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetchPhotos(searchQuery.split('/')[0], page);
        const resultsData = response.data.results;

        setImages(prevImages => {
          return [...prevImages, ...resultsData];
        });

        if (
          resultsData.length === 0 ||
          resultsData.length + images.length >= response.data.total
        ) {
          toast('No more images to load.', {
            icon: '🔚',
          });
          setIsEndOfCollection(true);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [page, searchQuery]);

  const openModal = imgItem => {
    setSelectedImage(imgItem);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsOpenModal(false);
  };

  const nextImg = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);

    if (currentIndex === -1 || currentIndex === images.length - 1) {
      return;
    }

    setSelectedImage(images[currentIndex + 1]);
  };

  const prevImg = () => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);

    if (currentIndex === -1 || currentIndex === 0) {
      return;
    }

    setSelectedImage(images[currentIndex - 1]);
  };

  const isFirstImg = selectedImage
    ? images.findIndex(img => img.id === selectedImage.id) === 0
    : false;

  const isLastImg = selectedImage
    ? images.findIndex(img => img.id === selectedImage.id) === images.length - 1
    : false;

  return (
    <Section>
      <Container>
        <SearchBar onSubmit={handleSearch} toast={toast} />
        {images.length > 0 && (
          <ImageGallery items={images} getImgUrl={openModal} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && !isEndOfCollection && (
          <LoadMoreBtn setPage={setPage} pageCount={page} />
        )}
        {isError && <ErrorMessage />}

        <ImageModal
          isOpen={isOpenModal}
          onClose={closeModal}
          imgItem={selectedImage}
          nextImg={nextImg}
          prevImg={prevImg}
          isFirstImg={isFirstImg}
          isLastImg={isLastImg}
        />

        <Toaster position="top-right" />
      </Container>
    </Section>
  );
}

export default App;
