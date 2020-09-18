import React from 'react';

function ActionMenu(props) {
    const {currentTile, checkRowForMark, handleTileChange, setCurrentTile} = props;

    return(
        <div className={`z-50 fixed text-center w-full h-64 md:h-48 action-menu ${currentTile ? 'menu-show' : ''}`}>
          <div className="max-w-screen-sm mx-auto h-full my-3 p-2">
            <div className="flex justify-around flex-col md:flex-row gap-2 ">
              <button 
                className={`rounded text-2xl w-full py-1 bg-purple-200 active:bg-purple-300 outline-none ${(currentTile && checkRowForMark()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  handleTileChange('✓');
                }}
                disabled={currentTile ? checkRowForMark() : false}
              >Have It</button>
              <button className="rounded text-2xl w-full py-1 bg-red-400 active:bg-blue-500 outline-none" onClick={() => handleTileChange('X')}>Don't Have It</button>
              <button className="rounded text-2xl w-full py-1 bg-orange-400 active:bg-blue-500 outline-none" onClick={() => handleTileChange(null)}>Clear Space</button>
            </div>
            <button className="rounded text-2xl w-full py-1 bg-blue-400 active:bg-blue-500 outline-none text-white" onClick={() => setCurrentTile(null)}>Close</button>
          </div>
        </div>
    );
}

export default ActionMenu;