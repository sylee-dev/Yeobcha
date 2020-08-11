import React, { useState, useEffect } from "react";
import { moviesApi } from "api";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const useHome = () => {
  const [state, setState] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
    error: null,
    loading: true,
  });

  const getMovie = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      setState((state) => ({ ...state, nowPlaying, upcoming, popular }));
    } catch {
      setState((state) => ({
        ...state,
        error: "Can't find movie information.",
      }));
    } finally {
      setState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    getMovie();
  }, []);
  console.log(state);
  return (
    <>
      <Helmet>
        <title>Movies | Yeobcha</title>
      </Helmet>
      {state.loading ? (
        <Loader />
      ) : (
        <Container>
          {state.nowPlaying && state.nowPlaying.length > 0 && (
            <Section title="Now Playing">
              {state.nowPlaying.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {state.upcoming && state.upcoming.length > 0 && (
            <Section title="Upcoming Movies">
              {state.upcoming.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {state.popular && state.popular.length > 0 && (
            <Section title="Popular Movies">
              {state.popular.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {state.error && <Message color="#e74c3c" text={state.error} />}
        </Container>
      )}
    </>
  );
};

export default useHome;
