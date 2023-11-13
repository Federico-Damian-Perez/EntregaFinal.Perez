import { useState,useContext } from "react"
import { CarritoContext } from "../../Context/CarritoContext"
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore'
import {db} from "../../Service/Config"
import { Link } from "react-router-dom"
import './CheckOut.css'

const CheckOut = () => {
    const { carrito, vaciarCarrito, cantidadTotal } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [orderId, setOrdenId] = useState(""); 

    const manejadorFormulario = (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor complete todos los campos");
            return;
        }

        if (email !== emailConfirmacion) {
            setError("Los mail no coinciden");
            return;
        }
 
        const orden = {
            items: carrito.map(productos => ({
                id: productos.item.id,
                nombre: productos.item.nombre,
                cantidad: productos.quantity,
            })),
            total: cantidadTotal,
            nombre,
            apellido,
            telefono,
            email,
            fecha: new Date()
        };

        Promise.all(
            orden.items.map(async (productoOrden) => {
                const productoRef = doc(db, "productos", productoOrden.id);
                const productoDoc = await getDoc(productoRef);
                const stockActual = productoDoc.data().stock;
                await updateDoc(productoRef, {
                    stock: stockActual - productoOrden.cantidad
                });
            })
        )
            .then(() => {
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id);
                        vaciarCarrito();
                    })
                    .catch((error) => {
                        console.log("Error al crear la orden", error);
                        setError("Error al crear la orden, vuelva más tarde");
                    })
            })
            .catch((error) => {
                console.log("Error al actualizar el stock.", error);
                setError("Error al actualizar el stock. Intente nuevamente");
            })

    }

    return (
        <>
            <div className="checkout-container">
            <h2>Checkout</h2>
        <form onSubmit={manejadorFormulario} className="formulario">
            {carrito.map(productos => (
                <div key={productos.item.id}>
                    <p>
                        {productos.item.nombre} x {productos.quantity}
                    </p>
                    <p>Precio $ {productos.item.precio} </p>
                    <hr />
                </div>
            ))}
            <hr />
    
            <div className="form-group">
                <label htmlFor="nombre"> Nombre </label>
                <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
    
            <div className="form-group">
                <label htmlFor="apellido"> Apellido </label>
                <input id="apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
    
            <div className="form-group">
                <label htmlFor="telefono"> Telefono </label>
                <input id="telefono" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
    
            <div className="form-group">
                <label htmlFor="email"> Email </label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
    
            <div className="form-group">
                <label htmlFor="email2"> Email Confirmación </label>
                <input id="email2" type="email" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
            </div>
    
            {
                error && <p style={{ color: "red" }}> {error} </p>
            }
    
            <button className="checkout-button" type="submit"> Finalizar Compra </button>
        </form>
        {
            orderId && (
                <div>
                <strong className="ordenId">¡Gracias por tu compra! Tu número de orden es {orderId} </strong>
                <hr />
                <Link to="/"><button className="boton">Volver al inicio </button></Link>
                </div>
            )
        }
        </div>
        </>
      )
    }
    
    export default CheckOut