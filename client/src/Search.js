import { useState } from "react";

const Search = () => {
  const [data, setData] = useState([]);

  /* fetching videos from backend server for the given search query */

  const fetchData = async (query) => {
    const response = await fetch("http://localhost:9000/search?q=" + query)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
    return response;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var query = e.target[0].value;
    e.target[0].value = "";
    fetchData(query);
  };

  return (
    <div className="app">
      <div className="content">
        Welcome to YouTube Fetch search. Enter a term to find saved videos.
        Click to play, and view all with 'View All' button in pages.
      </div>
      <div className="form-group">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Video Using keywords"
            name="seachTerm"
          />
        </form>
      </div>
      <div className="paginated">
        <a href="http://localhost:3000/paginated-videos">View All Videos</a>
      </div>
      <div className="videos">
        {data.map((item, index) => {
          return (
            <div className="video">
              <div className="video-title">
                <h4>{item.title}</h4>
              </div>

              <div className="video-thumbnail">
                <a
                  href={"http://www.youtube.com/embed/" + item.videoid}
                  target="_blank"
                >
                  <img src={item.thumbnails} alt="thumbnail" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
