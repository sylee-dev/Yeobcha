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

const TabScrollContent = styled.div`
  ${(props) =>
    props.active
      ? // ? "display: grid;grid-template-columns: repeat(3, 1fr);grid-auto-rows: 200px;"
        "display:flex;overflow: auto;white-space: nowrap;width:2500px;height:300px"
      : "display:none"}
`;

const TabContent = styled.div`
  ${(props) =>
    props.active
      ? "display: grid;grid-template-columns: repeat(3, 1fr);grid-auto-rows: 200px;"
      : // "display:flex;overflow: auto;white-space: nowrap;width:2500px;height:300px"
        "display:none"}
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #808080;
  overflow: hidden;
  margin-right: 3px;
`;

const CardHeader = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  font-size: 1.2em;
  font-weight: 600;
  border-bottom: 1px solid black;
  padding: 5px 10px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Scroll = styled.div`
  /* background-color: #333; */
  overflow: auto;
  white-space: nowrap;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 100%;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
  z-index: 1;
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
      {/* <Scroll>
        <TabScrollContent active={active === 0}>
          {state.result.videos &&
            state.result.videos.results &&
            state.result.videos.results.map((test, index) => (
              <>
                <Card key={index}>
                  <CardHeader>
                    {test.name}
                    <Divider>•</Divider>
                    {test.type}
                  </CardHeader>
                  <CardContent>
                    <iframe
                      style={{
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      title={test.id}
                      src={`https://www.youtube.com/embed/${test.key}`}
                    />
                  </CardContent>
                </Card>
              </>
            ))}
        </TabScrollContent>
      </Scroll> */}
      <TabContent active={active === 1}>
        {state.result &&
          state.result.production_companies &&
          state.result.production_companies.map((test, index) => (
            <>
              <Card key={index}>
                <CardHeader>
                  <img
                    src={`https://www.countryflags.io/${test.origin_country}/flat/24.png`}
                  />
                  <Divider>•</Divider>
                  {test.name}
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </>
          ))}
      </TabContent>
      <Scroll>
        <TabScrollContent active={active === 2}>
          {state.result.seasons &&
            state.result.seasons.map((test, index) => (
              <>
                <Card key={test.id}>
                  <CardHeader>{test.name}</CardHeader>
                  <Image
                    bgUrl={
                      test.poster_path
                        ? `https://image.tmdb.org/t/p/w300${test.poster_path}`
                        : require("../../assets/noPosterSmall.png")
                    }
                  />
                </Card>
              </>
            ))}
        </TabScrollContent>
      </Scroll>
    </>
  );
};
export default useTab;
