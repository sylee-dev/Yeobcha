import React, { useState, useEffect } from "react";
import { moviesApi, tvApi } from "../../api";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import Tab from "./useTab";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  max-width: 100%;
  max-height: 100%;
  display: inline-block;
  vertical-align: middle;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const useDetail = (props) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    loading: true,
    isMovie: true,
  });
  const {
    location: { pathname },
  } = props;
  const {
    match: {
      params: { id },
    },
    history: { push },
  } = props;

  const getDetail = async () => {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      setState((state) => ({
        ...state,
        isMovie: pathname.includes("/movie/"),
      }));
      if (pathname.includes("/movie/")) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      setState((state) => ({ ...state, error: "Can't find anything." }));
    } finally {
      setState((state) => ({ ...state, loading: false, result }));
    }
  };

  useEffect(() => {
    getDetail();
  }, []);
  console.log(state);
  return state.loading ? (
    <>
      <Helmet>
        <title>Loading | Yeobcha</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {state.result.original_title
            ? state.result.original_title
            : state.result.original_name}
          | Yeobcha
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${state.result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            state.result.poster_path
              ? `https://image.tmdb.org/t/p/original${state.result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            <span>
              <a
                href={
                  `https://www.imdb.com/title/` +
                  (state.result.imdb_id
                    ? state.result.imdb_id
                    : state.result.external_ids.imdb_id)
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {state.result.original_title
                  ? state.result.original_title
                  : state.result.original_name}{" "}
                <img
                  style={{ width: "3%", height: "3%" }}
                  src={require("../../assets/imdb_logo.png")}
                />
              </a>
            </span>
          </Title>
          <ItemContainer>
            <Item>
              {state.result.release_date
                ? state.result.release_date.substring(0, 4)
                : state.result.first_air_date
                ? state.result.first_air_date.substring(0, 4)
                : ""}
            </Item>
            <Divider>•</Divider>
            <Item>
              {state.result.runtime || state.result.runtime === 0
                ? state.result.runtime
                : state.result.episode_run_time[0]}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {state.result.genres &&
                state.result.genres.map((genre, index) =>
                  index === state.result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {state.result &&
            state.result.production_countries &&
            state.result.production_countries.length > 0 ? (
              state.result.production_countries.map((t) => (
                <>
                  <Divider>•</Divider>
                  <Item>
                    <img
                      src={`https://www.countryflags.io/${t.iso_3166_1}/flat/24.png`}
                    />
                  </Item>
                </>
              ))
            ) : state.result &&
              state.result.origin_country &&
              state.result.origin_country.length > 0 ? (
              state.result.origin_country.map((t) => (
                <>
                  <Divider>•</Divider>
                  <Item>
                    <img src={`https://www.countryflags.io/${t}/flat/24.png`} />
                  </Item>
                </>
              ))
            ) : (
              <>
                <Divider>•</Divider>
                <Item>Unknown country</Item>
              </>
            )}
          </ItemContainer>
          <Overview>{state.result.overview}</Overview>
          <Tab state={state} isMovie={state.isMovie} />
        </Data>
      </Content>
    </Container>
  );
};

export default useDetail;
