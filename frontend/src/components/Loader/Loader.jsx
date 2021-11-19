import React from 'react';
import loader from "../../images/ajax-loader.gif";
import "./Loader.css";


function Loader() {
    return (
        <div className="loader">
            <img className="loading-img" src={loader} alt="" />
        </div>
    )
}

export default Loader
