import React, { useState, useEffect } from "react";

import "./NewsAPi.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const NewsApiWithLoadMore = () => {
    const [ApiData, SetData] = useState([]);
    const [Zone, setZone] = useState("india");
    const [articlesToShow, setArticlesToShow] = useState(20); // Initial number of articles to show
    const api_key = import.meta.env.VITE_REACT_APP_NEWS_API_KEY

    const today = new Date();
    let date = today.getDate();

    // Function to fetch news
    const fetchNews = async (query) => {
        const news = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${date}&sortBy=publishedAt&apiKey=${api_key}&units=metric`);
        const data = await news.json();
        SetData(data.articles);
    };

    // Fetch default news when component mounts
    useEffect(() => {
        fetchNews(Zone);
    }, []);

    // Handle form submission
        const SearchNewsHandler = async (event) => {
            event.preventDefault();
            fetchNews(Zone);
            setArticlesToShow(20); // Reset the number of articles to show on new search
        };

    // Handle "Load More" button click
    const loadMoreHandler = () => {
        setArticlesToShow(prevArticlesToShow => prevArticlesToShow + 20); // Load 20 more articles
    };

    return (
        <>
            <div id="forms">
                <h1>TheNews</h1>

                <form onSubmit={SearchNewsHandler} className="form" id="Form">
                        <input
                            type="text"
                            value={Zone}
                            className="zone"
                            onChange={(e) => setZone(e.target.value)}
                            placeholder="Enter a city or topic"
                        />
                        <button type="submit" className="ibtn"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </form>


               
            </div>

            <section className="content">
                {ApiData.slice(0, articlesToShow).map((data) => (
                    data.urlToImage && (
                        <div className="data" key={data.url}>
                            <h4 className="title">{data.title}</h4>
                            <img src={data.urlToImage} height={"200px"} alt="" className="Img" />
                            <p className="Description">{data.description}</p>
                            <a href={data.url} target="_blank" rel="noopener noreferrer">
                                <button className="ReadMore"><FontAwesomeIcon icon={faEye} /></button>
                            </a>
                        </div>
                    )
                ))}
            </section>
            
            {articlesToShow < ApiData.length && (
                <div className="load-more-container">
                    <button onClick={loadMoreHandler} className="LM"><FontAwesomeIcon icon={faPlus}/></button>
                </div>
            )}
        </>
    );
};
