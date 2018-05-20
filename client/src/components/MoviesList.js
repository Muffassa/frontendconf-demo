import React from "react";
import styled from "styled-components";

const MoviesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const MoviesList = ({ movies }) => (
  <MoviesWrapper>
    {movies.map(({ title, id, poster }) => (
      <div key={id}>
        <img src={poster} height="375" width="250" />
        <p>{title}</p>
      </div>
    ))}
  </MoviesWrapper>
);
