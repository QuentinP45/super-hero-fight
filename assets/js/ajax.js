function ajaxGet(url, callback) {
    const req = new XMLHttpRequest();
    req.open("get", url);
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.log(req.status + " : " + req.statusText);
        }
    });
    req.addEventListener("error", function() {
        console.error("Problème réseau !");
    });
    req.send(null);
}