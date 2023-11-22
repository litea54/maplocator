import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TableContainer, Box } from '@mui/material';
import { viewableValues } from '../components/tools';

const Table = styled('table')({
  borderCollapse: 'collapse',
  background: '#1B1B1B',
  fontSize: '8pt',
  '& th': {
    width: '20px',
    height: '20px',
    padding: 1,
    border: '#999999 1px solid',
    // fontSize: '8pt',
    color: '#ffffff',
  },
  '& td': {
    width: '20px',
    height: '20px',
    '& div': {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    '& button': {
      minWidth: '20px',
      height: '20px',
      padding: 1,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  }
});

const Cell = (props) => {
  const {
    rindex, cindex, isRowHeader, isCellHeader, style, children, onClick, onMouseMove,
  } = props;

  const TD = styled('td')(style);

  return (
    <>
      {isRowHeader === true
        ? <th>{isCellHeader === false && cindex}</th>
        : (
          <>
            {isCellHeader === true
              ? <th>{rindex}</th>
              : (
                <>
                  {children === 0
                    ? <td/>
                    : (
                      <TD onClick={onClick} onMouseMove={onMouseMove}>
                        <Box>
                          {viewableValues[children] || children}
                        </Box>
                      </TD>
                    )}
                </>
              )}
          </>
        )}
    </>
  );
};

export default function MapTable(props) {
  const { data, markedCells, onClick, globalPosition } = props;
  const [position, setPosition] = useState(globalPosition);
  const [hovered, setHovered] = useState({});
  if (globalPosition && (position.rindex !== globalPosition.rindex || position.cindex !== globalPosition.cindex)) {
    setPosition(globalPosition);
  }
  const classes = {
    tdv: {
      border: '1px solid',
      background: '#666666',
    },
    tds: {
      border: '1px solid',
      background: '#fbeab2',
    },
    tdm: {
      border: '1px solid',
      background: '#a52a2a',
    },
    tdh: {
      border: '1px solid',
      background: '#a0a8bf',
    },
  } 

  const handleClick = (value, rindex, cindex) => {
    setPosition({ rindex, cindex });
    if (value === '?' && onClick) { onClick({ rindex, cindex }); }
  };

  const isMarked = (cell) => (
    (markedCells || []).findIndex((element) => (
      element.rindex === cell.rindex && element.cindex === cell.cindex
    )) !== -1
  );

  const defineStyle = (cell) => {
    if (position && position.rindex === cell.rindex && position.cindex === cell.cindex) {
      return classes.tds;
    }
    if (hovered && hovered.rindex === cell.rindex && hovered.cindex === cell.cindex) {
      return classes.tdh;
    }
    return isMarked(cell) ? (classes.tdm) : (classes.tdv);
  };

  return (
    <TableContainer align="center">
      <Table>
        <tbody>
          {(data || []).map((row, rindex) => (
            <tr key={rindex}>
              {(row || []).map((value, cindex) => (
                <Cell
                  key={rindex*row.length + cindex}
                  rindex={rindex}
                  cindex={cindex}
                  isRowHeader={rindex === 0 || rindex === data.length - 1}
                  isCellHeader={cindex === 0 || cindex === row.length - 1}
                  style={defineStyle({ rindex, cindex })}
                  onClick={() => handleClick(value.f, rindex, cindex)}
                  onMouseMove={() => setHovered( {rindex, cindex} )}
                >
                  { value.comment? value.comment: value.f }
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
