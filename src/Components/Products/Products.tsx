import { useState, useEffect } from 'react';
import ShimmerLoader from '../Common/Loader';
import "./Products.css";
import { fetchData } from '../../Services/api';

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const limit = 10;

    useEffect(() => {
        fetchData(`https://dummyjson.com/products?limit=${limit}`, setData, setLoading);
    }, []);

    return (
        <div>
            <ShimmerLoader
                loading={loading}
                shimmerRows={5}
                content={data && <Content data={data} />}>
                <div style={{ display: "flex", gap: "10px" }} id="parent">
                    <div style={{ height: "200px", width: "200px" }} />
                    <div id="parent" style={{ display: "flex", flexDirection: "column", width: "500px" }}>
                        <h2 style={{ height: "30px", width: "100%", marginBottom: "20px" }}></h2>
                        <p style={{ height: "10px", width: "100%" }}> </p>
                    </div>
                </div>
            </ShimmerLoader>
        </div>
    );
};



const Content = ({ data }: { data: { products: any } }) => {
    if (Array.isArray(data?.products)) {
        return (
            <div className="container">
                {data?.products?.map((item: any) => (
                    <div className="item" key={item.id}>
                        <img src={item.images[0]} alt={item.title} />
                        <div className='item-details'>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return null;
    }
};


export default Products;
