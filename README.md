# Fluig Helper Documentation

## Why?
Fluig Helper provides reusable components to help you create the best user experiences with less code.

The objective is to simplify both development and maintenance by allowing your code to be about *your* logic, so that reading it will allow you, or another maintainer down the road, to quickly understand how your code aligns with your client's needs.

## General tips
- Unless specified, all `id`s in the library APIs can start with `#` *or not*.

## Installation
Fluig Helper should be cloned in `$FLUIG/repository/wcmdir/wcmROOT/resources/js/`.

To use, include whatever files you need in your html: 
For Search:
```html
<script src="fluighelper/search.js"></script>
```
For Table Builder:
```html
<script src="fluighelper/tableBuilder.js"></script>
```
For FilePicker:
```html
<script src="fluighelper/filePicker.js"></script>
```
For Templates:
```html
<script src="fluighelper/templates.js"></script>
```

Table Builder and File Picker need Templates included before them to work!

## Specific Documentation Files
- [Search] (docs/Search.md)
- [Table Builder](docs/TableBuilder.md)
- [File Picker](docs/FilePicker.md)
- [Templates](docs/Templates.md)

## Snippets
There's also the `snippets.js` file. It isn't really a library, it's just some backend code that can be useful.