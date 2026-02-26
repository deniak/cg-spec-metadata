import axios from "axios";

const MOZILLA_JSON_URL =
  "https://mozilla.github.io/standards-positions/merged-data.json";

let cache = null;

export async function collectMozillaPosition(spec) {
  if (!cache) {
    const { data } = await axios.get(MOZILLA_JSON_URL);
    cache = data;
  }

  const entry = Object.entries(cache).find(([k, v]) => v.url === spec.url);

  return {
    issue: entry ? `https://github.com/mozilla/standards-positions/issues/${entry[0]}` : "N/A",
    position: entry ? entry[1].position : "no-signal"
  };
}