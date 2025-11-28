const BrowserHistory = {
    history: [],
    index: -1,
    urlInput: document.getElementById("url"),
    webview: document.getElementById("webview"),

    normalize(url) {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            return "https://" + url;
        }
        return url;
    },

    navigate(url) {
        if (!url) url = this.urlInput.value;

        url = this.normalize(url);

        this.urlInput.value = url;
        this.webview.src = url;

        // Cut off forward history
        this.history = this.history.slice(0, this.index + 1);

        // Push new item
        this.history.push(url);
        this.index++;
    },

    back() {
        if (this.index > 0) {
            this.index--;
            this.load();
        }
    },

    forward() {
        if (this.index < this.history.length - 1) {
            this.index++;
            this.load();
        }
    },

    reload() {
        this.webview.src = this.webview.src;
    },

    load() {
        const url = this.history[this.index];
        this.urlInput.value = url;
        this.webview.src = url;
    },

    attachEnterKey() {
        this.urlInput.addEventListener("keydown", e => {
            if (e.key === "Enter") this.navigate();
        });
    }
};

// Enable Enter key navigation
BrowserHistory.attachEnterKey();
