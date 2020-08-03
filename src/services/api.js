import { API_BASE_URL, API_TS, API_KEY, API_HASH } from '../config.js';


const getCharacters = ( postsPerPage = 3, itemOffset = 0, searchQuery = '' ) => {
    const query = searchQuery !== '' ? `&nameStartsWith=${searchQuery}` : '';

    return fetch(`${API_BASE_URL}characters?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}&limit=${postsPerPage}&offset=${itemOffset}${query}`)
    .then(res => res.json())
    .then(
        (result) => {
            let finalResult = {
                items: result.data.results,
                total: result.data.total
            }
            return finalResult;
        },
        (error) => {
            console.log(error);
        }
    )
};

const getIDfromURI = uri => {
    const uriArray = uri.split('/');
    const id = uriArray[uriArray.length - 1];
    return id;
};

const getCharacterMergedData = async (id) => {
    let charContent = {},
        charComics = [],
        charEvents = [],
        charSeries = [];
    
    const getCharacterDetails = (id) => {
        return fetch(`${API_BASE_URL}characters/${id}?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`)
        .then(res => res.json())
        .then(
            async (result) => {
                let arrWithOneObj = [];
                arrWithOneObj.push(result.data.results[0]);

                charContent = arrWithOneObj[0];
                return await arrWithOneObj;
            },
            (error) => {
                console.log(error);
            }
        ).then( async (result) => {
            const character = result[0];
            let newObj = character.comics;

            if(newObj.returned > 0){
                newObj.items.forEach( (item, idx) => {
                    let id = getIDfromURI( item.resourceURI );
                    getComicThumbnail(id, item);
                } )
            }
            
            return await result;

        }).then( async (result) => {
            const character = result[0];
            let newObj = character.events;

            if(newObj.returned > 0){
                newObj.items.forEach( (item, idx) => {
                    let id = getIDfromURI( item.resourceURI );
                    getEventThumbnail(id, item);
                } )
            }
            
            return await result;

        }).then( async (result) => {
            const character = result[0];
            let newObj = character.series;

            if(newObj.returned > 0){
                newObj.items.forEach( (item, idx) => {
                    let id = getIDfromURI( item.resourceURI );
                    getSerieThumbnail(id, item);
                } )
            }
            
            return await result;
        });
    };

    const getComicThumbnail = (id, itemObj) => {
        fetch(`${API_BASE_URL}comics/${id}?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`)
        .then(res => res.json())
        .then(
            async (result) => {
                const newTempObj = result.data.results[0];
                let thumb = `${newTempObj.thumbnail.path}.${newTempObj.thumbnail.extension}`;
                return await thumb;
            },
            (error) => {
                console.log(error);
            }
        ).then( async (result) => {
            itemObj.thumb_url = result;
            charComics.push(itemObj);
            return await result;
        }).then( async (result) => {
            charContent.comics.items = charComics;
            return await result;
        });
    };

    const getEventThumbnail = (id, itemObj) => {
        fetch(`${API_BASE_URL}events/${id}?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`)
        .then(res => res.json())
        .then(
            async (result) => {
                const newTempObj = result.data.results[0];
                let thumb = `${newTempObj.thumbnail.path}.${newTempObj.thumbnail.extension}`;
                return await thumb;
            },
            (error) => {
                console.log(error);
            }
        ).then( async (result) => {
            itemObj.thumb_url = result;
            charEvents.push(itemObj);
            return await result;
        }).then( async (result) => {
            charContent.events.items = charEvents;
            return await result;
        });
    };

    const getSerieThumbnail = (id, itemObj) => {
        fetch(`${API_BASE_URL}series/${id}?ts=${API_TS}&apikey=${API_KEY}&hash=${API_HASH}`)
        .then(res => res.json())
        .then(
            async (result) => {
                const newTempObj = result.data.results[0];
                let thumb = `${newTempObj.thumbnail.path}.${newTempObj.thumbnail.extension}`;
                return await thumb;
            },
            (error) => {
                console.log(error);
            }
        ).then( async (result) => {
            itemObj.thumb_url = result;
            charSeries.push(itemObj);
            return await result;
        }).then( async (result) => {
            charContent.series.items = charSeries;
            return await result;
        });
    };

    const finalResult = await getCharacterDetails(id).then( result => result );

    return finalResult;
};

export default { getCharacters, getCharacterMergedData };