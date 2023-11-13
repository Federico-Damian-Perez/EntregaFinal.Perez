import { useState } from "react"
import './ItemCount.css'

const ItemCount = ({ inicial, stock, funcionAgregar }) => {
    const [contador, setContador] = useState(inicial);

    const incrementar = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    }

    const decrementar = () => {
        if (contador > inicial) {
            setContador(contador - 1);
        }
    }
  return (
<div className="container">
  <div className="counter-container">
    <button className="decrement-btn" onClick={decrementar}>-</button>
    <p className="counter">{contador}</p>
    <button className="increment-btn" onClick={incrementar}>+</button>
  </div>
  <div className="btn-group" onClick={() => funcionAgregar(contador)}>
    <button className="add-to-cart">Agregar al Carrito</button>
  </div>
</div>

  )
}


export default ItemCount
