import './App.css'
import Navbar from './Componentes/Navbar/Navbar'
import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './Componentes/ItemDetailContainer/ItemDetailContainer'
import Cart from './Componentes/Cart/Cart'
import CheckOut from './Componentes/CheckOut/CheckOut'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { CarritoProvider } from './Context/CarritoContext'



const App = () => {
  return (
    <>
    <BrowserRouter>
      <CarritoProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<ItemListContainer/>}/>
          <Route path='/categoria/:idCategoria' element={<ItemListContainer/>}/>
          <Route path='/item/:idItem' element={<ItemDetailContainer/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkOut' element={<CheckOut/>}/>
        </Routes>
      </CarritoProvider>
    </BrowserRouter>

    </>
  )
}

export default App