const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors({
    origin: 'https://www.tech4tomorrow.me',
    methods: 'GET,POST',
    credentials: false,
    exposedHeaders: ['Content-Length', 'Content-Type']
}));

// MySQL database credentials
const host = "carbonezero.mysql.database.azure.com";
const user = "Kshitijahire";
const password = "Onboardingproject2023";
const database = "carbonezero";

function connectToMysqlDatabase() {
    try {
        // Connection to the database with SSL option
        const connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database,
            ssl: {
                rejectUnauthorized: false
            }
        });

        // Check if the connection is successful
        connection.connect((err) => {
            if (err) {
                console.error('Connection failed.');
            } else {
                console.log('Connected to the MySQL database!');
            }
        });

        return connection;
    } catch (err) {
        console.error(`Error: ${err}`);
        return null;
    }
}

function storeDataInDatabase(connection, data) {
    try {
        const query = `
            INSERT INTO carbon_footprint_data
            (electricity_carbon_footprint, gas_carbon_footprint, transportation_carbon_footprint, water_carbon_footprint, total_carbon_footprint)
            VALUES (?, ?, ?, ?, ?)
        `;

        connection.query(query, data, (err, result) => {
            if (err) {
                console.error(`Error while storing data in the database: ${err}`);
            } else {
                console.log("Data stored in the database successfully!");
            }
        });
    } catch (err) {
        console.error(`Error while storing data in the database: ${err}`);
    }
}

app.use(express.json());

app.post('/api/calculate', (req, res) => {
    // Emission factors
    const emissionFactorElectricity = 0.5296; // kg CO2/kWh
    const emissionFactorGas = 0.069; // kg CO2/MJ
    const emissionFactorWater = 0.34; // kg CO2 per liter
    const emissionFactorVehicle = 2.3; // kg CO2/km
    const emissionFactorTrain = 0.02861; // kg CO2/km
    const emissionFactorAir = 0.115; // kg CO2/km

    // Get input data from the request sent by the front end
    const data = req.body;

    // Extract input values
    const electricityUsageKWh = data.electricityUsage;
    const gasUsageGJ = data.gasUsage;
    const waterQuantity = data.waterQuantity;

    // Calculate carbon footprint for electricity, gas, and water
    const electricityCarbonFootprint = electricityUsageKWh * emissionFactorElectricity;
    const gasCarbonFootprint = gasUsageGJ * emissionFactorGas;
    const waterCarbonFootprint = waterQuantity * emissionFactorWater;

    // Calculate total transportation carbon footprint
    const carDistanceKm = data.transportationCarbonFootprint.car;
    const trainDistanceKm = data.transportationCarbonFootprint.train;
    const airplaneDistanceKm = data.transportationCarbonFootprint.airplane;

    // Average fuel efficiency for car (in L/km)
    const averageFuelEfficiencyLPerKm = 10.6;

    const carCarbonFootprint = carDistanceKm * (averageFuelEfficiencyLPerKm / 100) * emissionFactorVehicle;
    const trainCarbonFootprint = trainDistanceKm * emissionFactorTrain;
    const airplaneCarbonFootprint = airplaneDistanceKm * emissionFactorAir;

    const transportationCarbonFootprint = (
        carCarbonFootprint +
        trainCarbonFootprint +
        airplaneCarbonFootprint
    );

    // Calculate the total carbon footprint (sum of all footprints)
    const totalCarbonFootprint = (
        electricityCarbonFootprint +
        gasCarbonFootprint +
        waterCarbonFootprint +
        transportationCarbonFootprint
    );

    // Store the data in the MySQL database
    const dbConnection = connectToMysqlDatabase();
    if (dbConnection) {
        const dataToStore = [
            electricityCarbonFootprint,
            gasCarbonFootprint,
            waterCarbonFootprint,
            transportationCarbonFootprint,
            totalCarbonFootprint
        ];
        storeDataInDatabase(dbConnection, dataToStore);

        // Close the database connection
        dbConnection.end();
    }

    // Calculate percentages
    const totalCarbonFootprintPercentage = 100;
    const electricityPercentage = (electricityCarbonFootprint / totalCarbonFootprint) * 100;
    const gasPercentage = (gasCarbonFootprint / totalCarbonFootprint) * 100;
    const waterPercentage = (waterCarbonFootprint / totalCarbonFootprint) * 100;
    const transportationPercentage = (transportationCarbonFootprint / totalCarbonFootprint) * 100;

    // Prepare the response data
    const responseData = {
        energy: {
            electricityCarbonFootprint: electricityCarbonFootprint.toFixed(2),
            gasCarbonFootprint: gasCarbonFootprint.toFixed(2),
            electricityPercentage: electricityPercentage.toFixed(2),
            gasPercentage: gasPercentage.toFixed(2),
        },
        water: {
            waterCarbonFootprint: waterCarbonFootprint.toFixed(2),
            percentage: waterPercentage.toFixed(2)
        },
        transportation: {
            carCarbonFootprint: carCarbonFootprint.toFixed(2),
            trainCarbonFootprint: trainCarbonFootprint.toFixed(2),
            airplaneCarbonFootprint: airplaneCarbonFootprint.toFixed(2),
            totalTransportationCarbonFootprint: transportationCarbonFootprint.toFixed(2),
            percentage: transportationPercentage.toFixed(2)
        },
        totalCarbonFootprint: totalCarbonFootprint.toFixed(2)
    };

    //  response data as JSON
    res.json(responseData);
});



//compare households
app.get("/api/carbonemissiondata", (req, res) => {
    const connection=connectToMysqlDatabase();
    let postcode = req.query.postcode;
    let query='';
    if(postcode!=null && postcode!=undefined && postcode!='')
    {
        query =`SELECT AverageEmissionspercustomer,Emissionsource FROM test WHERE postcode="${postcode}" AND year='2022';`;
    }
    else
    {
        res.status(400).json({ error: "Please provide a valid postcode in the query parameters." });
        return;
    }
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            if (result.length > 0) {
                let gasEmission= result.find(x=>x["Emissionsource"]=="Gas")["AverageEmissionspercustomer"];
                let electricityEmission=result.find(x=>x["Emissionsource"]=="Electricity")["AverageEmissionspercustomer"];
                let finalResultobj = {"avgTotalEmission":result[0]["AverageEmissionspercustomer"]+result[1]["AverageEmissionspercustomer"], "avgGas":gasEmission,"avgElectricty":electricityEmission}
                res.status(200).json(finalResultobj);
            } else {
                res.status(404).json({ error: 'No data found for the provided postcode.' });
            }
        }
    });
});




 //Endpoint to get a list of suburbs and their postcodes
app.get('/api/location', (req, res) => {
    const data = [
        { name: 'Hallam', zip: 3803},
        { name: 'Narre Warren North', zip: 3804},
        { name: 'Berwick and Harkaway', zip: 3806},
        { name: 'Pearcedale', zip: 3912},
        { name: 'Lynbrook and Lyndhurst', zip: 3975},
        { name: 'Hampton Park', zip: 3976},
        { name: 'Botanic Ridge', zip: 3977},
        { name: 'Doveton and Eumemmerring', zip: 3177},
        { name: 'Endeavour Hills', zip: 3802},
        { name: 'Narre Warren and Narre Warren South', zip: 3805},
        { name: 'Blind Bight', zip: 3980},
        { name: 'Beaconsfield', zip: 3807},
        { name: 'Clyde and Clyde North', zip: 3978},
        { name: 'Lysterfield South', zip: 3156}
    ];

    res.json(data);
});

//Authentication API endpoint
const validPassword = "happymushroom";
app.post("/api/authenticate", (req, res) => {
    const { password } = req.body;


    // Check if the password matches our team password
    if (password === validPassword) {
        // verification successful
        res.status(200).json({ message: "Verification successful." });
    } else {
        // Verification failed
        res.status(401).json({ error: "Verification failed. Invalid password." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
