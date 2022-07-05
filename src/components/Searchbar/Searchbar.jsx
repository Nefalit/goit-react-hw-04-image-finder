import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setInput(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };
  return (
    <header className={s.searchBar}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <button type="submit" className={s.searchBtn}>
          <span className={s.searchBtnLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={s.searchInput}
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
