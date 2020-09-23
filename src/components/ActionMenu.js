import React from 'react';

function ActionMenu(props) {
    const {selectedTile, checkGrid, handleTileChange, setSelectedTile} = props;

    const menuStyle = {
      backgroundColor: 'rgba(39,103,73, 0.7)',
      bottom: '-300px',
      transition: 'transform 0.3s ease-in-out',
      transform: selectedTile ? 'translateY(-300px)' : ''
    };

    return(
        <div className="z-50 fixed text-center w-full h-64 lg:h-48" style={menuStyle}>
          <div className="max-w-screen-sm mx-auto h-full my-3 p-2">
            <div className="flex justify-around flex-col md:flex-row gap-2 ">
              <button 
                className={`rounded text-2xl text-purple-900 w-full py-1 bg-purple-200 border-2 border-purple-400 focus:bg-purple-300 focus:outline-none ${(!selectedTile || checkGrid()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  handleTileChange('✓');
                }}
                disabled={selectedTile ? checkGrid() : false}
              >Have It</button>
              <button className={`rounded text-2xl text-red-900 w-full py-1 bg-red-400 border-2 border-red-600 focus:bg-red-500 focus:outline-none ${!selectedTile ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleTileChange('X')}>Don't Have It</button>
              <button className={`rounded text-2xl text-orange-900 w-full py-1 bg-orange-400 border-2 border-orange-600 focus:bg-orange-500 focus:outline-none ${!selectedTile ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleTileChange()}>Clear Space</button>
            </div>
            <button className="rounded text-2xl w-full mt-4 py-1 bg-blue-400 border-2 border-blue-600 focus:bg-blue-500 focus:outline-none text-white" onClick={() => setSelectedTile(null)}>Close</button>
          </div>
        </div>
    );
}

export default ActionMenu;