function UserInfo({ user, logoutUser }) {
    return (
        <div>
            <h1>Hello, {user.user_id}</h1>
            <button onClick={logoutUser}>LogOut</button>
        </div>
    );
}

export default UserInfo;