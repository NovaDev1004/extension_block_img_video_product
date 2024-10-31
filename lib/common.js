var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {
    core.update.page();
    core.netrequest.register();
    /*  */
    app.button.icon(null, config.addon.state);
    app.button.title(null, "Block Image|Video - " + config.addon.state);
  },
  "action": {
    "storage": function (changes, namespace) {
      core.load();
    },
    "button": function () {
      const tmp = "ON";
      config.addon.state = tmp;
    }
  },
  "netrequest": {
    "register": async function () {
      await app.netrequest.display.badge.text(true);
      await app.netrequest.rules.remove.by.action.type("block");
      /*  */
      if (config.addon.state === "ON") {
        if (config.options.block.image) {
          app.netrequest.rules.push({
            "action": {
              "type": "block"
            },
            "condition": {
              "resourceTypes": ["image"]
            }
          });  
        }
        /*  */
        if (config.options.block.iframe) {
          app.netrequest.rules.push({
            "action": {
              "type": "block"
            },
            "condition": {
              "resourceTypes": ["sub_frame"]
            }
          });
        }
        /*  */
        await app.netrequest.rules.update();
      }
    }
  },
  "update": {
    "metrics": function (e) {
      if (e) {
        const value = e.value;
        const name = e.id.replace("b_", '').replace("h_", '');
        const type = e.id.indexOf("b_") !== -1 ? "block" : "hide";
        /*  */  
        config.options[type][name] = value;
      }
    },
    "page": function (e) {
      app.page.send("storage", {
        "state": config.addon.state,
        /*  */
        "h_svg": config.options.hide.svg,
        "h_image": config.options.hide.image,
        "h_flash": config.options.hide.flash,
        "h_video": config.options.hide.video,
        "h_canvas": config.options.hide.canvas,
        "h_iframe": config.options.hide.iframe,
        "h_background": config.options.hide.background
      }, e ? e.tabId : null, e ? e.frameId : null);
    },
    "options": function () {
      app.options.send("storage", {
        "h_svg": config.options.hide.svg,
        "h_image": config.options.hide.image,
        "h_flash": config.options.hide.flash,
        "h_video": config.options.hide.video,
        "h_canvas": config.options.hide.canvas,
        "h_iframe": config.options.hide.iframe,
        "h_background": config.options.hide.background,
        /*  */
        "b_svg": config.options.block.svg,
        "b_image": config.options.block.image,
        "b_flash": config.options.block.flash,
        "b_video": config.options.block.video,
        "b_canvas": config.options.block.canvas,
        "b_iframe": config.options.block.iframe,
        "b_background": config.options.block.background
      });
    }
  }
};

app.button.on.clicked(core.action.button);

app.page.receive("load", core.update.page);

app.options.receive("load", core.update.options);
app.options.receive("store", core.update.metrics);
app.options.receive("support", function () {app.tab.open(app.homepage())});
app.options.receive("donation", function () {app.tab.open(app.homepage() + "?reason=support")});

app.on.startup(core.start);
app.on.installed(core.install);
app.on.storage(core.action.storage);
