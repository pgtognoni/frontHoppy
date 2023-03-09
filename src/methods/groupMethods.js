import axios from 'axios';
const BACK_URL = import.meta.env.VITE_BACK_URL;

export const updateGroupLiked = async (group, id) => {

    let data = group;
    const token = window.localStorage.getItem("token");
    const res = await axios.put(`${BACK_URL}/groups/like/${id}`, data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    if (res.data.liked) {
        return res.data;
    }
};
