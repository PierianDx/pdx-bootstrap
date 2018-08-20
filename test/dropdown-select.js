/* Select Dropdown tests */
import $ from "jquery";
import sinon from "sinon";

// UTILITY //
function clickMenuOption($root, ord, assert) {
  const $toggle = $root.find('[data-toggle="dropdown"]');
  assert.equal($toggle.length, 1, "toggle exists");
  $toggle.trigger("click");
  assert.ok($root.hasClass("open"), "parent has [open] class");
  // click on item one to select first option
  $root.find(`.dropdown-menu > li:nth-of-type(${ord}) > a`).trigger("click");
}

describe("Select Dropdown", () => {
  let html = window.__html__["fixtures/dropdown-select.html"];
  let $fixture;

  beforeEach(function() {
    $("body").html(html);
  });

  it("should render the component", () => {
    $(".dropdown-select").selectDropdown();

    assert.equal($("#dropdown1").length, 1, "component fixture exists");
    assert.ok($.fn.selectDropdown, "plugin is registered on $.fn");
    assert.ok($.fn.dropdown, "bootstrap dropdown is registered");
  });

  it("should allow single selection only", done => {
    $(".dropdown-select").selectDropdown();

    // valid sequence of selected options
    const validate = ["option 1", "option 2", "option 1"];
    const related = ["option 1", "option 2", "option 1"];
    let call = 0;
    const spy = sinon.spy(function(ev) {
      // validate the first option is selected
      const selected = Array.prototype.slice.call(arguments, 1);
      assert.exists(ev.relatedTarget);
      assert.equal(
        $(ev.relatedTarget).attr("id"),
        related[call],
        "related target matches correct option"
      );
      assert.equal(selected.length, 1, "only one option selected");
      assert.equal(selected[0], validate[call], "correct option selected");
      call++;
      if (call == validate.length) {
        done();
      }
    });

    // listen for change handler
    const $root = $("#dropdown1");
    $root.on("pdx.dropdown-select.change", spy);

    // Select menu option 1
    clickMenuOption($root, 1, assert);
    clickMenuOption($root, 2, assert);
    clickMenuOption($root, 1, assert);
  });

  it("should allow multiple selection", done => {
    $(".dropdown-select").attr("data-select-multiple", true);
    $(".dropdown-select").selectDropdown();

    // valid sequence of selected options
    const validate = [["option 1"], ["option 1", "option 2"], ["option 1"]];
    const related = ["option 1", "option 2", "option 2"];
    let call = 0;
    const spy = sinon.spy(function(ev) {
      // validate the first option is selected
      const selected = Array.prototype.slice.call(arguments, 1);
      assert.exists(ev.relatedTarget);
      assert.equal(
        $(ev.relatedTarget).attr("id"),
        related[call],
        "related target matches correct option"
      );
      assert.deepEqual(selected, validate[call], "correct options selected");
      call++;
      if (call == validate.length) {
        done();
      }
    });

    // listen for change handler
    const $root = $("#dropdown1");
    $root.on("pdx.dropdown-select.change", spy);

    // Select menu option 1
    clickMenuOption($root, 1, assert);
    clickMenuOption($root, 2, assert);
    clickMenuOption($root, 2, assert);
  });
});
