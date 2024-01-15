// Comparison.js
import React, { useEffect, useState } from 'react';
// import BubbleChart from "../components/pieChart.js";
import BarChart from '../components/barChart';
import './Comparison.css';
import { useLocation } from 'react-router-dom';
import PieChart from '../components/pieChart.js';
import { FormGroup, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { endpoints } from '../endpoints';

export default function Comparison() {
    const location = useLocation();
    const { userData } = location.state || {};

    const [userDataFormatted, setUserDataFormatted] = useState({});
    const [selectedPostcode, setSelectedPostcode] = useState('');
    const postcodeData = [
        { name: 'Hallam', zip: '3803' },
        { name: 'Narre Warren North', zip: '3804' },
        { name: 'Berwick and Harkaway', zip: '3806' },
        { name: 'Pearcedale', zip: '3912' },
        { name: 'Lynbrook and Lyndhurst', zip: '3975' },
        { name: 'Hampton Park', zip: '3976' },
        { name: 'Botanic Ridge', zip: '3977' },
        { name: 'Doveton and Eumemmerring', zip: '3177' },
        { name: 'Endeavour Hills', zip: '3802' },
        { name: 'Narre Warren and Narre Warren South', zip: '3805' },
        { name: 'Blind Bight', zip: '3980' },
        { name: 'Beaconsfield', zip: '3807' },
        { name: 'Clyde and Clyde North', zip: '3978' },
        { name: 'Lysterfield South', zip: '3156' }
    ];
    const [comparisonData, setComparisonData] = useState({});
    const handlePostcodeChange = event => {
        setSelectedPostcode(event.target.value);
    };

    const handleCompare = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://www.tech4tomorrow.me',
            },
            params: {
                postcode: selectedPostcode.toString(),
            }
        };
        axios.get(endpoints.compare, config).then(res => {

            setComparisonData(res.data);
            setBarChartVisible(true);
        }).catch(err => {
            console.log(err);
        });

    }


    useEffect(() => {
        window.scrollTo(0, 0);
        if (userData) {
            const electricity = parseFloat(userData.energy.electricityPercentage) || 0;
            const electricityc02 = parseFloat(userData.energy.electricityCarbonFootprint) || 0;
            const gas = parseFloat(userData.energy.gasPercentage) || 0;
            const gasc02 = parseFloat(userData.energy.gasCarbonFootprint) || 0;
            const water = parseFloat(userData.water.percentage) || 0;
            const waterC02 = parseFloat(userData.water.waterCarbonFootprint) || 0;
            const transport = parseFloat(userData.transportation.percentage) || 0;
            const transportc02 = parseFloat(userData.transportation.totalTransportationCarbonFootprint) || 0;
            const carbonFootprint = parseFloat(userData.totalCarbonFootprint) || 0;




            const formatted = {
                Electricity: electricity, // electricity %
                ElectricityC02: electricityc02, // electricity C02
                Gas: gas,
                Gasc02: gasc02,
                Water: water,
                WaterC02: waterC02,
                Transport: transport,
                TransportC02: transportc02,
                Footprint: carbonFootprint
            };

            setUserDataFormatted(formatted);
        }
    }, [userData]);


    const [isBarChartVisible, setBarChartVisible] = useState(false);
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;



    const data = [
        { label: "Electricity", radius: userDataFormatted.ElectricityC02, x: centerX, y: centerY },
        { label: "Gas", radius: userDataFormatted.Gasc02, x: centerX, y: centerY },
        { label: "Water", radius: userDataFormatted.WaterC02, x: centerX, y: centerY },
        { label: "Transport", radius: userDataFormatted.TransportC02, x: centerX, y: centerY }
    ];



    const dataWithPercentage = data.map(d => ({
        ...d,
        percentage: ((d.radius / userDataFormatted.Footprint) * 100).toFixed(0)
    }));



    const data2 = [
        { label: "Electricity", radius: userDataFormatted.ElectricityC02, compare: comparisonData.avgElectricty },
        { label: "Gas", radius: userDataFormatted.Gasc02, compare: comparisonData.avgGas },
        { label: "Total", radius: userDataFormatted.ElectricityC02 + userDataFormatted.Gasc02, compare: comparisonData.avgTotalEmission }
    ]

    return (
        <React.Fragment>
            <div className="your_carbon_fp">
                <p>Your Total Carbon Footprint is:</p>
            </div>
            <div className="co2_text">
                <p>{userDataFormatted.Footprint} KG's 
of CO2e</p>
            </div>
            {/* <div className="pie-chart-container"> */}
            <Grid item xs={12} md={6}>
                <PieChart data={dataWithPercentage} />
            </Grid>
                
            {/* </div> */}
            <div className="compare_cons">
                <p>Compare consumption</p>
                <div className="postcode_container">
                    <p>Suburb:</p>
                    <FormGroup>
                        <FormControl>
                            <InputLabel>Select Postcode</InputLabel>
                            <Select
                                value={selectedPostcode}
                                onChange={handlePostcodeChange}
                                label="Select Postcode"
                                style={{ minWidth: '250px', fontSize: '25px' }}
                            >
                                {postcodeData.map(postcode => (
                                    <MenuItem key={postcode.zip} value={postcode.zip} style={{ fontSize: '25px' }}>
                                        {postcode.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </FormGroup>

                    <button onClick={handleCompare}>GO</button>
                </div>
            </div>
            <div className="add_postcde_txt"> Add the suburb you would like to compare your consumption with.</div>
            {isBarChartVisible && (
                <div className="bar-chart-container">
                    <BarChart data={data2} />
                </div>
            )}
        </React.Fragment>
    );
}
