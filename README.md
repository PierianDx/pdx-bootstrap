# pdx-bootstrap

A package of various bootstrap components and utilities put together for use
at PierianDx. Many of our current product line makes use of Bootstrap and jQuery
for UI purposes. This package provides a way to package up overrides and extensions
for Bootstrap to enable better reuse and consistency across our existing products.

## Dependencies

Currently, pdx-bootstrap requires the following libraries to work properly

- [bootstrap v3.3.x](https://getbootstrap.com/docs/3.3/getting-started/)
- [jquery v3.x or higher](https://jquery.com/download/)
- [fontawesome v5 (free)](https://fontawesome.com/how-to-use/on-the-web/setup/getting-started?using=web-fonts-with-css)

## Using

Currently, the library is setup to be used as a UMD distributed set of bundles for
the browser. You can include the javascript and styles via a `<script>` tag by
adding the following to the head of your HTML document.

```html
<script src="https://unpkg.com/@pieriandx/pdx-bootstrap@1.0.0/dist/pdx-bootstrap.min.js" />
<link rel="stylesheet" href="https://unpkg.com/@pieriandx/pdx-bootstrap@1.0.0/dist/pdx-bootstrap.min.css" />
```

You can also include the non-minified versions for development and debugging purposes.

# Components

## Flags

Flags are square type of label or tag with a one or two letter abbreviation inside. These are
typically used for creating tags or markers for representing specific items in a small space.

![Alt text](https://raw.githubusercontent.com/PierianDx/pdx-bootstrap/master/_images/flag-default.png?raw=true "default flag")

```html
<div class="flag">
  <span>AA</span>
</div>
```

Currently there are two specific types of flags available that represent artifacts and
benign polymorphisms.

![Alt text](https://raw.githubusercontent.com/PierianDx/pdx-bootstrap/master/_images/flag-types.png?raw=true "flag types")

```html
<div class="flag flag--benign-polymorphism">
  <span>BP</span>
</div>
<div class="flag flag--artifact">
  <span>A</span>
</div>
```

# Javascript Components

## Flag Dropdown

The flag dropdown is a multiselect dropdown for allowing a user
to select one or more flags. Flags can be displayed next to a text description for each item. Selected items will have a
checkmark to the right of the item showing they are selected.

![Alt text](https://raw.githubusercontent.com/PierianDx/pdx-bootstrap/master/_images/flag-dropdown.png?raw=true "flag dropdown select")

### Markup

The flag dropdown uses the standard `.dropdown` class and `data-*` attributes from Bootstrap
but is denoted by adding a `.dropdown-flag` class to the wrapping `<div>` element.

Items in the dropdown can also be set as selected by adding a `.selected` class to the
`<li>` containing the item. You must also add an `id` attribute to the anchor wrapping the item
which will be used as the value of the selected item for `change` event callbacks.

```html
<div class="dropdown dropdown-flag" data-target="dropdown">
  <i id="dropdownMenu1" data-toggle="dropdown" class="fas fa-plus-circle"></i>
  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    <li role="presentation" class="selected">
      <a role="menuitem" tabindex="-1" href="#" id="benign-polymorphism">
        <div class="flag flag--benign-polymorphism">
          <span>BP</span>
        </div>
        Benign Polymorphism
      </a>
    </li>
    <li role="presentation">
      <a role="menuitem" tabindex="-1" href="#" id="artifact">
        <div class="flag flag--artifact selected">
          <span>A</span>
        </div>
        Artifact
      </a>
    </li>
  </ul>
</div>
```

### Usage

This dropdown works similar to standard Bootstrap dropdowns and can be activated
using the following javascript:

```js
$(".dropdown-flag").flagDropdown();
```

### Events

The flag dropdown adds a specific `pdx.flagdropdown.change` event, which is triggered any
time an item is selected or deselected. The event handler will receive the ids of all selected
items as extra arguments to the event handler.

| Event Type                | Description                                    |
| ------------------------- | ---------------------------------------------- |
| `pdx.flagdropdown.change` | Fires anytime an item is selected/un-selected. |

#### Example

```js
$(".dropdown-flag").on("pdx.flagdropdown.change", function(ev) {
  var data = Array.from(arguments).slice(1); // all ids passed as extra arguments
  console.log("(change)", data); // data is an array of the selected ids
});
```

## Status Dropdown

The status dropdown is a single-select dropdown for allowing a user
to select a particular status. The toggle itself should always represent the
currently selected status (~uses the bookmark icon from FontAwesome 5~).

![Alt text](https://raw.githubusercontent.com/PierianDx/pdx-bootstrap/master/_images/status-dropdown.png?raw=true "status dropdown select")

### Markup

The flag dropdown uses the standard `.dropdown` class and `data-*` attributes from Bootstrap
but is denoted by adding a `.dropdown-status` class to the wrapping `<div>` element.

Items in the dropdown can also be set as selected by adding a `.selected` class to the
`<li>` containing the item. You must also add an `id` attribute to the anchor wrapping the item
which will be used as the value of the selected item for `change` event callbacks.

```html
<div id="status1" class="dropdown dropdown-status">
  <i class="far fa-bookmark status--unknown" data-toggle="dropdown" id="dropdownMenu1"></i>
  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    <li role="presentation" class="selected">
      <a href="#" id="relevant"><i role="menuitem" class="fas fa-bookmark status--relevant"></i></a>
    </li>
    <li role="presentation">
      <a href="#" id="irrelevant"><i role="menuitem" class="fas fa-bookmark status--irrelevant"></i></a>
    </li>
    <li role="presentation">
      <a href="#" id="unknown"><i role="menuitem" class="far fa-bookmark status--unknown"></i></a>
    </li>
  </ul>
</div>
```

### Usage

This dropdown works similar to standard Bootstrap dropdowns and can be activated
using the following javascript:

```js
$(".dropdown-status").statusDropdown();
```

### Events

The status dropdown adds a specific `pdx.statusdropdown.change` event, which is triggered any
item is selected. The event handler will receive the id of the selected status as an extra
argument to the event handler.

| Event Type                  | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `pdx.statusdropdown.change` | Fires anytime an item is selected/un-selected. |

#### Example

```js
$(".dropdown-status").on("pdx.statusdropdown.change", function(ev, selectedId) {
  // selectedId is the currently selected status
});
```

## Toggle

This component is a simple sliding toggle to represent an on/off or true/false
state. Clicking anywhere on the toggle will cause it to change state by sliding the
indicator in the opposite direction.

![Alt text](https://raw.githubusercontent.com/PierianDx/pdx-bootstrap/master/_images/toggle-off.png?raw=true "toggle off state")
![Alt text](https://raw.githubusercontent.com/PierianDx/pdx-bootstrap/master/_images/toggle-on.png?raw=true "toggle on state")

### Markup

You can wrap the toggle itself in a Bootstrap `.form-group` to stack them
vertically on top of one another. The toggle itself consists of a wrapping
`<div>` with class `.toggle`, a `<label>` (~which is optional~) and a checkbox type `<input>`.

The `<label>`, when used, should always use the `for` attribute and correspond to the `name`
attribute of the associated checkbox to allow the user to click on either the label
or the toggle to change its state.

The `<input type="checkbox">` should always have a class of `.toggle-switch`, as this
checkbox isn't rendered but used to store the state of the toggle switch only.

```html
<div class="form-group">
  <div class="toggle">
    <label for="myToggle1">Show on report</label>
    <input type="checkbox" class="toggle-switch" name="myToggle1" />
  </div>
</div>
```

### Usage

Toggles can be activated by the following javascript:

```js
$(".toggle").toggleSwitch();
```

### Events

The toggle adds a specific `pdx.toggle.change` event, which is triggered any
time the state changes. The event handler will receive the state of the toggle
as an extra argument to the event handler.

| Event Type          | Description                                   |
| ------------------- | --------------------------------------------- |
| `pdx.toggle.change` | Fires anytime the state of the toggle changes |

#### Example

```js
$(".toggle").on("pdx.toggle.change", function(ev, state) {
  // state == true if switch is on, false otherwise
});
```
