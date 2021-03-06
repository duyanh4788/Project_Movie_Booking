import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import {
  GET_CINEMA_DROPDOWNS,
  GET_LIST_MOVIE_DROPDOWNS,
  GET_DATE_DROPDOWNS,
} from "../constants/dropdown.constant";

export const getListMovieDropDowns = (maNhom) => {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "GET",
        url: `${DOMAIN}QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`,
      });
      dispatch({
        type: GET_LIST_MOVIE_DROPDOWNS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCinemaDropDownsWithCode = (maPhim) => {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "GET",
        url: `${DOMAIN}QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
      });
      dispatch({
        type: GET_CINEMA_DROPDOWNS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setDataDropDownsWithCode = (dataNull) => {
  return {
    type: GET_CINEMA_DROPDOWNS,
    payload: dataNull,
  }
}

export const getDateDropDowns = (lichChieuPhim) => {
  return {
    type: GET_DATE_DROPDOWNS,
    payload: lichChieuPhim
  }
}

