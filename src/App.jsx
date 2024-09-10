import './App.css';
import { ImageSlider } from './components/image-slider/ImageSlider';

function App() {
  const sliderImagesUrl = 'https://picsum.photos/v2/list';
  const sliderImagesLimit = 10;
  return (
    <div>
      <ImageSlider url={sliderImagesUrl} limit={sliderImagesLimit} />
    </div>
  );
}

export default App;
