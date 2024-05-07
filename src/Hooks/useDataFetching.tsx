import { useState, useEffect } from 'react';
import { fetchData } from '../Services/api';

interface FetchDataOptions {
    apiUrl: string;
    initialData?: any;
}

export const useDataFetching = ({ apiUrl, initialData }: FetchDataOptions) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const fetchedData = await fetchData(apiUrl);
                console.log(fetchedData)
                setData(fetchedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataAndSetState();
    }, [apiUrl]);

    return { loading, data };
};
