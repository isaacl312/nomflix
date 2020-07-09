import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "./App.css";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 50px;
  }
  display: absolute;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 650;
  padding-left: 10px;
`;
const SubTitle = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

const GridContainer = styled.div`
  position: relative;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  position: absolute;
  z-index: 2;
  right: 0px;
  top: 6px;
`;
const RightButtonContainer = styled.div`
  margin-right: -20px;
  padding-top: 80px;
  padding-bottom: 70px;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 16px;
  cursor:pointer
  background-color: rgba(30, 30, 30, 0.9);
  transition: background-color 0.1s ease-out;
  &:hover {
    background-color: rgba(80, 80, 80, 0.5);
     }
     
`;
const RightButtonImg = styled.div`
  background-image: url(https://image.flaticon.com/icons/svg/56/56814.svg);
  background-size: cover;
  background-color: rgba(0, 253, 255, 0.9);
  height: 50px;
  width: 50px;
  border-radius: 35px;
  opacity: 0.2;
  transition: opacity 0.1s linear, transform 0.1s linear;
  ${RightButtonContainer}:hover & {
    transform: scale(1.15);
    opacity: 0.7;
  }
`;
const LeftButtonContainer = styled.div`
  position: absolute;
  margin-right: -20px;
  padding-top: 60px;
  padding-bottom: 90px;
  padding-left: 10px;
  padding-right: 10px;
  right: 0px;
  top: 230px;
  border-top-left-radius: 4px;
  border-top-right-radius: 16px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 16px;
  cursor: pointer;
  background-color: rgba(30, 30, 30, 0.9);
  transition: background-color 0.1s ease-out;
  &:hover {
    background-color: rgba(80, 80, 80, 0.5);
  }
`;
const LeftButtonImg = styled.div`
  background-image: url(https://image.flaticon.com/icons/svg/56/56856.svg);
  background-size: cover;
  background-color: rgba(0, 253, 255, 0.9);
  height: 50px;
  width: 50px;
  border-radius: 35px;
  opacity: 0.2;
  transition: opacity 0.1s linear, transform 0.1s linear;
  ${LeftButtonContainer}:hover & {
    transform: scale(1.15);
    opacity: 0.7;
  }
`;

const Section = ({ title, subtitle, children, section, clickHandler, buttonAppear = true }) => (
  <Container>
    <Title>
      {title} <SubTitle> {subtitle} </SubTitle>
    </Title>
    <GridContainer>
      <Grid>{children}</Grid>
      {buttonAppear && (
        <ButtonContainer>
          <RightButtonContainer onClick={() => clickHandler(section, true)}>
            <RightButtonImg />
          </RightButtonContainer>
          <LeftButtonContainer onClick={() => clickHandler(section, false)}>
            <LeftButtonImg />
          </LeftButtonContainer>
        </ButtonContainer>
      )}
    </GridContainer>
  </Container>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Section;
