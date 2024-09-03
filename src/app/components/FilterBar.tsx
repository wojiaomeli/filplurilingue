/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { FaChevronDown } from 'react-icons/fa';

const filterBarContainerStyles = css`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
  position: relative;
  cursor: pointer;
  width: 300px;
  font-size: 16px;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const filterLabelStyles = css`
  flex-grow: 1;
`;

const arrowIconStyles = css`
  transition: transform 0.3s ease;
  transform: rotate(${props => props.open ? '180deg' : '0deg'});
`;

const dropdownStyles = css`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  min-width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-top: 8px;
  border: 1px solid #ddd;
  display: ${props => props.open ? 'block' : 'none'};
`;

const dropdownItemStyles = css`
  color: #333;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #0070f3;
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
    <div css={filterBarContainerStyles} onClick={handleFilterClick}>
      <span css={filterLabelStyles}>Nature de la ressource</span>
      <FaChevronDown css={arrowIconStyles} open={open} />
      {open && (
        <div css={dropdownStyles} open={open}>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Fiche pays')}>Fiche pays</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Infographie')}>Infographie</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Méthodologie')}>Méthodologie</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Portrait')}>Portrait</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Rapport de recherche')}>Rapport de recherche</div>
          <div css={dropdownItemStyles} onClick={() => handleFilterSelect('Sytographie')}>sitographie</div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
