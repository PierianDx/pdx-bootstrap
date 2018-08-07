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

  toggle(ev) {
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
}

ToggleSwitch.VERSION = pkg.version;

ToggleSwitch.DEFAULTS = {};

plugin("toggleSwitch", ToggleSwitch, "toggle");
