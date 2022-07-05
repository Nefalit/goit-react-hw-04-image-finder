import { useState, useEffect, useRef, useCallback } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Total from './Total/Total';
import Modal from '../shared/components/Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getPhoto } from '../shared/services/api';

const App = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(false);
  const [total, setTotal] = useState(0);
  const totalForCheck = items.length;
  const firstRender = useRef(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setNotification(false);
      setError(null);
      try {
        const data = await getPhoto(search, page);
        if (data.total === 0) {
          setNotification(true);
        }
        setTotal(data.totalHits);
        setItems(prevState => {
          return [...prevState, ...data.hits];
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (!firstRender.current) {
      fetchPosts();
    } else {
      firstRender.current = false;
    }
  }, [page, search]);

  const changeSearch = useCallback(string => {
    if (string !== search) {
      setSearch(string);
      setItems([]);
      setPage(1);
      setTotal(0);
    }
  }, [search]);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const showModal = useCallback((url, tags) => {
    setModalOpen(true);
    setModalContent({
      src: url,
      alt: tags,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div className="App">
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <img
            className="modalImg"
            src={modalContent.src}
            alt={modalContent.alt}
          />
        </Modal>
      )}
      <Searchbar onSubmit={changeSearch} />
      {items.length >= 12 && (
        <Total totalImg={total} totalShown={totalForCheck} />
      )}
      {!notification && !error && (
        <ImageGallery onClick={showModal} items={items} />
      )}
      {loading && <Loader />}
      {notification && (
        <p className="notification">Sorry no results, try again...</p>
      )}
      {error && <p className="error">Something wrong: {error.code}</p>}
      {!loading && items.length >= 12 && totalForCheck < total && (
        <Button onClick={loadMore} />
      )}
    </div>
  );
};

export default App;
