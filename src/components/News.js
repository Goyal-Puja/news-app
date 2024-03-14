import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
      

  const capitailize = (string) => {
      return string.toUpperCase();
  }

 const updateNews = async () =>{
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=06a19914792849aa8645d26ce1eaa92e&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
 }
 useEffect(() => {
  document.title = `Din bhar ki Khabar - ${capitailize(props.category)}`
    updateNews();
    // eslint-disable-next-line
 }, [])

  const handlePreviousPage = async () => {
    setPage(page-1)
    updateNews();
  }
  
  const handleNextPage = async () => {
    console.log("Current page", page)
    setPage(page+1);
    updateNews();
  }
    return (
      <>
      <div className="container my-3">
          <h3 className='text-center' style={{marginTop:'90px'}}>Din Bhar ki Khabar - Headlines</h3>
     </div>
      {loading && <Spinner/>}
      <div className="container my-3">
          <div className="row">
          {!loading && articles.map((element)=>{
           return <div className="col-md-4" key={element.url} >
            <NewsItems title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author?element.author:'Unknown'} publishedAt={element.publishedAt} source={element.source.name}/>
                  </div>
          })}
            </div>
            <div className="ccontainer d-flex justify-content-between my-3">
              <button disabled={page <=1} className='btn btn-dark' onClick={handlePreviousPage}> &#8592; Previous</button>
              <button disabled={page + 1 >= Math.ceil(totalResults/props.pageSize)} className='btn btn-dark' onClick={handleNextPage}>Next &#8594; </button>
            </div>
      </div>
      </>
    )
  }


News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News