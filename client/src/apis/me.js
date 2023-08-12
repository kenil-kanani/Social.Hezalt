import axios from 'axios';

const me = async () => {
    try {
        if(localStorage.getItem("X-access-token") == null) throw new Error("Token not found");
        const response = await axios.get(
            'http://localhost:3030/api/v1/me',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("X-access-token")
                }
            }
        );
        return response.data.data;
    } catch (error) {
        return null;
    }
}

export default me;