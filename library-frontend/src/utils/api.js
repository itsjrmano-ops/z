import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:4000' })
api.interceptors.request.use(cfg => {
  const t = localStorage.getItem('token')
  if(t) cfg.headers = { ...(cfg.headers||{}), Authorization: `Bearer ${t}` }
  return cfg
})

export default api
