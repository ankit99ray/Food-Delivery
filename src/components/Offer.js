const Offer = (props) => {
    return (props?.header != null && props?.subHeader != null)? (
        <h2 className="absolute 
                bottom-0 left-0 bg-opacity-50
                text-white p-2 font-extrabold
                bg-black rounded-xl">
            {props?.header + " " + props?.subHeader}
        </h2>
    ) : null;
}

export default Offer;