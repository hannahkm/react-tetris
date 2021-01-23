export const TETROMINOS = {
    0: {shape: [[0]], color: '0, 0, 0', empt: [0], name: '0'}, //empty (invisible) tetromino
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '80, 227, 230',
        empt: [0, 1, 0, 0],
        name: 'I',
    },
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],
        color: '36, 95, 223',
        empt: [1, 1, 0],
        name: 'J',
    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L'],
        ],
        color: '223, 173, 36',
        empt: [0, 1, 1],
        name: 'L',
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O']
        ],
        color: '223, 217, 36',
        empt: [1, 1],
        name: 'O',
    }, 
    S: {
        shape: [
            [0, 0, 0],
            [0, 'S', 'S'],
            ['S', 'S', 0],
        ],
        color: '48, 211, 56',
        empt: [1, 1, 1],
        name: 'S',
    }, 
    T: {
        shape: [
            [0, 0, 0],
            [0, 'T', 0],
            ['T', 'T', 'T'],
        ],
        color: '132, 61, 198',
        empt: [1, 1, 1],
        name: 'T',
    }, 
    Z: {
        shape: [
            [0, 0, 0],
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
        ],
        color: '227, 78, 78',
        empt: [1, 1, 1],
        name: 'Z',
    },
}

export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino = tetrominos[Math.floor(Math.random()*tetrominos.length)];
    return TETROMINOS[randTetromino];
}