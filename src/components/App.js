import React from 'react';
import '../styles/main.scss'
import PostList from './posts/PostList';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <PostList />
      </div>
    )
  }
}
