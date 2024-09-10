import React, { lazy, useEffect, useState } from 'react';
import './styles.css';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

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

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }
  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
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
      <BsArrowLeftCircle
        className='arrow arrow-left'
        onClick={handlePrevious}
      />
      {images && images.length
        ? images.map((image, i) => (
            <img
              key={image.id}
              src={image.url}
              alt='slider image'
              loading='lazy'
              className={currentSlide === i ? 'current-image' : 'hide'}
            />
          ))
        : null}
      <BsArrowRightCircle className='arrow arrow-right' onClick={handleNext} />
      <span className='slider-circles'>
        {images && images.length
          ? images.map((img, i) => (
              <button
                key={img.id}
                className={
                  currentSlide === i ? 'current-circle circle' : 'circle'
                }
              ></button>
            ))
          : null}
      </span>
    </section>
  );
};
