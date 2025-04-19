import style from './SearchBar.module.css';

export default function SearchBar({ onSubmit, toast }) {
  const handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.target.elements.searchQuery.value.toLowerCase().trim();

    if (inputValue === '') {
      toast.error('Input field can not be empty. Please enter your query.');
      return;
    }

    onSubmit(inputValue);
    e.target.reset();
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
