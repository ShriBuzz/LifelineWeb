import React, { useContext, useEffect, useState } from 'react';

// package
import { TableCell, TableRow } from '@material-ui/core';

// hook
import { LoginContext } from '../../hooks/LoginContext';

const GetTable = ({ type, searchResult }) => {
  const { Dusers, Tusers } = useContext(LoginContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (type === 'driver') {
      searchResult.length > 0 ? setUser(searchResult) : setUser(Dusers);
    } else {
      searchResult.length > 0 ? setUser(searchResult) : setUser(Tusers);
    }
  }, [Dusers, Tusers, type, searchResult]);

  return user.map((row) => (
    <TableRow key={row.contact}>
      <TableCell component='th' scope='row' style={cell}>
        {row.name ? row.name : '-'}
      </TableCell>
      <TableCell style={cell}>{row.contact ? row.contact : '-'}</TableCell>
      <TableCell style={cell}>{row.email ? row.email : '-'}</TableCell>
      {type === 'driver' ? (
        <TableCell style={cell}>
          {row.driver_id ? row.driver_id : '-'}
        </TableCell>
      ) : (
        <React.Fragment />
      )}
    </TableRow>
  ));
};

const cell = {
  textAlign: 'center',
};

export default React.memo(GetTable);
