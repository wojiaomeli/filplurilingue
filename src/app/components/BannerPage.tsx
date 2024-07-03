import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  background-color: ${({ color }) => color || 'rgba(3, 112, 225, 1)'};
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerTextWrapper = styled.div`
  text-align: center;
`;

const BannerTitle = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
`;

const BannerPage = ({ title, color, children }) => {
  return (
    <BannerContainer color={color}>
      <BannerTextWrapper>
        <BannerTitle>{title}</BannerTitle>
        {children}
      </BannerTextWrapper>
    </BannerContainer>
  );
};

export default BannerPage;
