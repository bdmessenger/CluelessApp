import React from 'react'


function ContentBox(props) {
    const {name, labels, selectedTile, setSelectedTile, grid, playerNames} = props;

    const clueIndex = grid.findIndex(row => row.every(value => value === 'X'));
    const checkMarksLength = grid.filter(row => row.includes('✓')).length;
    const notCheckedIndex = grid.length - checkMarksLength === 1 ? grid.findIndex(row => !row.includes('✓')) : -1;

    return(
        <div id={name} className="select-none mb-4 md:mb-8 text-green-900 relative">
            <label className="z-40 text-3xl md:text-5xl underline capitalize">{name}</label>
            <div id="content" className="mt-2 relative">
            {
                playerNames &&
                <div className="absolute flex w-2/4 text-center mobile-name-labels md:name-labels">
                {
                    playerNames.map((name, i) => <div key={i} className="z-40 w-full md:text-lg">{name}</div>)
                }
                </div>
            }
            {
                labels.map((item, i) =>
                <div key={i} id={`${name}${i + 1}`} className="flex h-6 md:h-12">
                    <span className={`z-40 w-2/4 inline-block align-text-top text-lg md:text-3xl ${(clueIndex >= 0 || notCheckedIndex >= 0) ? ( (clueIndex === i || notCheckedIndex === i) ? 'text-red-600' : 'line-through') : ''}`}>{item}</span>
                    <div className="flex w-2/4 ">
                    {
                        grid[i].map((value, t) =>
                            <div 
                                key={t} 
                                className={`z-40 cursor-pointer select-none z-40 text-center w-full border border-green-600 text-base md:text-3xl ${selectedTile === name + i + '' + t ? 'bg-green-700 text-white' : 'bg-green-100'}`} 
                                style={{outline: '1px solid #38a169'}}
                                onClick={() => {
                                    if(!selectedTile) setSelectedTile(name + i + '' + t);
                                }}
                            >{value}</div>
                        )
                    }
                    </div>
                </div>)
            }
            </div>
        </div>
    );
}

export default ContentBox