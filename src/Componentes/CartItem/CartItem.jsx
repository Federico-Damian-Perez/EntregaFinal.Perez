import { useContext } from "react"
import { CarritoContext } from "../../Context/CarritoContext"
import './CartItem.css'

const CartItem = ({product }) => {
  console.log(product)
    const {eliminarProducto} = useContext(CarritoContext);
  return (
    <div className="cart-item">
    <h4> {product.item.nombre} </h4>
    <p> Cantidad: {product.quantity} </p>
    <p> Precio: {product.item.precio}  </p>
    <button onClick={() => eliminarProducto(product.item.id)}> Eliminar </button>
    <hr />
</div>
  )
}

export default CartItem