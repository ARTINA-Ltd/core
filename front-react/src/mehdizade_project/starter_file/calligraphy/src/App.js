import "./App.css";
import Footer from "./component/footer-component";
import Section_4 from "./component/section-4.component";
import Section_5 from "./component/section-5.component";
import Nav_bar from "./component/nav-bar.component";
import Section_1 from "./component/section-1.component";
import Section_2 from "./component/section-2.component";

import cart_info from "./information/cart-information";
import Section_5_cart from "./component/section-cart-component";

function App() {
  return (
    <div className="App" /*dir="rtl" */>
      {/* <Nav_bar></Nav_bar> */}
      
      <Section_1 cart_information={cart_info}></Section_1>
      <Section_2></Section_2>
      <Section_5_cart></Section_5_cart>
      <Section_4></Section_4>
      <Section_5></Section_5>
      <Footer></Footer>
    </div>
  );
}

export default App;
