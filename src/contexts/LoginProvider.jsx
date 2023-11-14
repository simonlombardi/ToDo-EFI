import { createContext, useState } from "react";

export const LoginContext = createContext()

export default function LoginProvider( {children} ){
    const [datosUsuario, setDatosUsuario] = useState({
        nombre: "",
        contraseña: ""
    })
    return(
        <LoginContext.Provider value={[datosUsuario, setDatosUsuario]}>
            {children}
        </LoginContext.Provider>
    )
}