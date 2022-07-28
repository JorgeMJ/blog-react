/*
  https://ui.dev/react-router-url-parameters
*/

import React, { useState } from "react";
import  {
  BrowserRouter as Router,
  //Switch, This deprecated now use 'Routes'.See https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
  Routes,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import PostForm from "./components/PostForm";
import Message from "./components/Message";

import "./App.css";

const App = (props) => {

  const [posts, setPosts] = useState([
    {
      id: 1,
      slug: "hello-react",
      title: "Hello React",
      content: "Lorem.",
    },
    {
      id: 2,
      slug: "hello-project",
      title: "Hello Project",
      content: "Tothe.",
    },
    {
      id: 3,
      slug: "hello-blog",
      title: "Hello Blog",
      content: "Ipsum.",
    },
  ]);
  const [message, setMessage] = useState(null);

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = encodeURIComponent(
      post.title.toLowerCase().split(" ").join("_")
    )
    setPosts([...posts, post]);
    setFlashMessage('saved');
  };

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(()=>{
      setMessage(null);
    },1600);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        {message && <Message type={message} />}
        <Routes>
          <Route path='/'               element={<Posts posts={posts}/>} />
          <Route path='/post/:postSlug' element={<Post posts={posts}/>} />  
          <Route component={NotFound}/>      
          <Route path="/new"            element={<PostForm addNewPost={addNewPost}/>} />
        </Routes>
      </div>
    </Router>
  );

};

export default App;
