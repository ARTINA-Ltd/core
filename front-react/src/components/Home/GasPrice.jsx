import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Home.css"; // Make sure to import your CSS file

const GasPrice = ({ className = "" }) => {
    const [gasPrice, setGasPrice] = useState(null);
    const [averageTx, setAverageTx] = useState(null);
    const [averageTime, setAverageTime] = useState(null);

    useEffect(() => {
        const settingsFile = require('../../settings.json');
        const apiKey = settingsFile.OWLRACLE_API_KEY;
        console.log('API Key:', apiKey);

        // Fetch gas price data from Owlracle API using Axios
        axios
            .get('https://api.owlracle.info/v4/poly/gas?apikey=' + apiKey)
            .then((response) => {
                const gas_price = response.data.avgGas;
                const averageTx = response.data.avgTx;
                const averageTime = response.data.avgTime;

                // Make the gas price to be nnnn.nn format
                const gas = gas_price.toFixed(2);
                const tx = averageTx.toFixed(2);
                const time = averageTime.toFixed(2);

                console.log('Gas price:', gas_price);
                // Set the gas price in the state
                setGasPrice(gas);
                setAverageTx(tx);
                setAverageTime(time);
            })
            .catch((error) => {
                console.error('Error fetching gas price:', error);
            });
    }, []);


    return (
        <div className={`${className} flex justify-center lg:my-10`}>
            <div className="w-full flex flex-col items-center text-black">
                <div className="font-b9 text-[40px] sm:text-[30px]">
                    محاسبه Gas Fee
                </div>

                <div className="flex-col w-full justify-center items-center">
                    <div className="mt-8 font-b5 text-[25px] text-center mb-5 sm:text-[15px]">
                        میزان Gas Fee در شبکه پلیگان <div className="font-b7">{gasPrice} Gwei</div>
                    </div>
                    <div className="flex justify-center items-center mt-4 font-b5 text-[25px] text-center mb-10">
                        <div className="mt-4 font-b5 text-[25px] text-center mb-5 ml-8 sm:text-[15px]">
                            میانگین تراکنش در شبکه پلیگان <div className="font-b7">{averageTx} Gwei</div>
                        </div>
                        <div className="mt-4 font-b5 text-[25px] text-center mb-5 mr-8 sm:text-[15px]">
                            میانگین زمان تراکنش در شبکه پلیگان <div className="font-b7">{averageTime} ثانیه</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GasPrice;
