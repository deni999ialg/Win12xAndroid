/* =========================================================
   SETTINGS PAGE DEFINITIONS
========================================================= */

const pages = {
    system: {
        name: "System",
        cards: ["Display", "Sound", "Notifications", "Storage", "Multitasking", "About"]
    },
    devices: {
        name: "Bluetooth & Devices",
        cards: ["Bluetooth", "Printers", "Mouse", "Keyboard"]
    },
    network: {
        name: "Network & Internet",
        cards: ["Wi-Fi", "Ethernet", "VPN"]
    },
    personalization: {
        name: "Personalization",
        cards: ["Background", "Colors", "Themes", "Lock Screen"]
    },
    apps: {
        name: "Apps",
        cards: ["Installed Apps", "Default Apps", "Startup"]
    },
    accounts: {
        name: "Accounts",
        cards: ["Your Info", "Sign-in Options", "Family"]
    },
    time: {
        name: "Time & Language",
        cards: ["Date & Time", "Language", "Typing"]
    }
};


/* =========================================================
   RENDER SIDEBAR
========================================================= */

const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

Object.entries(pages).forEach(([key, page], index) => {
    const li = document.createElement("li");
    li.innerText = page.name;
    li.dataset.page = key;

    if (index === 0) li.classList.add("active");

    li.addEventListener("click", () => loadCategory(key));
    sidebar.appendChild(li);
});


/* =========================================================
   PAGE LOADER WRAPPER (fade animation)
========================================================= */

function fadeContent(callback) {
    content.classList.add("fade-out");

    setTimeout(() => {
        callback();
        content.classList.remove("fade-out");
        content.classList.add("fade-in");

        setTimeout(() => content.classList.remove("fade-in"), 180);
    }, 180);
}


/* =========================================================
   LOAD CATEGORY PAGE
========================================================= */

function loadCategory(key) {
    const page = pages[key];
    if (!page) return;

    fadeContent(() => {
        // update active state
        document.querySelectorAll(".sidebar li").forEach(li => {
            li.classList.toggle("active", li.dataset.page === key);
        });

        // cards
        content.innerHTML = `
            <h1>${page.name}</h1>
            <div class="card-grid">
                ${page.cards
                    .map(card => `
                        <div class="card" onclick="openSubPage('${key}', '${card}')">
                            ${card}
                        </div>
                    `)
                    .join("")}
            </div>
        `;
    });
}


/* =========================================================
   OPEN SUBPAGE
========================================================= */

function openSubPage(categoryKey, cardName) {
    fadeContent(() => {
        content.innerHTML = `
            <div class="sub-page">
                <div class="back-btn" onclick="loadCategory('${categoryKey}')">← Back</div>
                <h1>${cardName}</h1>

                <p>
                    This is the <b>${cardName}</b> settings page.<br>
                    Add controls, switches, UI components, etc.
                </p>
            </div>
        `;
    });
}


/* =========================================================
   INITIAL LOAD
========================================================= */
loadCategory("system");
