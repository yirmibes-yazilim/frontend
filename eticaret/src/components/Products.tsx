import ProductItem from "./ProductItem"

const Products =() => {
    return(
        <div className="grid grid-cols-4 gap-10 mb-8 mx-8">
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
        </div>
    )
}

export default Products