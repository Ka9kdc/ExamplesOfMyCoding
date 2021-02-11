import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  postNewAnnouncement,
  updateAnnouncement,
} from '../../reduxStore/announcements';

const NewPost = (props) => {
  const post = props.announcement;
  const history = useHistory();
  return (
    <div>
      {/* <div className='NewsItem' style={{borderColor: `${post.borderColor}`, backgroundColor: `${post.backgroundColor}`}}> */}
      <h2>Add a new post</h2>
      <textarea
        name="message"
        className="NewsItem"
        style={{
          borderColor: `${post.borderColor}`,
          backgroundColor: `${post.backgroundColor}`,
        }}
        value={post.message}
        onChange={() => props.update(event.target)}
      />
      <div>
        <label htmlFor="backgroundColor">Pick a Background Color</label>
        <input
          type="color"
          name="backgroundColor"
          value={post.backgroundColor}
          onChange={() => props.update(event.target)}
        />
        <label htmlFor="borderColor">Pick a border Color</label>
        <input
          type="color"
          name="borderColor"
          value={post.borderColor}
          onChange={() => props.update(event.target)}
        />
      </div>
      <button type="button" onClick={() => props.submit(post, history)}>
        Sumbit Post
      </button>
    </div>
  );
};
const mapState = (state) => {
  return {
    announcement: state.lastestNews,
  };
};

const mapDispatch = (dispatch) => {
  return {
    update: (newPost) => dispatch(updateAnnouncement(newPost)),
    submit: (announcement, history) =>
      dispatch(postNewAnnouncement(announcement, history)),
  };
};

export default connect(mapState, mapDispatch)(NewPost);
