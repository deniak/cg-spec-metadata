const WPT_FYI_URL = "https://wpt.fyi/api/search";

export async function collectWPTFyi(spec) {
  try {
    const res = await fetch(
      `${WPT_FYI_URL}?label=master&q=${encodeURIComponent(spec.shortname + (spec.feature ? `/${spec.feature}` : ""))}`
    );

    const data = await res.json();

    return {
      hasResults: data.results.length > 0,
      resultCount: data.results.length
    };
  } catch (e) {
    return { error: e.message };
  }
}