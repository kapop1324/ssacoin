import axios from 'axios';

const ShopProductsCategoryApi = async (props) => {
  try {
    const response = await axios.post('http://j5c202.p.ssafy.io:8080/shop/category', {
      productCategory: props,
    });
    return {
      res: response.data.productList,
    };
  } catch (response) {
    return {
      status: response.status,
    };
  }
};

export default ShopProductsCategoryApi;
