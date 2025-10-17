import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function BookDetails(){
  const { id } = useParams()
  const [data, setData] = useState({ book: null, comments: [] })
  const [comment, setComment] = useState('')
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/books/${id}/details`).then(r=>setData(r.data)).catch(()=>setData({book:null, comments:[]}))
  },[id])
  async function postComment(){
    if(!comment) return
    await axios.post(`http://localhost:4000/api/books/${id}/comments`, { content: comment })
    setComment('')
    const r = await axios.get(`http://localhost:4000/api/books/${id}/details`)
    setData(r.data)
  }
  if(!data.book) return <div>Loading...</div>
  return <div className="container">
    <h2>{data.book.title}</h2>
    <p><strong>Author:</strong> {data.book.author}</p>
    <p>{data.book.description || 'No description'}</p>
    {data.book.cover_filename && (<img src={`http://localhost:4000/storage/${data.book.cover_filename}`} alt="cover" style={{maxWidth:200}} />)}
    <hr/>
    <h3>Comments</h3>
    <div>
      {data.comments.map(c=> (
        <div key={c.id} style={{borderBottom:'1px solid #ddd',padding:'8px 0'}}>
          <div style={{fontSize:12,color:'#666'}}>{c.created_at}</div>
          <div>{c.content}</div>
        </div>
      ))}
    </div>
    <div style={{marginTop:12}}>
      <textarea rows={3} value={comment} onChange={e=>setComment(e.target.value)} style={{width:'100%'}} />
      <button className="button is-primary" onClick={postComment} style={{marginTop:8}}>Post Comment</button>
    </div>
  </div>
}
