import axios, { AxiosError, AxiosResponse } from 'axios';
import { GET_PUBLIC_IMAGES } from '../types/images';
import { Dispatch } from 'redux';


const API_SERVER = process.env.REACT_APP_API_SERVER;

// GET IMAGES
export const getPublicImages = (pageNumber: number = 1) => (dispatch: Dispatch) => {
  axios.get(`${API_SERVER}/images/images/`, {
    params: {
      page: pageNumber,
    }
  })
    .then((response: AxiosResponse) => {
      dispatch({
        type: GET_PUBLIC_IMAGES,
        payload: response.data.results,
      });
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};