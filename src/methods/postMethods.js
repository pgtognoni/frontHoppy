import axios from 'axios';

export const updatePost = async (post, id, status) => {
    const data = { data: post, status: {status} }
    const token = window.localStorage.getItem('token')
    const res = await axios.put(`http://localhost:5005/posts/${id}/update`, data, {
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
    const res = await axios.post(`http://localhost:5005/comments/new`, data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    console.log(res.data)
};

export const updateUserLiked = async (user) => {

    let data = user;
    const token = window.localStorage.getItem("token");
    const res = await axios.put("http://localhost:5005/auth/profile", data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    if (res.data.liked) {
        return res.data;
    }
};