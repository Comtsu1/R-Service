
const BackendLink = "http://localhost:8080";

const checkToken = async () => {
    const config = {
        'x-auth-token': localStorage.getItem('token')
    }
    axios.get(`${BackendLink}/profile`, config)
        .catch((err) => {
            nav('/');
        })
};

export {BackendLink, checkToken}