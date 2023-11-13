import CartWidget from "../CartWidget/CartWidget"
import { NavLink, Link} from "react-router-dom"
import './Navbar.css'


const Navbar = () => {
  return (
    <header>
    <Link to={"/"} style={{textDecoration:"none", color:"black"}}>
        <h1 className="nombre">DamiShop</h1>
    </Link>

    <nav>
        <ul className="botones-lista">
            <li>
                <NavLink style={{textDecoration:"none"}} to={"/categoria/2"}> <button className="botones"> Zapatillas </button> </NavLink>
            </li>

            <li>
                <NavLink style={{textDecoration:"none"}} to={"/categoria/3"}> <button className="botones"> Botines </button> </NavLink>
            </li>

            <li>
                <NavLink style={{textDecoration:"none"}} to={"/categoria/1"}> <button className="botones"> Camisetas </button> </NavLink>
            </li>

        </ul>
    </nav>
    <CartWidget/>
    </header>
  )
}

export default Navbar