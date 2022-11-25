import "../mehdizade_project/exhibition_lists/src/App.css";

import Section_1 from "../mehdizade_project/exhibition_lists/src/component/cart-items-component";

function App() {
  // const Request_pages = () => {
  //   const [requests, setRequests] = useState([]);
  //   // const [loading, setLoading] = useState(false);
  //   // const [currentPage, setCurrentPage] = useState(1);
  //   const [RequestPerPage] = useState(8);

  // useEffect(() => {
  //   const fetchRequest = async () => {
  //     // setLoading(true);
  //     const res = await fetch(
  //     );
  //     const requests = await res.json();
  //     setRequests(requests);
  //     // setRequests(req);
  //     // setLoading(false);
  //   };

  //   fetchRequest();
  // }, []);

  // const indexOfLastRequest = currentPage * RequestPerPage;
  // const indexOfFirstRequest = indexOfLastRequest - RequestPerPage;
  // const currentRequest = requests.slice(
  //   indexOfFirstRequest,
  //   indexOfLastRequest
  // );
  return (
    <div className="App">
      <Section_1></Section_1>
    </div>
  );
}
export default App;