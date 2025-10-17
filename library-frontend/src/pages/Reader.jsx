import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Reader(){
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const viewerRef = useRef()

  useEffect(()=>{
    axios.get(`http://localhost:4000/api/books`).then(r=>{
      const b = r.data.find(x=>String(x.id)===String(id))
      setBook(b)
    }).catch(()=>setBook(null))
  },[id])

  useEffect(()=>{
    if(!book) return
    const url = `http://localhost:4000/storage/${book.filename}`
    if(book.format === 'pdf'){
      // handled by iframe in render
      return
    }
    if(book.format === 'epub' && typeof window !== 'undefined' && window.ePub){
      // use epub.js to render
      try{
        // clear previous
        if(viewerRef.current) viewerRef.current.innerHTML = ''
        const bookObj = window.ePub(url)
        const rendition = bookObj.renderTo(viewerRef.current, {width: '100%', height: '80vh'})
        rendition.display()
        return () => { try{ bookObj.destroy && bookObj.destroy() }catch(e){} }
      }catch(e){
        console.error('epub render failed', e)
      }
    }
  },[book])

  if(!book) return <div>Loading...</div>
  const url = `http://localhost:4000/storage/${book.filename}`
  if(book.format === 'pdf'){
    return <iframe title={book.title} src={url} style={{width:'100%', height:'80vh'}} />
  }
  if(book.format === 'epub'){
    return <div>
      <h3>{book.title}</h3>
      <div ref={viewerRef} />
      <p><a href={url} target="_blank" rel="noreferrer">Download EPUB</a></p>
    </div>
  }
  return <div>
    <h3>{book.title}</h3>
    <p>Format: {book.format}</p>
    <a href={url} target="_blank" rel="noreferrer">Download / Open</a>
  </div>
}
