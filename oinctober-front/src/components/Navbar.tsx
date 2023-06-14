import React, { useState, useContext } from 'react';
import '../_css/App.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Context';

export default function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const {signed, user, userType, logOut} = useContext(AuthContext);;

    console.log("usuário logado:", signed);

    return (
        <nav className='navigation'>
                    <button className="hamburger"
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded);
                          }}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                <Link to="/" className='brand'><img src="https://cdn-icons-png.flaticon.com/512/8164/8164070.png" alt="Oinctober brand" className='oinc_brand'/></Link>
                <Link to="/" className='brand'>Oinctober</Link>
                <div className={
                    isNavExpanded ? "navigation-menu expanded": "navigation-menu"
                    }
                >
                    { !signed ? 
                    <ul className='notLoggedMenu'>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/sobre">Sobre</Link></li>
                        <li><Link to="/contatos">Contatos</Link></li>
                        <li><Link to="/portfolio">Portfólio</Link></li>
                    </ul> 
                    :
                    <ul className='loggedMenu'>
                        <li>{`Olá, ${ user }`}</li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/sobre">Sobre</Link></li>
                        <li><Link to="/contatos">Contatos</Link></li>
                        <li><Link to="/portfolio">Portfólio</Link></li>
                        <li><Link to="/" onClick={ logOut }>Sair</Link></li>
                    </ul>}
                </div>
            </nav>
    )
}
