import React from 'react'


const NewsItems = (props) => {
    let { title, description, imageUrl, newsUrl, date, author } = props;
    return (
        <div>
            <div className="card" style={{}}>

                <img src={!imageUrl ? "https://c.ndtvimg.com/2022-01/etqrdpho_ranver_625x300_21_January_22.jpg" : imageUrl //did this to check whether image url are null or not if it is null then we are puting default url
                }
                    className="card-img-top" alt="..." style={{ "width": "15rem", "height": "10rem", "position": "relative", "left": "1rem" }} />

                <div className="card-body">
                    <h5 className="card-title">{title.slice(0, 45)}</h5>
                    <p className="card-text">{description}</p>
                    <p class="card-text"><small className="text-muted">Posted at  {new Date(date).toGMTString()}  by {author}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-primary bt-sm">Read More</a>
                </div>
            </div>
        </div>
    )
}


export default NewsItems
