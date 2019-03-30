import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-flex">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button
      {...props}
      style={{ float: "right", height: 30 + "px" }}
      className="icon d-flex"
    >
      <i class="fa fa-search" />
      {props.children}
    </button>
  );
}
