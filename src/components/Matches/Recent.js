import React from "react";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FixtureCard from "../FixtureCard";
import { separateFixtures } from "../../helpers/fixturesHelper";
import Matches from "./Matches";

export default function Recent({ fixtures }) {
  const desktop = useMediaQuery("(min-width: 1600px");
  const laptop = useMediaQuery("(min-width: 1400px");
  const tablet = useMediaQuery("(min-width: 1050px");
  const phone = useMediaQuery("(min-width: 700px");

  if (fixtures) {
    const sortedFixtures = fixtures.sort((fixtureOne, fixtureTwo) => {
      return fixtureTwo.fixture.timestamp - fixtureOne.fixture.timestamp;
    });

    const fixtureCards = separateFixtures(
      sortedFixtures,
      desktop ? 2 : laptop ? 4 : tablet ? 3 : phone ? 2 : 1
    );
    return (
      <Box
        sx={
          desktop
            ? {
                width: "45%",
                marginLeft: "0.5rem",
                textAlign: "right",
              }
            : {
                display: "flex",
                flexDirection: "column",
                width: "100%",
                textAlign: "center",
                justifyContent: "center",
              }
        }
      >
        <Typography variant="h5" align={"center"}>
          Recent
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            overflowX: "auto",
          }}
        >
          {sortedFixtures.length > 0 ? (
            <Matches
              fixtures={sortedFixtures}
              groupedBy={desktop ? 2 : laptop ? 4 : tablet ? 3 : phone ? 2 : 1}
              axis={desktop ? "x-reverse" : "x"}
              direction={desktop ? "rtl" : "ltr"}
            >
              {fixtureCards.map((section, index) => {
                return (
                  <Box
                    key={index}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {section
                      .sort((fixtureOne, fixtureTwo) => {
                        return (
                          fixtureOne.fixture.timestamp -
                          fixtureTwo.fixture.timestamp
                        );
                      })
                      .map((fixture) => {
                        return (
                          <FixtureCard
                            fixture={fixture}
                            key={fixture.fixture.id}
                          />
                        );
                      })}
                  </Box>
                );
              })}
            </Matches>
          ) : (
            <Container>
              <Typography>No previous matches available</Typography>
            </Container>
          )}
        </Box>
      </Box>
    );
  } else {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }
}
