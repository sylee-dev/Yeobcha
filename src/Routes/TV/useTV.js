import React, { useState, useEffect } from "react";
import { tvApi } from "api";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const useTV = () => {
  const [state, setState] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null,
  });

  const getTV = async () => {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      setState((state) => ({ ...state, topRated, popular, airingToday }));
    } catch {
      setState((state) => ({
        ...state,
        error: "Can't find TV information.",
      }));
    } finally {
      setState((state) => ({ ...state, loading: false }));
    }
  };

  useEffect(() => {
    getTV();
  }, []);
  return (
    <>
      <Helmet>
        <title>TV Shows | Yeobcha</title>
      </Helmet>
      {state.loading ? (
        <Loader />
      ) : (
        <Container>
          {state.topRated && state.topRated.length > 0 && (
            <Section title="Top Rated Shows">
              {state.topRated.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {state.popular && state.popular.length > 0 && (
            <Section title="Popular Shows">
              {state.popular.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {state.airingToday && state.airingToday.length > 0 && (
            <Section title="Airing Today">
              {state.airingToday.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={show.first_air_date.substring(0, 4)}
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

export default useTV;
