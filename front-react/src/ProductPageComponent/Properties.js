import 'tw-elements';

function Properties() {
    return <>
        <div className="accordion mt-6 max-w-xl mr-48 sm:w-[200px] md:w-[400px] lg:w-[600px]  " id="accordionExample">
            <div className="accordion-item ">
                <h2 className="accordion-header bg-purple-900" id="headingOne">
                    <button className="accordion-button  text-2xl " type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOnee" aria-expanded="true" aria-controls="collapseOne">
                        توضیحات
                    </button>
                </h2>
                <div id="collapseOnee" className="accordion-collapse collapse show text-3xl" aria-labelledby="headingOne"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body text-3xl">
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
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwoo" aria-expanded="false" aria-controls="collapseTwo">
                        خاصیت ها
                    </button>
                </h2>
                <div id="collapseTwoo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
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
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThreee" aria-expanded="false" aria-controls="collapseThree">
                        جزئیات
                    </button>
                </h2>
                <div id="collapseThreee" className="accordion-collapse collapse" aria-labelledby="headingThree"
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
    </>
}

export default Properties;