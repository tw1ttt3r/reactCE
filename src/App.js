import { Autocomplete, Button, Rating, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import mock_data from "./MOCK_DATA.json"
import { Fragment, useState } from "react"

import Table from "./components/table";
import Tbody from "./components/tbody";
import TCol from "./components/tcol";
import Tfoot from "./components/tfoot";
import Thead from "./components/thead";
import Tr from "./components/tr";

function App() {

  const elementos = ["pedro", "ricardo", "gabriela", "antonio"]

  const [ history, setHistory ] = useState({})
  const [ status, setStatus ] = useState(false)

  const handleOnChange = ({ label }) => {
    if (!history.hasOwnProperty(label)) {
      setHistory({ ...history, [label]: 1 })
      return
    }
    const newHistory = Object.keys(history).reduce((prev, curr, i) => {
      return curr === label
        ? { ...prev, [label]: history[label] + 1 }
        : { ...prev, [curr]: history[curr] }
    }, {})
    setHistory(newHistory)
  }

  const handleClickButton = () => setHistory({})

  const handleToogleChange = (event, value) =>  setStatus(value === 'disabled')

  return (
    <div style={{ marginTop: "16px", marginLeft: "16px"}}>
      <section>
      <ToggleButtonGroup
        orientation="vertical"
        exclusive
        onChange={handleToogleChange}
      >
        <ToggleButton value="disabled" aria-label="toggle-diabled">
          Disabled
        </ToggleButton>
        <ToggleButton value="enabled" aria-label="toggle-enabled">
          Enabled
        </ToggleButton>
      </ToggleButtonGroup>
      </section>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={mock_data}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
        onChange={ (event, newValue) => {
          if(newValue === null) return
          handleOnChange(newValue)
        } }
        disabled={status}
      />
      <section style={{ display: "flex", flexDirection: "column" }}>
        <h1>Elementos Seleccionados</h1>
        {
          Object.keys(history).map((el, i) => <Fragment key={i}>
            <Typography component="legend">{ el }</Typography>
            <Rating
              name="simple-controlled"
              value={history[el]}
              max={10}
            />
          </Fragment>)
        }
        <Button onClick={handleClickButton} variant="outlined">Limpiar Historial</Button>
      </section>
      
      <Table>
        <Thead>
          <Tr>
            <TCol>
              <h1>Desde el head</h1>
            </TCol>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {
              elementos.map( (el, i) => <TCol key={i} type="body"><h2>{ el }</h2></TCol>)
            }
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <TCol type="body">
              <h1>Desde el foot</h1>
            </TCol>
          </Tr>
        </Tfoot>
      </Table>
    </div>
  );
}

export default App;