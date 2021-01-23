import {useState, useEffect} from 'react';
import {TETROMINOS} from '../tetrominos';
import { checkCollision, STAGE_HEIGHT } from '../gameHelpers';


export const useGhost = (player) => {
    const [ghost, setGhost] = useState({
        pos: {x: 0, y: STAGE_HEIGHT-player.tetromino.length},
        tetromino: player.tetromino,
        collided: false,
    });

    const rotate = (matrix, dir) => {
        // just transpose the matrix ig
        const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]),);

        //reverse rows to get rotated matrix
        if (dir > 0) {
            return rotatedTetro.map(row => row.reverse());
        } else{
            return rotatedTetro.reverse();
        }
    }

    const ghostRotate = (stage, dir) => {
        let yVal = 0;
        while (!checkCollision(ghost, stage, {x: 0, y: yVal})){
            yVal += 1;
        }
        ghost.pos.y += yVal;

        console.log("made it out");

        setGhost(ghost);

    }

    const updateGhostPos = ({x, y, collided}) => {
        // let h = 0;
        // while (checkCollision(ghost, stage, {x: 0, y: 0})){
        //     h -= 1;
        // }
        setGhost(prev => ({
            ...prev,
            pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }))
    }

    const resetGhost = (player) =>{
        console.log(player.tetromino);
        setGhost({
            pos: {x: player.pos.x, y: STAGE_HEIGHT-player.tetromino.length},
            tetromino: player.tetromino,
            collided: player.pos.collided,
        })
    }

    return [ghost, updateGhostPos, resetGhost, ghostRotate]; 
}