import React from "react";
import PropTypes from "prop-types";

const SearchSelector = ({ sortBy, handleSortChange }) => (
  <select
    value={sortBy}
    onChange={handleSortChange}
    className="h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected>Aucun tri</option>
    <option value="year">Année</option>
    <option value="price">Prix</option>
    <option value="name">Nom</option>
  </select>
);

export default SearchSelector;

SearchSelector.propTypes = {
  sortBy: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
};
