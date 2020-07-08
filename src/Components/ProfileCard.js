import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
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
            ⭐️
          </span>{" "}
          {rating}
        </Rating>{" "}
        <>
          <Name>
            {" "}
            {name
              ? name.search(/[\/\(\\-]/i) > 18 && name.slice(0, name.search(/[\/\(\\-]/i)).length > 18 && name.length > 18
                ? `${name.slice(0, name.search(/[\/\(\\-]/i)).substring(0, 18)}..`
                : name.slice(0, name.search(/[\/\(\\-]/i)).substring(0, 18)
              : ""}
          </Name>
        </>
        <>
          {!isPeople && (
            <Character>
              {" "}
              (
              {character
                ? character.search(/[\/\(\\-]/i) > 18 && character.slice(0, character.search(/[\/\(\\-]/i)).length > 18 && character.length > 18
                  ? `${character.slice(0, character.search(/[\/\(\\-]/i)).substring(0, 18)}..`
                  : character.slice(0, character.search(/[\/\(\\-]/i)).substring(0, 18)
                : ""}
              )
            </Character>
          )}
        </>
        <>
          {isPeople && (
            <>
              <FeatureTitle> {featureTitle} </FeatureTitle>
              <FeatureYear> {featureYear} </FeatureYear>
            </>
          )}{" "}
        </>
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
