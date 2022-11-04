import "../mehdizade_project/starter_file/calligraphy/src/App.css";
import Footer from "../mehdizade_project/starter_file/calligraphy/src/component/footer-component";
import Section_4 from "../mehdizade_project/starter_file/calligraphy/src/component/section-4.component";
import Section_5 from "../mehdizade_project/starter_file/calligraphy/src/component/section-5.component";
import Section_1 from "../mehdizade_project/starter_file/calligraphy/src/component/section-1.component";
import Section_2 from "../mehdizade_project/starter_file/calligraphy/src/component/section-2.component";

import cart_info from "../mehdizade_project/starter_file/calligraphy/src/information/cart-information";
import Section_5_cart from "../mehdizade_project/starter_file/calligraphy/src/component/section-cart-component";

function App() {
    return (
        <div className="App" /*dir="rtl" */>
            {/* <Nav_bar></Nav_bar> */}
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Section_1 cart_information={cart_info}/>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Section_2/>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Section_5_cart/>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Section_4/>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Section_5/>
            <Footer/>
        </div>
    );
}

export default App;
