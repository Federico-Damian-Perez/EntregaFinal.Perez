import { Link } from "react-router-dom"
import './Item.css'

const Item = ({ id, nombre, precio, img, stock }) => {
  return (
        <div className='cardProducto'>
            <Link to={`/item/${id}`}> <img style={{backgroundColor:"#FFFFFF"}} className='imgProducto' src={img} alt={nombre} /></Link>
            <Link style={{textDecoration:"none",color:"#000000",backgroundColor:"#FFFFFF"}} to={`/item/${id}`}><h3 style={{backgroundColor:"#FFFFFF"}}>{nombre} </h3></Link>
            <p style={{backgroundColor:"#FFFFFF"}}>Precio: ${precio} </p>
            <p style={{backgroundColor:"#FFFFFF"}}>ID: {id} </p>
            <p style={{backgroundColor:"#FFFFFF"}}>Stock: {stock} </p>
            <Link style={{textDecoration:"none",backgroundColor:"#FFFFFF"}} to={`/item/${id}`}><button className="boton"> Ver Detalles </button></Link>
        </div>
  )
}

export default Item