import { Link } from 'react-router-dom';
import { FooterStyle } from './Footer.style';
import { Routes } from '../../router';

export const Footer = () => {
  return (
    <FooterStyle>
      <button>
        <Link to={Routes.CONTACT}>Contact</Link>
      </button>
      <button>
        <Link to={Routes.HOME}>Home</Link>
      </button>
    </FooterStyle>
  );
};
