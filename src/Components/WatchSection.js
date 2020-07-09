import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
  margin-right: -20px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 650;
`;
const SubTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: rbga(80, 80, 80, 0.8);
`;

const Grid = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap
  flex-direction: row;
`;

const WatchSection = ({ title, subtitle, children }) => (
  <Container>
    <Title> {title} </Title> <SubTitle> {subtitle} </SubTitle> <Grid> {children} </Grid>{" "}
  </Container>
);

WatchSection.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default WatchSection;
