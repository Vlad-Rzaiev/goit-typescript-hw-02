import { FormEvent } from 'react';
import { toast as toastType } from 'react-hot-toast';
import style from './SearchBar.module.css';

type SearchBarProps = {
  onSubmit: (searchQuery: string) => void;
  toast: typeof toastType;
};

export default function SearchBar({ onSubmit, toast }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements.namedItem(
      'searchQuery'
    ) as HTMLInputElement;
    const query = inputValue.value.toLowerCase().trim();

    if (query === '') {
      toast.error('Input field can not be empty. Please enter your query.');
      return;
    }

    onSubmit(query);
    e.currentTarget.reset();
  };

  return (
    <header className={style.header}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={style.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
