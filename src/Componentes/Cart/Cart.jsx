import { useContext } from "react"
import { CarritoContext } from "../../Context/CarritoContext"
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"
import './Cart.css'

const Cart = () => {
    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);

    if (cantidadTotal === 0) {
        return (
            <>
                <h2>No hay productos en el carrito</h2>
                <Link className="AA" to="/"> Ver Productos </Link>
            </>
        )
    }
  return (
<div className="cart-container">
  <div className="cart-items">
    {carrito.map(productos => <CartItem key={productos.item.id} product={productos} />)}
  </div>
  <div className="cart-summary">
    <h3>Total: $ {total}</h3>
    <h3>Cantidad Total: {cantidadTotal}</h3>
    <button className="clear-cart-button" onClick={() => vaciarCarrito()}>Vaciar Carrito</button>
    <Link className="checkout-button" to="/checkout">Finalizar Compra</Link>
  </div>
</div>
  )
}

export default Cart