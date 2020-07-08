import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row
  justify-content: space-between;
  border-radius: 6px;
  background-color: rgba(100, 100, 100, 0.5);
  height: 350px;
  padding: 20px
  padding-right:10px
  margin-right: 15px
  margin-bottom: 15px
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 100%;
  width: 200px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
  &:hover {
    opacity: 0.6;
  }
`;

const ContentContainer = styled.div`
padding-left: 16px;
padding-right:0px
height: 100% 
width: 200px
display:flex
flex-direction: column 
flex-wrap: wrap

`;
const Title = styled.div`
  display: inline-block;
  font-size: 16px;
  font-weight: 650;
  margin-bottom: 16px;
`;
const Year = styled.span`
  font-size: 10px;
  font-weight:500
  color: rgba(255, 255, 255, 0.5);
`;

const RatingContainer = styled.div`
  margin-bottom: 6px;
`;
const RateItem = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 6px;
`;
const Rating1 = styled.span`
  font-size: 12px;
  margin-left:1px
  color: rgba(240, 240, 0, 1);
  font-weight: 600;
`;
const Rating2 = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: rgba(200, 200, 200, 0.8);
`;
const DescriptionContainer = styled.div``;
const Description = styled.div`
height:100%
margin-top:12px
font-size: 12px
letter-spacing: 1.05;
line-hight: 1.1
overflow-y: auto;
`;

const WatchPoster = ({ id, imageUrl, title, year, rating, popularity, description, vote_count, character, isCast, isMovie, isCredit }) => (
  <Link to={isMovie ? `/nomflix/movie/${id}` : `/nomflix/show/${id}`}>
    <Container>
      <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w300${imageUrl}` : require("../assets/noPosterSmall.png")} />
      <>
        {description.overview === "" && (
          <Title>
            {title} <Year> {year} </Year>
          </Title>
        )}
      </>
      <>
        {description.overview !== "" && (
          <ContentContainer>
            <>
              <Title>
                {title.length > 22 ? `${title.substring(0, 22)}..` : title}
                {!isCredit ? <Year>{` (${year})`}</Year> : ""}
              </Title>
            </>
            <>
              <RatingContainer>
                {isCredit && year ? (
                  <RateItem>
                    {isMovie ? "Relased:" : "Air:"}
                    <Rating1>{` ${year.replace("-", "/ ")}\u00A0\u00A0`}</Rating1>
                  </RateItem>
                ) : (
                  ""
                )}

                {isCredit && character ? (
                  <RateItem>
                    {" "}
                    {isCast ? "Character" : "Job"}: <Rating1>{character.length > 20 ? `${character.substring(0, 20)}..` : character}</Rating1>
                  </RateItem>
                ) : (
                  ""
                )}

                {isCredit && popularity ? (
                  <RateItem>
                    Popularity: <Rating1> {`\u00A0${popularity.toString().substr(0, popularity.toString().search(/[.]/) + 2)}`} </Rating1>
                    <Rating2> (by TMDb) </Rating2>
                  </RateItem>
                ) : (
                  ""
                )}
                {rating && (
                  <RateItem>
                    Critic Votes: <Rating1> {`\u00A0${rating.toString().substr(0, rating.toString().search(/[.]/) + 2)}`} </Rating1> <Rating2> /10 ({vote_count} rates)</Rating2>
                  </RateItem>
                )}
              </RatingContainer>
            </>
            {isCredit ? (
              <DescriptionContainer style={{ height: "185px" }}>
                <Description>{description.overview}</Description>
              </DescriptionContainer>
            ) : (
              <DescriptionContainer style={{ height: "77%" }}>
                <Description>{description.overview}</Description>
              </DescriptionContainer>
            )}
          </ContentContainer>
        )}
      </>
    </Container>
  </Link>
);

WatchPoster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  character: PropTypes.string,
  year: PropTypes.string,
  rating: PropTypes.number,
  popularity: PropTypes.number,
  isMovie: PropTypes.bool,
  isCredit: PropTypes.bool,
  description: PropTypes.string,
  vote_count: PropTypes.number,
};

export default WatchPoster;
