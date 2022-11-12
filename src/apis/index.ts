import axios from "axios";

export const getQuestion = () =>
  axios.get("https://opentdb.com/api.php?amount=2&type=multiple");
