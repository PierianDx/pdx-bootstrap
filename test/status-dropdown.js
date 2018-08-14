/* Select Dropdown tests */
import $ from "jquery";
import sinon from "sinon";

// UTILITY //
function clickMenuOption($root, ord, assert) {
  const $toggle = $root.find('[data-toggle="dropdown"]');
  assert.equal($toggle.length, 1, "toggle exists");
  // open dropdown menu
  $toggle.trigger("click");
  assert.ok($root.hasClass("open"), "parent has [open] class");
  // click on item one to select first option
  $root.find(`.dropdown-menu > li:nth-of-type(${ord}) > a`).trigger("click");
}

describe("Status Flag", () => {
  let html = window.__html__["fixtures/status-dropdown.html"];
  let $fixture;

  beforeEach(function() {
    $("body").html(html);
  });

  it("should render the component", () => {
    $(".dropdown-status").statusDropdown();

    assert.equal($("#dropdown1").length, 1, "component fixture exists");
    assert.ok($.fn.statusDropdown, "plugin is registered on $.fn");
    assert.ok($.fn.dropdown, "bootstrap dropdown is registered");
  });

  it("should allow single selection only", done => {
    $(".dropdown-status").statusDropdown();
    const $root = $("#dropdown1");

    // valid sequence of selected options
    const validate = ["option 1", "option 2", "option 3"];
    let call = 0;
    const spy = sinon.spy(function(ev) {
      // get selected element child element
      const target = $root.find(".dropdown-menu > li.selected > a > i").get(0);
      // get dropdown toggle trigger element
      const trigger = $root.find('[data-toggle="dropdown"]').get(0);
      // validate the first option is selected
      const selected = Array.prototype.slice.call(arguments, 1);
      assert.equal(selected.length, 1, "only one option selected");
      assert.equal(selected[0], validate[call++], "correct option selected");
      // ensure trigger icon matches classes from selected <a> tag
      assert.equal(
        trigger.className,
        target.className,
        "toggle matches selected"
      );
      if (call == validate.length) {
        done();
      }
    });

    // listen for change handler
    $root.on("pdx.statusdropdown.change", spy);

    // Select menu option 1
    clickMenuOption($root, 1, assert);
    clickMenuOption($root, 2, assert);
    clickMenuOption($root, 3, assert);
  });
});
