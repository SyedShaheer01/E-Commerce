import DrawerAppBar from "../components/AppBar"
import MultiActionAreaCard from "../components/Card"
import axios from 'axios'
import { useEffect, useState } from "react"
import BasicModal from "./modal";
import { useSearchParams } from 'react-router-dom'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './cart.css'


const useStyles = makeStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'green',
            },
            '&:hover fieldset': {
                borderColor: 'green',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
});





function Home() {

    const [Sort, setSort] = React.useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [change, setChange] = useState('');


    const [detail, setDetail] = useState({});

    useEffect(() => {
        const category = searchParams.get('category')
        if (!category || category == 'all') {

            axios('https://fakestoreapi.com/products')
                .then((res) => setProducts(res.data))
                .catch((err) => console.log(err))



        }
    }, [searchParams])
    // console.log("products",products)

    useEffect(() => {
        if (!change) {

            axios('https://fakestoreapi.com/products')
                .then((res) => setProducts(res.data))
                .catch((err) => console.log(err))
        }

    }, [change])


    useEffect(() => {
        const category = searchParams.get('category')
        if (category && category !== 'all') {

            axios(`https://fakestoreapi.com/products/category/${category}`)
                .then((res) => setProducts(res.data))
                .catch((err) => console.log(err))
            console.log(category)
        }




    }, [searchParams, change])

    const viewDetails = (id) => {
        axios(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                setDetail(res.data)
                setOpen(true)

            })
            .catch((err) => console.log(err))
        console.log(id)



    }
    const sorting = () => {

        let data = [...products]
        if (data.length > 0) {

            let result = data.sort((a, b) => a.title.localeCompare(b.title))
            setProducts(result)
        }
    }

    const numSorting = () => {
        let numData = [...products]
        if (numData.length > 0) {

            let numresult = numData.sort((a, b) => a.price - b.price)
            setProducts(numresult)
        }


    }
    const descSorting = () => {
        let descData = [...products]
        if (descData.length > 0) {

            let descResult = descData.sort((a, b) => b.title.localeCompare(a.title))
            setProducts(descResult)
        }


    }

    const changeHandler = (e) => {

        setChange(e.target.value)
        let data = [...products]

        if (change) {

            let value = data.filter((item) => item.title.toLowerCase().includes(change))
            setProducts(value)
        }
       


    }

    const classes = useStyles();


    return (
        <div style={{ padding: 20 }}>

            <DrawerAppBar detail={detail} product={products} />

            <div className="two-form">


                <Stack id="form1" className={classes.root} spacing={2} sx={{ width: 300, paddingLeft: "30px" }}>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={products.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField

                                onChange={changeHandler}
                                value={change}
                                className="Search-Products"
                                {...params}
                                label="Search Product"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />
                        )}
                    />
                </Stack>

                <FormControl id="sort-form" className={classes.root} sx={{ m: 3, minWidth: 160 }} size="small">
                    <InputLabel className={classes.root} id="demo-select-small-label">Sort Products</InputLabel>
                    <Select
                        className={classes.root}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={Sort}
                        label="Sort Products"
                        onChange={handleChange}
                    >
                        {/* <MenuItem value="">
                        </MenuItem> */}
                        <MenuItem onClick={sorting} value={"A to Z"}>(A to Z)</MenuItem>
                        <MenuItem onClick={numSorting} value={"#"}>(Lowest To Highest $)</MenuItem>
                        <MenuItem onClick={descSorting} value={"Z to A"}>(Z to A)</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <BasicModal products={products} detail={detail} open={open} handleClose={() => { setOpen(false) }} />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {products.map((v, i) => {

                    return <MultiActionAreaCard product={v} key={i} viewDetails={viewDetails} />

                })}
            </div>


        </div>


    )





}
export default Home