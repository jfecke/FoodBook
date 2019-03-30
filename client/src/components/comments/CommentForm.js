import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    return (
      <div className="card">
        <div className="row">
          <div className="col-md-2">
            <img
              className="comment-pic"
              src="https://picsum.photos/160"
              alt="profile"
            />
            <div className="text-center">User Name</div>
          </div>
          <div className="col-md">
            <form>
              <div className="form-group">
                <label for="title">Post Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label for="rating">Rating:</label>
                <select className="form-control" id="rating">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label for="comment">Comment:</label>
                <textarea className="form-control" id="comment" rows="3" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
