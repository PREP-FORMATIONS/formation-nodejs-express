async function main() {
  try {
    const user = await getUsers(1);
    const repos = await getRepositories(user.githubUsername);
    const branches = await getFirstRepoBranches(repos[0]);
    const commits = await getBranchCommits(branches[0]);

    console.log(commits);
  } catch (error) {
    console.error(error);
  }
}

async function getUsers(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, githubUsername: 'csev' });
    }, 2000);
  });
}

async function getRepositories(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching users repositories");
      resolve(['repo1', 'repo2', 'repo3', 'repo4']);
    }, 2000);
  });
}

async function getFirstRepoBranches(repoName) {
  const url = `https://api.github.com/repos/csev/${repoName}/branches`;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching first repos branches");
      resolve(['main', 'develop', 'feature/google-auth']);
    }, 2000);
  });
}

async function getBranchCommits(branch) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Fetching all the commit for the branch ${branch}`);
      resolve(['first-commit', '2nd-commit']);
    }, 2000);
  });


}
console.log("Before");
main();
console.log("After");
