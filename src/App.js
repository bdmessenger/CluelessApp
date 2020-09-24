import React, {useState, useEffect} from 'react';
import ContentBox from './components/ContentBox';
import ActionMenu from './components/ActionMenu';
import OverlayMenu from './components/OverlayMenu';

import FingerPrintImage from './images/finger-print.png'

const suspectNames = [
  'Colonel Mustard', 'Professor Plum', 'Mr. Green',
  'Mrs. Peacock', 'Miss Scarlet', 'Mrs. White'
];

const weaponNames = [
  'Knife', 'Candlestick', 'Revolver',
  'Rope', 'Lead Pipe', 'Wrench'
];

const roomNames = [
  'Hall', 'Lounge', 'Dining Room',
  'Kitchen', 'Ballroom', 'Conservatory',
  'Billiard Room', 'Library', 'Study'
];

const storageGrid = {
  suspects: JSON.parse(localStorage.getItem('suspectGrid')),
  weapons: JSON.parse(localStorage.getItem('weaponGrid')),
  rooms: JSON.parse(localStorage.getItem('roomGrid'))
};

function App() {
  const [isPlaying, setIsPlaying] = useState(JSON.parse(localStorage.getItem('isPlaying')) || false);
  const [playerNames, setPlayerNames] = useState(JSON.parse(localStorage.getItem("playerNames")) || ['You', 'P2', 'P3']);
  const [selectedTile, setSelectedTile] = useState(null);
  const [suspectGrid, setSuspectGrid] = useState(storageGrid.suspects || Array.from({length: 6},()=> Array.from({length: playerNames.length}, () => "")));
  const [weaponGrid, setWeaponGrid] = useState(storageGrid.weapons || Array.from({length: 6},()=> Array.from({length: playerNames.length}, () => "")));
  const [roomGrid, setRoomGrid] = useState(storageGrid.rooms || Array.from({length: 9},()=> Array.from({length: playerNames.length}, () => "")));

  const handleTileChange = (value = "") => {
    const gridType = selectedTile.match(/[a-zA-Z]+/)[0];
    const [rowIndex, colIndex] = selectedTile.match(/[0-9]/g);

    let copyArr;

    switch(gridType) {
      case 'suspects':
        copyArr = [...suspectGrid];
        copyArr[rowIndex][colIndex] = value;
        setSuspectGrid(copyArr);
        break;
      case 'weapons':
        copyArr = [...weaponGrid];
        copyArr[rowIndex][colIndex] = value;
        setWeaponGrid(copyArr);
        break;
      case 'rooms':
        copyArr = [...roomGrid];
        copyArr[rowIndex][colIndex] = value;
        setRoomGrid(copyArr);
        break;
      default:
        break;
    }

    setSelectedTile(null);
  }

  const handleNewGameSubmit = (newListOfPlayers) => {
    if(newListOfPlayers.every(name => name.trim() !== '')) {
      setPlayerNames(newListOfPlayers);
      clearBoard(newListOfPlayers);
      setIsPlaying(true);
    } else alert('Missing name(s). Please fix and submit the name(s).');
  }

  const clearBoard = (listOfPlayers = playerNames) => {
    setSuspectGrid(Array.from({length: 6},()=> Array.from({length: listOfPlayers.length}, () => "")));
    setWeaponGrid(Array.from({length: 6},()=> Array.from({length: listOfPlayers.length}, () => "")));
    setRoomGrid(Array.from({length: 9},()=> Array.from({length: listOfPlayers.length}, () => "")));
  }

  const checkGrid = () => {
    const gridType = selectedTile.match(/[a-zA-Z]+/)[0];
    const [rowIndex] = selectedTile.match(/[0-9]/g);

    switch(gridType) {
      case 'suspects':
        if(suspectGrid.filter(row => row.includes('✓')).length === 5 || suspectGrid[rowIndex].includes('✓')) return true;
        break;
      case 'weapons':
        if(weaponGrid.filter(row => row.includes('✓')).length === 5 || weaponGrid[rowIndex].includes('✓')) return true;
        break;
      case 'rooms':
        if(roomGrid.filter(row => row.includes('✓')).length === 8 || roomGrid[rowIndex].includes('✓')) return true;
        break;
      default:
        break;
    }

    return false;
  }

  useEffect(() => {
    localStorage.setItem('suspectGrid', JSON.stringify(suspectGrid));
    localStorage.setItem('weaponGrid', JSON.stringify(weaponGrid));
    localStorage.setItem('roomGrid', JSON.stringify(roomGrid));
    localStorage.setItem('playerNames', JSON.stringify(playerNames));
    localStorage.setItem('isPlaying', isPlaying);
  }, [suspectGrid, weaponGrid, roomGrid, playerNames, isPlaying]);


  return (
    <div>
      {
        !isPlaying &&
        <OverlayMenu
          playerNames={playerNames}
          handleNewGameSubmit={handleNewGameSubmit}
          setIsPlaying={setIsPlaying}
        />
      }
      <div className="mx-auto max-w-screen-sm w-full px-2 relative my-2">
        <div className="flex flex-col md:flex-row gap-2">
          <button 
            className="py-1 rounded text-xl text-red-900 w-full bg-red-200 border-2 border-red-400 focus:bg-red-300 focus:outline-none" 
            onClick={(e) => {
              setIsPlaying(false);
              e.target.blur();
            }}
          >New Game</button>
          <button 
            className="py-1 rounded text-xl text-orange-900 w-full bg-orange-200 border-2 border-orange-400 focus:bg-orange-300 focus:outline-none"
            onClick={(e) => {
              if(window.confirm('Are you sure to clear the board?')) clearBoard();
              e.target.blur();
            }}
          >Clear Grid</button>
        </div>
        <div id="sheet" className="mt-3 border-8 border-white bg-green-200 p-4 px-6 w-full relative overflow-hidden" style={{outline: '1px solid'}}>
          
          <img 
            className="z-10 absolute" 
            src={FingerPrintImage}
            alt="finger-print"
            style={{
              transform: 'rotate(30deg)', 
              opacity: '8%',
              top: '10%',
              left: '5%'
            }}
            width="100%" height="100%"
          />

          <ContentBox
            name="suspects" 
            labels={suspectNames} 
            selectedTile={selectedTile} 
            setSelectedTile={setSelectedTile}
            grid={suspectGrid}
            playerNames={playerNames}
          />

          <ContentBox
            name="weapons" 
            labels={weaponNames} 
            selectedTile={selectedTile} 
            setSelectedTile={setSelectedTile}
            grid={weaponGrid}
          />

          <ContentBox
            name="rooms" 
            labels={roomNames} 
            selectedTile={selectedTile} 
            setSelectedTile={setSelectedTile}
            grid={roomGrid}
          />
        </div>
      </div>
      <ActionMenu
        selectedTile={selectedTile} 
        setSelectedTile={setSelectedTile}
        checkGrid={checkGrid} 
        handleTileChange={handleTileChange}
      />
      <div className="text-center my-4">© 2020 Brant Messenger</div>
    </div>
  );
}

export default App;
