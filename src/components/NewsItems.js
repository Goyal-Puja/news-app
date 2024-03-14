import React from 'react'

const NewsItems = (props) => {
    
    let {title, description, imageUrl, newsUrl,  publishedAt, source} = props;
    return (
      <div className="container my-3">
        <div className="card">
        {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'20%', zIndex:'1'}}>{source}</span> */}
           <span class="badge text-bg-secondary">{source}</span>
           <img src={imageUrl?imageUrl:"https://images.wsj.net/im-923226/social"} className="card-img-top" alt="..."/>
               <div className="card-body">
                   <h5 className="card-title">{title}...</h5>
                   <p className="card-text">{description}...</p>
                   <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                   {/* <p class="card-text"><small class="text-body-secondary">Author : {author}</small></p> */}
                   <p class="card-text"><small class="text-body-secondary">Published At : {new Date(publishedAt).toGMTString()}</small></p>
               </div>
        </div>
      </div>
    )
}

export default NewsItems