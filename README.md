# pdx-bootstrap

[![npm version](https://badge.fury.io/js/%40pieriandx%2Fpdx-bootstrap.svg)](https://badge.fury.io/js/%40pieriandx%2Fpdx-bootstrap)
[![travis build](https://travis-ci.org/PierianDx/pdx-bootstrap.png?branch=master)](https://travis-ci.org/PierianDx/pdx-bootstrap)

Read documentation at [https://pieriandx.github.io/pdx-bootstrap/](https://pieriandx.github.io/pdx-bootstrap/).

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
<script src="https://unpkg.com/@pieriandx/pdx-bootstrap@latest/dist/pdx-bootstrap.min.js" />
<link rel="stylesheet" href="https://unpkg.com/@pieriandx/pdx-bootstrap@latest/dist/pdx-bootstrap.min.css" />
```

You can also include the non-minified versions for development and debugging purposes.
