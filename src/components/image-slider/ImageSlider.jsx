import React, { lazy, useEffect, useState } from 'react';
import './styles.css';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';

export const ImageSlider = ({ url, limit = 5 }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorM, setErrorM] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?&limit=${limit}`);

      if (!response.ok) {
        setErrorM(`Failed fetching images !`);
        return;
      }

      const responseData = await response.json();

      if (responseData) {
        const imagesData = responseData.map((data) => {
          let newData = { url: data.download_url, id: data.id };
          return newData;
        });

        setImages(imagesData);
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

  return (
    <section className='container'>
      <CgArrowLeftO className='arrow arrow-left' />
      {images.map((image) => (
        <img key={image.id} src={image.url} alt='slider image' loading='lazy' />
      ))}
      <CgArrowRightO className='arrow arrow-right' />
    </section>
  );
};
