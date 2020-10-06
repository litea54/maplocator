import React from 'react';
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

const arrowProps = {
  bgcolor: 'background.paper',
  m: 1,
  style: { width: '5rem', height: '5rem' },
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'text.primary',
};

const iconProps = {
  style: { width: '5rem', height: '5rem' },
};

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
            <Box {...arrowProps}>
              <IconButton
                style={{ padding: 0 }}
                color={this.defineColor('u')}
                onClick={() => this.changeDirect('u')}
                alt="UP"
                disabled={(this.props.dirs.includes('u'))}
              >
                <ArrowUpward {...iconProps} />
              </IconButton>
            </Box>
          </RowBox>
          <RowBox>
            <Box {...arrowProps}>
              <IconButton
                style={{ padding: 0 }}
                color={this.defineColor('l')}
                onClick={() => this.changeDirect('l')}
                alt="LEFT"
                disabled={(this.props.dirs.includes('l'))}
              >
                <ArrowBack {...iconProps} />
              </IconButton>
            </Box>
            <Box {...arrowProps} />
            <Box {...arrowProps}>
              <IconButton
                style={{ padding: 0 }}
                color={this.defineColor('r')}
                onClick={() => this.changeDirect('r')}
                alt="RIGHT"
                disabled={(this.props.dirs.includes('r'))}
              >
                <ArrowForward {...iconProps} />
              </IconButton>
            </Box>
          </RowBox>
          <RowBox>
            <Box {...arrowProps}>
              <IconButton
                style={{ padding: 0 }}
                color={this.defineColor('d')}
                onClick={() => this.changeDirect('d')}
                alt="DOWN"
                disabled={(this.props.dirs.includes('d'))}
              >
                <ArrowDownward {...iconProps} />
              </IconButton>
            </Box>
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
