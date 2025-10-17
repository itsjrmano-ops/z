import React, {useState} from 'react'
import axios from 'axios'

export default function Auth(){
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)

  async function submit(){
    try{
      const url = `http://localhost:4000/api/auth/${mode}`
      const r = await axios.post(url, { username, password })
      localStorage.setItem('token', r.data.token)
      setMsg('ok')
    }catch(e){ setMsg('error') }
  }

  return <div className="container">
    <h2>{mode==='login' ? 'Login' : 'Register'}</h2>
    <div>
      <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
    </div>
    <div>
      <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
    </div>
    <div style={{marginTop:8}}>
      <button className="button is-primary" onClick={submit}>Submit</button>
      <button className="button" onClick={()=>setMode(mode==='login'?'register':'login')} style={{marginLeft:8}}>{mode==='login'?'Register':'Login'}</button>
    </div>
    {msg && <div style={{marginTop:8}}>{msg}</div>}
  </div>
}
