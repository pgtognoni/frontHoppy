import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: '',
  id: '',
  username: '',
  images: [],
  currency: 0,
  bio: '',
  groups: [],
  published: [],
  liked: [],
  disliked: [],
  commented: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    setRole: (state, action) => { state.role = action.payload; },
    setId: (state, action) => { state.id = action.payload; },
    setName: (state, action) => { state.username = action.payload },
    setImage: (state, action) => { state.images = action.payload },
    setCurrency: (state, action) => { state.currency += action.payload },
    setBio: (state, action) => { state.bio = action.payload },
    setGroups: (state, action) => { state.groups = action.payload},
    setPublished: (state, action) => { state.published = action.payload },
    setLiked: (state, action) => { state.liked = action.payload },
    setDisliked: (state, action) => { state.disliked = action.payload },
    setCommented: (state, action) => { state.commented = action.payload },
    reset: () => initialState
  }
})

export const { setInitialState, setName, setImage, setCurrency, setBio, setGroups, setRole, setId, setLogged, setPublished, setLiked, setDisliked, setCommented, reset } = userSlice.actions;
export default userSlice