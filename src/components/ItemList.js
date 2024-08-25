import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem , removeItem} from "../utils/cartSlice";

const ItemList = ({items, btn}) => {

    // console.log(items);
    const dispatch = useDispatch();

    const handleItem = (item) => {
        if(btn == "ADD+")dispatch(addItem(item));
        if(btn == "Remove-")dispatch(removeItem(item));
    }

    return (
        <div>
            {items.map((item, index) => (
                <div 
                    data-testid = "FoodItems"
                    key={btn=="ADD+"?item.card.info.id:index} className="p-2 m-2 border-b-2 text-left flex justify-between">
                    <div className="w-10/12">
                        <div className="py-2">
                            <span className="font-bold">{item.card.info.name}</span><br></br>
                            <span>
                                ₹
                                {item.card.info.price ? 
                                item.card.info.price/100
                                : item.card.info.defaultPrice/100}
                            </span>
                        </div>
                        <p>{item.card.info.description}</p>
                    </div>
                    <div className="w-2/12 ml-2 content-center">
                        <img src={CDN_URL + item.card.info.imageId} className="w-20 h-[74px]"/>
                        <button className="border border-black rounded-lg mt-1
                                 text-green-700
                                bg-gray-100 font-bold w-20 shadow-lg"
                                onClick={() => handleItem(item)}
                         >
                            {btn}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ItemList;