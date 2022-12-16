import Section_1 from "../mehdizade_project/artist_page/src/component/section-1_component";
import Section_3 from "../mehdizade_project/artist_page/src/component/section-3-component";
import Section_2 from "../mehdizade_project/artist_page/src/component/section-2-component";
import Footer from "../mehdizade_project/artist_page/src/component/footer-component";
import Nav_bar from "../mehdizade_project/artist_page/src/component/nav-bar"
import "../mehdizade_project/artist_page/src/App.css";

function App() {
    return (
        <div className="App">
            <Nav_bar/>
            <Section_1/>
            <Section_2/>
            <Section_3/>
            <Footer/>
        </div>
    );
}

export default App;
