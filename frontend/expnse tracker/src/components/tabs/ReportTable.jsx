import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import PremiumComponent from "../BuyPremium";
import OpenIconSpeedDial from "../DownloadButton";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from 'axios'

const columns = [
  {
    id: "date",
    label: "Expense Date",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "title",
    label: "Description",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

async function fetchReport(idToken, page, size) {
  const response = await axios.get(`http://localhost:3000/expenses`, {
    headers: {
      Authorization: idToken,
    },
    params: {
      page: page,
      size: size,
    },
  });
  const data = response.data;
  return data;
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const idToken = useSelector((state)=>state.auth.idToken)
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);
  // const rows = useSelector(state=>state.expense.expenseList)
  const params = useParams();
  const print = params.print;
  const [rowsPerPage, setRowsPerPage] = useState(print ? 20 : 10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage+1)
    fetchReport(idToken , newPage+1 , rowsPerPage ).then(data=>{
      
      setRows(data.expenses)
    }).catch(console.log)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    fetchReport(idToken , 1 , +event.target.value ).then(data=>{
      setRows(data.expenses)
    }).catch(console.log)
  };

  useEffect(() => {
    if (print) window.print();
  }, [print]);

  const maxHight = print ? 1000 : 350;
  useEffect(() => {
    if (isPremium) {
      fetchReport(idToken ,1 , rowsPerPage ).then((data) => {
        console.log(data.downloads);
        setRows(data.expenses);
        setCount(data.count);
      });
    }
  }, [isPremium]);

  return (
    <div style={{ display: "flex" }}>
      {!isPremium ? (
        <PremiumComponent />
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: maxHight }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      {isPremium && !print && <OpenIconSpeedDial></OpenIconSpeedDial>}
    </div>
  );
}
