import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      post: null,
      singleView: false
    };
  }

  viewPost = (post, e) => {
    this.setState({
      post: post,
      singleView: true
    });
  }

  viewPosts = (e) => {
    this.setState({
      post: null,
      singleView: false
    });
  }

  componentDidMount() {
    fetch("http:// https://epower.ng/wp-json/wp/v2/posts?_embed")
      .then(res => res.json())
      .then(
        (posts) => {
          this.setState({
            isLoaded: true,
            posts: posts
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, posts, post, singleView } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (singleView) {
      return (
        <div>

{post.featured_media ?
							<a href={post.link}><img alt="" src={post._embedded['wp:featuredmedia'][0].source_url} /></a>
						: null}
						
						<button onClick={this.viewPosts}>Home</button>
          <div className="post">
            <h1>{post.title.rendered}</h1>
            <span>{post.date}</span>
            <div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="posts">
          <h1>Blog</h1>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <h2 onClick={(e) => this.viewPost(post, e)}>{post.title.rendered}</h2>
                <span>{post.date}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
