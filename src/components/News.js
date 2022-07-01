import React, { useState, useEffect } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const News = (props) => {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    //document.title = `${props.category} - NewsSupplier`


    //this predifned componentDidMount will excecute "after render"
    //we wre fetching real data and storing in constructor arcticles

    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=39f3b7f2f83340d49d3ddb31bc5eeed8&page=1&pageSize=${props.pageSize}`;
        setLoading(true); //before receving data we are making loading true
        const data = await fetch(url);
        const parseData = await data.json();
        console.log(parseData);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, []);

    // const componentDidMount = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=39f3b7f2f83340d49d3ddb31bc5eeed8&page=1&pageSize=${props.pageSize}`;
    //     this.setState({ loading: true }) //before receving data we are making loading true
    //     const data = await fetch(url);
    //     const parseData = await data.json();
    //     setArticles(parseData.articles);
    //     setTotalResults(parseData.totalResults);
    //     setLoading(false);
    // }
    //instead of using componentDidMount we used useEffect and called a function 

    const handlePrePage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=39f3b7f2f83340d49d3ddb31bc5eeed8&page=${page - 1}&pageSize=${props.pageSize}`;
        setLoading(true); //before receving data we are making loading true
        const data = await fetch(url);
        const parseData = await data.json();
        setPage(page - 1);
        setArticles(parseData.articles);
        setLoading(false); //after recieving data we are making loading as false. it will stop that spinner
    }

    const handleNextPage = async () => {
        if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
            document.getElementById("checkDisable").disabled = true;
        }
        //in above if condition first we are checking whether the next page is exists or not . by the help of (totalContents/contents_in_one_page). if not existing then we are disabling the button

        else if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=39f3b7f2f83340d49d3ddb31bc5eeed8&page=${page + 1}&pageSize=${props.pageSize}`;
            setLoading(true); //before receving data we are making loading true
            const data = await fetch(url);
            const parseData = await data.json();

            setArticles(parseData.articles);
            setPage(page + 1);
            setLoading(false); //after recieving data we are making loading as false. it will stop that spinner

        }
    }



    return (
        <div>
            <div className="container my-3">
                <h2 className='text-center' style={{ margin: "35px 0px", marginTop: "90px" }}>NewsSupplier - Top Headlines from {props.category} Category</h2>
                {loading && <Spinner />}
                {/* it means if loading is true then display the spinner */}
                <div className="row">

                    {/* below line means if loading is not true then show the data */}
                    {!loading && articles.map((currEle) => {
                        return <div className="col-md-4 my-3" key={currEle.url}>
                            <NewsItems title={currEle.title} description={currEle.description ? currEle.description.slice(0, 88) : ""} //did this to check whether some data are null or not because we can't slice null
                                imageUrl={currEle.urlToImage} newsUrl={currEle.url} date={currEle.publishedAt} author={currEle.author ? currEle.author : "Unknown"} />
                        </div>
                    })}
                </div>

                <div className=" d-flex justify-content-between my-3" role="group" aria-label="Basic mixed styles example">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrePage}>&larr; Prev Page</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" id="checkDisable" className="btn btn-dark" onClick={handleNextPage}>Next Page &rarr;</button>
                </div>

            </div>
        </div>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
}

export default News