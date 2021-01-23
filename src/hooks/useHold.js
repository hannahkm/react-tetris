import {useState, useEffect, useCallback} from 'react';
import {createHold} from '../gameHelpers';
import {TETROMINOS} from '../tetrominos';


export const useHold = (player) => {
    console.log(player);
    const[hold, setHold] = useState(createHold(player.tetromino.length, player.tetromino.length));

    useEffect(() => {
        const updateHold = () => {
            //Clear hold - reset and rebuild
            const newHold = Array(player.tetromino.length).fill(0).map(row => new Array(player.tetromino.length).fill([0, 'clear']))
            // const newHold = prevHold.map(row => 
            //     row.map(cell => (cell[1] === [0, 'clear']))
            // );

            //Draw tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0){
                        newHold[y][x] = [value, 'clear']; 
                    }
                });
            });

            return newHold;
        };

        setHold(prev => updateHold(prev))
    }, [player]);

    return [hold, setHold]; 
}