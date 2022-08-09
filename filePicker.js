//Dependencies:
//JQuery
//Bootstrap (Fluig Style Guide)
//TreeView (Fluig Style Guide)
//fluighelper/templates.js

const FilePicker = {
    open: function (_files, _callback) {
        let fp_modal = FLUIGC.modal({
            title: 'Escolha um arquivo...',
            content: Templates.render("modalFilePicker", {
                initial_text: "Nenhum arquivo selecionado!"
            }),
            size: 'large',
            id: 'file-picker',
            actions: [{
                'label': 'Abrir',
                'bind': `id="open-btn-file-picker"`,
            }, {
                'label': 'Voltar',
                'autoClose': true
            }]
        }, function (err, data) {
            if (err) {
                console.log("Modal Error:", err);
                return;
            }

            let filePicker = FLUIGC.treeview('#file-picker-treeview', { source: _files });
            let selected_file = null;
            filePicker.on('fluig.treeview.click', (data) => {
                selected_file = data.content.node.data;
                $("#file-picker-heading").html(selected_file.name);
            });

            $("#open-btn-file-picker").on('click', (e) => {
                if (!selected_file) {
                    alert("Selecione um item!");
                    return;
                }
                
                if (selected_file.is_folder) { 
                    alert("O item selecionado não pode ser uma pasta!");
                    return;
                }

                if (_callback(selected_file))
                    fp_modal.remove();
            });
        });

        return fp_modal;
    },

    remapDocs: function(_values) {
        let docs = [];
        _values.forEach((val) => {
            let doc = {};
            doc.key = doc.id = val["documentPK.documentId"];
            doc.is_folder = val.documentType == 1;
            doc.title = doc.name = val.documentDescription;
            doc.file = val.phisicalFile;
            doc.mime = val.mimetype;
            doc.parent = val.parentDocumentId;
            doc.children = [];
            doc.added = false;
            docs.push(doc);
        });

        return docs;
    },

    hierarchizeDocs: function (_values) {
        //remap to clearer names
        let docs = this.remapDocs(_values);

        let root = docs.filter(doc => { return doc.parent == 0; });

        function orderRecursively(a, b) {
            a.forEach(a1 => {
                a1.children = b.filter((b1) => {
                    let ret = a1.id == b1.parent && !b1.added;
                    if (ret)
                        b1.added = true;
                    return ret;
                });

                orderRecursively(a1.children, b);
            });

            return a;
        }

        return orderRecursively(root, docs);
    },

    getDocuments: function () {
        let ret = DatasetFactory.getDataset(
            "getDocuments",
            [
                "nr_documento",
                "tp_documento",
                "ds_principal_documento",
                "nr_documento_pai",
                "nm_arquivo_fisico",
                "cod_mime_type"
            ],
            null,
            null
        );

        return this.dbFormatToDs(ret.values);
    },

    dbFormatToDs: function(_values) {
        let ret = [];
        _values.forEach(function(val) {
            let v = {};
            v["documentPK.documentId"] = val.nr_documento;
            v.documentType = val.tp_documento;
            v.documentDescription = val.ds_principal_documento;
            v.parentDocumentId = val.nr_documento_pai;
            v.phisicalFile = val.nm_arquivo_fisico;
            v.mimetype = val.cod_mime_type;
            ret.push(v);
        });

        return ret;
    },
}