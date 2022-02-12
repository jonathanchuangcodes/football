import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeagues, updateLeagues } from "../actions/leagues";
import { fetchTeams, updateTeams, selectLeague, selectTeam } from "../actions";
import { AddSquare } from "iconoir-react";
import theme from "./MaterialUI/Theme";
import { Link } from "gatsby";

export default function Followed() {
  const dispatch = useDispatch();
  const followedTeams = useSelector((state) => state.followed.teams);
  const followedLeagues = useSelector((state) => state.followed.leagues);
  const selectedLeague = useSelector((state) => state.selectedLeague);
  const selectedTeam = useSelector((state) => state.selectedTeam);
  const leagues = useSelector((state) => state.leagues);
  const teams = useSelector((state) => state.teams);

  useEffect(() => {
    const leagueIds = Object.keys(leagues).map((league) => {
      return Number(league);
    });

    for (let i = 0; i < followedLeagues.length; i++) {
      if (!leagueIds.includes(followedLeagues[i])) {
        dispatch(fetchLeagues(followedLeagues[i]));
      }
    }

    Object.values(leagues).forEach((league) => {
      if (Date.now() - league.lastUpdated >= 86400000) {
        dispatch(updateLeagues(league.leagueInfo.league.id));
      }
    });

    const teamIds = Object.keys(teams).map((team) => {
      return Number(team);
    });

    for (let i = 0; i < followedTeams.length; i++) {
      if (!teamIds.includes(followedTeams[i])) {
        dispatch(fetchTeams(followedTeams[i]));
      }
    }

    Object.values(teams).forEach((team) => {
      if (Date.now() - team.lastUpdated >= 86400000) {
        dispatch(updateTeams(team.teamInfo.league.id));
      }
    });
  }, [followedLeagues, followedTeams, dispatch, leagues, teams]);

  const choiceStyle = {
    border: "2px solid #2E3A59",
    m: 2,
    borderRadius: "16px",
    width: "64px",
    height: "64px",
    textAlign: "center",
    backgroundSize: "80%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    "&:hover": {
      cursor: "pointer",
      border: "4px solid #2E3A59",
    },
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {leagues
          ? followedTeams.map((team) => {
              return (
                <Link key={team} to="/teams">
                  <Box
                    onClick={() => {
                      if (selectedTeam !== team) {
                        dispatch(selectTeam(team));
                      }
                    }}
                    sx={{
                      ...choiceStyle,
                      backgroundImage: teams[team]
                        ? `url(${teams[team].teamInfo.team.logo})`
                        : "",
                    }}
                  >
                    {teams[team] ? "" : ""}
                  </Box>
                </Link>
              );
            })
          : ""}
        <AddSquare
          color={theme.palette.primary.main}
          width={"32px"}
          height={"32px"}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {leagues
          ? followedLeagues.map((league) => {
              return (
                <Link key={league} to="/competitions">
                  <Box
                    onClick={() => {
                      if (selectedLeague !== league) {
                        dispatch(selectLeague(league));
                      }
                    }}
                    sx={{
                      ...choiceStyle,
                      backgroundImage: leagues[league]
                        ? `url(${leagues[league].leagueInfo.league.logo})`
                        : "",
                    }}
                  >
                    {leagues[league] ? "" : ""}
                  </Box>
                </Link>
              );
            })
          : ""}
        <AddSquare
          color={theme.palette.primary.main}
          width={"32px"}
          height={"32px"}
        />
      </Box>
    </>
  );
}