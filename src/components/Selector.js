import {
  Box,
  Container,
  CircularProgress,
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectitem } from "../actions";
import { useDispatch } from "react-redux";
import { MoonSat } from "iconoir-react";
import theme from "../components/MaterialUI/Theme";

//Passed in an array of Object items, each containing an id, name, logo, country, and flag.
export default function Selector({ selected, setSelected, items = [] }) {
  const currentItemIndex = items.findIndex((element) => {
    return element.id === selected;
  });
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      {selected ? (
        <Box
          sx={{
            img: {
              height: "160px",
              widght: "160px",
              padding: "2rem",
            },
          }}
        >
          <img
            alt={
              items[currentItemIndex].name
                ? `${items[currentItemIndex].name} logo`
                : "no image found"
            }
            src={items[currentItemIndex].logo}
          ></img>
        </Box>
      ) : (
        ""
      )}
      <FormControl
        sx={{
          minWidth: 400,
        }}
      >
        <Select
          id="competitions-selector"
          value={selected}
          displayEmpty
          onChange={(e) => {
            setSelected(e.target.value);
          }}
          input={<OutlinedInput />}
          renderValue={() => {
            if (!selected) {
              return <em>Choose Competition</em>;
            } else {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    img: {
                      height: "48px",
                      width: "48px",
                      paddingLeft: "2rem",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "24pt",
                      fontWeight: "500",
                    }}
                  >
                    {items[currentItemIndex].name}
                  </Typography>
                  {items[currentItemIndex].flag ? (
                    <img
                      src={items[currentItemIndex].flag}
                      alt={`${items[currentItemIndex].flag} flag`}
                    ></img>
                  ) : (
                    <MoonSat
                      color={theme.palette.primary.main}
                      width={"24px"}
                      height={"24px"}
                      style={{ marginLeft: "0.5rem" }}
                    />
                  )}
                </Box>
              );
            }
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Select Competition</em>
          </MenuItem>
          {Object.values(items).map((item) => {
            return (
              <MenuItem
                value={item.id}
                key={item.id}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {item.name}
                {item.flag ? (
                  <Box
                    sx={{
                      img: {
                        height: "24px",
                        width: "24px",
                        marginLeft: "0.5rem",
                      },
                    }}
                  >
                    <img src={item.flag} alt={`${item.flag} flag`}></img>
                  </Box>
                ) : (
                  <MoonSat
                    color={theme.palette.primary.main}
                    width={"24px"}
                    height={"24px"}
                    style={{ marginLeft: "0.5rem" }}
                  />
                )}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Container>
  );
}