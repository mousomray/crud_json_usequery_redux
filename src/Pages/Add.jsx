import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../Common/Layout'; // Import Layout 
import { addcustomer } from '../Reducers/apicall'; // Import Add Customer Function
import { useForm } from "react-hook-form"; // Import React Hook Form 
import { useNavigate } from "react-router-dom"; // Import Use Navigate
import { useSelector, useDispatch } from "react-redux"; // Import Use Dispatch
import { CircularProgress } from "@mui/material"; // Circle Loader 

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const Add = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { loading } = useSelector((state) => state?.Addcustomer);

    const onSubmit = async (data) => {

        const reg = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            pin: data.pin
        };

        try {
            const response = await dispatch(addcustomer(reg))
            console.log("Add Customer.....", response);
            reset();
            navigate("/show")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Layout>

                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 15,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <EditIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Add Customer
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            {...register("first_name", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "First Name must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.first_name && (
                                            <p style={{ color: 'red' }}>{errors.first_name.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="lastName"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            autoFocus
                                            {...register("last_name", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Last Name must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.last_name && (
                                            <p style={{ color: 'red' }}>{errors.last_name.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            {...register("email", {
                                                required: "This field is required",
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Email Pattern should be xyz@gmail.com",
                                                },
                                            })}
                                        />
                                        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="phone"
                                            label="Phone"
                                            {...register("phone", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 10,
                                                    message: "Phone number must be 10 characters"
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message: "Phone number must be 10 characters"
                                                }
                                            })}
                                        />
                                        {errors?.phone && (
                                            <p style={{ color: 'red' }}>{errors.phone.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="address"
                                            required
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            autoFocus
                                            {...register("address", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Address must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.address && (
                                            <p style={{ color: 'red' }}>{errors.address.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="city"
                                            required
                                            fullWidth
                                            id="city"
                                            label="City"
                                            autoFocus
                                            {...register("city", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "City must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.city && (
                                            <p style={{ color: 'red' }}>{errors.city.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="state"
                                            required
                                            fullWidth
                                            id="state"
                                            label="State"
                                            autoFocus
                                            {...register("state", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 3,
                                                    message: "State must be atleast 3 characters"
                                                }
                                            })}
                                        />
                                        {errors?.state && (
                                            <p style={{ color: 'red' }}>{errors.state.message}</p>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            id="pin"
                                            label="Pin Code"
                                            {...register("pin", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Pin Code Must be 6 characters"
                                                },
                                                maxLength: {
                                                    value: 6,
                                                    message: "Pin code must be 6 characters"
                                                }
                                            })}
                                        />
                                        {errors?.pin && (
                                            <p style={{ color: 'red' }}>{errors.pin.message}</p>
                                        )}
                                    </Grid>



                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                   {loading ? <CircularProgress color="inherit" /> : "Add"}
                                </Button>

                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Container>
                </ThemeProvider>

            </Layout>
        </>
    )
}

export default Add
