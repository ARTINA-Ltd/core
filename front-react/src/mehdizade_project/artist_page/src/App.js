import Section_1 from "./component/section-1_component";
import Section_3 from "./component/section-3-component";
import Section_2 from "./component/section-2-component";
import Footer from "./component/footer-component";

import "./App.css";

function App() {
  return (
    <div className="App">
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
