import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hiddenFormMovie,
  updateListMovieManagement,
} from "../../store/actions/movieManagement.action";
import "./scss/FormEditMovie.css";
// date format
import * as dayjs from "dayjs";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { setDataErrorToZero } from "../../store/actions/messageSnackbar.action";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FormEditMovie = (props) => {
  const dispatch = useDispatch();
  // snackbar
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // snackbar

  // show status
  const statusCode = useSelector(
    (state) => state.MessageSnackbarReducer.statusCode
  );
  const errorMessage = useSelector(
    (state) => state.MessageSnackbarReducer.errorMessage
  );
  // show status
  useEffect(() => {
    if (statusCode === 500 || statusCode === 200) {
      handleClick();
    }
  }, [statusCode]);

  const infoMovie = useSelector((state) => {
    return state.MovieManagementReducer.infoMovie;
  });

  const [editMovie, setEditMovie] = useState({
    biDanh: infoMovie.biDanh,
    danhGia: infoMovie.danhGia,
    hinhAnh: {},
    maNhom: infoMovie.maNhom,
    maPhim: infoMovie.maPhim,
    moTa: infoMovie.moTa,
    ngayKhoiChieu: infoMovie.ngayKhoiChieu,
    tenPhim: infoMovie.tenPhim,
    trailer: infoMovie.trailer,
  });

  const [validMovie] = useState({
    biDanh: "",
    danhGia: "",
    hinhAnh: "",
    maNhom: "",
    maPhim: "",
    moTa: "",
    ngayKhoiChieu: "",
    tenPhim: "",
    trailer: "",
  });

  const [validSubmit, setValidSubmit] = useState(true);

  useEffect(() => {
    validButtonSubmit();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMovie({ ...editMovie, [name]: value });
    // check empty
    if (value.trim() === "") {
      validMovie[name] = "Do Not Empty";
    } else {
      validMovie[name] = "";
    }
  };

  const handleChangeImage = (e) => {
    if (e.target.name === "hinhAnh") {
      setEditMovie({ ...editMovie, hinhAnh: e.target.files[0] });
    }
  };

  const validButtonSubmit = () => {
    let valid = true;
    for (let key in validMovie) {
      if (validMovie[key] !== "" || editMovie[key] === "") {
        valid = false;
      }
    }
    setValidSubmit(valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (let key in editMovie) {
      formData.append(key, editMovie[key]);
    }
    dispatch(updateListMovieManagement(formData));
    dispatch(hiddenFormMovie("listUser"));
  };

  const hidenFormMovie = () => {
    dispatch(hiddenFormMovie("listUser"));
    dispatch(setDataErrorToZero(0));
  };

  return (
    <>
      <div className="wrapFromEdit">
        <Container maxWidth="md">
          <h5>Edit Movie</h5>
          <form onSubmit={handleSubmit}>
            <label>M?? Phim</label>
            <input
              onChange={handleChange}
              value={editMovie.maPhim}
              disabled
              type="text"
            />
            <span>{validMovie.maPhim}</span>

            <label>T??n Phim</label>
            <input
              onChange={handleChange}
              value={editMovie.tenPhim}
              placeholder="T??n Phim"
              name="tenPhim"
              type="text"
            />
            <span>{validMovie.tenPhim}</span>
            <label>Ng??y C??ng Chi???u</label>
            <input
              type="text"
              disabled
              value={`Ng??y C??ng Chi???u : ${dayjs(infoMovie.ngayKhoiChieu).format(
                "DD-MM-YYYY"
              )}`}
            />
            <span>{validMovie.ngayKhoiChieu}</span>
            <label>M?? Nh??m</label>
            <input value={editMovie.maNhom} disabled type="text" />
            <label>????nh Gi??</label>
            <input
              value={editMovie.danhGia}
              placeholder="????nh Gi??"
              disabled
              type="danhGia"
            />
            <span>{validMovie.danhGia}</span>
            <label>B?? Danh</label>
            <input
              onChange={handleChange}
              value={editMovie.biDanh}
              placeholder="B?? Danh"
              name="biDanh"
            />
            <span>{validMovie.biDanh}</span>

            <p>H??nh ???nh</p>
            <img
              src={infoMovie.hinhAnh}
              alt={infoMovie.hinhAnh}
              style={{ width: "50px", height: "50px" }}
            />
            <input type="file" name="hinhAnh" onChange={handleChangeImage} />
            <span>{validMovie.hinhAnh}</span>

            <label>Trailer</label>
            <input
              onChange={handleChange}
              value={editMovie.trailer}
              placeholder="Trailer"
              name="trailer"
            />
            <span>{validMovie.trailer}</span>
            <p>M?? T???</p>
            <textarea
              onChange={handleChange}
              value={editMovie.moTa}
              placeholder="M?? T???"
              name="moTa"
            />
            <span>{validMovie.moTa}</span>

            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                style={{ cursor: "pointer", color: "red" }}
                onClick={hidenFormMovie}
              >
                Tr??? L???i
              </button>
              {validSubmit ? (
                <button type="submit" style={{ cursor: "pointer" }}>
                  Update
                </button>
              ) : (
                <button disabled style={{ cursor: "no-drop" }}>
                  Update
                </button>
              )}
            </div>
          </form>
        </Container>
      </div>
      {statusCode === 200 ? (
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            C???p Nh???t Th??nh C??ng
          </Alert>
        </Snackbar>
      ) : statusCode === 500 ? (
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default FormEditMovie;
