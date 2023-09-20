import React from 'react';

function Card({ word }) {
    // Remove asterisks from the word
    const formattedWord = word.hwi.hw.replace(/\*/g, '');

    // Remove certain symbols from the definition
    const definition = word.shortdef[0].replace(/—|\+|Of/g, '').trim();

    return (
        <div className='card'>
            <h2>{formattedWord}</h2> {/* The word */}
            <p>{definition} .</p> {/* The cleaned-up definition */}
        </div>
    );
}

export default Card;
