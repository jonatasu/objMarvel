import React from 'react';

const ListDescriptions = props => {

    const descriptions = props.descriptions;
    const size = (props.size && isNaN(props.size) ? props.size : 3);

    const nameWithoutYears = string => ( string.indexOf('(') > -1 ? string.substr(0, string.indexOf('(')) : string );

    return (
        <ul>
            {descriptions.slice(0, size).map((item,index) => (
                <li key={index}>
                    {nameWithoutYears(item.name)}
                </li>
            ))}
        </ul>
    );
    //props.itemName.map( item => `${item.name}<br/>` )
    // console.log(itemName);
};

export default ListDescriptions;