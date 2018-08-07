// flag-dropdown.js
import $ from "jquery";
import pkg from "../package.json";
import plugin from "./plugin";

class FlagDropdown {
  constructor(element, options) {
    const $element = $(element);
    this.$element = $element;
    var $menu = $element.find(".dropdown-menu");
    var $selected = $menu.find("li.selected > a");

    if ($selected.length) {
      // Set any initial selected (last one wins)
      this.setSelected($selected);
      $element.trigger("pdx.flagdropdown.change", $element.data("selected"));
    }
    // Handle delegated clicks on dropdown-menu item links
    $menu.on("click", "a", this.handleSelection.bind(this));
  }

  handleSelection(ev) {
    var $target = $(ev.currentTarget);
    this.toggleItem($target);
    this.setSelected($target);
    this.$element.trigger(
      "pdx.flagdropdown.change",
      this.$element.data("selected")
    );
  }

  toggleItem($item) {
    $item.closest("li").toggleClass("selected");
  }

  setSelected($selected) {
    var selected = this.$element
      .find(".dropdown-menu > li.selected > a")
      .toArray()
      .map(function(el) {
        return el.getAttribute("id");
      });
    this.$element.data("selected", selected);
  }
}

FlagDropdown.VERSION = pkg.version;

FlagDropdown.DEFAULTS = {};

plugin("flagDropdown", FlagDropdown);
