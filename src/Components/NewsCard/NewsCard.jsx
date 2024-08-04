import React from 'react'
import {Flex} from '@mantine/core'
import { SkeletonLoader } from '../SkeletonLoader'
import './NewsCard.css'

const NewsCard = ({id, title, url, author, source, media, content, section, date}) => {
    return (
        
          <div key={id} className='newsCard'>
            <a href={url} target="_blank" rel="noopener noreferrer">
            {media ? <img src={media}/> : <Flex justify="center" className='imagePlaceholder'><SkeletonLoader height={300} width={100} animate={false} /></Flex>}
            <div className='cardContentSection'>
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
            </a>
          </div>
    
      
    )
}

export default NewsCard
