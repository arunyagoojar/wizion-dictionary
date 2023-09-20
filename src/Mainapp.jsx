import React, { useState, useRef } from 'react';

function Mainapp() {
    const [word, setWord] = useState("");
    const [data, setData] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const fetchData = async () => {
        const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=f4319cc9-406f-445e-9ca2-f37979213d2a`);
        const data = await response.json();
        setData(data);
    }

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <div className='app'>
            <div className='input'>
                <div className='search'>
                    <input
                        type='text'
                        placeholder='search'
                        onChange={(e) => setWord(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                fetchData();
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
            </div>

            <div className='render'>
                {data && data[0].hwi ? (
                    <div className='renderc'>
                        <h1 className='word'>{data[0].hwi.hw.replace(/\*/g, '')}</h1>
                        {data[0].hwi.prs && data[0].hwi.prs[0] && (
                            <div className='speech'>
                                <p className='pronunciation'>{data[0].hwi.prs[0].ipa}</p>
                                <audio ref={audioRef} src={`https://media.merriam-webster.com/soundc11/${data[0].hwi.prs[0].sound.audio.charAt(0)}/${data[0].hwi.prs[0].sound.audio}.wav?key=f4319cc9-406f-445e-9ca2-f37979213d2a`}></audio>
                                <button onClick={toggleAudio}>{isPlaying ? 'Speech' : 'Speech'}</button>
                            </div>
                        )}

                        {data[0].shortdef && (
                            <div className='worddef'>
                                {data[0].shortdef.map((def, index) => (
                                    <p key={index} className='def'><span className='point'>●</span> {def}</p>
                                ))}
                            </div>
                        )}

                        {data[0].def && data[0].def[0] && (
                            <div className='examples'>
                                <h2 className='example'>Examples</h2>
                                {data[0].def[0].sseq.map((seq, index) => (
                                    seq[0][1].dt && seq[0][1].dt[1] && seq[0][1].dt[1][1] && seq[0][1].dt[1][1][0] && typeof seq[0][1].dt[1][1][0].t === 'string' ? (
                                        <div key={index} className='example-item'>
                                            {seq[0][1].dt[1][1][0].t.replace(/{it}(.*?){\/it}/g, '$1')}
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        )}

                        <div className='suggestions'>
                            {data.map((suggestion, index) => (
                                suggestion.hwi && (<p key={index}>{suggestion.hwi.hw.replace(/\*/g, '')}</p>)
                            ))}
                        </div>

                    </div>
                ) : (
                    <div className='default-text'>
                        <p>Start exploring the dictionary by typing your search!</p>
                    </div>
                )
                }
            </div>
        </div>
    );
}

export default Mainapp;
