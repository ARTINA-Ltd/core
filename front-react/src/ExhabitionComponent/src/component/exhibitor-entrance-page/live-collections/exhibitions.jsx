import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Livecollections from "./live-collections";
import Pastcollections from "../past-collections/past-collections";
import Header from "../header/header";

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8000/exhibition/exhibitions/`
        );
        setExhibitions(res.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setExhibitions(null);
      } finally {
        setLoading(false);
      }
    };
    fetchExhibitions();
  }, []);

  return (
    <div>
      <Header />
      <Livecollections exhibitions={exhibitions.slice(0, 9)} />
      <Pastcollections />
    </div>
  );
};

export default Exhibitions;
