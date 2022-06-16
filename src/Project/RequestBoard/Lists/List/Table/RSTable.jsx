import React from 'react';

import {
  Card,
  Table,
} from "reactstrap";

import PropTypes from 'prop-types';
const propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  rowSelectKey: PropTypes.string.isRequired,
  onClickEvent: PropTypes.func
};

// Create a default prop getter
const RSTable = ({ 
  title,
  columns,
  data,
  rowSelectKey,
  onClickEvent,
 }) => {

  return (
    <Card className="shadow">
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            {columns.map(column => (
              <th scope="col" key={column.Header}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        {rowSelectKey.length > 0 ?
          <tbody>
          {data.map(row => (            
            <tr data-item={row[rowSelectKey]} onClick={() => {onClickEvent(row[rowSelectKey])}} key={row[rowSelectKey]} >
              {columns.map((column,index) => (
                <td key={index}>{row[column.accessor]}</td>
              ))}
          </tr>
          ))}          
          </tbody>
        :
          <tbody>
            {data.map((row,index) => (            
              <tr key={index}>
                {columns.map((column,index) => (
                  <td key={index}>{row[column.accessor]}</td>
                ))}
            </tr>
            ))}          
          </tbody>
        }
      </Table>
    </Card>
  );
};

RSTable.propTypes = propTypes;

export default RSTable;
