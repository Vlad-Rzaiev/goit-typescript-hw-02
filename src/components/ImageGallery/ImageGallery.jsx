import ImageCard from '../ImageCard/ImageCard';
import style from './ImageGallery.module.css';

export default function ImageGallery({ items, getImgUrl }) {
  return (
    <ul className={style.imageList}>
      {items.map(item => (
        <li className={style.imageItem} key={item.id}>
          <ImageCard item={item} getImgUrl={getImgUrl} />
        </li>
      ))}
    </ul>
  );
}
