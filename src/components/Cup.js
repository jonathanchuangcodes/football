import React from "react";
import {
  Box,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

const colors = ["#1BB55C", "#FFBB12", "#E74C3C"];

const QualificationLabel = ({ color }) => {
  return <Box width={8} height={64} bgcolor={color} mr={1}></Box>;
};

export default function Cup({ standings }) {
  let qualifications = standings[0].map((team) => {
    return team.description;
  });
  qualifications = [...new Set(qualifications)];


  //FIXME: Descriptions aren't being provided. Omitting Qualification Color Label for now.
  const showQualificationStage = (team) => {
    if (qualifications.length <= 2) {
      if (team.description === qualifications[0]) {
        return <QualificationLabel color={colors[0]} />;
      } else {
        return <QualificationLabel color={colors[2]} />;
      }
    } else {
      if (team.description === qualifications[0]) {
        return <QualificationLabel color={colors[0]} />;
      } else if (team.description === qualifications[1]) {
        return <QualificationLabel color={colors[1]} />;
      } else if (team.description === qualifications[2]) {
        return <QualificationLabel color={colors[2]} />;
      }
    }
  };

  return (
    <Container
      sx={{
        margin: "1rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {standings.map((group) => {
        return (
          <Container
            disableGutters={true}
            maxWidth={false}
            sx={{
              width: "45%",
              margin: "1rem",
            }}
            key={group[0].group}
          >
            <Typography variant="h5">{group[0].group}</Typography>
            <TableContainer
              sx={{
                border: "solid 2px #E5E5E5",
                borderRadius: "8px",
              }}
            >
              <Table sx={{ borderCollapse: "separate" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell align="right">Games Played</TableCell>
                    <TableCell align="right">Points</TableCell>
                    <TableCell align="right">Goal Difference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.map((team) => {
                    return (
                      <TableRow key={team.team.id}>
                        <TableCell
                          sx={{
                            paddingLeft: "1em",
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {/* {showQualificationStage(team)} */}
                            <Typography>{team.rank}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              img: {
                                width: "40px",
                                height: "40px",
                              },
                              marginRight: "1rem",
                            }}
                          >
                            <img
                              src={team.team.logo}
                              alt={`${team.team.name} Logo`}
                            ></img>
                          </Box>
                          <Typography
                            sx={{
                              textAlign: "left",
                            }}
                          >
                            {team.team.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">{team.all.played}</TableCell>
                        <TableCell align="right">{team.points}</TableCell>
                        <TableCell align="right">{team.goalsDiff}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        );
      })}
    </Container>
  );
}
