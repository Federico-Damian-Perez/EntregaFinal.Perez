import { useState } from "react"
import { Link } from "react-router-dom"
import ItemCount from "../ItemCount/ItemCount"
import './ItemDetail.css'
import { useContext } from "react"
import { CarritoContext } from "../../Context/CarritoContext"

const ItemDetail = ({ id, nombre, precio, img, stock,descripcion }) => {
    const [agregarCantidad, setAgregarCantidad] = useState(0);
    const {agregarProducto} = useContext(CarritoContext);
    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad);
        const item = {id, nombre, precio};
        agregarProducto(item, cantidad);
    }

  return (
        <div className='card'>
          <div className="card-left">
            <img src={img} alt={nombre} />
          </div>
          <div className="card-right">
            <h2>Nombre: {nombre} </h2>
            <h3>Precio: {precio} </h3>
            <h3>ID: {id} </h3>
            <p>{descripcion}</p>
            <div className="card-footer">
            {
                agregarCantidad > 0 ? (
                    <div className="btn-group">
                    <Link style={{textDecoration:"none"}} to="/cart"> <button className="finish-shopping-btn">Terminar Compra </button> </Link>
                    <Link style={{textDecoration:"none"}} to="/"> <button  className="continue-shopping-btn">Seguir Comprando </button></Link>
                    </div>
                ) : (<ItemCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad}/>)
            }
            </div>
            </div>
        </div>
  )
}

export default ItemDetail