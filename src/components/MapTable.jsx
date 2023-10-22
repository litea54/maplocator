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
    rindex, cindex, isRowHeader, isCellHeader, style, children, onClick,
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
                    ? <td />
                    : (
                      <TD>
                        <Box onClick={onClick}>
                          {/* {(children !== 2) ? children : '' } */}
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
  const [position, setPosition] = useState({});
  const { data, markedCells, onClick } = props;
  const classes = {
    tdv: {
      border: '1px solid',
      background: '#a0a8bf',
    },
    tds: {
      border: '1px solid',
      background: '#fbeab2',
    },
    tdm: {
      border: '1px solid',
      background: '#a52a2a',
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
    if (position.rindex === cell.rindex && position.cindex === cell.cindex) {
      return classes.tds;
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
                  key={rindex + cindex}
                  rindex={rindex}
                  cindex={cindex}
                  isRowHeader={rindex === 0 || rindex === data.length - 1}
                  isCellHeader={cindex === 0 || cindex === row.length - 1}
                  style={defineStyle({ rindex, cindex })}
                  onClick={() => handleClick(value.f, rindex, cindex)}
                >
                  {value.f}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
