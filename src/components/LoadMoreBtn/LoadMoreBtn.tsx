import style from './LoadMoreBtn.module.css';

type LoadMoreBtnProps = {
  setPage: (count: number) => void;
  pageCount: number;
};

export default function LoadMoreBtn({ setPage, pageCount }: LoadMoreBtnProps) {
  const handleClick = (): void => {
    setPage(pageCount + 1);
  };

  return (
    <button className={style.button} type="button" onClick={handleClick}>
      Load more
    </button>
  );
}
