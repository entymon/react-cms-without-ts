import React from 'react';
import {Grid, ButtonGroup, Table, Button, Glyphicon, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import Modal from 'react-responsive-modal';

export default class PostList extends React.Component {

  newPost = {
    title: '',
    description: '',
    author: {
      firstName: 'Admin',
      lastName: 'Non Authorised'
    }
  };

  state = {
    openAlert: false,
    openForm: false,
    postUuid: '',
    selectedPost: {},
    posts: [],
    postDesc: '',
    postTitle: '',
    post: {
      title: '',
      description: '',
      author: {
        firstName: 'Admin',
        lastName: 'Non Authorised'
      }
    }
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

  onOpenFormModal = (post) => {
    this.setState({
      openForm: true,
      selectedPost: post
    });
  };

  onCloseFormModal = () => {
    this.setState({openForm: false});
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

  /**
   * Remove element
   */
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

  updatePost = (data) => {
    this.newPost.title = this.state.postTitle;
    this.newPost.description = this.state.postDescr;

  }

  /**
   * Save post
   * @param data
   */
  savePost = (data) => {

    data.title = this.state.postTitle;
    data.description = this.state.postDesc;

    console.log(data, 'aswqe');

    fetch(`http://localhost:4000/posts`, {
      method  : 'post',
      headers : new Headers({
        'Content-Type': 'application/json'
      }),
      body    : data
    }).then( response => {
      return response.json();
    }).then( result => {
      this.getPosts();
      this.onCloseAlertModal();
      console.log(result, 'resource deleted');
    });
  };

  /**
   * Render record on list
   * @param post
   * @param index
   * @returns {*}
   */
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
                onClick={() => this.onOpenFormModal(post)}
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

  onChangeTitle = (event) => {
    this.setState({postTitle: event.target.value});
  };

  onChangeDesc = (event) => {
    this.setState({postDesc: event.target.value});
  };


  /**
   * Renders FORM modal
   * @param openForm
   * @returns {*}
   */
  renderFormModal(openForm) {

    let post = this.newPost;
    let title = 'Add new Post';
    let buttonDesc = 'Add';
    let action = this.savePost;

    if (this.state.selectedPost) {
      post = this.state.selectedPost;
      title = 'Update Post';
      buttonDesc = 'Update';
      action = this.updatePost;
    }

    return (
      <Modal open={openForm} onClose={this.onCloseFormModal}>
        <h2>{title}</h2>

        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" id="js-title-input"
                 placeholder="title" value={this.state.postTitle}
                 onChange={this.onChangeTitle}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input type="text" className="form-control" id="js-desc-input"
                 placeholder="description"
                 value={this.state.postDesc}
                 onChange={this.onChangeDesc}
          />
        </div>

        <Button
          className={'btn post-list__button--padding'}
          style={{border: '1px solid grey', cursor: 'pointer'}}
          onClick={() => this.onCloseFormModal()}
        >
          <Glyphicon glyph="pencil"/>No
        </Button>

        <Button
          className={'btn btn-primary post-list__button--padding'}
          style={{border: '1px solid grey', cursor: 'pointer'}}
          onClick={() => action(post)}
        >
          <Glyphicon glyph="cross"/>{buttonDesc}
        </Button>
      </Modal>
    );
  }

  /**
   * Renders ALERT modal
   * @param openAlert
   * @returns {*}
   */
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

  /**
   * Default render
   * @returns {*}
   */
  render() {
    const {openAlert, openForm} = this.state;
    return (

      <div>
        {this.renderAlertModal(openAlert)}
        {this.renderFormModal(openForm)}
        <Grid className={'bsClass'}>

          <Button
            className={'btn post-list__button--padding'}
            onClick={() => this.onOpenFormModal()}
            style={{
              border: '1px solid grey',
              margin: '10px',
              cursor: 'pointer'
            }}
          >
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
