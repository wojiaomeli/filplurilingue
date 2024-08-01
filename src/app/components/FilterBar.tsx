import React, { useState } from 'react';
import { css } from '@emotion/react';

const filterBarStyles = css`
  position: relative;
  display: inline-block;
`;

const filterButtonStyles = css`
  background-color: white;
  color: black;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
`;

const dropdownStyles = css`
  display: block;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;
`;

const dropdownItemStyles = css`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const FilterBar = ({ onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleFilterClick = () => {
    setOpen(!open);
  };

  const handleFilterSelect = (filter) => {
    onSelect(filter);
    setOpen(false);
  };

  return (
    <div css={filterBarStyles}>
      <button css={filterButtonStyles} onClick={handleFilterClick}>
        Nature de la ressource
      </button>
      {open && (
        <div css={dropdownStyles}>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Fiche pays')}>Fiche pays</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Infographie')}>Infographie</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Méthodologie')}>Méthodologie</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Portrait')}>Portrait</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Rapport de recherche')}>Rapport de recherche</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Sytographie')}>Sytographie</div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
