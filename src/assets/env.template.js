(function (window) {
    window.env = window.env || {};

    // Environment variables
    window["env"]["apiUrl"] = "${API_URL}";
    window["env"]["debug"] = "${DEBUG}";
    window["env"]["authorityURL"] = "${Authority_URL}";
})(this);
