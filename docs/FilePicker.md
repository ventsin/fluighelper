# File Picker
## Usage
To create a File Picker, we need to call `FilePicker.open`.  
The callback will receive whatever file is currently selected, and will only trigger if a valid file is selected.  
We need to source the files ourselves. Thankfully, the library provides us with all the tools we need.

```js
let files = FilePicker.hierarchizeDocs(FilePicker.getDocuments());

let picker = FilePicker.open(files, (selected) => {
    console.log(selected.name);

    //if we return true, the file picker will close
    //we only want files that start with "nota"
    return selected.name.startsWith('nota');
});
```
`FilePicker.getDocuments` will return all of the GED documents by querying the `getDocuments` Dataset. You **may** want to source the documents with a more specialized Dataset to improve performance. The `getDocuments` Dataset is not included in this repository, but you can find it [here](https://github.com/ventsin/fluigdatasets).  
`FilePicker.hierarchizeDocs` will recursively copy the tabular data returned by the `documento` Dataset into a hierarchical format that makes more sense for a file picker.  
The reason why we need to source the files, is that we can easily filter only the folders or document types that we want:
```js
let files = FilePicker.hierarchizeDocs(FilePicker.getDocuments());

//We only want the contents of this folder
let filtered_files = [file_list.find((file) => {
    return file.is_folder && file.name == "Notas Fiscais";
})];

let picker = FilePicker.open(filtered_files, (selected) => {
    ...
});
```

### Miscellaneous Information
- `FilePicker.open` returns a Fluig Modal object, so you can use that type's methods and events to control the picker modal, like `remove()`, `isOpen()`, etc.
- `FilePicker.hierarchizeDocs` may not work as you intend. It always assumes that your top-level documents have a parent whose id is 0 (root). If you try to call it to organize a filtered set of items, you may want to make sure to set your top-level documents' `parentId` to `0`.