var background = (function () {
  let tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (let id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-options") {
          if (request.method === id) {
            tmp[id](request.data);
          }
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {
      tmp[id] = callback;
    },
    "send": function (id, data) {
      chrome.runtime.sendMessage({
        "method": id, 
        "data": data,
        "path": "options-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "handle": {
    "click": function (e) {
      const value = e.target.checked;
      const id = e.target.getAttribute("id");
      background.send("store", {"id": id, "value": value});
    }
  },
  "render": function (storage) {
    for (let id in storage) {
      const element = document.getElementById(id);
      if (element) element.checked = storage[id];
    }
  },
  "load": function () {
    const reload = document.getElementById("reload");
    const support = document.getElementById("support");
    const donation = document.getElementById("donation");
    /*  */
    reload.addEventListener("click", function () {document.location.reload()}, false);
    support.addEventListener("click", function () {background.send("support")}, false);
    donation.addEventListener("click", function () {background.send("donation")}, false);
    /*  */
    const elements = [...document.querySelectorAll("input[id*='_']")];
    elements.map(function (e) {e.addEventListener("change", config.handle.click)});
    /*  */
    background.send("load");
    window.removeEventListener("load", config.load, false);
  }
};

background.receive("storage", config.render);
window.addEventListener("load", config.load, false);
