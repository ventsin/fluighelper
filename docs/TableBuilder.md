# Table Builder
## Creation
To build a table using TableBuilder, you need to call `createTable`, passing your container (`div`, `body`, etc) jQuery element or `id`, and whatever headers you need.

```js
let my_table = TableBuilder.createTable($('#form'), [
	{ label: 'ID', class: 'text-info' },
	{ label: 'Nome' },
	{ label: 'Valor', id: 'value-header' }
]);
```

You can also build a table directly from a Dataset.
```js
let dataset = DatasetFactory.getDataset(
	"documento",
	["documentPK.documentId", "documentDescription"]
	[DatasetFactory.createConstraint(
		"parentDocumentId",
		"19",
		"19",
		ConstraintType.MUST
	)],
	null
);

let docs = TableBuilder.fromDataset('mydiv', dataset);
```

## Manipulation
##### In this section you'll find examples about *getting elements* from the Table. You should **not** store these objects in the long-run, as manipulating the table will likely invalidate many of these references. It's a good practice to access the Table again whenever you need to manipulate it's contents.

### Insertion
You can set the `body`, `id` and `class` properties for the row, and also for each cell. The only required field, in both cases, is the `body`.
```js
my_table.push({
	id: 'my-awesome-row',
	class: 'my-awesome-class',
	body: [
		{ body: "Item 1" },
		{ body: "Item 2", class: "text-success" },
		{ body: "Item 3", id: "my-cell" },
		{ body: "Item 4", id: "cell2", class: "text-warning" },
	]
});
```

### Deletion
You can delete specific rows:
```js
my_table.delete(4); //delete the 5th row
```
Or you can clear the whole body:
```js
my_table.clear();
```

### Destruction
To destroy a table:
```js
my_table.remove();
```

### Accessing a Header
```js
let header = my_table.heading(6); //returns the 7th header (jQuery)

console.log(header.html());
```

### Accessing a Row
```js
let row = my_table.contents(3); //Returns the 4th row (jQuery)

row.css('background-color: yellow;');
```

### Accessing a Cell
```js
let cell = my_table.contents(3, 2); //Returns the 3rd cell of the 4th row (jQuery)

cell.html("I changed!");
```

### Iterating through a Table
If you call `contents` with no parameters, you'll get a jQuery with every row. You can then use regular jQuery to iterate through it.
```js
//Change every cell to "Why?"
my_table.contents().each((i, row) => {
	row.children().each((i, cell) => {
		cell.innerHTML = "Why?";
	});
});
```

### Serialize
```js
let obj = my_table.obj(); //returns data as an object

//obj would be something like this:
{
	"headers": ["ID", "Marca", "Modelo"],
	"contents": [
		["1", "Mazda",  "RX-7"],
		["2", "Toyota", "Corolla AE86"],
		["3", "Nissan", "Skyline R32"]
	]
}

//Stringify it:
let obj_json = JSON.stringify(obj);
```

## Options
Optionally, you can also pass an `options` object to `createTable` or `fromDataset` with certain parameters.

| Option | Effect |
|--------|--------|
|`table_id`|Sets the id that will be assigned to the table.|
|`accordion`|If `true`, every row in the table will be followed by another row that will start collapsed and can be expanded by clicking the previous row.|
|`autocollapse`|If `true`, collapses accordion rows when another one is opened. Only works if `accordion` is `true`.|
|`table_template`|Changes what Template will be used to build the table.|
|`row_template`|Changes what Template will be used to build the rows.|

### Custom `table_id` example:
```js
let my_table = TableBuilder.createTable('#form', //you can also use an id here
	[
		{ label: 'ID', class: 'text-info' },
		{ label: 'Nome' },
		{ label: 'Valor', id: 'value-header' }
	],
	{ table_id: 'my-table' } //<---custom table id
);
```

### Creating an Accordion Table:
Calling `accordion()` on the table object will set a callback that will be called every time an accordion row is created. You can use this callback to set it's contents, events, etc.  
Any manipulation calls to the table, such as `contents()`, will completely *ignore* accordion rows.  
When calling `push()`, if the Table is an Accordion Table, the row **must** have an `id`.
##### Ideally you should avoid using custom templates with this option.
```js
let acc_table = TableBuilder.createTable('adiv',
	[...],
	{
		accordion: true,
		autocollapse: true //<--Any open accordion rows will collapse when opening another one
	}
);

//accordion will set a callback for every 'push'
acc_table.accordion((acc) => {
	acc.append(`<h1>Hidden Content!</h1>`);
});

acc_table.push({
	id: 'my-awesome-row', //<--This is required!
	body: [...]
});
```

### Custom templates example:
```js
let my_table = TableBuilder.createTable('mydiv',
	['myheader1'], //custom templates can use different header formats
	{
		table_template: 'myCustomTableTemplate',
		row_template: 'myCustomRowTemplate'
	}
);
```
##### **Warning**: Using custom templates is **not** recommended, it's an advanced feature that will likely require you to change other parts of the Table object.

## Known Issues
- Opening multiple Accordion Rows in quick succession can result in multiple rows remaining open. This is likely a limitation of Style Guide, and an update to later versions of Bootstrap would likely fix this issue.