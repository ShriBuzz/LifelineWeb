import React, { useContext } from 'react';

// package
import { TableCell, TableRow } from '@material-ui/core';

// hook
import { LoginContext } from '../../hooks/LoginContext';

const GetTable = ({ type }) => {
  const { Dusers, Tusers } = useContext(LoginContext);
  if (type === 'driver') {
    return Dusers.map((row) => (
      <TableRow key={row.contact}>
        <TableCell component='th' scope='row' style={cell}>
          {row.name ? row.name : '-'}
        </TableCell>
        <TableCell style={cell}>{row.contact ? row.contact : '-'}</TableCell>
        <TableCell style={cell}>{row.email ? row.email : '-'}</TableCell>
        <TableCell style={cell}>
          {row.driver_id ? row.driver_id : '-'}
        </TableCell>
      </TableRow>
    ));
  } else {
    return Tusers.map((row) => (
      <TableRow key={row.contact}>
        <TableCell component='th' scope='row' style={cell}>
          {row.name ? row.name : '-'}
        </TableCell>
        <TableCell style={cell}>{row.contact ? row.contact : '-'}</TableCell>
        <TableCell style={cell}>{row.email ? row.email : '-'}</TableCell>
      </TableRow>
    ));
  }
};

const cell = {
  textAlign: 'center',
};

export default React.memo(GetTable);
