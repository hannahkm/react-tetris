import styled from 'styled-components';

export const StyledStage2 = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(6vw/${props => props.width})
    );
    grid-template-columns: repeat(
        ${props => props.width}, calc(6vw/${props => props.width})
    );
    grid-gap: 1px;
    border: 0px;
    padding: 30px 0 0 0 ;
    width: 100%;
    max-width: 20vw;
    background: #111;
`