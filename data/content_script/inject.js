var background = (function () {
  let tmp = {};
  /*  */
  chrome.runtime.onMessage.addListener(function (request) {
    for (let id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-page") {
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
        "path": "page-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "storage": {},
  "style": document.getElementById("block-image-video"),
  "checker": /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i,
  "head": document.documentElement || document.head || document.querySelector("head")
};

config.action = function (node) {
  const computed = window.getComputedStyle(node, null);
  const value = computed.getPropertyValue("background-image");
  const match = config.checker.exec(value);
  if (match && match.length && match[1]) {
    node.classList.add("hide");
  }
};

config.observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
    for (let i = 0; i < mutation.addedNodes.length; i++) {
      const node = mutation.addedNodes[i];
      if (node.tagName) {
        config.action(node);
        /*  */
        const childs = [...node.querySelectorAll('*')];
        childs.map(node => config.action(node));
      }
    }
	});
});

config.load = function () {
  config.style.innerText = '';
  config.observer.disconnect();
  const hide = " {visibility: hidden !important; opacity: 0 !important} ";
  /*  */
  const h_svg = config.storage["h_svg"];
  const h_image = config.storage["h_image"];
  const h_flash = config.storage["h_flash"];
  const h_video = config.storage["h_video"];
  const h_canvas = config.storage["h_canvas"];
  const h_iframe = config.storage["h_iframe"];
  const h_background = config.storage["h_background"];
  /*  */
  config.storage["state"] = "ON";
  if (config.storage["state"] === "ON") {
    if (h_svg) config.style.innerText += ' svg' + hide;
    if (h_image) config.style.innerText += ' img' + hide;
    if (h_video) config.style.innerText += ' video' + hide;
    if (h_canvas) config.style.innerText += ' canvas' + hide;
    if (h_iframe) config.style.innerText += ' iframe'; + hide;
    if (h_flash) config.style.innerText += ' [type="application/x-shockwave-flash"]' + hide;
    if (h_background) {
      config.style.innerText += ' [style*="background-image"]' + hide;
      config.style.innerText += ' .hide' + hide;
      /*  */
      const elements = [...document.querySelectorAll('*')];
      elements.map(node => config.action(node));
      config.observer.observe(document.documentElement, {
        "subtree": true, 
        "childList": true
      });
    }
  }
};

if (!config.style) {
  config.style = document.createElement("style");
  config.style.setAttribute("type", "text/css");
  config.style.setAttribute("id", "block-image-video");
  if (config.head) {
    config.head.appendChild(config.style);
  }
}

background.receive("storage", function (e) {
  config.storage = e;
  config.load();
});

background.send("load");
