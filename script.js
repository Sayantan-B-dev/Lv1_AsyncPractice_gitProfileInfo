function getUserInfo(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) throw new Error("User not found")
            return response.json()
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            throw error;
        });
}

function getUserRepo(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        .then(response => {
            if (!response.ok) throw new Error("User not found")
            return response.json()
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            throw error;
        });
}

function renderReposSection(repos) {
    if (!Array.isArray(repos) || repos.length === 0) {
        return `<div class="mt-6 w-full text-center text-white border border-white bg-black rounded-lg py-4">No repositories found.</div>`;
    }
    return `
        <div class="mt-6 w-full border border-white bg-black rounded-xl p-3" id="repos-section" style="box-shadow:0 0 8px 0 #0ff2;">
            <div class="flex justify-center items-center mb-2">
                <h3 class="text-lg font-semibold text-white text-center flex-1" style="text-shadow:0 0 4px #0ff;">Repositories</h3>
            </div>
            <ul class="space-y-2">
                ${repos.map(repo => `
                    <li class="rounded-lg px-3 py-2 flex flex-col border border-white bg-black" style="box-shadow:0 0 4px 0 #0ff2; word-break:break-all; overflow-wrap:anywhere;">
                        <a href="${repo.html_url}" target="_blank" class="text-white font-bold hover:underline" style="text-shadow:0 0 2px #0ff; word-break:break-all; overflow-wrap:anywhere;">${repo.name}</a>
                        <span class="text-xs text-white opacity-70" style="word-break:break-all; overflow-wrap:anywhere;">${repo.description ? repo.description : 'No description'}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

function DisplayData(userData) {
    const avatarUrl = userData.avatar_url ? userData.avatar_url : 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
    const displayName = userData.name ? userData.name : userData.login;
    const loginName = userData.login ? userData.login : 'Unknown';
    const bio = userData.bio ? userData.bio : 'No bio provided.';
    const publicRepos = userData.public_repos !== undefined ? userData.public_repos : '0';
    const followers = userData.followers !== undefined ? userData.followers : '0';
    const following = userData.following !== undefined ? userData.following : '0';
    const location = userData.location ? userData.location : 'Location not available';
    const website = userData.blog
        ? userData.blog
        : (userData.html_url ? userData.html_url.replace('https://', '') : 'No website');
    const joinDate = userData.created_at
        ? `Joined ${new Date(userData.created_at).toLocaleString('default', { month: 'long', year: 'numeric' })}`
        : 'Join date unknown';

    let data = `
    <div class="flex flex-col items-center justify-center gap-4 bg-black border border-white rounded-xl p-6 shadow-[0_0_8px_0_rgba(0,255,255,0.15)]">
        <img src="${avatarUrl}" alt="User Avatar" class="w-24 h-24 rounded-full border-2 border-white mb-2 shadow-[0_0_8px_0_rgba(255,255,255,0.15)]">
        <h2 class="text-2xl font-bold text-white drop-shadow-[0_0_4px_#0ff]">${displayName}</h2>
        <p class="text-white text-sm opacity-80">${loginName}</p>
        <p class="text-white text-center px-4 opacity-70">${bio}</p>
        <div class="flex gap-4 mt-2">
            <div class="flex flex-col items-center cursor-pointer border border-white rounded px-2 py-1 hover:shadow-[0_0_6px_0_#0ff] transition" id="repos-number">
                <span class="text-lg font-semibold text-white drop-shadow-[0_0_4px_#0ff]">${publicRepos}</span>
                <span class="text-xs text-white opacity-60">Repos</span>
            </div>
            <div class="flex flex-col items-center border border-white rounded px-2 py-1">
                <span class="text-lg font-semibold text-white drop-shadow-[0_0_4px_#0ff]">${followers}</span>
                <span class="text-xs text-white opacity-60">Followers</span>
            </div>
            <div class="flex flex-col items-center border border-white rounded px-2 py-1">
                <span class="text-lg font-semibold text-white drop-shadow-[0_0_4px_#0ff]">${following}</span>
                <span class="text-xs text-white opacity-60">Following</span>
            </div>
        </div>
        <div class="flex flex-col items-center mt-4 gap-1 text-white text-sm">
            <div class="flex items-center gap-2">
                <span>${location}</span>
            </div>
            <div class="flex items-center gap-2">
                <a class="hover:underline" href="${website.startsWith('http') ? website : 'https://' + website}" target="_blank" rel="noopener noreferrer">${website}</a>
            </div>
            <div class="flex items-center gap-2">
                <span>
                    ${joinDate}
                </span>
            </div>
        </div>
        <div id="repos-container"></div>
    </div>
    `
    userInfo.innerHTML = data;

    const reposNumber = document.getElementById('repos-number');
    const reposContainer = document.getElementById('repos-container');
    let reposLoaded = false;
    let reposData = [];

    reposNumber.addEventListener('click', async () => {
        if (reposLoaded) {
            if (reposContainer.style.display === 'none' || !reposContainer.style.display) {
                reposContainer.style.display = 'block';
            } else {
                reposContainer.style.display = 'none';
            }
            return;
        }
        reposContainer.innerHTML = `<div class="mt-6 w-full text-center text-cyan-400">Loading repositories...</div>`;
        try {
            const repos = await getUserRepo(userData.login);
            reposData = repos;
            reposContainer.innerHTML = renderReposSection(repos);
            reposLoaded = true;
        } catch (error) {
            reposContainer.innerHTML = `<div class="mt-6 w-full text-center text-red-400">Failed to load repositories.</div>`;
        }
    });
}

const usernameInp = document.querySelector("#usernameInp")
const searchBtn = document.querySelector("#searchBtn")
const userInfo = document.querySelector("#user-info")

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let username = usernameInp.value.trim();
    if (username.length > 0) {
        try {
            const userData = await getUserInfo(username);
            DisplayData(userData);
        } catch (error) {
            userInfo.innerHTML = `<div class="text-center text-red-400 mt-4">Failed to fetch user data.</div>`;
        }
    } else {
        userInfo.innerHTML = `<div class="text-center text-cyan-400 mt-4">Please enter a GitHub username.</div>`;
    }
});
