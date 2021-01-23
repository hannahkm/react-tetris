import React from 'react';
import {StyledHold} from './styles/StyledHold';
import {StyledStage2} from './styles/StyledStage2';
import Cell from './Cell';

const Hold = ({tetromino, text}) => (
    <StyledHold> 
        <div>{text}</div>
        <StyledStage2 width={tetromino.length} height={tetromino.length}>
            {tetromino.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/>))}
        </StyledStage2>
    </StyledHold>
)

export default Hold;