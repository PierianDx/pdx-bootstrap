import $ from "jquery";

/**
 * Generate a jQuery plugin
 * @param pluginName [string] Plugin name
 * @param className [object] Class of the plugin
 * @param dataname [string] optional data name for this component (pdx.<pluginname> lowercase by default)
 * @param apiInitCallback [function] a callback to assign on page load to initialize plugins via data-* API
 * @param shortHand [bool] Generate a shorthand as $.pluginName
 *
 * @example
 * import plugin from 'plugin';
 *
 * class MyPlugin {
 *     constructor(element, options) {
 *         // ...
 *     }
 * }
 *
 * MyPlugin.DEFAULTS = {};
 *
 * plugin('myPlugin', MyPlugin');
 */
export default function plugin(
  pluginName,
  className,
  dataname,
  apiInitCallback,
  shortHand = false
) {
  let dataName = `pdx.${dataname || pluginName.toLowerCase()}`;
  let old = $.fn[pluginName];

  $.fn[pluginName] = function(option) {
    return this.each(function() {
      let $this = $(this);
      let data = $this.data(dataName);
      let options = $.extend(
        {},
        className.DEFAULTS,
        $this.data(),
        typeof option === "object" && option
      );

      if (!data) {
        $this.data(dataName, (data = new className(this, options)));
      }

      if (typeof option === "string") {
        data[option]();
      }
    });
  };

  // - Short hand
  if (shortHand) {
    $[pluginName] = options => $({})[pluginName](options);
  }

  // - No conflict
  $.fn[pluginName].noConflict = () => ($.fn[pluginName] = old);

  // Data-* API initialization (if any)
  if (apiInitCallback && typeof apiInitCallback === "function") {
    $(document).ready(apiInitCallback.bind(null, $));
  }
}
