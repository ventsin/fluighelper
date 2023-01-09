# Search
## Usage
To create a Search field, we need to call `Search.create`.  
We provide a target field that will be replaced by the search field.  
Then we just need to provide the necessary callbacks to fill out it's functionality.

```js
let product_search = Search.create({
	id: '#myfield',
	headers: [
		{field: 'product', name: 'Produto'},
		{field: 'supplier', name: 'Fornecedor'}
	],
	display_column: 'product'
});

product_search.search = (searchval) => {
	let constraint = DatasetFactory
		.createConstraint(
			'product',
			searchval,
			searchval,
			ConstraintType.MUST
		);

	return DatasetFactory.getDataset(
		'YourDatasetHere',
		['product', 'supplier'],
		[constraint],
		null
	).values;
};

product_search.select = (selected) => {
	console.log(selected);
	$('#myfield').val(selected.product);
};
```
The `search` callback will be called to query for a list of results. You can use any Dataset or preset container you want.  
The `select` callback will be called whenever the user selects an entry. If you're using Search in a form, you'll most likely want to set your field's value property to a member of the selected row.

After the selection, the Search field will lock up, indicating that the selection has been completed. It will start in this state if the original field has anything in it's value property. It can come out of this state by a click in the associated button, but this will erase the selection *and* will erase the contents of the original field.

When creating the field, you can change what colors are used for each state by passing a color object:
```js
let product_search = Search.create({
	id: '#myfield',
	headers: [
		{field: 'product', name: 'Produto'},
		{field: 'supplier', name: 'Fornecedor'}
	],
	display_column: 'product',
	colors: {
		highlight: '#896692'
	}
});
```

The available colors to change are:
- `default` (Defaults to Style Guide Primary)
- `highlight` (Defaults to Style Guide Success)
- `remove` (Defaults to Style Guide Danger)
