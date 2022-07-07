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

  // arreglo para el render de la lista en la línea 91
  const elementos = ["pedro", "ricardo", "gabriela", "antonio"]

  // estado para el manejo de la selección de opciones del Autocomplete
  const [ history, setHistory ] = useState({})
  // estado para el manejo del estatus de la prop disabled del Autocomplete
  const [ status, setStatus ] = useState(false)

  // recordemos que en una función podemos recibir cualquier tipo de dato valido de javascript
  // en este caso, el evento onChange del componente Autocomplete nos regresa dos valores o parametros
  // el evento y un newValue que de acuerdo a la lista de opciones que ocupamos del MOPCK_DATA sería un objeto ({ id, label })
  // eso hará que el componente nos regrese ese elemento del arreglo de options
  // y como es un objeto, nosotros podemos desestructurarlo y obtener las propiedades que nos sean necesarias, en este caso solo necesitamos label
  const handleOnChange = ({ label }) => {
    // cuando se inicia la aplicación, nuestro estado es un objeto vacio
    // por ende, podemos hacer uso de un metodo propio de los objetos llamada hasOwnProperty
    // este metodo pide como parametro de entrada la propiedad a buscar de tipo string
    // el metodo nos regresará true si la propiedad existe en el objeto
    // o false si no existe
    // si es la primera vez que clicamos la opción no existirá en el objeto
    // entonces el método nos regresará false, pero para que se cumpla negaremos el valor
    // en javascript existen los valors truly y falsy
    // cualquier tipo de dato de javascript puede convertirse en truthy o falsy (https://arielfuggini.com/javascript-valores-truthy-falsy/)
    // para que se cumpla el objetivo, negamos la expresión haciendo que cuando sea false se convierta en true y haga el bloque de código del if
    // si existiera la propiedad, entonces el valor true se negaría (false) y por ende ya no haría el bloque de código del if y pasaría a la siguiente línea después del if
    if (!history.hasOwnProperty(label)) {
      // ocupamos el spread operator para lograr crear un nuevo objeto a partir del objeto original (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
      setHistory({ ...history, [label]: 1 })
      // colocamos este return, para que al terminar el if, ya no haga nada más
      return
    }

    // reduce es uno de los métodos funcionales de javascript más potentes y poderosos de los 3
    // reduce opera con 2 parametros, una función reductora y el valor inicial (este es opcional)
    // la función reductora tiene como objetivo hace validaciones y siempre retornar algo para la siguiente iteración o como resultado del reduce
    // la función reductora recibe 4 parametros, valor previo, valor actual, indice y arreglo
    // si el reduce no recibe el segundo parametro, el valor previo en su primera iteración es la posición 0 del arreglo que se esta recorriendo y el valor actual es la posición 1 del arreglo que se esta recorriendo
    // si el reduce no recibe el segundo parametro, el valor previo en su segunda y demás iteraciones es el valor retornado de la función reductora y el valor actual sería el valor de la posición actual del recorrido
    // si el reduce recibe el segundo parametro, el valor previo en su primera iteración es el segundo parametro y el valor actual es la posición 0 del arreglo
    // si el reduce recibe el segundo parametro, el valor previo en sus demás iteraciones es el valor retornado de la función reductora y el valor actual es el valor de la posición actual del recorrido
    const newHistory = Object.keys(history).reduce((prev, curr, i) => {
      return curr === label
        ? { ...prev, [label]: history[label] + 1 }
        : { ...prev, [curr]: history[curr] }
    }, {})
    setHistory(newHistory)
  }

  // método para el manejo del cambio de valor para el estado history
  // simplemente reiniciamos el valor original del estado
  const handleClickButton = () => setHistory({})

  // método para el manejo del cambio de valor para el estado status
  // a partir del valor recibido por el parametro value, que lo recibimos de metodo OnChange
  // del componente ToggleButtonGroup
  // simplemente hacemos una comparación booleana, la prop disabled funciona de la misma manera
  // que el atribito disabled de cualquier elemento HTML, si existe el atributo el elemento se bloquea
  // si no existe el atributo, el elemento es manipulable
  // para la prop disabled ocuparemos valores booleanos, es decir, si la prop existe (true) el elemento se bloquea
  // si la prop no existe o tiene un valor o un valor false, el elemento es manipulable
  // para poder ocupar esta lógica, nosotros por medio del evento onChange recibimos el valor del elemento clicado
  // los únicos values que podemos recibir son "disabled" o "enabled", haciendo que si recibimos el valor "disabled" debe bloquearse
  // de lo contrario debe poder manipularse
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