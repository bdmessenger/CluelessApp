import React, {useState, useEffect} from 'react'

function OverlayMenu(props) {
    const {
        playerNames,
        handleNewGameSubmit,
        setIsPlaying,
    } = props;

    const [newListOfPlayers, setNewPlayersList] = useState(playerNames);
    const [amountOfPlayers, setPlayerAmount] = useState(playerNames.length);

    useEffect(() => {
      setNewPlayersList(state => {
        if(state.length > amountOfPlayers) {
          return state.slice(0, amountOfPlayers);
        }
        if(state.length < amountOfPlayers) return state.concat(Array.from({length: amountOfPlayers - state.length}, () => ""));

        return state;
      });
    }, [amountOfPlayers]);

    return(
    <div id="overlay-menu" className='z-50 w-full h-screen top-0 fixed' style={{backgroundColor: 'rgba(134,173,146, 0.7)'}}>
        <div className="max-w-screen-sm mx-auto h-screen flex justify-center items-center px-2">
          <div className="w-full text-center bg-gray-400 rounded border border-black p-4">
            <span>New Game</span>
            <div className="text-base md:text-2xl">
              <div>
                <span className="">How many players (including you)?</span>
                <div className="flex gap-2 mt-2 justify-center">
                  <button 
                    className={`text-base rounded px-2 md:text-xl border-2 border-purple-400 focus:outline-none ${amountOfPlayers === 3 ? 'bg-purple-400 text-white' : ''}`}
                    disabled={amountOfPlayers === 3}
                    onClick={() => setPlayerAmount(3)}
                  >Three</button>
                  <button 
                    className={`text-base rounded px-2 md:text-xl border-2 border-purple-400 focus:outline-none ${amountOfPlayers === 4 ? 'bg-purple-400 text-white' : ''}`}
                    disabled={amountOfPlayers === 4}
                    onClick={() => setPlayerAmount(4)}
                  >Four</button>
                  <button 
                    className={`text-base rounded px-2 md:text-xl border-2 border-purple-400 focus:outline-none ${amountOfPlayers === 5 ? 'bg-purple-400 text-white' : ''}`}
                    disabled={amountOfPlayers === 5}
                    onClick={() => setPlayerAmount(5)}
                  >Five</button>
                  <button 
                    className={`text-base rounded px-2 md:text-xl border-2 border-purple-400 focus:outline-none ${amountOfPlayers === 6 ? 'bg-purple-400 text-white' : ''}`}
                    disabled={amountOfPlayers === 6}
                    onClick={() => setPlayerAmount(6)}
                  >Six</button>
                </div>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-2 gap-4 mt-4 w-full">
                {
                  amountOfPlayers > 0 && Array.from({length: amountOfPlayers - 1}, () => null).map((value, i) => 
                    <div key={i} className="w-full mx-auto">
                      <div className="w-full border-b pb-1 border-gray-500">Opponent #{i + 1}</div>
                      <input
                        type="text" 
                        maxLength={6} 
                        value={newListOfPlayers[i + 1] || ''}
                        required={true} 
                        className="text-center mt-1 w-full px-1 outline-none border-2 border-gray-600 focus:border-blue-400"
                        onChange={(e) => {
                          if(e.target.value.length <= 6) {
                            const copyArray = [...newListOfPlayers];
                            copyArray[i + 1] = e.target.value;
                            setNewPlayersList(copyArray); 
                          }
                        }}
                      />
                    </div>
                  )
                }
              </div>
              <div className="text-xs my-4 text-gray-700 opacity-50">*Max Characters: 6*</div>
            </div>
            <div className="flex flex-col md:flex-row mt-4 gap-2 justify-center">
              <button 
                className="bg-orange-200 text-orange-700 w-full py-1 border-2 border-orange-400 focus:outline-none focus:bg-orange-400" 
                onClick={(e) => {setIsPlaying(true); e.target.blur();}}
              >Cancel</button>
              <button 
                className="bg-green-200 text-green-700 w-full py-1 border-2 border-green-400 focus:outline-none focus:bg-green-400" 
                onClick={(e) => {handleNewGameSubmit(newListOfPlayers); e.target.blur();}}
              >Confirm</button>
            </div>
          </div>
        </div>
    </div>
    );
}

export default OverlayMenu;