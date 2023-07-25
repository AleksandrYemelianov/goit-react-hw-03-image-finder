import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'

const ImageGallery = ({ images }) => {
    return (
        <ul className={css.gallery}>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem key={id} alt={tags} smallImg={webformatURL} largeImage={largeImageURL} />
          )
        })}
        </ul>
    )
  }

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired
    })
  )
};

export default ImageGallery;

