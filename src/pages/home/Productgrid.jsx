
 import Product from './Product';


function Productgrid({products, loadcart}){

 
          return(
        <>
        

              <div className="products-grid">
        {products.map((product)=>{
          return(
                  
                  <Product key={product.id}  product={product} loadcart={loadcart} />

          );
        })}
        </div>
        </>
    );
}
export default Productgrid;