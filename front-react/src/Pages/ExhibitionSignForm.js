import "../mehdizade_project/exhibition_sign_form/src/App.css";
import Section_1 from "../mehdizade_project/exhibition_sign_form/src/component/section-1_component";
import Section_2 from "../mehdizade_project/exhibition_sign_form/src/component/section-2-component";
import Section_3 from "../mehdizade_project/exhibition_sign_form/src/component/section-3-component";
import Footer from "../mehdizade_project/exhibition_sign_form/src/component/footer-component";
// import Navbar from "../mehdizade_project/exhibition_sign_form/src/component/"
import Nav_bar from "../mehdizade_project/exhibition_sign_form/src/component/nav-bar"

function App() {
    return (
        <div className="App">
            <Nav_bar/>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Section_1/>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Section_2/>
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <Section_3/>
            <Footer/>
        </div>
    );
}

export default App;
