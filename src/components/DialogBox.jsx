import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import {
  ArrowUpward,
  ArrowBack,
  ArrowForward,
  ArrowDownward,
} from '@material-ui/icons';

const RowBox = (props) => {
  const { children } = props;
  return (
    <Box display="flex" p={1} flexDirection="row" justifyContent="center">
      {children}
    </Box>
  );
};

export default class DialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dirs: '',
    };
    this.changeDirect = this.changeDirect.bind(this);
    this.defineColor = this.defineColor.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  changeDirect(char) {
    this.setState((state) => {
      let { dirs } = state;
      const lchar = char.toLowerCase();

      if (dirs.includes(lchar)) {
        dirs = dirs.replace(lchar, '');
      } else {
        dirs += lchar;
      }

      return { dirs };
    });
  }

  handleEnter() {
    this.setState({
      dirs: this.props.dirs,
    });
  }

  defineColor(char) {
    return (this.state.dirs.includes(char.toLowerCase())) ? 'primary' : 'default';
  }

  render() {
    const { open, onClose, onSubmit } = this.props;

    const ArrowBox = (props) => {
      const { char } = props;
      const classes = makeStyles({
        root: { width: '5rem', height: '5rem' },
      })();

      const ArrowIcon = () => {
        switch (char) {
          case 'u':
            return (<ArrowUpward className={classes.root} />);
          case 'l':
            return (<ArrowBack className={classes.root} />);
          case 'r':
            return (<ArrowForward className={classes.root} />);
          case 'd':
            return (<ArrowDownward className={classes.root} />);
          default:
            return null;
        }
      };

      return (
        <Box
          bgcolor="background.paper"
          m={1}
          className={classes.root}
          justifyContent="center"
          alignItems="center"
          borderColor="text.primary"
        >
          { (char)
          && (
            <IconButton
              style={{ padding: 0 }}
              color={this.defineColor(char)}
              onClick={() => this.changeDirect(char)}
              disabled={(this.props.dirs.includes(char))}
            >
              <ArrowIcon />
            </IconButton>
          )}
        </Box>
      );
    };

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        onEnter={this.handleEnter}
      >
        <DialogTitle id="form-dialog-title">Choose directions</DialogTitle>
        <DialogContent>
          <RowBox>
            <ArrowBox char="u" />
          </RowBox>
          <RowBox>
            <ArrowBox char="l" />
            <ArrowBox />
            <ArrowBox char="r" />
          </RowBox>
          <RowBox>
            <ArrowBox char="d" />
          </RowBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => onSubmit(this.state.dirs)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
