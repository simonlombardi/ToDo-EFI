import * as React from "react";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginContext } from "../contexts/LoginProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Copyright from "../components/Copyright"
import { ThemeContext } from "../contexts/ThemeProvider";
import { useState } from "react";

export default function SignIn() {
  const [datosUsuario, setDatosUsuario] = useContext(LoginContext);
  const [usuario, setUsuario] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [lightTheme, setLightTheme] = useContext(ThemeContext)
  const navegacion = useNavigate();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setDatosUsuario({
      nombre: "",
      contraseña: "",
    });
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: lightTheme ? 'light' : 'dark',
    },
  });

  {
    if (
      datosUsuario.nombre === "usuario" &&
      datosUsuario.contraseña === "demo"
    ) {
      navegacion("/home");
    }
  }

  function handleUsuario(e) {
    setUsuario(e.target.value)

  }

  function handleContraseña(e) {
    setContraseña(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setDatosUsuario({
      nombre: usuario,
      contraseña: contraseña,
    });
    if (
      datosUsuario.nombre === "usuario" &&
      datosUsuario.contraseña === "demo"
    ) {
      navegacion("/home");
    } else {
      setOpen(true)
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicio de sesión
          </Typography>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" color={'red'}>
              {"Usuario o contraseña incorrectos"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Intentar nuevamente</Button>
            </DialogActions>
          </Dialog>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              name="usuario"
              autoComplete="usuario"
              autoFocus
              onChange={handleUsuario}
              value={usuario}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="contraseña"
              type="password"
              id="contraseña"
              autoComplete="current-contraseña"
              onChange={handleContraseña}
              value={contraseña}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
