import axios from 'axios';

const me = async () => {
    try {
        const response = await axios.get(
            'http://localhost:3030/api/v1/me',
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("X-access-token")
                }
            }
        );
        console.log("In me - ",response)
        return response.data.data;
    } catch (error) {
        console.log("error - ",error)
        return null;
    }
}

export default me;