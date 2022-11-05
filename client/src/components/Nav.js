import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import Logout from "./Logout";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Nav = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h6" style={{ color: "white" }}>
            WEB2 projekt - Sigurnost
          </Typography>
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0",
            padding: "0",
          }}
        >
          {user && (
            <Link to="/user/5" style={{ textDecoration: "none" }}>
              <Button style={{ color: "white" }}>Moj profil</Button>
            </Link>
          )}
          {!isAuthenticated ? <Login /> : <Logout />}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
