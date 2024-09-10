import React, { useEffect, useState } from 'react';
import './styles.css';

export const ImageSlider = ({ url, limit }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorM, setErrorM] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?&limit=${limit}`);

      if (!response.ok) {
        setErrorM(`Failed fetching images ! ${response.status}`);
        return;
      }

      const responseData = await response.json();

      if (responseData) {
        setImages(responseData);
      }
    } catch (e) {
      setErrorM(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== '') {
      fetchImages(url);
    }
  }, [url]);

  if (loading) {
    return <div>Loading Data ! Please Wait </div>;
  }

  if (errorM !== '') {
    return <div>Something Went Wrong ! {errorM}</div>;
  }

  return <div className='container'>{images.map((image) => 'image ')}</div>;
};
