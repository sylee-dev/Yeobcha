import React, { useState } from "react";
import styled from "styled-components";

const Tabs = styled.div`
  margin-top: 30px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const TabItem = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 10%;
  position: relative;

  margin-right: 1px;
  font-size: 1em;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  background-color: ${(props) => (props.active ? "white" : "lightgray")};
  height: ${(props) => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;

const TabContent = styled.div`
  ${(props) =>
    props.active
      ? "display: flex;justify-content: space-between;flex-wrap:wrap;background-color: rgba(255, 255, 255, 0.5);height: 500px;"
      : "display:none"}
`;

const Sroll = styled.div`
  display: grid;
  grid-auto-flow: column;
  overflow-x: scroll;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

const Grid = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
`;

const GridContent = styled.div`
  height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
`;

const ErrMsg = styled.div`
  height: 100%;
  font-size: 30px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
`;

const GridTitle = styled.div`
  font-size: 17px;
  color: black;
  font-weight: 600;
  vertical-align: middle;
  display: flex;
`;

const Image = styled.img`
  width: 270px;
  height: 400px;
  margin-top: 5px;
`;
const Logo = styled.img`
  width: 270px;
  /* height: 300px; */
  margin-top: 5px;
`;

const Iframe = styled.iframe`
  width: 400px;
  height: 400px;
  margin-bottom: 5px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;
const useTab = ({ state, isMovie }) => {
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  console.log(state);
  return (
    <>
      <Tabs>
        <TabItem onClick={handleClick} active={active === 0} id={0}>
          Video
        </TabItem>
        <TabItem onClick={handleClick} active={active === 1} id={1}>
          Production
        </TabItem>
        {isMovie ? (
          ""
        ) : (
          <TabItem onClick={handleClick} active={active === 2} id={2}>
            Seasons
          </TabItem>
        )}
      </Tabs>

      <TabContent active={active === 0}>
        <Sroll>
          {state.result &&
          state.result.videos &&
          state.result.videos.results.length > 0 ? (
            state.result.videos.results.map((c) => (
              <Grid>
                <GridTitle>{c.name}</GridTitle>
                <GridContent>
                  <Iframe src={`https://www.youtube.com/embed/${c.key}`} />
                </GridContent>
              </Grid>
            ))
          ) : (
            <ErrMsg>
              <span role="img" aria-label="rating">
                Can't find Video. 😅
              </span>
            </ErrMsg>
          )}
        </Sroll>
      </TabContent>

      <TabContent active={active === 1}>
        <Sroll>
          {state.result &&
          state.result.production_companies &&
          state.result.production_companies.length > 0 ? (
            state.result.production_companies.map((c) => (
              <Grid>
                <GridTitle>
                  {c.name}
                  <Divider>•</Divider>
                  <img
                    src={`https://www.countryflags.io/${c.origin_country}/flat/24.png`}
                  />
                </GridTitle>
                <GridContent>
                  <Logo
                    src={
                      c.logo_path
                        ? `https://image.tmdb.org/t/p/w300${c.logo_path}`
                        : require("../../assets/noPosterSmall.png")
                    }
                  />
                </GridContent>
              </Grid>
            ))
          ) : (
            <ErrMsg>
              <span role="img" aria-label="rating">
                Can't find Production. 😅
              </span>
            </ErrMsg>
          )}
        </Sroll>
      </TabContent>

      <TabContent active={active === 2}>
        <Sroll>
          {state.result.seasons && state.result.seasons.length > 0 ? (
            state.result.seasons.map((c) => (
              <Grid>
                <GridTitle>{c.name}</GridTitle>
                <GridContent>
                  <Image
                    src={
                      c.poster_path
                        ? `https://image.tmdb.org/t/p/w300${c.poster_path}`
                        : require("../../assets/noPosterSmall.png")
                    }
                  />
                </GridContent>
              </Grid>
            ))
          ) : (
            <ErrMsg>
              <span role="img" aria-label="rating">
                Can't find Video. 😅
              </span>
            </ErrMsg>
          )}
        </Sroll>
      </TabContent>
    </>
  );
};
export default useTab;
