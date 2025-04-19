import { Image } from '../../unsplash-api';
import style from './ImageCard.module.css';

type ImageCardProps = {
  item: Image;
  getImgUrl: (img: Image) => void;
};

export default function ImageCard({ item, getImgUrl }: ImageCardProps) {
  const handleClick = (): void => {
    getImgUrl(item);
  };

  return (
    <div className={style.imgWrap}>
      <img
        className={style.img}
        src={item.urls.small}
        alt={item.alt_description}
        onClick={handleClick}
      />
    </div>
  );
}
