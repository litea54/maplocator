import React from 'react';
import { Box } from '@material-ui/core';
import MapTable from './MapTable';
import DialogBox from './DialogBox';

const rows = [
  ['9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9'],
  ['9', '', '', 'T', '1', '1', '1', '', '1', '1', '1', '', '', 'C', '', '', '1', '1', '1', '', '1', '1', '1', 'T', '', '', '9'],
  ['9', '', '', '', '1', '', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '', '1', '', '', '', '9'],
  ['9', 'T', '', '', '1', '', '1', '', '1', '', '1', '', '', '1', '', '', '1', '', '1', '', '1', '', '1', '', '', 'T', '9'],
  ['9', '1', '1', '1', '1', '', '1', '', '1', '', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '1', '', '1', '1', '1', '1', '9'],
  ['9', '1', '', '', '', '', '1', '', '1', '', '', '', '', '1', '', '', '', '', '1', '', '1', '', '', '', '', '1', '9'],
  ['9', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '9'],
  ['9', '', '1', '', '', '', '', '', '', '', '', '', '1', '', '1', '', '', '', '', '', '', '', '', '', '1', '', '9'],
  ['9', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '9'],
  ['9', '1', '', '', '', '', '1', '', '1', '', '', '', '', '1', '', '', '', '', '1', '', '1', '', '', '', '', '1', '9'],
  ['9', '1', '1', '1', '1', '', '1', '', '1', '', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '1', '', '1', '1', '1', '1', '9'],
  ['9', '', '1', '', '1', '', '1', '', '1', '', '1', '', '', '1', '', '', '1', '', '1', '', '1', '', '1', '', '1', '', '9'],
  ['9', '', '1', '', '1', '', '1', '1', '1', '', '1', '', '', '1', '', '', '1', '', '1', '1', '1', '', '1', '', '1', '', '9'],
  ['9', 'C', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', 'C', '9'],
  ['9', '', '1', '', '1', '', '1', '1', '1', '', '1', '', '', '1', '', '', '1', '', '1', '1', '1', '', '1', '', '1', '', '9'],
  ['9', '', '1', '', '1', '', '1', '', '1', '', '1', '', '', '1', '', '', '1', '', '1', '', '1', '', '1', '', '1', '', '9'],
  ['9', '1', '1', '1', '1', '', '1', '', '1', '', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '1', '', '1', '1', '1', '1', '9'],
  ['9', '1', '', '', '', '', '1', '', '1', '', '', '', '', '1', '', '', '', '', '1', '', '1', '', '', '', '', '1', '9'],
  ['9', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '9'],
  ['9', '', '1', '', '', '', '', '', '', '', '', '', '1', '', '1', '', '', '', '', '', '', '', '', '', '1', '', '9'],
  ['9', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '9'],
  ['9', '1', '', '', '', '', '1', '', '1', '', '', '', '', '1', '', '', '', '', '1', '', '1', '', '', '', '', '1', '9'],
  ['9', '1', '1', '1', '1', '', '1', '', '1', '', '1', '1', '1', '1', '1', '1', '1', '', '1', '', '1', '', '1', '1', '1', '1', '9'],
  ['9', 'T', '', '', '1', '', '1', '', '1', '', '1', '', '', '1', '', '', '1', '', '1', '', '1', '', '1', '', '', 'T', '9'],
  ['9', '', '', '', '1', '', '1', '1', '1', '', '1', '1', '1', '1', '1', '1', '1', '', '1', '1', '1', '', '1', '', '', '', '9'],
  ['9', '', '', 'T', '1', '1', '1', '', '1', '1', '1', '', '', 'C', '', '', '1', '1', '1', '', '1', '1', '1', 'T', '', '', '9'],
  ['9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9'],
];

const rows1 = [
  ['9', '9', '9'],
  ['9', '?', '9'],
  ['9', '9', '9'],
];

const addRow = (array, rindex) => {
  array.splice(rindex, 0, array[rindex].slice());
  array[rindex].fill('', 1, array[rindex].length - 1);
  return array.length;
};

const addColumn = (array, rindex, cindex) => {
  array.forEach((row, index) => {
    let elem = '';
    if (index === 0 || index === array.length - 1) { elem = '9'; }
    row.splice(cindex, 0, elem);
  });
  return array[rindex].length;
};

const findCellsToMark = (baseArray, findArray) => {
  const resultArray = [];
  const emptyChars = ['', '9'];

  for (let r = 0; r < baseArray.length - findArray.length + 1; r += 1) {
    for (let c = 0; c < baseArray[r].length - findArray[0].length + 1; c += 1) {
      let isFind = true;
      let cells = [];

      for (let i = 0; i < findArray.length - 2 && isFind; i += 1) {
        for (let j = 0; j < findArray[i].length - 2 && isFind; j += 1) {
          if (findArray[i + 1][j + 1] !== '' && baseArray[r + i + 1][c + j + 1] === '') { isFind = false; }
          if (( (emptyChars.includes(findArray[i][j + 1])
                &&
                !emptyChars.includes(baseArray[r + i][c + j + 1]))
             || (emptyChars.includes(findArray[i + 2][j + 1])
                &&
                !emptyChars.includes(baseArray[r + i + 2][c + j + 1]))
             || (emptyChars.includes(findArray[i + 1][j])
                &&
                !emptyChars.includes(baseArray[r + i + 1][c + j]))
             || (emptyChars.includes(findArray[i + 1][j + 2])
                &&
                !emptyChars.includes(baseArray[r + i + 1][c + j + 2]))
          ) && findArray[i + 1][j + 1] === '1') { isFind = false; }

          if (findArray[i + 1][j + 1] !== '' && baseArray[r + i + 1][c + j + 1] !== '') {
            cells.push({ rindex: r + i + 1, cindex: c + j + 1 });
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmedData: rows,
      rawData: rows1,
      isDialogOpen: false,
      availableDirs: '',
      position: {},
      markedCells: [],
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.doOpenDialog = this.doOpenDialog.bind(this);
    this.submitDialog = this.submitDialog.bind(this);
  }

  doOpenDialog(pos) {
    this.setState((state) => {
      const { rawData, isDialogOpen } = state;
      let dirs = '';

      if (!isDialogOpen) {
        if (rawData[pos.rindex - 1][pos.cindex] === '1') { dirs += 'u'; }
        if (rawData[pos.rindex][pos.cindex - 1] === '1') { dirs += 'l'; }
        if (rawData[pos.rindex][pos.cindex + 1] === '1') { dirs += 'r'; }
        if (rawData[pos.rindex + 1][pos.cindex] === '1') { dirs += 'd'; }
      }

      return {
        isDialogOpen: true,
        position: pos,
        availableDirs: dirs,
      };
    });
  }

  toggleDialog() {
    this.setState((state) => ({
      isDialogOpen: !(state.isDialogOpen),
    }));
  }

  submitDialog(value) {
    // change rawData
    this.setState((state) => {
      let { position } = state;
      const { availableDirs } = state;
      const rawData = state.rawData.slice();

      if (!availableDirs.includes('u') && value.includes('u')) {
        if (position.rindex === 1) {
          addRow(rawData, 1);
          position.rindex = 2;
        }
        rawData[position.rindex - 1][position.cindex] = '?';
      }
      if (!availableDirs.includes('d') && value.includes('d')) {
        if (position.rindex === rawData.length - 2) {
          addRow(rawData, rawData.length - 1);
        }
        rawData[position.rindex + 1][position.cindex] = '?';
      }
      if (!availableDirs.includes('l') && value.includes('l')) {
        if (position.cindex === 1) {
          addColumn(rawData, position.rindex, 1);
          position.cindex = 2;
        }
        rawData[position.rindex][position.cindex - 1] = '?';
      }
      if (!availableDirs.includes('r') && value.includes('r')) {
        if (position.cindex === rawData[position.rindex].length - 2) {
          addColumn(rawData, position.rindex, rawData[position.rindex].length - 1);
        }
        rawData[position.rindex][position.cindex + 1] = '?';
      }

      // confirm choosed directions
      rawData[position.rindex][position.cindex] = '1';

      return {
        rawData,
        position,
        isDialogOpen: false,
        markedCells: findCellsToMark(rows, rawData),
      };
    });
  }

  render() {
    const {
      confirmedData, rawData, isDialogOpen, availableDirs, markedCells,
    } = this.state;

    return (
      <Box display="flex" flexWrap="wrap" width="100%">
        <Box display="flex" flexGrow={1} flexShrink={0} alignItems="center">
          <MapTable data={rawData} onClick={this.doOpenDialog} />
          <DialogBox
            open={isDialogOpen}
            onSubmit={this.submitDialog}
            onClose={this.toggleDialog}
            dirs={availableDirs}
          />
        </Box>
        <Box m={1} flexShrink={0}>
          <MapTable
            data={confirmedData}
            markedCells={markedCells}
          />
        </Box>
      </Box>
    );
  }
}
