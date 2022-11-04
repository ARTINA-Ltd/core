function BankAccount() {
    const BankAccount = [
        "6037997500035382",
        "017000002365479632145"
    ]
    return <>
        <div className="row container shadow-xl rounded-2xl">
            <p className={"font-extrabold text-lg"}>حساب های بانکی</p>

            <div className="col-6">
                <div className={"row"}>
                <p className={"col-6"}> کارت های بانکی</p>
                <button className={"col-2 bg-blue-500 text-white text-lg font-bold rounded-2xl"}>  افزودن</button>
                </div>
                <p className={"flex justify-around mt-4"}>{BankAccount[0]}</p>
            </div>


            <div className="col-6">
                <div className={"row"}>
                    <p className={"col-6"}> شماره های شبا</p>
                    <button className={" col-2 bg-blue-500 text-white text-lg font-bold rounded-2xl"}>  افزودن</button>
                </div>
                <p className={"flex justify-around mt-4"}>{BankAccount[1]}</p>
            </div>
        </div>
    </>
}

export default BankAccount;