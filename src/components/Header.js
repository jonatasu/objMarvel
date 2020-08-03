import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../pages/assets/objective-empresa-de-desenvolvimento-de-software-metodologia-agil.png';

const Header = () => {
    return (
        <header>
            <div className="header-content">
                <h1>
                    <Link to="/">
                        <img src={logoImg} alt="Objective Solutions" />
                    </Link>
                </h1>

                <div className="user">
                    <span className="user-name">
                        <strong>Jônatas Filipe Vieira</strong> Teste de Front-end
                    </span>
                    <span className="user-avatar">JV</span>
                </div>
            </div>
        </header>
    );
};

export default Header;