import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
  margin-right: 12px;
  margin-top: 12px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  width: 130px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
  transition: opacity 0.05s linear;
`;
const Rating = styled.span`
  bottom: 50px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
`;
const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Name = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
`;
const FeatureTitle = styled.div`
  font-size: 10px;
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.7);
`;
const FeatureYear = styled.div`
font-size: 10px;
margin-top: 3px;
text-align: right
color: rgba(255, 255, 255, 0.7);
`;
const Character = styled.div`
  font-size: 10px;
  margin-top: 3px;
  color: rgba(255, 255, 255, 0.7);
`;

const ProfileCard = ({ id, imageUrl, character, name, rating, isPeople, featureTitle, featureYear }) => (
  <Link to={`/nomflix/people_Detail/${id}`}>
    <Container>
      <ImageContainer>
        <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : require("../assets/noPosterSmall.png")} />{" "}
        <Rating>
          <span role="img" aria-label="Rating">
            {" "}
            ⭐️{" "}
          </span>{" "}
          {rating ? rating.toString().substr(0, rating.toString().search(/[.]/) + 2) : ""}{" "}
        </Rating>{" "}
        <>
          {" "}
          <Name>
            {" "}
            {name && (0 < name.search(/[\/\(\\-]/i) && name.search(/[\/\(\\-]/i) < 23) && name.slice(0, name.search(/[\/\(\\-]/i))}{" "}
            {name && !(0 < name.search(/[\/\(\\-]/i) && name.search(/[\/\(\\-]/i) < 23) ? (name.length > 23 ? `${name.substring(0, 23)}..` : name) : ""}{" "}
          </Name>{" "}
        </>{" "}
        <>
          {" "}
          {!isPeople && (
            <Character>
              {" "}
              {character && (0 < character.search(/[\/\(\\-]/i) && character.search(/[\/\(\\-]/i) < 23) && character.slice(0, character.search(/[\/\(\\-]/i))}{" "}
              {character && !(0 < character.search(/[\/\(\\-]/i) && character.search(/[\/\(\\-]/i) < 23)
                ? character.length > 23
                  ? `${character.substring(0, 23)}..`
                  : character
                : ""}{" "}
            </Character>
          )}{" "}
        </>{" "}
        <>
          {" "}
          {isPeople && (
            <>
              <FeatureTitle> {featureTitle} </FeatureTitle> <FeatureYear> {featureYear} </FeatureYear>{" "}
            </>
          )}{" "}
        </>{" "}
      </ImageContainer>{" "}
    </Container>{" "}
  </Link>
);

ProfileCard.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  character: PropTypes.string,
  known_for: PropTypes.array,
  isPeople: PropTypes.bool,
};

export default ProfileCard;
