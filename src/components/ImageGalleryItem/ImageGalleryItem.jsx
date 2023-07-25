import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';


const ImageGalleryItem = ({alt, smallImg}) => {
  return (
     <li className={css.item}>
        <img src={smallImg} alt={alt} className={css.itemImage}/>
      </li>
    )
  }


ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  
}

export default ImageGalleryItem;

// largeImageURL: PropTypes.string.isRequired
// largeImageURL