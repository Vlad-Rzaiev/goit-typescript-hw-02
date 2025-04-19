import { useEffect, useState } from 'react';
import { fetchPhotos, Image } from './unsplash-api';
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
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEndOfCollection, setIsEndOfCollection] = useState<boolean>(false);

  const id: string = nanoid();

  const handleSearch = (searchQuery: string): void => {
    setPage(1);
    setImages([]);
    setIsEndOfCollection(false);
    setSearchQuery(`${searchQuery}/${id}`);
  };

  useEffect(() => {
    if (searchQuery === '') return;

    async function getData(): Promise<void> {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await fetchPhotos(searchQuery.split('/')[0], page);
        const resultsData = data.results;

        setImages(prevImages => [...prevImages, ...resultsData]);

        if (
          resultsData.length === 0 ||
          resultsData.length + images.length >= data.total
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

  const openModal = (imgItem: Image): void => {
    setSelectedImage(imgItem);
    setIsOpenModal(true);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    setIsOpenModal(false);
  };

  const nextImg = (): void => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex(img => img.id === selectedImage.id);

    if (currentIndex === -1 || currentIndex === images.length - 1) {
      return;
    }

    setSelectedImage(images[currentIndex + 1]);
  };

  const prevImg = (): void => {
    if (!selectedImage) return;

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
