import React, {useState, useEffect} from 'react';
import ContentBox from './components/ContentBox';
import ActionMenu from './components/ActionMenu';
import OverlayMenu from './components/OverlayMenu';

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

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [amountOfPlayers, setPlayerAmount] = useState(6);
  const [newListOfPlayers, setNewPlayersList] = useState(['You']);

  const [selectedTile, setSelectedTile] = useState(null);
  const [suspectGrid, setSuspectGrid] = useState(Array.from({length: 6},()=> Array.from({length: amountOfPlayers}, () => "")));
  const [weaponGrid, setWeaponGrid] = useState(Array.from({length: 6},()=> Array.from({length: amountOfPlayers}, () => "")));
  const [roomGrid, setRoomGrid] = useState(Array.from({length: 9},()=> Array.from({length: amountOfPlayers}, () => "")));

  const [playerNames, setPlayerNames] = useState([]);

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

  const handleNewGameSubmit = () => {
    if(newListOfPlayers.every(name => name.trim() !== '')) {

    } else alert('Missing Names. Please fix and submit the names.');
  }

  const clearBoard = () => {
    setSuspectGrid(Array.from({length: 6},()=> Array.from({length: playerNames.length}, () => "")));
    setWeaponGrid(Array.from({length: 6},()=> Array.from({length: playerNames.length}, () => "")));
    setRoomGrid(Array.from({length: 9},()=> Array.from({length: playerNames.length}, () => "")));
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
    if(!isPlaying) {
      
    }
  }, [isPlaying, newListOfPlayers]);

  return (
    <div>
      <OverlayMenu
        isPlaying={isPlaying}
        amountOfPlayers={amountOfPlayers}
        newListOfPlayers={newListOfPlayers}
        handleNewGameSubmit={handleNewGameSubmit}
        setIsPlaying={setIsPlaying}
        setPlayerAmount={setPlayerAmount}
        setNewPlayersList={setNewPlayersList}
      />
      <div className="mx-auto max-w-screen-sm w-full px-2 relative my-2">
        <div id="sheet" className="border-8 border-white bg-green-200 p-4 px-6 w-full relative" style={{outline: '1px solid'}}>
          <ContentBox
            name="suspects" 
            labels={suspectNames} 
            selectedTile={selectedTile} 
            setSelectedTile={setSelectedTile}
            grid={suspectGrid}
            players={['You', 'Trey', 'Jon', 'Adrean', 'Jaclyn','Mikel']}
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
    </div>
  );
}

export default App;
