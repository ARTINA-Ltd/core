import 'tw-elements';

function Price() {
    const Name = 'تابلو شعر'
    const Creator = 'مهدی'
    const view = '16'
    const favorites = '20'
    return <>
        <div>
        <div className={"container"}>
            <h2 className={"flex justify-start text-5xl font-bold mb-8"}>{Name}</h2>
            <div className={"flex justify-between mt-6 font-bold opacity-75 text-3xl"}>
                <p>ساخته شده توسط {Creator}</p>


                <p>بازید {view}</p>

                <p>مورد علاقه  {favorites}</p>
            </div>
        </div>

        <div className="accordion ml-2 mr-2 text-2xl mt-14" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header " id="headingOne">
                    <button className="accordion-button text-3xl " type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        تاریخچه قیمت
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the
                                                                                  collapse plugin adds the appropriate
                                                                                  classes that we use to style each
                                                                                  element. These classes control the
                                                                                  overall appearance, as well as the
                                                                                  showing and hiding via CSS
                                                                                  transitions. You can modify any of
                                                                                  this with custom CSS or overriding our
                                                                                  default variables. It's also worth
                                                                                  noting that just about any HTML can go
                                                                                  within
                                                                                  the <code>.accordion-body</code>,
                                                                                  though the transition does limit
                                                                                  overflow.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed  text-3xl" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        خاصیت ها
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                                                                                   collapse plugin adds the appropriate
                                                                                   classes that we use to style each
                                                                                   element. These classes control the
                                                                                   overall appearance, as well as the
                                                                                   showing and hiding via CSS
                                                                                   transitions. You can modify any of
                                                                                   this with custom CSS or overriding
                                                                                   our default variables. It's also
                                                                                   worth noting that just about any HTML
                                                                                   can go within
                                                                                   the <code>.accordion-body</code>,
                                                                                   though the transition does limit
                                                                                   overflow.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed  text-3xl" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                       پیشنهاد ها
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                                                                                  collapse plugin adds the appropriate
                                                                                  classes that we use to style each
                                                                                  element. These classes control the
                                                                                  overall appearance, as well as the
                                                                                  showing and hiding via CSS
                                                                                  transitions. You can modify any of
                                                                                  this with custom CSS or overriding our
                                                                                  default variables. It's also worth
                                                                                  noting that just about any HTML can go
                                                                                  within
                                                                                  the <code>.accordion-body</code>,
                                                                                  though the transition does limit
                                                                                  overflow.
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>

}

export default Price;