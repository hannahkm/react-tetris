import {useState, useEffect} from 'react';
import {createStage} from '../gameHelpers';
import {checkCollision, STAGE_HEIGHT, STAGE_WIDTH } from '../gameHelpers';
import {TETROMINOS} from '../tetrominos';

export const useStage = (player, resetPlayer) => {
    const[stage, setStage] = useState(createStage());
    const[rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage => 
            newStage.reduce((acc, row) => {
                //If the row contains no zeroes
                if (row.findIndex(cell => cell[0]===0) === -1){
                    setRowsCleared(prev => prev + 1);
                    acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return acc;
                }
                acc.push(row);
                return acc;
            }, [])

        const updateStage = prevStage => {
            //Flush stage - reset and rebuild
            const newStage = prevStage.map(row => 
                row.map(cell => ((cell[1] === 'clear' || cell[1] === 'ghost') ? [0, 'clear'] : cell))
            );

            //Draw ghost
            let h = STAGE_HEIGHT-player.tetromino.length;
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0){
                        while (newStage[h+y][x+player.pos.x][1] !== 'clear'){
                            h-=1;
                        }
                    }
                });
            });

            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0){
                        newStage[h+y][x + player.pos.x] = [
                            value,
                            'clear',
                        ]; 
                    }
                });
            });

            //Draw tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0){
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged': 'clear'}`,
                        ]; 
                    }
                });
            });

            //Check for collisions
            if (player.collided){
                resetPlayer();
                return sweepRows(newStage);
            }

            return newStage;
        };

        setStage(prev => updateStage(prev))
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared]; 
}