import React from 'react';
import {Grid, ButtonGroup, Table, Button, Glyphicon} from 'react-bootstrap';
import Modal from 'react-responsive-modal';

export default class PostList extends React.Component {

  state = {
    openAlert: false,
    postUuid: '',
    posts: []
  };

  onOpenAlertModal = (uuid) => {
    this.setState({
      openAlert: true,
      postUuid: uuid
    });
  };

  onCloseAlertModal = () => {
    this.setState({openAlert: false});
  };

  getPosts = () => {
    fetch('http://localhost:4000/posts', {}).then(response => {
      return response.json();
    }).then(result => {
      this.setState({posts: result.body});
    })
  };

  componentDidMount() {
    this.getPosts();
  };

  removePost () {
    fetch(`http://localhost:4000/posts/${this.state.postUuid}`, {
      method  : 'delete'
    }).then( response => {
      return response.json();
    }).then( result => {
      this.getPosts();
      this.onCloseAlertModal();
      console.log(result, 'resource deleted');
    });
  }

  renderRecord = (post, index) => {
    if (post !== null) {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{post.title}</td>
          <td>{post.description}</td>
          <td>{post.author.firstName} {post.author.lastName}</td>
          <td>
            <ButtonGroup>
              <Button
                className={'btn post-list__button--padding'}
                style={{border: '1px solid grey', cursor: 'pointer'}}
              >
                <Glyphicon glyph="pencil"/>Edit
              </Button>
              <Button
                className={'btn btn-danger post-list__button--padding'}
                style={{border: '1px solid grey', cursor: 'pointer'}}
                onClick={() => this.onOpenAlertModal(post.uuid)}
              >
                <Glyphicon glyph="cross"/>X
              </Button>
            </ButtonGroup>

          </td>
        </tr>
      )
    }
  };

  renderAlertModal(openAlert) {
    return (
      <Modal open={openAlert} onClose={this.onCloseAlertModal} little>
        <h2>Remove post</h2>
        <div>Do you really want remove this post?</div>
        <Button
          className={'btn post-list__button--padding'}
          style={{border: '1px solid grey', cursor: 'pointer'}}
          onClick={() => this.onCloseAlertModal}
        >
          <Glyphicon glyph="pencil"/>No
        </Button>

        <Button
          className={'btn btn-primary post-list__button--padding'}
          style={{border: '1px solid grey', cursor: 'pointer'}}
          onClick={() => this.removePost()}
        >
          <Glyphicon glyph="cross"/>Yes
        </Button>
      </Modal>
    );
  }

  render() {
    const {openAlert} = this.state;
    return (

      <div>
        {this.renderAlertModal(openAlert)}
        <Grid className={'bsClass'}>

          <Button className={'btn post-list__button--padding'} style={{
            border: '1px solid grey',
            margin: '10px',
            cursor: 'pointer'
          }}>
            <Glyphicon glyph="pencil"/>Add new
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
