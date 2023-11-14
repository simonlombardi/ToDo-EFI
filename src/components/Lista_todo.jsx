import React, { useEffect, useState } from "react";
import { Pagination, Skeleton, Stack, Grid } from "@mui/material";
import Tarjeta from "./Tarjeta";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function Lista_todo({ tema }) {
  const [tareas, setTareas] = useState([]);
  const [cantidadTareas, setCantidadTareas] = useState(5); //por defecto, la lista muestra 5 tareas
  const [pagActual, setPagActual] = useState(1);
  const desde = (pagActual - 1) * cantidadTareas
  const hasta = pagActual * cantidadTareas
  const [cargando, setCargando] = useState(true);
  const [open, setOpen] = React.useState(false);
  const url = "https://jsonplaceholder.typicode.com/todos";
  const handleChange = (event, value) => {
    setPagActual(value);
  };

  useEffect(() => {
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setTareas(data);
        setCargando(false);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleSelect(e) {
    setCantidadTareas(e.target.value);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: tema ? "white" : "black",
      }}
    >
      {cargando && <Skeleton animation="wave" />}
      <FormControl style={{ marginTop: "4%", width: "8em" }}>
        <InputLabel id="demo-controlled-open-select-label">
          Nro. Tareas
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          label="Nro. Tareas"
          onChange={handleSelect}
        >
          <MenuItem value="">
            <em>Seleccione la cantidad de tareas</em>
          </MenuItem>
          <MenuItem value={"5"}>5</MenuItem>
          <MenuItem value={"10"}>10</MenuItem>
          <MenuItem value={"15"}>15</MenuItem>
          <MenuItem value={"20"}>20</MenuItem>
        </Select>
      </FormControl><Grid container>
        {tareas.slice(desde, hasta).map((item, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Tarjeta
                titulo={item.title}
                estado={item.completed ? "Completado" : "Incompleto"}
              />
            </Grid>)
        })}
      </Grid>
      <Stack style={{ margin: "5.5%" }}>
        <Pagination
          count={Math.round(200 / cantidadTareas)}
          page={pagActual}
          rowsPerPage={cantidadTareas}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
}



