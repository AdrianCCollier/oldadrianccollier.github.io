import React from "react";
import { FooterWrapper, FooterLinks, FooterText } from "./footerStyles";
import { FaGithub, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterLinks>
        <a href="https://github.com/adrianccollier">
          <FaGithub size={20} />
        </a>
        <a href="https://www.facebook.com/adrian.collier.71">
          <FaFacebook size={20} />
        </a>
        <a href="https://www.instagram.com/adrianccollier/">
          <FaInstagram size={20} />
        </a>
        <a href="mailto:adrianccollier@gmail.com">
          <FaEnvelope size={20} />
        </a>
      </FooterLinks>
      <FooterText>
        
      </FooterText>
    </FooterWrapper>
  );
};

export default Footer;
