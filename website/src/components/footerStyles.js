import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background: rgb(0, 33, 65);
  color: #fff;
  padding: 2rem 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  a {
    color: #fff;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: #1db954;
    }
  }
`;

export const FooterText = styled.p`
  margin-top: 1rem;
  font-size: 0.8rem;
`;
