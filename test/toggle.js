/* Select Dropdown tests */
import $ from "jquery";
import sinon from "sinon";

function toggleState($root) {
  $root.trigger("click");
}

// UTILITY //
describe("Toggle Switch", () => {
  let html = window.__html__["fixtures/toggle.html"];
  let $fixture;

  beforeEach(function() {
    $("body").html(html);
  });

  it("should render the component", () => {
    $(".toggle").toggleSwitch();

    assert.equal($("#toggle1").length, 1, "component fixture exists");
    assert.ok($.fn.toggleSwitch, "plugin is registered on $.fn");
  });

  it("should allow single selection only", done => {
    $(".toggle").toggleSwitch();

    // valid sequence of selected options
    const validate = [true, false, true];
    let call = 0;
    const spy = sinon.spy(function(ev, state) {
      // validate the first option is selected
      console.log("state:", state, typeof state);
      assert.equal(state, validate[call++], "correct state is set");
      if (call == validate.length) {
        done();
      }
    });

    // listen for change handler
    const $root = $("#toggle1");
    $root.on("pdx.toggle.change", spy);

    // Select menu option 1
    toggleState($root, assert);
    toggleState($root, assert);
    toggleState($root, assert);
  });
});
