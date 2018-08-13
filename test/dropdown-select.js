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

function genComponent(id, multiple) {
  multiple = typeof multiple === "undefined" ? false : multiple;
  return `
  <div id="${id}" class="dropdown dropdown-select" data-select-multiple="${multiple}">
    <i id="dropdownMenu1" data-toggle="dropdown" class="fas fa-plus-circle"></i>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
      <li role="presentation">
        <a role="menuitem" tabindex="-1" href="#" id="option 1">
          Option 1
        </a>
      </li>
      <li role="presentation">
        <a role="menuitem" tabindex="-1" href="#" id="option 2">
          Option 2
        </a>
      </li>
      <li role="presentation">
        <a role="menuitem" tabindex="-1" href="#" id="option 3">
          Option 3
        </a>
      </li>
    </ul>
  </div>`;
}

describe("Select Dropdown", () => {
  let $fixture = $('<div id="fixture"></div>');

  before(function() {});

  beforeEach(function() {
    $fixture.empty().appendTo($("body"));
  });

  afterEach(function() {
    $("#fixtures").empty();
  });

  it("should render the component", () => {
    // generate component
    $fixture.prepend(genComponent("dropdown1"));
    $(".dropdown-select").selectDropdown();

    assert.equal($("#dropdown1").length, 1, "component fixture exists");
    assert.ok($.fn.selectDropdown, "plugin is registered on $.fn");
    assert.ok($.fn.dropdown, "bootstrap dropdown is registered");
  });

  it("should allow single selection only", done => {
    // generate component
    $fixture.prepend(genComponent("dropdown1"));
    $(".dropdown-select").selectDropdown();

    // valid sequence of selected options
    const validate = ["option 1", "option 2", "option 1"];
    let call = 0;
    const spy = sinon.spy(function(ev) {
      // validate the first option is selected
      const selected = Array.prototype.slice.call(arguments, 1);
      assert.equal(selected.length, 1, "only one option selected");
      assert.equal(selected[0], validate[call++], "correct option selected");
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
    // generate component
    $fixture.prepend(genComponent("dropdown1", true));
    $(".dropdown-select").selectDropdown();

    // valid sequence of selected options
    const validate = [["option 1"], ["option 1", "option 2"], ["option 1"]];
    let call = 0;
    const spy = sinon.spy(function(ev) {
      // validate the first option is selected
      const selected = Array.prototype.slice.call(arguments, 1);
      assert.deepEqual(selected, validate[call++], "correct options selected");
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

// QUnit.module("===== Select Dropdown =====", {
//   // beforeEach: function() {
//   //   $("#qunit-fixture").html(genComponent("dropdown1"));
//   //   $(".dropdown-select").selectDropdown();
//   // }
// });

// QUnit.test("> Should properly register itself", function(assert) {
//   setupDropdown("dropdown1");
//   // $("#qunit-fixture").innerHTML = genComponent("dropdown1");
//   assert.equal($("#dropdown1").length, 1, "component fixture exists");
//   assert.ok($.fn.selectDropdown, "plugin is registered on $.fn");
//   assert.ok($.fn.dropdown, "bootstrap dropdown is registered");
// });

// QUnit.test("> Single select works properly", function(assert) {
//   setupDropdown("dropdown1");
//   const done = assert.async();
//   const validate = ["option 1", "option 2", "option 1"];
//   let call = 0;
//   const spy = sinon.spy(function(ev) {
//     // validate the first option is selected
//     const selected = Array.prototype.slice.call(arguments, 1);
//     assert.equal(selected.length, 1, "only one option selected");
//     assert.equal(selected[0], validate[call++], "correct option selected");
//     if (call == validate.length) {
//       done();
//     }
//   });
//   const $root = $("#dropdown1");
//   // listen for change handler
//   $root.on("pdx.dropdown-select.change", spy);
//   // Select menu option 1
//   clickMenuOption($root, 1, assert);
//   clickMenuOption($root, 2, assert);
//   clickMenuOption($root, 1, assert);
// });

// QUnit.test("> Multiple select works properly", function(assert) {
//   setupDropdown("dropdown1", true);
//   const done = assert.async();
//   const validate = [["option 1"], ["option 1", "option 2"], ["option 1"]];
//   let call = 0;
//   const spy = sinon.spy(function(ev) {
//     // validate the first option is selected
//     const selected = Array.prototype.slice.call(arguments, 1);
//     assert.deepEqual(selected, validate[call++], "correct options selected");
//     if (call == validate.length) {
//       done();
//     }
//   });
//   const $root = $("#dropdown1");
//   // listen for change handler
//   $root.on("pdx.dropdown-select.change", spy);
//   // Select menu option 1
//   clickMenuOption($root, 1, assert);
//   clickMenuOption($root, 2, assert);
//   clickMenuOption($root, 2, assert);
// });
