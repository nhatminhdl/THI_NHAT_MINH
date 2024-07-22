import axiosClient from "./axiosClient";

const tokenPricesApi = {
    getTokenPrice: async (params) => {
        const url = 'https://interview.switcheo.com/prices.json'
        return await axiosClient.get(url, {
            params,
        });
    }
}

export default tokenPricesApi