import style from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ setPage, pageCount }) {
  const handleClick = () => {
    setPage(pageCount + 1);
  };

  return (
    <>
      <button className={style.button} type="button" onClick={handleClick}>
        Load more
      </button>
    </>
  );
}
