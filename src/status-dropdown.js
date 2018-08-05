import $ from "jquery";
import pkg from "../package.json";

var classmap = {
  unknown: "far fa-bookmark status--unknown",
  relevant: "fas fa-bookmark status--relevant",
  irrelevant: "fas fa-bookmark status--irrelevant"
};

function StatusDropdown(element) {
  this.$element = $(element);
  var $selected = $(element).find("li.selected > a");
  var $menu = this.$element.find(".dropdown-menu");

  if ($selected.length) {
    // Set any initial selected (last one wins)
    if ($selected.length > 1) {
      console.warn(
        "status dropdown has more than one initially selected items, keeping last one only"
      );
      $selected = $selected
        .removeClass("selected")
        .last()
        .addClass("selected");
      // $selected = $selected.slice(1).removeClass('selected').first();
    }
    this.setSelected($selected);
  }
  // Handle delegated clicks on dropdown-menu item links
  $menu.on("click", "a", this.handleSelection.bind(this));
}

StatusDropdown.VERSION = pkg.version;

StatusDropdown.prototype.handleSelection = function(ev) {
  var $target = $(ev.currentTarget);
  this.setSelected($target);
  this.$element.trigger(
    "pdx.statusdropdown.change",
    this.$element.data("selected")
  );
};

StatusDropdown.prototype.setSelected = function($selected) {
  this.$element.data("selected", $selected.attr("id"));
  // Set the toggle to reflect the selected item
  this.$element.find("[data-toggle]").get(0).className = $selected
    .find("i")
    .get(0).className;
};

// JQuery plugin
$.fn.statusDropdown = function(option) {
  return this.each(function() {
    var $this = $(this);
    var data = $this.data("pdx.statusdropdown");

    if (!data)
      $this.data("pdx.statusdropdown", (data = new StatusDropdown(this)));
    if (typeof option == "string") data[option].call($this);
  });
};

// JQuery Plugin administrative stuff
$.fn.statusDropdown.Constructor = StatusDropdown;
$.fn.statusDropdown.noConflict = function() {
  $.fn.statusDropdown = old;
  return this;
};
