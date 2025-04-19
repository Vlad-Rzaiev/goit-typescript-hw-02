import style from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div className={style.errorContainer}>
      <p className={style.errorText}>
        Ooops! Something went wrong. Please reload page...
      </p>
    </div>
  );
}
