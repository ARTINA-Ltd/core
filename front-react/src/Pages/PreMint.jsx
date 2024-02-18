import React, { useState, useEffect } from "react";
import SimpleCard from "../components/Cards/UserDashboardCards/SimpleCard";
import TestLayout from "../Layouts/TestLayout";
import { useNavigate } from "react-router";
import { Dialog } from "primereact/dialog";
import SimpleInput from "../components/Inputs/SimpleInput";
import BorderButton from "../components/Buttons/BorderButton";
import axios from "axios";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";


const PreMint = () => {
    const navigate = useNavigate();
    const [collectionVisible, setCollectionVisible] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("");
    const [wallet, setWallet] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const PRIVATE_KEY = "045be0b52044ba0f842dea76a18ef921009a629e7c8ad114a51023c6acf50520";
    const SECRET_KEY = "dd0cZsTqYO9v8PJdRO8uuikrKvi6SpZKYbNdIqvn-d2-Df1QXTb9PUXUOJfO4OcJg9EUP3zQbx3jLJR1raQY9w";

    useEffect(() => {
        axios
            .get(`https://api.artina.org/api/account/wallet/get_wallet_user/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authTokens")}`,
                },
            })
            .then(res => {
                console.log(res);
                setWallet(res.data.address);
            });
    }, []);

    const handleAddNewCollectionProperty = async () => {
        console.log("Wallet: ", wallet);

        try {
            console.log("Starting:");
            const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, "polygon", {
                secretKey: SECRET_KEY,
            });
            const address = await sdk.deployer.deployBuiltInContract("nft-collection", {
                name: newCollectionName,
                primary_sale_recipient: "0x2293221D7c357FB04De9c7D0dEeBcA427407429D",
            });
            console.log("Deployed at", address);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <TestLayout className="">
                <div className="flex gap-5 items-start lg:flex-col lg:items-center">
                    <SimpleCard className="w-full flex relative gap-5 items-center overflow-hidden h-auto lg:flex-col-reverse">
                        <div className="w-1/2 h-full flex-col items-center justify-center lg:w-full">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35"
                                    height="35"
                                    fill="#6c63ff"
                                    class="bi bi-opencollective"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fill-opacity=".4"
                                        d="M12.995 8.195c0 .937-.312 1.912-.78 2.693l1.99 1.99c.976-1.327 1.6-2.966 1.6-4.683 0-1.795-.624-3.434-1.561-4.76l-2.068 2.028c.468.781.78 1.679.78 2.732z"
                                    />
                                    <path
                                        d="M8 13.151a4.995 4.995 0 1 1 0-9.99c1.015 0 1.951.273 2.732.82l1.95-2.03a7.805 7.805 0 1 0 .04 12.449l-1.951-2.03a5.07 5.07 0 0 1-2.732.781z"
                                    />
                                </svg>
                                <div className="text-5xl font-b6 justify-center text-right rounded-lg p-3 mb-4 text-indigo-600 md:text-3xl md:mb-0">
                                    ضرب اثر
                                </div>
                            </div>
                            <div
                                className="bg-indigo-400 flex rounded-2xl p-3 mb-3 justify-between"
                                onClick={() => navigate("/upload-page")}
                            >
                                <div className="cursor-pointer">
                                    <div className="flex items-center p-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="26"
                                            height="26"
                                            fill="currentColor"
                                            class="bi bi-box"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"
                                            />
                                        </svg>
                                        <div className="text-3xl font-bold justify-center p-2 md:text-lg">
                                            ضرب تک اثر
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold justify-center p-2 md:text-sm">
                                        چنانچه می‌خواهید یک اثر ضرب کنید کلیک کنید.
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="currentColor"
                                        class="bi bi-arrow-left-circle"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="bg-indigo-400 flex rounded-2xl p-3 mb-3 justify-between">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setCollectionVisible(true)}
                                >
                                    <div className="flex items-center p-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="26"
                                            height="26"
                                            fill="currentColor"
                                            class="bi bi-boxes"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"
                                            />
                                        </svg>
                                        <div className="text-3xl font-bold justify-center p-2 md:text-lg">
                                            ضرب کالکشن
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold justify-center p-2 md:text-sm">
                                        چنانچه می‌خواهید چند اثر در قالب کالکشن ضرب کنید کلیک کنید.
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="currentColor"
                                        class="bi bi-arrow-left-circle"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 h-full flex-col items-center justify-center lg:w-full">
                            <img
                                src="http://api.artina.org/static/images/00_testgif_V2ZOfKU.gif"
                                className=" object-cover m-auto rounded-2xl"
                                alt=""
                            />
                        </div>
                    </SimpleCard>
                </div>
            </TestLayout>
            <Dialog
                header="کالکشن جدید"
                visible={collectionVisible}
                style={{ direction: "rtl" }}
                className="w-[30rem] h-[15rem]"
                onHide={() => setCollectionVisible(false)}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3 items-center mt-4">
                        <SimpleInput
                            type="text"
                            title="اسم"
                            placeholder="مثلا: فرش"
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            value={newCollectionName}
                            defaultValue={null}
                        />
                    </div>
                    <div className="flex justify-between">
                        <BorderButton className="text-lg" size="sm" onClick={handleAddNewCollectionProperty}>
                            ثبت
                        </BorderButton>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default PreMint;