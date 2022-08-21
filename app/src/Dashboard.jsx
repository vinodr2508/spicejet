import * as React from 'react';
import {useState, useRef, useEffect} from "react";
import { confirmAlert } from    'react-confirm-alert'; // Import
import { useNavigate } from "react-router-dom";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Table, TableBody, TableCell, TableContainer,TableHead, TableRow,Paper,  Box,Button, TextField, Select, MenuItem, Modal, Grid, IconButton, Typography, LinearProgress} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider,createTheme } from '@mui/material/styles';

/**
 * Style Setup for container
 **/
const container ={
    maxWidth: 800, margin: "50px auto"
}

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #ccc',
    boxShadow: 24,
    p: 4,
};
const error= {
    color: '#F00F00',
}

/**
 *  Theme Setup for Color Palette
 **/
const theme = createTheme({
    palette: {
        primary: {
            light: '#ABC9FF',
            main: '#5E7BFD',
            dark: '#3A53A2',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

/**
 *  Default Products
 **/
const rows = [{product: 'water', type: 'drinks', quantity: 10, unitPrice: 1},
    {product: 'chicken wings', type: 'food', quantity: 3, unitPrice: 5},
    {product: 'steak', type: 'food', quantity: 1, unitPrice: 9},
    {product: 'coffee', type: 'drinks', quantity: 4, unitPrice: 2},
    {product: 'wine bottle', type: 'drinks', quantity: 1, unitPrice: 7}];

/**
 * Component Name: Dashboard Component
 * Description:  Listing/Add/Delete Products
 * Parameters: No Parameters
 **/
export default function Dashboard() {
    const [productList, setProductList] = useState(rows);
    const [newProduct, setNewProduct] = useState({product: '', type: '', quantity: '', unitPrice: ''},)
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated"));
    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoader] = useState(0);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const productRef = useRef(null);
    const typeRef = useRef(null);
    const quantityRef = useRef(null);
    const unitPriceRef = useRef(null);

    /**
     * Function Name: handleOpen
     * Description:  To Open Model Popup
     * Parameters: No Parameters
     **/
    const handleOpen = () =>  setOpen(true);

    /**
     * Function Name: handleChange
     * Description:  To maintain input fields events/values
     * Parameters: No Parameters
     **/
    const handleChange = e => {
        setErrorMessage('');
        setNewProduct({
            ...newProduct,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    /**
     * Function Name: handleSubmit
     * Description:  Submit Form Data/Handled Custom Error message [Add Product]
     * Parameters: No Parameters
     **/
    const handleSubmit = e => {
        e.preventDefault()
        if(newProduct.product.length === 0){
            setErrorMessage(`product filed is required.`);
            return false;
        }
        if( !findDuplicate(productList, newProduct.product)) {
            setLoader(1);
            handleClose();
            window.setTimeout(function(){
                setErrorMessage('');
                setProductList((productList) => {
                    return [...productList, newProduct]
                })
                setLoader(0);
            }, 1000);
        } else {
            setErrorMessage(`${newProduct.product} product is already exist.`);
        }

    };

    /**
     * Function Name: findDuplicate
     * Description:  To check if product is already exist or not
     * Parameters:
     *      obj,Type : Object
     *      Val,Type : String
     **/
    const findDuplicate = ((obj, val) => {
        let index = obj.findIndex(e => e.product.toLowerCase() === val.toLowerCase());
        return (index !== -1)  ? true : false;
    })

    /**
     * Function Name: handleClose
     * Description:  To Close Model Popup, and Set error message to blank
     * Parameters: No Parameters
     **/
    const handleClose = () => {
        setErrorMessage('');
        setOpen(false)
    };

    /**
     * Function Name: deleteProduct
     * Description:  Once Confirm it will Delete the product and re-arrage the product list
     * Parameters: id
     **/
    const deleteProduct = (id) => {
        setLoader(1); // to animate effect after delete item
        window.setTimeout(function(){
            // You'd want an exit condition here
            setProductList((productList) =>{
                return productList.filter((productVal, productIndex) =>{
                    return productIndex !== id;
                })
            })
            setLoader(0);
        }, 1000);
    }
    /**
     * Function Name: deleteItems
     * Description:  To Confirm Delete Item
     * Parameters: id
     **/
    const deleteItems = (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [{label: 'Yes', onClick: () => deleteProduct(id)},{label: 'No',}]
        });
    }

    /**
     * Function Name: Logout
     * Description: unset the Local Storage Values
     * Parameters: No Parameters
     **/
    const logout = () => {
        setAuthenticated(false);
    }

    /**
     * Hook Name: useEffect
     * Description: After Click on logout button it navigate back to login screen
     * Parameters: No Parameters
     **/
    useEffect(()=>{
        if(authenticated===false){
            navigate("/");
        }
    })

    return (
        <>
            <ThemeProvider theme={theme} >
            <Box sx={container} >
                <Typography gutterBottom variant="h5" component="div" sx={{mr:1, mb:2}}>
                    <div>
                        <Grid item xs={6} p={1}  display="flex" justifyContent="flex-end" alignItems="flex-end" style={{cursor:"pointer",color:theme.palette.secondary.dark}} >
                            <PowerSettingsNewIcon titleAccess="Logout"  onClick={()=>logout()}/>
                        </Grid>
                        <Grid item xs={6} p={1} >
                            <h4 style={{textAlign:"center", color: theme.palette.primary.dark}}>WELCOME {localStorage.getItem("username").toUpperCase()}</h4>
                        </Grid>
                    </div>
                    <div>
                        Products Listing
                        <IconButton edge="end" aria-label="add food" sx={{ float:"right" ,color:theme.palette.primary.main}} onClick={handleOpen}>
                            <AddCircleOutlineIcon  titleAccess="Add Product" />
                        </IconButton>
                        {loader ? (
                            <>
                                <Box sx={{ width: '100%', p:2 }}>
                                    <LinearProgress />
                                </Box>
                            </>
                        ) : ('')}
                    </div>
                </Typography>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="food table">
                        <TableHead style={{ backgroundColor: theme.palette.primary.dark}}>
                            <TableRow >
                                <TableCell style={ {color:theme.palette.primary.contrastText}}>Product</TableCell>
                                <TableCell style={ {color:theme.palette.primary.contrastText}} align="right">Type</TableCell>
                                <TableCell style={ {color:theme.palette.primary.contrastText}} align="right">Quantity</TableCell>
                                <TableCell style={ {color:theme.palette.primary.contrastText}} align="right">Unit&nbsp;Price</TableCell>
                                <TableCell style={ {color:theme.palette.primary.contrastText}} align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productList.map((productList, index) => (
                                <TableRow
                                    key={index} id={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(even)': {backgroundColor: theme.palette.primary.light,}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {productList.product}
                                    </TableCell>
                                    <TableCell align="right">{productList.type}</TableCell>
                                    <TableCell align="right">{productList.quantity}</TableCell>
                                    <TableCell align="right">{productList.unitPrice}</TableCell>
                                    <TableCell align="right">
                                        <IconButton  style={{color:theme.palette.secondary.main}} edge="end" aria-label="delete" onClick={()=>{
                                            deleteItems(index)
                                        }}>
                                            <DeleteIcon titleAccess="Delete Product"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ThemeProvider>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton onClick={handleClose} sx={{position: "absolute",top: "0", right: "0"}} >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Products
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid item  p={1}>
                                <TextField fullWidth
                                           label={"Product"} //optional
                                           onChange={handleChange}
                                           name="product"
                                           ref={productRef}

                                />
                                <Typography sx={error}>{errorMessage}</Typography>
                            </Grid>

                            <Grid item p={1}>
                                <Select fullWidth  name="type"  label={"Type"}  onChange={handleChange} ref={typeRef}>
                                    <MenuItem key="1" value="food">
                                        food
                                    </MenuItem>
                                    <MenuItem key="2" value="drinks">
                                        drinks
                                    </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item  p={1}>
                                <TextField fullWidth
                                           id="outlined-number"
                                           name="quantity"
                                           label="Qty"
                                           type="number"
                                           InputLabelProps={{
                                               shrink: true,
                                           }}
                                           onChange={handleChange}
                                           ref={quantityRef}
                                />
                            </Grid>
                            <Grid item  p={1}>
                                <TextField fullWidth
                                           id="outlined-number"
                                           name="unitPrice"
                                           label="Unit Price"
                                           type="number"
                                           InputLabelProps={{
                                               shrink: true,
                                           }}
                                           onChange={handleChange}
                                           ref={unitPriceRef}
                                />
                            </Grid>
                            <Grid item xs={12} p={1}  display="flex" justifyContent="flex-end" alignItems="flex-end">
                                <Button type="submit" variant="contained">Submit</Button>
                            </Grid>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}