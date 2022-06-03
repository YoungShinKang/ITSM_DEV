import React from 'react';

import {
  Card,
  Table,
} from "reactstrap";

// Create a default prop getter
const RSTable = ({ 
  title,
  columns,
  data,
 }) => {


  return (
    <Card className="shadow">
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            {columns.map(column => (
              <th scope="col">{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (            
            <tr>
              {columns.map(column => (
                <td>{row[column.accessor]}</td>
              ))}
          </tr>
          ))}          
        </tbody>
      </Table>
    </Card>
  );
};

export default RSTable;
