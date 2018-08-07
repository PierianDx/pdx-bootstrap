// import $ from "jquery";
// import pkg from "../package.json";

// function ToggleSwitch(element) {
//   this._$input = $(element).find("input.toggle-switch");
//   // console.log('> input:', this._$input);
//   if ($(element).hasClass("checked")) {
//     // initialize checked state
//     $(element).data("checked", true);
//     this._$input.prop("checked", true);
//   }
//   $(element).on("click", this.toggle.bind(this));
// }

// ToggleSwitch.VERSION = pkg.version;

// ToggleSwitch.prototype.toggle = function(ev) {
//   var element = ev.currentTarget;
//   var $element = $(element);
//   if ($element.is(".disabled, :disabled")) return;

//   // Set checked state
//   var state = !this._$input.prop("checked");
//   this._$input.prop("checked", state);
//   $element.data("checked", state);
//   $element.toggleClass("checked", state);

//   $element.trigger("pdx.toggle.change", state);
//   ev.preventDefault();
// };

// // JQuery plugin
// $.fn.toggleSwitch = function(option) {
//   return this.each(function() {
//     var $this = $(this);
//     var data = $this.data("pdx.toggle");

//     if (!data) $this.data("pdx.toggle", (data = new ToggleSwitch(this)));
//     if (typeof option == "string") data[option].call($this);
//   });
// };

// // JQuery Plugin administrative stuff
// $.fn.toggleSwitch.Constructor = ToggleSwitch;
// $.fn.toggleSwitch.noConflict = function() {
//   $.fn.toggleSwitch = old;
//   return this;
// };

// status-dropdown.js
import $ from "jquery";
import pkg from "../package.json";
import plugin from "./plugin";

class ToggleSwitch {
  constructor(element, options) {
    const $element = $(element);
    this.$element = $element;
    this._$input = $element.find("input.toggle-switch");
    // console.log('> input:', this._$input);
    if ($element.hasClass("checked")) {
      // initialize checked state
      $element.data("checked", true);
      this._$input.prop("checked", true);
    }
    $element.on("click", this.toggle.bind(this));
  }

  handleSelection(ev) {
    var element = ev.currentTarget;
    var $element = $(element);
    if ($element.is(".disabled, :disabled")) return;

    // Set checked state
    var state = !this._$input.prop("checked");
    this._$input.prop("checked", state);
    $element.data("checked", state);
    $element.toggleClass("checked", state);

    $element.trigger("pdx.toggle.change", state);
    ev.preventDefault();
  }

  setSelected($selected) {
    this.$element.data("selected", $selected.attr("id"));
    // Set the toggle to reflect the selected item
    this.$element.find("[data-toggle]").get(0).className = $selected
      .find("i")
      .get(0).className;
  }
}

ToggleSwitch.VERSION = pkg.version;

ToggleSwitch.DEFAULTS = {};

plugin("toggleSwitch", ToggleSwitch, "toggle");
