import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import Header from "../../Components/Header";
import Productgrid from "./Productgrid";

function HomePage({ cart ,loadcart }) {
  const [products, setproduct] = useState([]);

  useEffect(() => {
  const getHomeData=async()=>{
      const response= await axios.get("/api/products?expand=product")
   setproduct(response.data);
  }
   getHomeData();
   
    
  }, []);

  return (
    <>
      <title>Ecommerce-project</title>
      <Header cart={cart} />

      <div className="home-page">
        <Productgrid products={products} loadcart={loadcart}/>
      </div>
    </>
  );
}
export default HomePage;
