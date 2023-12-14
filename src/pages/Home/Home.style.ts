import styled from 'styled-components';

type HomeStyleProps = {
  src: string;
};

export const HomeStyle = styled.div<HomeStyleProps>`
  height: 100%;
  z-index: 1;
  /* background-image: ${({ src }) => `url(${src})`}; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  canvas {
    position: fixed;
    inset: 0;
  }
`;

export const NestedRoutesContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 7rem;
  transform: translateX(-50%);
  z-index: 2;
  width: 100%;
  height: 100%;
  max-height: 500px;
  max-width: 800px;
  background-color: orange;
`;
