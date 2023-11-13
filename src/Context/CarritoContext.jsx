import { useState, createContext } from "react"

export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTodal: 0
})

export const CarritoProvider = ({children}) => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);

    const agregarProducto = (item, quantity) => {
        console.log(item)
        const productoEnCarrito = carrito.find(prod => prod.item.id === item.id)

        if (!productoEnCarrito) {
          setCarrito(prev => [...prev, { item, quantity }]);
          setCantidadTotal(prev => prev + quantity);
          setTotal(prev => prev + (item.precio * quantity));
        } else {
          const cartActualizado = carrito.map(prod => {
            if (prod.item.id === item.id) {
              return { ...prod, quantity: prod.quantity + quantity };
            } else {
              return prod;
            }
          })
          setCarrito(cartActualizado);
          setCantidadTotal(prev => prev + quantity);
          setTotal(prev =>  (item.precio * quantity));
    
        }
    }

    const eliminarProducto = (id) => {
        console.log(id)
        console.log(carrito)
        const productoEliminado = carrito.find( prod => prod.item.id === id);
        const carritoActualizado = carrito.filter(prod => prod.item.id !== id);
        setCarrito(carritoActualizado);
        console.log(productoEliminado)
        setCantidadTotal(prev => prev - productoEliminado.quantity);
        setTotal(prev => prev - (productoEliminado.item.precio * productoEliminado.quantity));
        }

    const vaciarCarrito = () => {
        setCarrito([]);
        setCantidadTotal(0);
        setTotal(0);
    }

    return (
        <CarritoContext.Provider value={{carrito, total, cantidadTotal, agregarProducto, eliminarProducto, vaciarCarrito}}>
            {children}
        </CarritoContext.Provider>
    )
}