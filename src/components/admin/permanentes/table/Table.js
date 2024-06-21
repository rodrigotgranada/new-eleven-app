import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import Loading from "../../../public/Loading/Loading";

const Table = ({ columns, data, isLoading, footer }) => {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnData,
      data: rowData,
    });

  return (
    <>
      <table {...getTableProps()} className="tableUsers">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="table-header">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={columns.length}>
                <Loading type={`spin`} width={"30px"} />
              </td>
            </tr>
          </tbody>
        ) : (
          <>
            <tbody {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (<tr>
                <td colSpan={columns.length}>
                  <p>Nenhum item encontrado</p>
                </td>
              </tr>)}
              
            </tbody>
            {/* <tfoot>
              <tr>
                <td colSpan={columns.length}>
                  <Pagination
                    totalRows={footer.totalRows}
                    pageChangeHandler={footer.pageChangeHandler}
                    rowsPerPage={footer.rowsPerPage}
                    currentPage={footer.currentPage}
                  />
                </td>
              </tr>
            </tfoot> */}
          </>
        )}
      </table>
    </>
  );
};

export default Table;
