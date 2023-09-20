import React, { useEffect, useState } from 'react';
import './App.css';
import Mainapp from './Mainapp.jsx';
import Card from './Card.jsx';
import Logo from './assets/logo.png'

function App() {
  const [word, setWord] = useState(null);
  const wordList = [
    'Ascetic',
    'Beguile',
    'Camaraderie',
    'Demagogue',
    'Egregious',
    'Fatuous',
    'Gauntlet',
    'Harbinger',
    'Iconoclast',
    'Juxtapose',
    'Kowtow',
    'Libertarian',
    'Mellifluous',
    'Nefarious',
    'Orotund',
    'Pareidolia',
    'Quixotic',
    'Redound',
    'Shofar',
    'Truculent',
    'Upbraid',
    'Vexatious',
    'Wistful',
    'Xenophobic',
    'Yare',
    'Zenith',
    'Abnegation',
    'Copacetic',
    'Disingenuous',
    'Embargo',
    'Fallible',
    'Gratuitous',
    'Injunction',
    'Licentious',
    'Multifarious',
    'Obdurate',
    'Pugnacious',
    'Querulous',
    'Recalcitrant',
    'Sycophant',
    'Trenchant',
    'Ubiquitous',
    'Vacillate',
    'Waggish',
    'Xenodochial',
    'Yugen',
    'Zeitgeist'
  ];
  useEffect(() => {
    const fetchWord = async (word) => {
      const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=f4319cc9-406f-445e-9ca2-f37979213d2a`);
      const data = await response.json();
      return data[0];
    };

    // Select a random word from the wordList
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];

    // Fetch the definition of the selected word
    fetchWord(randomWord)
      .then(data => setWord(data));
  }, []);

  return (
    <>
      <div className='container'>
        <div className='cards'>
          <img className='logo' src={Logo}></img>
          <div className='wod'>
            <h2 className='wodw'>Word of the day</h2>
            {word && <Card word={word} />}
          </div>
        </div>
        <Mainapp />
      </div>
    </>
  );
}

export default App;
