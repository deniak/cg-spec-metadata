import axios from "axios";

export async function collectGithubMetadata(spec) {
  if (!spec.repo) return null;

  const base = `https://api.github.com/repos/${spec.repo}`;

  try {
    const repo = await axios.get(base);
    const commits = await axios.get(`${base}/commits?per_page=1`);
    const issues = await axios.get(`${base}/issues?state=open`);

    return {
      stars: repo.data.stargazers_count,
      forks: repo.data.forks_count,
      openIssues: repo.data.open_issues_count,
      lastCommitDate: commits.data[0]?.commit?.committer?.date || null
    };
  } catch (e) {
    return { error: e.message };
  }
}