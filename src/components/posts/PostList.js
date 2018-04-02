import React from 'react';
import { Grid, ButtonGroup, Table, Button, Glyphicon, Navbar } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import '../../styles/components/_postList.scss';

export default class PostList extends React.Component {

  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:4000/posts', {}).then(response => {
      return response.json();
    }).then(result => {
      this.setState({posts: result.body});
    })
  }

  renderRecord(post, index) {
    if (post !== null) {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{post.title}</td>
          <td>{post.description}</td>
          <td>{post.author.firstName} {post.author.lastName}</td>
          <td>
            <ButtonGroup>
              <Button className={'btn post-list__button--padding'} style={{border: '1px solid grey'}}>
                <Glyphicon glyph="pencil" />Edit
              </Button>
              <Button className={'btn btn-danger post-list__button--padding'} style={{border: '1px solid grey'}}>
                <Glyphicon glyph="cross" />X
              </Button>
            </ButtonGroup>

          </td>
        </tr>
      )
    }
  }

  render() {
    return (
      <div>

        <Grid className={'bsClass'}>

          <Button className={'btn post-list__button--padding'} style={{
            border: '1px solid grey',
            margin: '10px',
            cursor: 'pointer'
          }}>
            <Glyphicon glyph="pencil" />Add new
          </Button>

          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map((post, index) => {
                return this.renderRecord(post, index);
              })}
            </tbody>
          </Table>
        </Grid>
      </div>
    )
  }
}
