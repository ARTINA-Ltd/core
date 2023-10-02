import { React, useState, useEffect } from "react";
import axios from "axios";
import "./Home.css"; // Make sure to import your CSS file

const GasPrice = ({ className = "" }) => {
    const [gasPrice, setGasPrice] = useState(null);

    useEffect(() => {
        const settingsFile = require('../../settings.json');
        const apiKey = settingsFile.OWLRACLE_API_KEY;
        console.log('API Key:', apiKey);

        // Fetch gas price data from Owlracle API using Axios
        axios
            .get('https://api.owlracle.info/v4/poly/gas?apikey=' + apiKey)
            .then((response) => {
                const gas_price = response.data.avgGas;
                // Make the gas price to be nnnn.nn format
                const gas = gas_price.toFixed(2);

                console.log('Gas price:', gas_price);
                // Set the gas price in the state
                setGasPrice(gas);
            })
            .catch((error) => {
                console.error('Error fetching gas price:', error);
            });
    }, []);


    return (
        <div className={`${className} flex justify-center lg:my-10`}>
            <div className="w-full flex flex-col items-center text-black">
                <div className="font-b9 text-[40px] sm:text-[30px]">
                    محاسبه هزینه گاز
                </div>

                <div className="flex w-full justify-center items-center">
                    <div className="mt-8 font-b5 text-[25px] text-center mb-10">
                        میزان هزینه گاز در شبکه پلیگان: {gasPrice}
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Ethereum"
                        role="img"
                        viewBox="0 50 512 512"
                        width={"2em"}
                    >
                        <rect
                            width="512"
                            height="512"
                            rx="15%"
                            fill="#ffffff"
                        />
                        <path fill="#3C3C3B" d="m256 362v107l131-185z" />
                        <path
                            fill="#343434"
                            d="m256 41l131 218-131 78-132-78"
                        />
                        <path
                            fill="#8C8C8C"
                            d="m256 41v158l-132 60m0 25l132 78v107"
                        />
                        <path fill="#141414" d="m256 199v138l131-78" />
                        <path fill="#393939" d="m124 259l132-60v138" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default GasPrice;
