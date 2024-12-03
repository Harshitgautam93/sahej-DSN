import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        // Fetch news from API
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/everything?q=disaster+India&apiKey=20ebe77da7e14006b12788ea2ea3d81b`
                );
                setNews(response.data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="right-section">
            <div className="container-box-right">
                {news.map((article, index) => (
                    <div
                        key={index}
                        className="news-item"
                        onClick={() => setSelectedNews(article)}
                    >
                        <p>{article.title}</p>
                    </div>
                ))}
            </div>

            {selectedNews && (
                <div className="news-summary">
                    <h3>{selectedNews.title}</h3>
                    <p>{selectedNews.description || "Summary not available."}</p>
                </div>
            )}
        </div>
    );
};

export default NewsList;
