import { useState, useEffect } from 'react';
import ShimmerLoader from '../Common/Loader';
import "./Users.css";
import { fetchData } from '../../Services/api';

const Users = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const limit = 10;

    useEffect(() => {
        fetchData(`https://dummyjson.com/users?limit=${limit}`, setData, setLoading);
    }, []);

    const shimmerRowsPerLoader = 5;

    const shimmerDivs = Array.from({ length: shimmerRowsPerLoader }).map((_, index) => (
        <p key={index} style={{ height: "10px", width: "200px" }} />
    ));

    return (
        <div>
            <ShimmerLoader
                loading={loading}
                shimmerRows={limit}
                content={data && <Content data={data} />}>
                <div style={{ display: "flex", gap: "2px", flexDirection: "column" }} id="parent">
                    {shimmerDivs}
                </div>
            </ShimmerLoader>
        </div>
    );
};



const Content = ({ data }: { data: { users: any } }) => {
    if (Array.isArray(data?.users)) {
        return (
            <div className="container">
                {data?.users?.map((item: any) => (
                    <div key={item.id} className="user-info">
                        <h2 className="user-name">{item.firstName} {item.lastName}</h2>
                        <div className="user-detail">
                            <span className="detail-label">Age:</span>
                            <span className="detail-value">{item.age}</span>
                        </div>
                        <div className="user-detail">
                            <span className="detail-label">Gender:</span>
                            <span className="detail-value">{item.gender}</span>
                        </div>
                        <div className="user-detail">
                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{item.email}</span>
                        </div>
                        <div className="user-detail">
                            <span className="detail-label">Phone:</span>
                            <span className="detail-value">{item.phone}</span>
                        </div>
                    </div>
                ))}
            </div>

        );
    } else {
        return null;
    }
};


export default Users;
