import axios from 'axios';
const BACK_URL = import.meta.env.VITE_BACK_URL;

export const fetchData = async () => {
    const response = await axios.get(`${BACK_URL}/posts`);
    return response.data;
}

export const updateLike = async (post, id) => {
    const data = { data: post }
    const token = window.localStorage.getItem('token')
    const res = await axios.put(`${BACK_URL}/posts/${id}/update/like`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data)
};

export const updateDislike = async (post, id) => {
    const data = { data: post }
    const token = window.localStorage.getItem('token')
    const res = await axios.put(`${BACK_URL}/posts/${id}/update/dislike`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data)
};


export const updateComment = async (comment, id, user) => {

    const data = {
        user: user._id,
        body: comment,
        postId: id,
    };
    const token = window.localStorage.getItem("token");
    const res = await axios.post(`${BACK_URL}/comments/new`, data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    console.log(res.data)
};

export const updateGroupComment = async (comment, id, user) => {

    const data = {
        user: user._id,
        body: comment,
        groupId: id,
    };

    const token = window.localStorage.getItem("token");
    const res = await axios.post(`${BACK_URL}/comments/new`, data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
};

export const updateUserLiked = async (user) => {

    let data = user;
    const token = window.localStorage.getItem("token");
    const res = await axios.put(`${BACK_URL}/auth/profile`, data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    if (res.data.liked) {
        return res.data;
    }
};

export const deleteCommentAPI = async (id, token) => {
    const res = await axios.delete(
        `http://localhost:5005/comments/${id}/delete`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
    );
}