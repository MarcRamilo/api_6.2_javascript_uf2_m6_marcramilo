// Import the Octokit library
import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';

// Define your personal access token
const TOKEN = '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';

// Create an instance of Octokit with your access token
const octokit = new Octokit({ auth: TOKEN });

// Function to fetch user information
async function getUser(username) {
  try {
    const response = await octokit.request(`GET /users/${username}`);

    console.log("getUser",response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

getUser('MarcRamilo');
// Function to fetch repositories for a user
async function getRepos(username) {
  try {
    const response = await octokit.request(`GET /users/${username}/repos`);
    console.log("getRepos",response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}
getRepos('MarcRamilo');
// Main show basic user information
async function userInfo(username) {
  try {
      const user = await getUser(username);
      const userInfoElement = document.querySelector('.userInfo');
      const getName = user.login;
      userInfoElement.textContent = `Benvingut/da ${getName}`;
      return getName;
  } catch (error) {
    console.error('Error:', error);
  }

}
userInfo('MarcRamilo');

// Main function to display repository information
async function repos(username) {
  try {
    // Get the repositories
    const repositories = await getRepos(username);
    console.log("repos",repositories.data);
    // Get the GitHub data container
    const githubDataContainer = document.querySelector('.repo-list');
    console.log(githubDataContainer);

    // Clear the container
    githubDataContainer.innerHTML = '';

    // Add each repository to the container
    repositories.forEach((repo) => {
      const repoElement = document.createElement('div');
      repoElement.className = 'col-span-1 bg-white p-4 rounded shadow';

      const repoName = document.createElement('h2');
      repoName.className = 'text-xl font-bold mb-2';
      repoName.textContent = repo.name;
      repoElement.appendChild(repoName);

      const repoDescription = document.createElement('p');
      repoDescription.className = 'text-gray-600';
      repoDescription.textContent = repo.description;
      repoElement.appendChild(repoDescription);

      const repoLink = document.createElement('a');
      repoLink.className = 'text-blue-500';
      repoLink.textContent = 'View on GitHub';
      
      // Verifica si repo.html_url está definit abans de assaignar-lo a href
      if (repo.html_url) {
          repoLink.href = repo.html_url;
          repoLink.target = '_blank';
      } else {
          // Si repo.html_url no está definit o está buit, desactiva el link
          repoLink.style.pointerEvents = 'none';
          repoLink.style.color = 'gray';
          repoLink.textContent = 'Link Unavailable';
      }
      
      repoElement.appendChild(repoLink);

      // ... altres detalls del repositori

      githubDataContainer.appendChild(repoElement);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
repos('MarcRamilo');
// Create new repository

async function newRepo() { //width the id by the name
  try {
    const response = await octokit.request('POST /user/repos', {
      id : 'MarcRamilo',
      name: 'new-repo_2',
      private: false,
      description: 'This is my new repository'
    });

    console.log('New repository created:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteRepo() {
//delte the repo created on last function by id
  try {
    const response = await octokit.request('DELETE /repos/{owner}/{repo}', {
      owner: 'MarcRamilo',
      repo: 'new-repo_2'
    });

    console.log('Repository deleted:', response.status);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the main function with a username
function main() {
  userInfo('username');
  repos('username');
  
}

// make functions available to the browser
window.newRepo = newRepo;
window.deleteRepo = deleteRepo;

main();
