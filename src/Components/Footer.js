import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  font-size: 14px;
  margin-top: 2px;
`;

function Footer() {
  return (
    <div>
      <StyledFooter>
        <p>&copy; 2023 Online Delivery Application. All rights reserved.</p>
      </StyledFooter>
    </div>
  );
}

export default Footer;

