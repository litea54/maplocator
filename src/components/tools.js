const viewableValues = {
  1: 'T1',
  2: ' ',
  3: 'T3',
  9: 'C',
  5: 'In',
};

const addRow = (array, rindex) => {
    array.splice(rindex, 0, array[rindex].slice());
    // array[rindex].fill({"f":0}); //, 1, array[rindex].length - 1);
    return array.length;
};

const addColumn = (array, rindex, cindex) => {
    array.forEach((row, index) => {
        let elem = {"f":0};
        // if (index === 0 || index === array.length - 1) { elem = {"f":0}; }
        row.splice(cindex, 0, elem);
    });
    return array[rindex].length;
};

const findCellsToMark = (baseArray, findArray) => {
    const resultArray = [];
    let cells;
    const emptyChars = ['', '9', 0];

    for (let r = 0; r < baseArray.length - findArray.length + 1; r += 1) {
        for (let c = 0; c < baseArray[r].length - findArray[0].length + 1; c += 1) {
            let isFind = true;
            cells = [];

            for (let i = 1; i < findArray.length - 1 && isFind; i += 1) {
                for (let j = 1; j < findArray[i].length - 1 && isFind; j += 1) {
                    if (findArray[i][j].f !== 0 && baseArray[r + i][c + j].f === 0) { isFind = false; }
                    if ((  (emptyChars.includes(findArray[i - 1][j].f)
                            && !emptyChars.includes(baseArray[r + i - 1][c + j].f))
                        || (emptyChars.includes(findArray[i + 1][j].f)
                            && !emptyChars.includes(baseArray[r + i + 1][c + j].f))
                        || (emptyChars.includes(findArray[i][j - 1].f)
                            && !emptyChars.includes(baseArray[r + i][c + j - 1].f))
                        || (emptyChars.includes(findArray[i][j + 1].f)
                            && !emptyChars.includes(baseArray[r + i][c + j + 1].f))
                    ) && findArray[i][j].f in viewableValues) { isFind = false; }

                    if (findArray[i][j].f !== 0 && baseArray[r + i][c + j].f !== 0) {
                        cells.push({ rindex: r + i, cindex: c + j });
                    }
                }
            }

            if (isFind) {
                cells.forEach((cell) => {
                if (resultArray.findIndex((element) => (
                    element.rindex === cell.rindex && element.cindex === cell.cindex
                )) === -1) {
                    resultArray.push(cell);
                }
                });
            }
        }
    }

    return resultArray;
};

module.exports = {
    viewableValues,
    addRow,
    addColumn,
    findCellsToMark,
}