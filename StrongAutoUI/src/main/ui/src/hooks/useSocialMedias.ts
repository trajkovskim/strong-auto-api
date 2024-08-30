import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

enum SocialMedia {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TELEGRAM = 'telegram',
  LINKEDIN = 'linkedin',
}

const useSocialMedias = () => {
  return [
    {
      type: SocialMedia.FACEBOOK,
      icon: React.createElement(FaFacebook),
      href: 'https://www.facebook.com/p/Strong-AUTO-100032330904215/',
    },
    {
      type: SocialMedia.INSTAGRAM,
      icon: React.createElement(FaInstagram),
      href: 'https://www.instagram.com/strongautostrumica/',
    },
  ];
};

export default useSocialMedias;
