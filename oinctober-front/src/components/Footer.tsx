import React from 'react';
import '../_css/App.css'
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'

export default function Footer() {
    const data: Date = new Date();

    return (
        <footer className='footer'>
            <div className='social_media'>
                <ul className='social_list'>
                    <h4>Mídias sociais</h4>
                    <li>
                        <a href="https://www.instagram.com/oinctober/"><FaInstagram />  Oinctober</a>
                    </li>
                </ul>
            </div>
            <div className='developer_media'>
                <ul className='social_list'>
                    <h4>Desenvolvedores</h4>
                    <li>
                        <a href="https://www.linkedin.com/in/cecilia-de-lima/"><FaLinkedin />  Cecília</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/jo%C3%A3o-tavares-0b78251bb/"><FaLinkedin />  Tavares</a>
                    </li>
                    <li>
                        <a href="https://github.com/JT4v4res"><FaGithub />  JT4v4res</a>
                    </li>
                </ul>
            </div>
            <p className='copy_right'><span>Oinctober</span> &copy; {data.getFullYear()}</p>
        </footer>
    );
}