import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/gyms',
})

export const getAllGyms = () => api.get(`/gyms`)
export const addGym = gym => api.post(`/gym`, gym)
export const updateGym = (id, gym) => api.put(`/gym/${id}`, gym)
export const getGym = id => api.get(`/gym/${id}`)

const apis = {
    getAllGyms,
    getGym,
    addGym,
    updateGym
}

export default apis