import { useContext } from "react";
import UserInfo from "./UserInfo";
import AuthContext from "./AuthContext";
import {Link} from "react-router-dom";

const Home = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <section>
            {user && <UserInfo user={user} logoutUser={logoutUser}/>}
            {!user && (
                <Link to="/login">Login</Link>
            )}
            <h1>You are on home page!</h1>
        </section>
    );
};

export default Home;