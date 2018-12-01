import http from "k6/http";
import { sleep } from "k6";

export let options = {
    vus: 200,
    duration: "120s",
    rps: 200
  };

export default function() {
    // http.get("http://localhost:3000/movies/1");
    http.get("http://18.236.197.104/api/moviesbyid/1364712/2018-11-23/-87.0506,-29.1675");
    sleep(1);
  };