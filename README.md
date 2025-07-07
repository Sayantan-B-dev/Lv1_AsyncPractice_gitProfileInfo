# GitYou

A simple, stylish web app to search for GitHub user profiles and display their information using the GitHub API.

## Features
- Search for any GitHub username
- View user avatar, name, username, bio, location, join date, and profile link
- See public repo, followers, and following counts
- Responsive, modern UI with Tailwind CSS

## How It Works
- Enter a GitHub username in the input field and click "Search"
- The app fetches user data from the [GitHub Users API](https://api.github.com/users/USERNAME)
- The profile card updates with the fetched data

## Project Structure
```
asyncJs/
  ├── index.html      # Main HTML file with Tailwind CSS and UI
  ├── script.js       # JavaScript for fetching and displaying user data
  └── A3.js           # (Unused or for experiments)
```

## Setup & Usage
1. **Clone or download this repo**
2. Open `index.html` in your browser
3. Type a GitHub username and hit Search

No build tools or server required—everything runs in the browser!

## Customization
- You can style the UI further using Tailwind classes in `index.html`
- To extend functionality (e.g., show user repos), modify `script.js`

## Credits
- [GitHub REST API](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user)
- [Tailwind CSS](https://tailwindcss.com/)

---

*Made for learning async JavaScript and API integration.* 