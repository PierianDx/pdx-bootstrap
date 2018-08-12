// dropdown-select.js
import $ from "jquery";
import pkg from "../package.json";
import plugin from "./plugin";

class SelectDropdown {
  constructor(element, options) {
    this.$element = $(element);
    var $selected = $(element).find("li.selected > a");
    var isMultiple = $(element).data("select-multiple") == true;
    var $menu = this.$element.find(".dropdown-menu");

    if ($selected.length) {
      // Set any initial selected (last one wins)
      this.setSelected($selected);
      this.$element.trigger(
        "pdx.dropdown-select.change",
        this.$element.data("selected")
      );
    }
    // Handle delegated clicks on dropdown-menu item links
    $menu.on("click", "a", this.handleSelection.bind(this));
  }

  handleSelection(ev) {
    console.log("handleSelection");
    var $target = $(ev.currentTarget);
    this.toggleItem($target);
    this.setSelected();
    this.$element.trigger(
      "pdx.dropdown-select.change",
      this.$element.data("selected")
    );
  }

  toggleItem($item) {
    var isMultiple = this.$element.data("select-multiple");
    if (!isMultiple) {
      this.$element.find(".dropdown-menu li.selected").removeClass("selected");
    }
    $item.closest("li").toggleClass("selected");
  }

  setSelected() {
    var isMultiple = this.$element.data("select-multiple");
    var selected = this.$element
      .find(".dropdown-menu > li.selected > a")
      .toArray()
      .map(function(el) {
        return el.getAttribute("id") || el.text();
      });

    // set selected items ond data-* attribute
    this.$element.data(
      "selected",
      isMultiple ? selected : selected.length ? selected[0] : undefined
    );
  }
}

SelectDropdown.VERSION = pkg.version;

SelectDropdown.DEFAULTS = {};

// Data-* API initialiization
function apiInit($) {
  $('.dropdown-select > *[data-toggle="dropdown"]')
    .map((index, toggle) => {
      return $(toggle).closest(".dropdown-select");
    })
    .selectDropdown();
}

plugin("selectDropdown", SelectDropdown, null, apiInit);
