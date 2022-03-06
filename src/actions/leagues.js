import football from "../api/football";
export const fetchLeagues =
  (id, current = "true") =>
  async (dispatch) => {
    const { data } = await football.get("/leagues", {
      params: { id, current },
    });
    let parsedLeagues = {};
    parsedLeagues[id] = {
      league: data.response[0],
      lastUpdated: Date.now(),
    };

    dispatch({ type: "FETCH_LEAGUES", payload: parsedLeagues });
  };

export const updateLeagues =
  (id, current = "true") =>
  async (dispatch) => {
    const { data } = await football.get("/leagues", {
      params: { id, current },
    });
    let parsedLeagues = {};
    parsedLeagues[id] = {
      league: data.response[0],
      lastUpdated: Date.now(),
    };
    dispatch({ type: "UPDATE_LEAGUES", payload: parsedLeagues });
  };
