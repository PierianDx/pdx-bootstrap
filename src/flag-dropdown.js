import $ from "jquery";
import pkg from "../package.json";

function FlagDropdown(element) {
  this.$element = $(element);
  var $selected = $(element).find("li.selected > a");
  var $menu = this.$element.find(".dropdown-menu");

  if ($selected.length) {
    // Set any initial selected (last one wins)
    this.setSelected($selected);
    this.$element.trigger(
      "pdx.flagdropdown.change",
      this.$element.data("selected")
    );
  }
  // Handle delegated clicks on dropdown-menu item links
  $menu.on("click", "a", this.handleSelection.bind(this));
}

FlagDropdown.VERSION = pkg.version;

FlagDropdown.prototype.handleSelection = function(ev) {
  var $target = $(ev.currentTarget);
  this.toggleItem($target);
  this.setSelected($target);
  this.$element.trigger(
    "pdx.flagdropdown.change",
    this.$element.data("selected")
  );
};

FlagDropdown.prototype.toggleItem = function($item) {
  $item.closest("li").toggleClass("selected");
};

FlagDropdown.prototype.setSelected = function($selected) {
  var selected = this.$element
    .find(".dropdown-menu > li.selected > a")
    .toArray()
    .map(function(el) {
      return el.getAttribute("id");
    });
  this.$element.data("selected", selected);
};

// JQuery plugin
$.fn.flagDropdown = function(option) {
  return this.each(function() {
    var $this = $(this);
    var data = $this.data("pdx.flagdropdown");

    if (!data) $this.data("pdx.flagdropdown", (data = new FlagDropdown(this)));
    if (typeof option == "string") data[option].call($this);
  });
};

// JQuery Plugin administrative stuff
$.fn.flagDropdown.Constructor = FlagDropdown;
$.fn.flagDropdown.noConflict = function() {
  $.fn.flagDropdown = old;
  return this;
};
