import React from 'react'
import './NewsCard.css'

const NewsCard = ({id, title, url, author, source, media, content, section, date}) => {
    return (
        <div key={id} className='newsCard'>
          {media && <img src={media}/>}
          <div className='card-content-section'>
            <h5>{title}</h5>
            <p>{content}</p>
            <div>Source: {source}</div>
            <div>Author: {author}</div>
            <div>Category: {section}</div>
            <div>Date: {date}</div>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        </div>
    )
}

export default NewsCard
