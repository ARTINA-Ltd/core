import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Form from "./form";

const Postdata = () => {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://78.38.35.249:8000/api/exhibition/exhibitions/`
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

  return <div></div>;
};

export default Postdata;
