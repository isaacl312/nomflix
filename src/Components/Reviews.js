import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
  margin-bottom: 12px;
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.4;
`;
const Author = styled.div`
  text-align: right;
  opacity: 0.7;
  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Reviews = ({ id, author, content }) => (
  <Link to={`${id}`}>
    <Content> {content} </Content> <Author> '{author}' </Author>{" "}
  </Link>
);

Reviews.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string,
  content: PropTypes.string,
};

export default Reviews;
