import ItemList from "./ItemList";
import { useDispatch , useSelector} from "react-redux";
import { clearCart } from "../utils/cartSlice";

 const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold">CART ITEMS</h1>
            <div className="w-6/12 m-auto">
                <button className="bg-black border-2 text-white font-bold p-2 m-2 rounded-lg"
                        onClick={handleClearCart}
                >
                    Clear Cart
                </button>
                <ItemList items={cartItems} btn={"Remove-"}/>
                {cartItems.length == 0? <h3>Cart is empty</h3>:null}
            </div>
        </div>
    )
 }

 export default Cart;