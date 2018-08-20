// status-dropdown.js
import $ from "jquery";
import pkg from "../package.json";
import plugin from "./plugin";

class StatusDropdown {
  constructor(element, options) {
    const $element = $(element);
    this.$element = $element;
    var $selected = $element.find("li.selected > a");
    var $menu = $element.find(".dropdown-menu");

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

  handleSelection(ev) {
    var $target = $(ev.currentTarget);
    this.setSelected($target);
    var changeEvent = $.Event("pdx.statusdropdown.change", {
      relatedTarget: ev.currentTarget
    });
    this.$element.trigger(changeEvent, this.$element.data("selected"));
    ev.preventDefault();
  }

  setSelected($selected) {
    this.$element.data("selected", $selected.attr("id"));
    this.$element.find(".dropdown-menu > li").removeClass("selected");
    $selected.closest("li").addClass("selected");
    // Set the toggle to reflect the selected item
    this.$element.find("[data-toggle]").get(0).className = $selected
      .find("i")
      .get(0).className;
  }
}

StatusDropdown.VERSION = pkg.version;

StatusDropdown.DEFAULTS = {};

plugin("statusDropdown", StatusDropdown);
