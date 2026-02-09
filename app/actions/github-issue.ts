"use server";

export async function submitGitHubIssue(formData: FormData) {
  const title = formData.get("title");
  const body = formData.get("body");
  const label = "generated-issue"; // You might want to make this dynamic or configurable

  if (!title || !body || typeof title !== "string" || typeof body !== "string") {
    return { error: "Title and Body are required." };
  }

  const token = process.env.GITHUB_TOKEN;
  const repoOwner = "iraq-developers";
  const repoName = "IQD-Wiki";

  if (!token) {
    console.error("GITHUB_TOKEN is missing.");
    return { error: "Server configuration error: GitHub token missing." };
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          title,
          body,
          labels: [label],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub API Error:", errorData);
      return {
        error: `GitHub API Error: ${errorData.message || response.statusText}`,
      };
    }

    const data = await response.json();
    return { success: true, url: data.html_url };
  } catch (error) {
    console.error("Unexpected error submitting issue:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
