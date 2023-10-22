import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { Undo, Redo } from '@mui/icons-material';
import MapTable from './MapTable';
import DialogBox from './DialogBox';
import { addRow, addColumn, findCellsToMark } from '../components/tools';
// import saved_map from '../maps/cryptNew.json'
// import saved_map from '../maps/sewerage.json'
// import saved_map from '../maps/dwarfsDungeon_1.json'
import saved_map from '../maps/guildDungeon.json'

// const rows = saved_map;

const rows = [
  [{"f":0}, {"f":0}, {"f":0}],
  [{"f":0}, {"f":"?"}, {"f":0}],
  [{"f":0}, {"f":0}, {"f":0}],
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      history: [{
        rawData: rows.slice(),
      }],
      stepNumber: 0,
      availableDirs: '',
      position: {},
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.doOpenDialog = this.doOpenDialog.bind(this);
    this.submitDialog = this.submitDialog.bind(this);
  }

  doOpenDialog(pos) {
    this.setState((state) => {
      const { history, isDialogOpen, stepNumber } = state;
      const { rawData } = history[stepNumber];
      let dirs = '';

      if (!isDialogOpen) {
        if (rawData[pos.rindex - 1][pos.cindex].f !== 0) { dirs += 'u'; }
        if (rawData[pos.rindex][pos.cindex - 1].f !== 0) { dirs += 'l'; }
        if (rawData[pos.rindex][pos.cindex + 1].f !== 0) { dirs += 'r'; }
        if (rawData[pos.rindex + 1][pos.cindex].f !== 0) { dirs += 'd'; }
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
      const { position, availableDirs, stepNumber } = state;
      const history = state.history.slice(0, stepNumber + 1);
      const rawData = history[stepNumber].rawData.map((row) => row.slice());
      let { rindex, cindex } = position

      if (!availableDirs.includes('u') && value.includes('u')) {
        if (rindex === 1) {
          addRow(rawData, 0);
          rindex = 2;
        }
        rawData[rindex - 1][cindex] = {"f":"?"};
      };
      if (!availableDirs.includes('d') && value.includes('d')) {
        if (rindex === rawData.length - 2) {
          addRow(rawData, rawData.length - 1);
        }
        rawData[rindex + 1][cindex] = {"f":"?"};
      };
      if (!availableDirs.includes('l') && value.includes('l')) {
        if (cindex === 1) {
          addColumn(rawData, rindex, 1);
          cindex = 2;
        }
        rawData[rindex][cindex - 1] = {"f":"?"};
      };
      if (!availableDirs.includes('r') && value.includes('r')) {
        if (cindex === rawData[rindex].length - 2) {
          addColumn(rawData, rindex, rawData[rindex].length - 1);
        }
        rawData[rindex][cindex + 1] = {"f":"?"};
      };

      // confirm choosed directions
      // ToDo variable value of cell
      rawData[rindex][cindex] = {"f": 2};

      return {
        position: { rindex, cindex },
        isDialogOpen: false,
        history: history.concat([{
          rawData,
        }]),
        stepNumber: history.length,
      };
    });
  }

  jumpTo(step) {
    this.setState((state) => {
      const { history, stepNumber } = state;
      return {
        stepNumber: (step >= 0 && step < history.length) ? step : stepNumber,
      };
    });
  }

  render() {
    const {
      isDialogOpen, availableDirs, history, stepNumber,
    } = this.state;

    const confirmedData = saved_map;
    const { rawData } = history[stepNumber];
    let markedCells = [];
    if (stepNumber > 0) { markedCells = findCellsToMark(confirmedData, rawData); }

    return (
      <Box display="flex" flexWrap="wrap" width="100%">
        <Box m={1}>
          <IconButton color="primary" onClick={() => this.jumpTo(stepNumber - 1)}>
            <Undo fontSize="large" />
          </IconButton>
        </Box>
        <Box display="flex" m={1} flexGrow={1} flexShrink={0} alignItems="center">
          <MapTable data={rawData} onClick={this.doOpenDialog} />
          <DialogBox
            open={isDialogOpen}
            onSubmit={this.submitDialog}
            onClose={this.toggleDialog}
            dirs={availableDirs}
          />
        </Box>
        <Box m={1}>
          <IconButton color="primary" onClick={() => this.jumpTo(stepNumber + 1)}>
            <Redo fontSize="large" />
          </IconButton>
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
