import "../mehdizade_project/starter_file/calligraphy/src/App.css";
import Footer from "../mehdizade_project/starter_file/calligraphy/src/component/footer-component";
import Section_4 from "../mehdizade_project/starter_file/calligraphy/src/component/section-4.component";
import Section_5 from "../mehdizade_project/starter_file/calligraphy/src/component/section-5.component";
import Section_1 from "../mehdizade_project/starter_file/calligraphy/src/component/section-1.component";
import Section_2 from "../mehdizade_project/starter_file/calligraphy/src/component/section-2.component";
import Nav_bar from "../mehdizade_project/starter_file/calligraphy/src/component/nav-bar"
import cart_info from "../mehdizade_project/starter_file/calligraphy/src/information/cart-information";
import Section_5_cart from "../mehdizade_project/starter_file/calligraphy/src/component/section-cart-component";
import { ScrollTop } from "primereact/scrolltop";

function App() {
    return (
        <div className="App" /*dir="rtl" */>
 
            <Nav_bar></Nav_bar>
            <Section_1 cart_information={cart_info}/>
            <Section_2/>
            <Section_5_cart/>
            <Section_4/>
            <Section_5/>
            <Footer/>
        </div>
    );
}

export default App;
