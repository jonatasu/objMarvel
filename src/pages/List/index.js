import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Pagination from '../../components/Pagination';
import ListDescriptions from '../../components/ListDescriptions';

import api from '../../services/api.js';

import './styles.css';
import searchIcon from '../assets/search-icon.svg';

export default function List() {
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState([]);
    const [itemsPerPage] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useEffect(()  =>  {
        const fetchChars = async () => {
            setLoading(true);
            await api.getCharacters(itemsPerPage,itemOffset,searchQuery).then(characters => { setItems(characters.items); setTotalItems(characters.total); }  );

            setTimeout(() => { setLoading(false) }, 1200);
        };

        fetchChars();
    }, [searchQuery, currentPage]);

    const buscarPersonagem = event => {
        event.preventDefault();
        setItemOffset(0);
        setCurrentPage(1);
        setSearchQuery(searchValue);
    }

    const handleChangeSearchQuery = event => {
        event.preventDefault();
        setSearchValue(event.target.value)
    }

    // Get current pages
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentPosts = items.slice(indexOfFirstItem,indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => {
        setItemOffset( ((pageNumber - 1) * itemsPerPage) );
        setCurrentPage(pageNumber);
    };

    return (
        <div className="grid-structure page-list">
            <Header/>

            <div className="content">
                <div className="container">
                    <h2 className="page-title">Busca de personagens</h2>

                    <form className="search-form" onSubmit={buscarPersonagem}>
                        <label htmlFor="field_nome_personagem">Nome do personagem</label>
                        <div className="form-group">
                            <input
                                id="nome_personagem"
                                name="nome_personagem"
                                placeholder="Search"
                                type="text"
                                //value={searchQuery}
                                onChange={handleChangeSearchQuery}
                            />
                            <button type="submit" className="btn-submit">
                                <strong className="sr-only">Search</strong>
                                <img src={searchIcon} alt="Search icon"/>
                            </button>
                        </div>
                    </form>

                    { !!loading ? (
                        <div className="loading">
                            <span className="sr-only">Carregando...</span>
                        </div>
                    ) : (
                        <>
                            {items && items.length > 0 ? (
                                <div className="card-grid">
                                    <div className="grid-header">
                                        <div className="header">Personagem</div>
                                        <div className="header">Séries</div>
                                        <div className="header">Eventos</div>
                                    </div>

                                    {items.map(item => (
                                        <Link to={`/character/${item.id}`} key={item.id} params={{ id: item.id }} className="grid-row-card">
                                            <span className="card-content card-character">
                                                <span className="card-photo">
                                                    <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={`avatar do ${item.name}`}/>
                                                </span>
                                                <strong>{item.name}</strong>
                                            </span>
                                            <span className="card-content card-series">
                                                <ListDescriptions descriptions={item.series.items} />
                                            </span>
                                            <span className="card-content card-events">
                                                <ListDescriptions descriptions={item.events.items} />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <h3>Nenhum item encontrado.</h3>
                                </>
                            )}
                        </>
                    ) }
                </div>
            </div>


            {items && items.length > 0 ? (
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalPosts={totalItems}
                    paginate={paginate}
                    currentPage={currentPage}
                    pageItemsLength={items.length}
                />
            ) : (
                <Footer/>
            )}
        </div>
    );
}