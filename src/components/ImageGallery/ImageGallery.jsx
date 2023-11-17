import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';

const ImageGallery = ({ array }) => {
  return (
    <ImageGalleryStyle className="gallery">
      {array.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          largeImg={largeImageURL}
        />
      ))}
    </ImageGalleryStyle>
  );
};
export default ImageGallery;
