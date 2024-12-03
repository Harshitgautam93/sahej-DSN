import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import './App.css';

function App() {
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isDashboardOpen, setDashboardOpen] = useState(false);

    // Fetch news data
    useEffect(() => {
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

    const toggleDashboard = () => {
        setDashboardOpen(!isDashboardOpen);
        setSelectedNews(null); // Reset selected news when closing dashboard
    };

    const handleNewsClick = (article) => {
        if (selectedNews?.title === article.title) {
            // If the clicked article is already selected, deselect it
            setSelectedNews(null);
        } else {
            // Select the clicked article to show its summary
            setSelectedNews(article);
        }
    };

    return (
        <div className="container">
            <div className="left-section">
                <button className="button-big">Home</button>
                <button className="button">Cases</button>
                <button className="button" onClick={toggleDashboard}>Bulletins</button>
                <button className="button">About Us</button>
                <button className="button">Tariff</button>
                <button className="button">Settings</button>
                <button className="button-big">Ask a question</button>
            </div>

            <div className="center-section">
                <div className="navbar">
                    <a href="#temparature" className="nav-item">Temperature</a>
                    <a href="#Precipitation" className="nav-item">Precipitation</a>
                    <a href="#Pressure" className="nav-item">Pressure</a>
                    <a href="#Windspeed" className="nav-item">Windspeed</a>
                    <a href="#Clouds" className="nav-item">Clouds</a>
                </div>
                <div className="container-box-center" id="home">
                    <h2>Map Section</h2>
                    <p>Content for the Map section.</p>
                </div>
                <div className="container-box-center" id="about">
                    <h2>Overcast Section</h2>
                    <p>Content for the Overcast</p>
                </div>
                <div className="container-box-center" id="about">
                    <h2> About Us</h2>
                </div>
            </div>

            {/* Right section removed completely as per your previous request */}

            {isDashboardOpen && (
                <div className="transparent-dashboard">
                    {/* Cross sign at the top right */}
                    <button onClick={toggleDashboard} className="close-dashboard-cross">
                        &times;
                    </button>
                    <div className="dashboard-content">
                        {news.map((article, index) => (
                            <div
                                key={index}
                                className="dashboard-news-box"
                                onClick={() => handleNewsClick(article)}
                            >
                                <h3>{article.title}</h3>
                                {article.urlToImage && (
                                    <img
                                        src={article.urlToImage}
                                        alt="News"
                                        className="news-image"
                                    />
                                )}
                                <button
                                    className="view-summary-button"
                                >
                                    {selectedNews?.title === article.title ? "Hide Summary" : "View Summary"}
                                </button>
                                {selectedNews?.title === article.title && (
                                    <div className="summary-text">
                                        <p>{article.description || "Summary not available."}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
