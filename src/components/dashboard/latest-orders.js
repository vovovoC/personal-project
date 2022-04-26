import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { SeverityPill } from "../severity-pill";
import { useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { doc, setDoc } from "firebase/firestore/lite";
import db from "src/shared/lib/firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  p: 4,
};

export const LatestOrders = (props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: () => {},
  });
  const { handleSubmit, getFieldProps } = formik;
  const [productOrders, setProductOrders] = useState([]);
  useEffect(() => {
    const items = window.localStorage.getItem("busket");
    if (items) {
      const parse = JSON.parse(items);
      setProductOrders(Object.keys(parse).map((res) => parse[res]));
    }
  }, []);
  const random = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  const onOrder = () => {
    const ordersAr = [];
    for (const data of productOrders) {
      ordersAr.push(
        setDoc(doc(db, "orders", random()), {
          product: {
            ...data,
          },
          ...formik.values,
        })
      );
    }
    Promise.all(ordersAr).then(() => {
      handleClose();
      window.localStorage.setItem("busket", "");
      setProductOrders([]);
    });
  };
  return (
    <>
      <Card {...props}>
        <CardHeader title="Store" />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name of product</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Cost
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productOrders.map((order, id) => (
                  <TableRow hover key={id}>
                    <TableCell width="50%">{order.name}</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>{order.price}$</TableCell>
                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                      {Array.from({ length: order.star }).map((i, key) => (
                        <StarIcon color="primary" key={key} />
                      ))}
                      {Array.from({ length: 3 - order.star }).map((i, key) => (
                        <StarBorderIcon color="primary" key={key} />
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {productOrders.length === 0 ? (
              <Typography sx={{ textAlign: "center", margin: "20px" }} variant="h6">
                Empty store
              </Typography>
            ) : null}
          </Box>
        </PerfectScrollbar>
        <Box
          textAlign={"center"}
          sx={{
            padding: "10px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            disabled={!productOrders.length}
          >
            Order
          </Button>
        </Box>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Fill form "}</DialogTitle>
        <DialogContent sx={{ padding: "0px 30px", marginTop: "10px" }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps("email")}
                />
                <TextField
                  fullWidth
                  autoComplete="firstName"
                  type="text"
                  label="First Name"
                  {...getFieldProps("firstName")}
                />
                <TextField
                  fullWidth
                  autoComplete="lastName"
                  type="lastName"
                  label="Last Name"
                  {...getFieldProps("lastName")}
                />
              </Stack>
            </Form>
          </FormikProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={onOrder} autoFocus>
            Order
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
