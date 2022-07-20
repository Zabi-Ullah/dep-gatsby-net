import { Link } from "gatsby";
import React from "react";

const Navbar=()=>{
    return(
        <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/contact">Contact</Link>
        </div>
    )
}
export default Navbar