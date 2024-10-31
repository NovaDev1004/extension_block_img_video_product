var config = {};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.addon = {
  set state (val) {app.storage.write("state", val)},
  get state () {return app.storage.read("state") !== undefined ? app.storage.read("state") : "ON"}
};

config.options = {
  "hide": {
    set svg (val) {app.storage.write("h_svg", val)},
    set image (val) {app.storage.write("h_image", val)},
    set flash (val) {app.storage.write("h_flash", val)},
    set video (val) {app.storage.write("h_video", val)},
    set canvas (val) {app.storage.write("h_canvas", val)},
    set iframe (val) {app.storage.write("h_iframe", val)},
    set background (val) {app.storage.write("h_background", val)},
    get svg () {return app.storage.read("h_svg") !== undefined ? app.storage.read("h_svg") : false},
    get image () {return app.storage.read("h_image") !== undefined ? app.storage.read("h_image") : false},
    get flash () {return app.storage.read("h_flash") !== undefined ? app.storage.read("h_flash") : false},
    get video () {return app.storage.read("h_video") !== undefined ? app.storage.read("h_video") : false},
    get canvas () {return app.storage.read("h_canvas") !== undefined ? app.storage.read("h_canvas") : false},
    get iframe () {return app.storage.read("h_iframe") !== undefined ? app.storage.read("h_iframe") : false},
    get background () {return app.storage.read("h_background") !== undefined ? app.storage.read("h_background") : false}
  },
  "block": {
    set svg (val) {app.storage.write("b_svg", val)},
    set image (val) {app.storage.write("b_image", val)},
    set flash (val) {app.storage.write("b_flash", val)},
    set video (val) {app.storage.write("b_video", val)},
    set canvas (val) {app.storage.write("b_canvas", val)},
    set iframe (val) {app.storage.write("b_iframe", val)},
    set background (val) {app.storage.write("b_background", val)},
    get svg () {return app.storage.read("b_svg") !== undefined ? app.storage.read("b_svg") : false},
    get image () {return app.storage.read("b_image") !== undefined ? app.storage.read("b_image") : false},
    get flash () {return app.storage.read("b_flash") !== undefined ? app.storage.read("b_flash") : false},
    get video () {return app.storage.read("b_video") !== undefined ? app.storage.read("b_video") : false},
    get canvas () {return app.storage.read("b_canvas") !== undefined ? app.storage.read("b_canvas") : false},
    get iframe () {return app.storage.read("b_iframe") !== undefined ? app.storage.read("b_iframe") : false},
    get background () {return app.storage.read("b_background") !== undefined ? app.storage.read("b_background") : false}
  }
};
