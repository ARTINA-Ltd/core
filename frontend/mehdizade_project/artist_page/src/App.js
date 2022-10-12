import Section_1 from "./component/section-1_component";
import Section_3 from "./component/section-3-component";
import Section_2 from "./component/section-2-component";
import Footer from "./component/footer-component";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Section_1></Section_1>
      <Section_2></Section_2>
      <Section_3></Section_3>
      <Footer></Footer>
    </div>
  );
}

export default App;
