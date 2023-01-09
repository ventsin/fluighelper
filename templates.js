//This file by itself has no dependencies.
//The templates themselves, however, likely
//depend on bootstrap/style guide.

const Templates = {
    custom_templates: {},

    render: function (_template_name, _params) {
        if (!this.custom_templates.hasOwnProperty(_template_name))
            return "<h1>NO TEMPLATE</h1>";

        return (this.custom_templates[_template_name](_params));
    }
}

Templates.custom_templates["btnBase"] = (_params) => {
    let metaid = _params.id ? `id="${_params.id}"` : '';
    let metaclass = _params.class ?
        `class="${_params.class}"` :
        'class="btn btn-primary"';
    return `<button ${metaid} ${metaclass}>${_params.body}</button>`.trim();
};

Templates.custom_templates["modalBase"] = (_params) => {
    return  `<div id="art-modal" class="art-modal">` +
	        `    <div class="art-modal-content">` +
		    `       <span id="art-modal-close" class="art-close">&times;</span>` +
		    `       ${_params.content}` +
	        `   </div>` +
            `</div>`;
};

Templates.custom_templates["modalFilePicker"] = (_params) => {
    return `<div id="file-picker-contents">` +
	`   <div class="panel panel-primary">` +
    `       <div class="panel-heading">`+
    `            <h3 id="file-picker-heading">${_params.initial_text}</h3>` +
    `       </div>` +
    `       <div class="panel-body">` +
	`           <div class="row">` +
    `               <div id="file-picker-treeview" class="col-md-12">` +
	`		            <ul id="treeData" style="display: none;">` +
	`		            </ul>` +
	`               </div>` +
    `           </div>` +
    `       </div>` +
    `   </div>` +
    `</div>`;
};

Templates.custom_templates["tableBase"] = (_params) => {
    var headers = "";
    _params.headers.forEach((h) => {
        headers += `<th>${h}</th>`;
    });
    
    return `<table id="${_params.id}" class="table table-striped table-hover">
        <thead>
            ${headers}
        </thead>
        <tbody id="${_params.id}-body">
        </tbody>
    </table>`.trim();
};

Templates.custom_templates["rowBase"] = (_params) => {
    let cells = "";

    let rmetaid =    _params.hasOwnProperty("id")    ? `id="${_params.id}"`       : "";
    let rmetaclass = _params.hasOwnProperty("class") ? `class="${_params.class}"` : "";
    
    _params.body.forEach((c) => {
        let cmetaid    = c.hasOwnProperty("id")    ? `id="${c.id}"`       : "";
        let cmetaclass = c.hasOwnProperty("class") ? `class="${c.class}"` : "";
        cells += `<td ${cmetaid} ${cmetaclass}>${c.body}</td>`;
    });

    return `<tr ${rmetaid} ${rmetaclass}>
        ${cells}
    </tr>`.trim();
};

Templates.custom_templates["rowAccordion"] = (_params) => {
    let cells = "";

    let rmetaclass = _params.hasOwnProperty("class") ? `class=${_params.class}` : "";
    
    _params.body.forEach((c) => {
        let cmetaid    = c.hasOwnProperty("id")    ? `id="${c.id}"`     : "";
        let cmetaclass = c.hasOwnProperty("class") ? `class="${c.class}"` : "";
        cells += `<td ${cmetaid} ${cmetaclass}>${c.body}</td>`;
    });

    return `<tr id="${_params.id}" data-toggle="collapse" data-target="#${_params.id}-hidden" ${rmetaclass}>
        ${cells}
    </tr>

    <tr style="padding: 0;">
    <td colspan="100" style="padding: 0; border: 0;">
    <div class="accordion-body collapse" id="${_params.id}-hidden"  data-parent="#table-NaN-body">
    <div style="padding: 5px;">
    </div>
    </div>
    </td>
    </tr>`.trim();
};

Templates.custom_templates["comboBase"] = (_params) => {
    var options = "";
    _params.options.forEach((opt) => {
        options += `<option value="${opt.val}">${opt.body}</option>`;
    });

    return `<select id="${_params.id}-combo" class="form-control" onchange="${_params.onchange}">
                ${options}
            </select>`.trim();
};

Templates.custom_templates["search"] = _params => {
	let headers = '<tr>';
	_params.headers.forEach((h) => {
		headers += `<th>${h.name}</th>`;
	});
	headers += '</tr>';

	if (typeof(FLUIG_HELPER_DEBUG) !== 'undefined') {
		console.log(_params);
		console.log(headers);
	}

	let id = _params.id.substring(1);

	let igrup = 'fh-s-igrup-' + id;
	let btn = 	'fh-s-btn-'   + id;
	let table = 'fh-s-table-' + id;
	let tbody = 'fh-s-tbody-' + id;
	let field = 'fh-s-field-' + id;

	return `
		<div id="${igrup}" class="input-group">
			<input id="${field}" type="text" class="form-control"
				value="" placeholder="Pesquisa..."
				style="border-color:#58595b">
			<span class="input-group-btn">
				<button id="${btn}" class="btn btn-primary" type="button"><i class="flaticon flaticon-search icon-sm" aria-hidden="true"></i>
				</button>
			</span>
		</div>
		<div id="${table}" class="collapse"
			style="border: 1px solid;
			margin-top: -3px;
			max-height: 200px;
			overflow-y: scroll;
			margin-right: 15px;
			position: absolute;
			background-color: white;
			width: -webkit-fill-available;
			width: fill-available;
			width: -moz-available;
			z-index: 9999;
		">
			<table class="table table-hover">
				<thead>
					${headers}
				</thead>
				<tbody id="${tbody}">

				</tbody>
			</table>
		</div>`
};