import { useEffect, useState } from "react";
import useAxios from "./useAxios";

function ProtectedPage() {
    const [res, setRes] = useState("");
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/users/");
                setRes(response.data);
            } catch {
                setRes("Something went wrong");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Projected Page</h1>
            <p>{String(res)}</p>
        </div>
    );
}

export default ProtectedPage;