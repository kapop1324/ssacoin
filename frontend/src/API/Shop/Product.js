import axios from 'axios';

const ShopAllProductsApi = async () => {
  try {
    const response = await axios.get('http://j5c202.p.ssafy.io:8080/shop');
    return {
      res: response.data.productList,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default ShopAllProductsApi;
