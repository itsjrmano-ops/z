import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Library(){
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const fileRef = useRef()

  const load = async ()=>{
    try{
      const r = await axios.get('http://localhost:4000/api/books')
      setBooks(r.data)
    }catch(e){
      setBooks([])
    }
  }

  useEffect(()=>{ load() }, [])

  async function handleUpload(e){
    e.preventDefault()
    setMessage(null)
    const file = fileRef.current.files[0]
    if(!file) return setMessage({type:'error', text: 'اختر ملفاً للرفع'})
    const title = e.target.title.value || file.name
    const author = e.target.author.value || 'Unknown'
    const form = new FormData()
    form.append('book', file)
    form.append('title', title)
    form.append('author', author)
    try{
      setLoading(true)
      await axios.post('http://localhost:4000/api/books/upload', form, { headers: {'Content-Type':'multipart/form-data'} })
      setMessage({type:'success', text: 'تم رفع الكتاب'})
      fileRef.current.value = ''
      e.target.reset()
      await load()
    }catch(err){
      setMessage({type:'error', text: err?.response?.data?.error || 'فشل الرفع'})
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <h2>Library</h2>

      <section style={{marginBottom:20}}>
        <h3>Upload a book</h3>
        <form onSubmit={handleUpload}>
          <div>
            <label>Title: <input name="title" placeholder="Optional title" /></label>
          </div>
          <div>
            <label>Author: <input name="author" placeholder="Optional author" /></label>
          </div>
          <div>
            <input ref={fileRef} type="file" accept=".pdf,.epub,.txt" />
          </div>
          <div style={{marginTop:8}}>
            <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
          </div>
        </form>
        {message && (
          <div style={{marginTop:8, color: message.type==='error' ? 'crimson' : 'green'}}>{message.text}</div>
        )}
      </section>

      <section>
        <h3>Available books</h3>
        <ul>
          {books.map(b=> (
            <li key={b.id} style={{marginBottom:8}}>
              {b.cover_filename && (<img src={`http://localhost:4000/storage/${b.cover_filename}`} alt="cover" style={{width:40,height:60,objectFit:'cover',marginRight:8}} />)}
              <strong>{b.title}</strong> — {b.author} [{b.format}] 
              {' '}<Link to={`/reader/${b.id}`}>Read</Link>
              {' '}<Link to={`/book/${b.id}`}>Details</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
