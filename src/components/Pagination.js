import React from 'react';

import arrowIcon from '../pages/assets/arrow.png';
import doubleArrowIcon from '../pages/assets/double-arrow.png';

const Pagination = ({ itemsPerPage, totalPosts, paginate, currentPage, pageItemsLength }) => {
    const pageNumbers = [];
    const pageN = {
        startIndex : (currentPage - 2 > 0 ? currentPage - 2 : currentPage - 1 > 0 ? currentPage - 1 : currentPage ),
        endIndex : (currentPage + 2 <= pageItemsLength ? currentPage + 2 : currentPage + 1 <= pageItemsLength ? currentPage + 1 : currentPage ),
        total: Math.ceil(totalPosts / itemsPerPage)
    }

    let start,
        end,
        pagesCutOff = ( window.innerWidth > 576 ? 5 : 3 ),
        numPages = pageN.total,
        ceiling = Math.ceil(pagesCutOff / 2),
        floor = Math.floor(pagesCutOff / 2);

    if(numPages < pagesCutOff) {
        start = 0;
        end = numPages;
    } else if(currentPage >= 1 && currentPage <= ceiling) {
        start = 0;
        end = pagesCutOff;
    } else if((currentPage + floor) >= numPages) {
        start = (numPages - pagesCutOff);
        end = numPages;
    } else {
        start = (currentPage - ceiling);
        end = (currentPage + floor);
    }

    for (var i = start; i < end; i++) {
        pageNumbers.push(i+1);
    }

    return (
        <footer>
            <div className="footer-content">
                <nav>
                    <ul className="pagination">
                        { currentPage !== 1 ? (
                            <>
                                <li className="page-item">
                                    <button className="page-link page-link-nav page-link-prev" onClick={() => paginate(1)}>
                                        <img src={doubleArrowIcon} alt="icon: double arrow pointing left"/>
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button className="page-link page-link-nav page-link-prev" onClick={() => paginate(currentPage - 1)}>
                                        <img src={arrowIcon} alt="icon: arrow pointing left"/>
                                    </button>
                                </li>
                            </>
                        ) : ''}


                        {pageNumbers.map(number => (
                            <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
                                <button className="page-link" onClick={() => paginate(number)}>{number}</button>
                            </li>
                        ))}


                        { currentPage !== numPages ? (
                            <>
                                <li className="page-item">
                                    <button className="page-link page-link-nav" onClick={() => paginate(currentPage + 1)}>
                                        <img src={arrowIcon} alt="icon: arrow pointing right"/>
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button className="page-link page-link-nav" onClick={() => paginate(numPages)}>
                                        <img src={doubleArrowIcon} alt="icon: double arrow pointing right"/>
                                    </button>
                                </li>
                            </>
                        ) : ''}
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Pagination;