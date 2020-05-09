import React from "react";

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return item[column.path];
  };
  const createKey = (column) => {
    return column.path || column.key;
  };
  return (
    <tbody>
      {data &&
        data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
