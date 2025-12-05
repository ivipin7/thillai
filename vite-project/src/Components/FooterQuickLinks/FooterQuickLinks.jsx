import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { CiMail } from "react-icons/ci";

import './FooterQuickLinks.css'

const FooterQuickLinks = () => {
  return (
    <div className='FooterQuickLink-Main'>
        
        <div className='FooterQuickLink-Line'></div>

      <div className="social-icons">
              <a href="https://www.instagram.com/shrithillai_textiles?igsh=MXJweWl5czluMTl6Zw==" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="socialmedia-mainicons" />
              </a>
              {/* <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <CiFacebook className="socialmedia-mainicons"/>
              </a> */}
              <a href="mailto:Shrithillaitextiles@gmail.com" target="_blank" rel="noopener noreferrer">
              <CiMail className="socialmedia-mainicons" />
              </a>
        </div>
    </div>
  )
}

export default FooterQuickLinks
