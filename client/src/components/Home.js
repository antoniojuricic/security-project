import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../App.css";

const Home = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [secureQuery, setSecureQuery] = useState(false);
  const [secureAccess, setSecureAccess] = useState(
    localStorage.getItem("secure-access") == "true"
  );

  useEffect(() => {
    localStorage.setItem("secure-access", secureAccess);
  }, [secureAccess]);

  const getUser = () => {
    axios
      .get(
        !secureQuery
          ? process.env.REACT_APP_GET_USER
          : process.env.REACT_APP_GET_USER_SECURE,
        {
          params: {
            username: username,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleSQLCheck = () => {
    setSecureQuery(!secureQuery);
  };

  const handleBACCheck = () => {
    setSecureAccess(!secureAccess);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
        <div className="form">
          <div style={{ marginBottom: "1em", fontSize: "1.2em" }}>Pretraga</div>
          <TextField
            type="text"
            id="outlined-basic"
            label="Korisničko ime"
            variant="outlined"
            helperText="Npr. ' OR True --"
            style={{ marginBottom: "1em" }}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div>
            <Button
              variant="contained"
              onClick={getUser}
              style={{ marginTop: "1em" }}
            >
              Pretraži korisnike
            </Button>
          </div>
          <FormControlLabel
            control={<Checkbox onClick={handleSQLCheck} />}
            label="Onemogući SQL umetanje"
            style={{ marginTop: "1em" }}
          />
          <FormControlLabel
            control={<Checkbox onClick={handleBACCheck} />}
            label="Onemogući lošu kontrolu pristupa"
            style={{ marginTop: "1em" }}
            checked={secureAccess}
          />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Korisničko ime</StyledTableCell>
                <StyledTableCell>Adresa</StyledTableCell>
                <StyledTableCell>Broj mobitela</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length == 0 && (
                <StyledTableRow>
                  <StyledTableCell colSpan={5}>Nema rezultata</StyledTableCell>
                </StyledTableRow>
              )}
              {users.length > 0 &&
                users.map((row) => (
                  <StyledTableRow key={row.user_id}>
                    <StyledTableCell component="th" scope="row">
                      {row.user_id}
                    </StyledTableCell>
                    <StyledTableCell>{row.user_id}</StyledTableCell>
                    <StyledTableCell>{row.username}</StyledTableCell>
                    <StyledTableCell>{row.username}</StyledTableCell>
                    <StyledTableCell>{row.username}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default Home;
