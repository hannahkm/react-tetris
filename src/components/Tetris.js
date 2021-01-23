import React, {useState} from 'react';
import {createStage, checkCollision} from '../gameHelpers';
import {TETROMINOS} from '../tetrominos';
import {STAGE_HEIGHT } from '../gameHelpers';

//Components
import Stage from './Stage';
import Display from './Display';
import Hold from './Hold';
import StartButton from './StartButton';

//Styled Components
import {StyledTetrisWrapper, StyledTetris} from './styles/StyledTetris';

//Custon Hooks
import {useInterval} from '../hooks/useInterval';
import {usePlayer} from '../hooks/usePlayer';
import {useGhost} from '../hooks/useGhost';
import {useStage} from '../hooks/useStage';
import {useGameStatus} from '../hooks/useGameStatus';
import {useHold} from '../hooks/useHold';

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [holding, setHolding] = useState({
        tetromino: TETROMINOS[0].shape,
    });

    const [player, updatePlayerPos, resetPlayer, playerRotate, swapPlayer] = usePlayer();
    const [ghost, updateGhostPos, resetGhost, ghostRotate] = useGhost(player);
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, ghost, resetGhost);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
    const [hold, setHold] = useHold(holding);
 
    const movePlayer = dir => {
        if (!checkCollision(player, stage, {x: dir, y: 0})){
            updatePlayerPos({x: dir, y: 0});
            // let ghostY = 0;
            // while(checkCollision(ghost, stage, {x: dir, y: ghostY})){
            //     ghostY -= 1;
            // }
            // updateGhostPos({x: dir, y: ghostY});
        }
        
    }

    const startGame = () => {
        //Reset game here
        setStage(createStage());
        setDropTime(800); 
        resetPlayer();
        setHolding({
            tetromino: TETROMINOS[0].shape
        });
        resetGhost(player);
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }

    const drop = () => {
        //Calculate level and increase every 10 rows
        if (rows > (level + 1) * 10){
            setLevel(prev => prev + 1);
            setDropTime(1000/(level+1)+100);
        }
        if(!checkCollision(player, stage, {x: 0, y: 1})){
            updatePlayerPos({x: 0, y: 1, collided: false});
        } else{
            //if Game Over:
            if (player.pos.y < 1){
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({x: 0, y:0, collided: true});
        }
    }

    const keyUp = ({keyCode}) => {
        if (!gameOver){
            if (keyCode === 40){
                setDropTime(1000/(level+1)+200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const instantDrop = event => {
        let dropInterval = 1;
        while (!checkCollision(player, stage, {x: 0, y: dropInterval})){
            dropInterval += 1;
        }
        updatePlayerPos({x: 0, y: dropInterval-1, collided: true});

    }

    const holdPiece = () => {
        if (holding.tetromino.length === 1){
            setHolding(player);
            resetPlayer();
        } else {
            const temp = holding;
            setHolding(player);
            swapPlayer(temp);
        }
        let h = STAGE_HEIGHT-ghost.tetromino.length;
        while (checkCollision(ghost, stage, {x: 0, y: h})){
            h -= 1;
        }
        resetGhost(player, h);

    }

    const move = ({keyCode}) => {
        if (!gameOver){
            if (keyCode === 37){ //left arrow
                movePlayer(-1);
            } else if (keyCode === 39){ //right arrow
                movePlayer(1);
            } else if (keyCode === 40){ //down arrow
                dropPlayer();
            } else if (keyCode === 38) { //up arrow
                playerRotate(stage, 1);
                if (!checkCollision(ghost, stage, {x: 0, y: 1})){
                    ghost.pos.y += 1;
                }
            } else if (keyCode === 32){ //space button
                instantDrop();
            } else if (keyCode === 67){ //c button
                holdPiece();
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime)

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
                <aside> 
                    <div>
                        <Hold tetromino={hold} text="Hold"/>
                    </div>
                </aside>
                <Stage stage={stage}/>
                <aside> 
                    {gameOver ? (
                        <Display gameOver = {gameOver} text="Game Over" />
                    ) : (
                        <div>
                            <Display text={`Score: ${score}`}/>
                            <Display text={`Rows: ${rows}`}/>
                            <Display text={`Level: ${level}`}/>
                        </div>
                    )}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;