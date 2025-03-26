import setUser from "./setUser";

const getCurrentUser = () => {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        setUser()
        user = JSON.parse(localStorage.getItem("currentUser"))
    }
    return user;
};

export default getCurrentUser