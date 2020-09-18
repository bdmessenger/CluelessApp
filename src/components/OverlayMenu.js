import React from 'react'

function OverlayMenu(props) {
    const {
        isPlaying, 
        amountOfPlayers, 
        newListOfPlayers, 
        handleNewGameSubmit,
        setPlaying,
        setPlayerAmount,
        setNewPlayerList
    } = props;

    

    return(
    <div id="overlay-menu" className={`z-50 w-full h-screen top-0 ${isPlaying ? 'hidden' : 'fixed'}`} style={{backgroundColor: 'rgba(134,173,146, 0.7)'}}>
        <div className="max-w-screen-sm mx-auto h-screen flex justify-center items-center px-2">
          <div className="w-full text-center bg-gray-400 rounded border border-black p-4">
            <span>New Game</span>
            <div className="text-base md:text-2xl">
              <div>
                <span className="">How many players (including you)?</span>
                <div className="flex gap-2 mt-2">
                  <button 
                    className={`text-base md:text-xl border-2 border-purple-400 focus:outline-none ${amountOfPlayers === 3 ? 'bg-purple-400 text-white' : ''}`}
                    disabled={amountOfPlayers === 3}
                    onClick={() => setPlayerAmount(3)}
                  >Three</button>
                  <button 
                    className={`text-base md:text-xl border-2 border-purple-400 focus:outline-none ${amountOfPlayers === 4 ? 'bg-purple-400 text-white' : ''}`}
                    disabled={amountOfPlayers === 4}
                    onClick={() => setPlayerAmount(4)}
                  >Four</button>
                  <button 
                    className={`text-base md:text-xl border-2 border-purple-400 focus:outline-none ${amountOfPlayers === 5 ? 'bg-purple-400 text-white' : ''}`}
                    disabled={amountOfPlayers === 5}
                    onClick={() => setPlayerAmount(5)}
                  >Five</button>
                  <button 
                    className={`text-base md:text-xl border-2 border-purple-400 focus:outline-none ${amountOfPlayers === 6 ? 'bg-purple-400 text-white' : ''}`}
                    disabled={amountOfPlayers === 6}
                    onClick={() => setPlayerAmount(6)}
                  >Six</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                {
                  amountOfPlayers > 0 && Array.from({length: amountOfPlayers - 1}, () => null).map((value, i) => 
                    <div key={i} className="w-full">
                      <div className="w-full">Opponent #{i + 1} Initials</div>
                      <input
                        type="text" 
                        maxLength={3} 
                        value={newListOfPlayers[i + 1] || ''}
                        required={true} 
                        className="text-center w-full px-2 outline-none border-2 border-gray-600 focus:border-blue-400"
                        onChange={(e) => {
                          const copyArray = [...newListOfPlayers];
                          copyArray[i + 1] = e.target.value;
                          setNewPlayerList(copyArray);
                        }}
                      />
                    </div>
                  )
                }
              </div>
            </div>
            <div className="flex flex-col md:flex-row mt-4 gap-2">
              <button className="bg-orange-200 border-2 border-orange-400" onClick={() => setPlaying(true)}>Cancel</button>
              <button className="bg-green-200 border-2 border-green-400" onClick={handleNewGameSubmit}>Confirm</button>
            </div>
          </div>
        </div>
    </div>
    );
}

export default OverlayMenu;