import axios from "axios";

export async function collectGithubMetadata(spec) {
  if (!spec.repo) return null;
  try {
    const GITHUB_API_REPO_URL = `https://api.github.com/repos/${spec.repo}`;
    const OPEN_PR_URL = `https://api.github.com/search/issues?q=repo:${spec.repo}+type:pr+state:open`;
    const CLOSED_PR_URL = `https://api.github.com/search/issues?q=repo:${spec.repo}+type:pr+state:closed`;

    const repo = await axios.get(GITHUB_API_REPO_URL);
    const openPRs = await axios.get(OPEN_PR_URL);
    const closedPRs = await axios.get(CLOSED_PR_URL);

    return {
      stars: repo.data.stargazers_count,
      forks: repo.data.forks_count,
      openIssues: repo.data.open_issues_count,
      openPRs: openPRs.data?.total_count ?? 0,
      closedPRs: closedPRs.data?.total_count ?? 0,
      lastCommitDate: commits.data[0]?.commit?.committer?.date || null
    };
  } catch (e) {
    return { error: e.message };
  }
}