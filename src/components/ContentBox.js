import React from 'react'


function ContentBox(props) {
    const {name, items, currentTile, setCurrentTile, tiles, players} = props;

    const clueIndex = tiles.findIndex(row => row.every(value => value === 'X'));
    const checkMarksLength = tiles.filter(row => row.includes('✓')).length;
    const notCheckedIndex = tiles.length - checkMarksLength === 1 ? tiles.findIndex(row => !row.includes('✓')) : -1;

    return(
        <div id={name} className="select-none mb-4 md:mb-8 text-green-900 relative">
            <label className="text-3xl md:text-5xl underline capitalize">{name}</label>
            <div id="content" className="mt-2">
            {
                players &&
                <div className="absolute flex w-2/4 text-center" style={{top: '50px', right: '0'}}>
                {
                    players.map((name, i) => <div key={i} className="w-full text-xs md:text-lg">{name}</div>)
                }
                </div>
            }
            {
                items.map((item, i) =>
                <div key={i} id={`${name}${i + 1}`} className="flex h-6 md:h-12">
                    <span className={`w-2/4 inline-block align-text-top text-lg md:text-3xl ${(clueIndex >= 0 || notCheckedIndex >= 0) ? ( (clueIndex === i || notCheckedIndex === i) ? 'text-red-600' : 'line-through') : ''}`}>{item}</span>
                    <div className="flex w-2/4">
                    {
                        tiles[i].map((value, t) =>
                            <div 
                                key={t} 
                                className={`cursor-pointer select-none z-40 text-center w-full border border-green-600 text-base md:text-3xl ${currentTile === name + i + '' + t ? 'bg-green-700 text-white' : 'bg-green-100'}`} 
                                style={{outline: '1px solid #38a169'}}
                                onClick={() => {
                                    if(!currentTile) setCurrentTile(name + i + '' + t);
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