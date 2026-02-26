import axios from "axios";

const WEBKIT_JSON_URL =
  "https://raw.githubusercontent.com/WebKit/standards-positions/main/summary.json";

let cache = null;

async function fetchWebkitPositions() {
  if (!cache) {
    const { data } = await axios.get(WEBKIT_JSON_URL);
    cache = data;
  }
  return cache;
}

export async function collectWebkitPosition(spec) {
  try {
    const data = await fetchWebkitPositions();

    const entry = data.find(e => e.url === spec.url);

    return {
        issue: entry ? entry.id : "N/A",
        position: entry ? entry.position : "no-signal"
    };
  } catch (error) {
    return { error: error.message };
  }
}