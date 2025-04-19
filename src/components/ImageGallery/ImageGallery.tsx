import { Image } from '../../unsplash-api';
import ImageCard from '../ImageCard/ImageCard';
import style from './ImageGallery.module.css';

type ImageGalleryProps = {
  items: Image[];
  getImgUrl: (img: Image) => void;
};

export default function ImageGallery({ items, getImgUrl }: ImageGalleryProps) {
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
