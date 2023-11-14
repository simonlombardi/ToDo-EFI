import React, { useEffect } from "react";
import Lista_todo from "../components/Lista_todo";
import Menu from "../components/Menu"
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginProvider";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeProvider";
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Home() {
    const [datosUsuario, setDatosUsuario] = useContext(LoginContext)
    const [lightTheme, setLightTheme] = useContext(ThemeContext)
    const navegacion = useNavigate()

    useEffect(() => {
        if (datosUsuario.nombre !== "usuario") {
            navegacion("/login")
        }
    }, []) //cuando se carga el componente, verifica que el usuario este loggeado, si no esta se redirige a login

    const darkTheme = createTheme({
        palette: {
            mode: lightTheme ? 'light' : 'dark',
        },
    });

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Menu />
                <Lista_todo tema={lightTheme} />
            </ThemeProvider>
        </>
    )
}