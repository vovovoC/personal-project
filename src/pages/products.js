import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { ProductListToolbar } from "../components/product/product-list-toolbar";
import { ProductCard } from "../components/product/product-card";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState, useMemo } from "react";
import db from "src/shared/lib/firebase";
import { collection, getDoc, getDocs } from "firebase/firestore/lite";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/store/constants";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const busket = useSelector((state) => {
    return state.busket.busket;
  });
  useEffect(() => {
    const cities = collection(db, "cities");
    getDocs(cities).then((res) => {
      setProducts(res.docs.map((res) => res.data()));
    });
    dispatch({
      type: actions.SET_BUSKET,
      payload: window.localStorage.getItem("busket") ? window.localStorage.getItem("busket") : {},
    });
  }, []);
  const addToBusket = (obj, id) => {
    let cur = window.localStorage.getItem("busket");
    if (cur) {
      cur = JSON.parse(cur);
      cur[id] = obj;
      window.localStorage.setItem("busket", JSON.stringify(cur));
    } else {
      window.localStorage.setItem("busket", JSON.stringify({ [id]: obj }));
    }
    dispatch({
      type: actions.ADD_BUSKET,
      payload: { ...obj, id },
    });
  };
  const removeFromBusket = (id) => {
    const store = window.localStorage;
    const cur = JSON.parse(store.getItem("busket"));
    delete cur[id];
    window.localStorage.setItem("busket", JSON.stringify(cur));
    dispatch({
      type: actions.REMOVE_BUSKET,
      payload: id,
    });
  };
  const onRadioGroupChange = (e) => {
    const copyProducts = [...products];
    copyProducts.sort(function (a, b) {
      return a[e.target.value] - b[e.target.value];
    });
    setProducts(copyProducts);
  };
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar onRadioGroupChange={onRadioGroupChange} />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {products.map((product, id) => (
                <Grid item key={id} lg={3} md={4} xs={12}>
                  <ProductCard
                    product={product}
                    id={id}
                    dispatch={dispatch}
                    busket={busket}
                    removeFromBusket={removeFromBusket}
                    addToBusket={addToBusket}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;
