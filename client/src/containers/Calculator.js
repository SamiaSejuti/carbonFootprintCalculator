import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import "./Calculator.css"
import {
    TextField, Card, CardContent, Paper, CardActionArea
} from "@mui/material";
import { endpoints } from "../endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import images from '../assets/images';
import CustomAvatar from '../components/customAvatar';


export default function Calculator() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [energyFormData, setEnergyFormData] = useState({
        kWh: 0,
        MJ: 0,
    });

    const [waterFormData, setWaterFormData] = useState({
        kL: 0,
    });

    const [transportFormData, setTransportFormData] = useState({
        car: 0 ,
        train: 0 ,
        airplane: 0,
    });

    const handleEnergyInputChange = (event) => {
        const { name, value } = event.target;
        const regex = /^\d*$/;

        if (value === 0 || regex.test(value)) {
            setEnergyFormData({
                ...energyFormData,
                [name]: value,
            });
        }

    };

    const handlewaterInputChange = (event) => {
        const { name, value } = event.target;
        const regex = /^\d*$/;

        if (value === 0 || regex.test(value)) {
            setWaterFormData({
                ...waterFormData,
                [name]: value,
            });
        }
    };


    const handleTransportChange = (event) => {
        const { name, value } = event.target;
        const regex = /^\d*$/;

        if (value === 0 || regex.test(value)) {
            setTransportFormData({
                ...transportFormData,
                [name]: value,
            });
        }
    };

    const navigate = useNavigate();

    // // API call
    const handleCalculate = () => {
        const requestData = {
            electricityUsage: energyFormData.kWh,
            gasUsage: energyFormData.MJ,
            waterQuantity: waterFormData.kL,
            transportationCarbonFootprint: {
                car: transportFormData.car,
                train: transportFormData.train,
                airplane: transportFormData.airplane
            }
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://www.tech4tomorrow.me',
            },
        };
        
        axios.post(endpoints.calculate, requestData, config).then(response => {
            const userData = response.data;
            navigate('/comparison', { state: { userData } });
        }).catch(error => {
            console.error(error);
        });
    };


    return (
        <Grid container spacing={1} sx={{ mt: 3, textAlign: 'left', fontFamily: 'Monserrat'}}>
            <Grid item sx={{ width: '100%'}}>
                <Card elevation={3}>
                    <Box sx={{ pl: 3}}>
                    <Typography sx={{ color: 'white', textShadow: '-1px -1px 0 #077341, 1px -1px 0 #077341, -1px 1px 0 #077341, 1px 1px 0 #077341' }} variant='h3'>Energy</Typography>
                    <Typography sx={{ color: '#077341'}} variant='h6'>How much energy has your household used in the past month?</Typography>
                    </Box>     
                    <CardContent>
                        {/* <Box sx={{ alignItems: ''}}> */}
                            <FormGroup>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
                                    <CustomAvatar alt='electricity' image={images.electricity} label='Electricity' />
                                    <TextField id="outlined-basic" onChange={handleEnergyInputChange} value={energyFormData.kWh} name='kWh' label="kWh" variant="filled" />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
                                    <CustomAvatar alt='gas' image={images.gas} label='Natural Gas' />
                                    <TextField id="outlined-basic" onChange={handleEnergyInputChange} value={energyFormData.MJ} name='MJ' label="MJ" variant="filled" />
                                </Box>
                            </FormGroup>
                        {/* </Box> */}
                        
                    </CardContent>
                </Card>
            </Grid>
            <Grid item sx={{ width: '100%'}}>
                <Card sx={{ display: 'flex'}}>
                    <CardContent>
                        <Typography sx={{ color: 'white', textShadow: '-1px -1px 0 #077341, 1px -1px 0 #077341, -1px 1px 0 #077341, 1px 1px 0 #077341' }} variant='h3'>Water</Typography>
                        <Typography sx={{ color: '#077341'}} variant='h6'>How much water has your household used in the past month?</Typography>
                        <FormGroup>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <CustomAvatar alt='water' image={images.water} label='Water' />
                                <TextField id="outlined-basic" onChange={handlewaterInputChange} name='kL' label="kL" variant="filled" value={waterFormData.kL} />
                            </Box>                            
                        </FormGroup>
                    </CardContent>
                </Card>                    
            </Grid>
            <Grid item sx={{ width: '100%'}}>
                <Card elevation={3}>
                    
                    <CardContent>
                    <Typography sx={{ color: 'white', textShadow: '-1px -1px 0 #077341, 1px -1px 0 #077341, -1px 1px 0 #077341, 1px 1px 0 #077341' }} variant='h3'>Transport</Typography>
                    <Typography sx={{ color: '#077341'}} variant='h6'>How much did your household travel in each mode of transport over the past month?</Typography>
                        <FormGroup>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
                                <CustomAvatar alt='water' image={images.car} label='Vehicle' />
                                <TextField id="outlined-basic" onChange={handleTransportChange} name='car' label="km" variant="filled" value={transportFormData.car} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
                                <CustomAvatar alt='water' image={images.rail} label='Rail/Bus' />
                                <TextField id="outlined-basic" onChange={handleTransportChange} name='train' label="km" variant="filled" value={transportFormData.train} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
                                <CustomAvatar alt='water' image={images.plane} label='Airplane' />
                                <TextField id="outlined-basic" onChange={handleTransportChange} name='airplane' label="km" variant="filled" value={transportFormData.airplane} />
                            </Box>
                        </FormGroup>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item sx={{ width: '100%', textAlign: 'center', mb: 2}}>
                <Paper elevation={2} onClick={handleCalculate} sx={{ bgcolor: '#ff4d00', color: 'white', width: '100%'}}>
                <CardActionArea component="button">
                    <Typography variant='h5'>Calculate</Typography>
                </CardActionArea>
                </Paper>   
            </Grid>
        </Grid>
    );

}