import SyncLoader from 'react-spinners/SyncLoader';
import style from './Loader.module.css';

export default function Loader() {
  return (
    <div className={style.loaderWrap}>
      <SyncLoader color="orangered" size={20} />
    </div>
  );
}
