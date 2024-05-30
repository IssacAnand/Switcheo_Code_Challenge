import Header from "./Components/Header"

import 'bootstrap/dist/css/bootstrap.min.css' // Update the default/standard fonts/styling/margin/heighjt
import {Button,Alert} from 'react-bootstrap' // Import whatever is needed from the library
import './index.css'
import ExchangeForm from "./Components/ExchangeForm"

function App() {
 return(
  <div className="app-bg">
  <Header/>
  <ExchangeForm/>
  
  </div>
 )
}

export default App
