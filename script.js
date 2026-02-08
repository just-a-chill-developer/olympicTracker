const ADMIN_PASSWORD = "olympics2026";
const BACKEND_URL = "https://olympics-backend.vercel.app/api/medals";

let isLoggedIn = false;
let medalData = {};
let drafts = JSON.parse(localStorage.getItem("drafts")) || {};

function showLoginModal() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

function login() {
    const pw = document.getElementById("passwordInput").value;
    if (pw === ADMIN_PASSWORD) {
        isLoggedIn = true;
        closeLoginModal();
        alert("Logged in");
    } else {
        alert("Wrong password");
    }
}

async function fetchMedalData() {
    if (!isLoggedIn) return alert("Admin only");

    try {
        const res = await fetch(BACKEND_URL);
        if (!res.ok) throw new Error("Fetch failed");
        medalData = await res.json();
        renderLeaderboard();
        alert("Medals updated");
    } catch (e) {
        alert("Backend error");
        console.error(e);
    }
}

function renderLeaderboard() {
    const el = document.getElementById("leaderboard");
    el.innerHTML = `<pre>${JSON.stringify(medalData, null, 2)}</pre>`;
}

// auto-load
fetchMedalData().catch(()=>{});
