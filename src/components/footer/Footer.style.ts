import styled from 'styled-components';

export const FooterStyle = styled.footer`
  position: fixed;
  left: 50%;
  bottom: 5rem;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 58px;
  padding: 0 8px;
  background: rgb(255, 255, 255);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
  border: 1px solid hsl(0 0% 0% / 0.071);
  border-radius: 9999px;
  z-index: 10;
`;
