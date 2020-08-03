import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import api from '../../services/api.js';

import './styles.css';
import extLinkIcon from '../assets/external-link-symbol.svg';

export default function Details({match}) {
    const [characterID] = useState(match.params.id);
    const [character, setCharacter] = useState([]);
    const [tabContent, setTabContent] = useState(1);
    const [contentTitle, setContentTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigateBack = () => window.history.back();

    useEffect(()  =>  {
        const fetchCharDetails = async () => {
            setLoading(true);
            await api.getCharacterMergedData(characterID).then( character => {
                setCharacter(character)
            } );

            setTimeout(() => { setLoading(false) }, 1200);
        };

        fetchCharDetails();
    }, [characterID]);

    const bookshelfCarousel = event => {
        if(document.querySelectorAll(".book.active").length > 0){
            document.querySelectorAll(".book.active")[0].className = 'book';
        }
        event.target.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
            inline: 'center'
        })
        event.currentTarget.className = 'book active';
    };

    useEffect(()  =>  {
        if(character && character.length > 0){
            if(tabContent === 1 && character[0].comics){ setContent( character[0].comics.items ); setCategory('comics'); setContentTitle('HQs'); }
            if(tabContent === 2 && character[0].events){ setContent( character[0].events.items ); setCategory('events'); setContentTitle('Eventos'); }
            if(tabContent === 3 && character[0].series){ setContent( character[0].series.items ); setCategory('series'); setContentTitle('Séries'); }

            // document.querySelector('.')
        }
    }, [tabContent, character]);

    return (
        <div className="grid-structure page-details">
            <Header/>

            <div className="content">
                { !!loading ? (
                    <div className="loading">
                        <span className="sr-only">Carregando...</span>
                    </div>
                ) : (
                    <div className="container">
                        { !!character ? (
                            <>
                                {character.map(char => (
                                    <div key={char.id} className="char">
                                        <div className="char-name">
                                            <h2>{char.name}</h2>
                                            <button type="button" className="btn" onClick={() => navigateBack()}>Voltar</button>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3 left-col">
                                                <div className="char-photo white-box">
                                                    <img src={`${char.thumbnail.path}.${char.thumbnail.extension}`} alt={`avatar de ${char.name}`} />
                                                </div>
                                                <nav className="char-nav-content">
                                                    { char.comics.returned > 0 ? (
                                                        <button type="button" className={ `nav-item btn ${(tabContent === 1 ? 'btn-dark-blue' : '')}`} onClick={() => setTabContent(1)} >Comics</button>
                                                    ) : ''}
                                                    { char.events.returned > 0 ? (
                                                        <button type="button" className={ `nav-item btn ${(tabContent === 2 ? 'btn-dark-blue' : '')}`} onClick={() => setTabContent(2)} >Eventos</button>
                                                    ) : ''}
                                                    { char.series.returned > 0 ? (
                                                        <button type="button" className={ `nav-item btn ${(tabContent === 3 ? 'btn-dark-blue' : '')}`} onClick={() => setTabContent(3)} >Séries</button>
                                                    ) : ''}
                                                </nav>
                                            </div>
                                            <div className="col-md-9 right-col">
                                                {!!content ? (
                                                    <div className="white-box">
                                                        <h3>{contentTitle}</h3>
                                                        <div className="books">
                                                            <div className="bookshelf">
                                                                {content.map( (item, index) => (
                                                                    <div key={index} className="book" onClick={ event => bookshelfCarousel(event) }>
                                                                        <h4 className="book-title">{item.name}</h4>
                                                                        <img src={ item.thumb_url } alt={`capa de ${item.name}`} />
                                                                        <a className="btn btn-blue" href="https://www.marvel.com/comics" target="_blank">
                                                                            Visitar
                                                                            <img src={extLinkIcon} alt="icon: external link"/>
                                                                        </a>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : ( <div>No content!</div> )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : ( <div>no character</div> )}
                    </div>
                )}
            </div>

            <Footer/>
        </div>
    );
}