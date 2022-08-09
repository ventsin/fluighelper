//Dependencies:
//JQuery
//Bootstrap (Fluig Style Guide)
//fluighelper/templates.js

const TableBuilder = {
	impl: {
		counter: 1,
		parseOptions: function(_options) {
			let opt = {
				table_id: `table-${TableBuilder.counter++}`,
				accordion: false,
				autocollapse: false,
				table_template: 'tableBase',
				row_template: _options.accordion ? 'rowAccordion' : 'rowBase'
			};

			if (_options) {
				if (_options.table_id)
					opt.table_id = _options.table_id;
				if (_options.accordion)
					opt.accordion = true;
				if (_options.autocollapse)
					opt.autocollapse = true;
				if (_options.table_template)
					opt.table_template = _options.table_template;
				if (_options.row_template)
					opt.row_template = _options.row_template;
			}

			return opt;
		},
		
		generateTable: function(_opt) {
			return {
				table_id: _opt.table_id,
				element: $(`#${_opt.table_id}`),
				body_element: $(`#${_opt.table_id}-body`),
	
				push: function (_row, _index = false) {
					let rendered_row = Templates.render(_opt.row_template, {
						id: _row.id ? _row.id : '',
						class: _row.class ? _row.class : '',
						body: _row.body
					});

					if (_index)
						this.contents(_index + 1).before(rendered_row);
					else
						this.body_element.append(rendered_row);

					if (_opt.accordion && this.acc) {
						this.acc($(`#${_row.id}-hidden`).children().first());

						if (_opt.autocollapse)
							$(`#${_row.id}`).on('click', () => {
								$('.collapse.in').collapse('hide');
							});
					}
				},

				delete: function (_index) {
					let r = this.body_element.children().eq(_index);
					if (_opt.accordion)
						r.next().remove();
					r.remove();
				},

				remove: function () {
					this.element.remove();
				},

				clear: function () {
					this.body_element.html("");
				},

				heading: function (_index) {
					if (_index)
						return this.element.first().children().first().children().first().children().eq(_index);
					return this.element.first().children().first().children().first().children();
				},

				contents: function (_row = false, _cell = false) {
					if (!_row) {
						let sel = _opt.accordion ? ":nth-child(even)" : '';
						return $(`#${_opt.table_id}-body tr${sel}`);
					}

					let r = this.body_element.children()
						.eq(_opt.accordion ? _row * 2 : _row);
					if (!_cell)
						return r;
					return r.children().eq(_cell);
				},

				obj: function () {
					let obj = {
						headers: [],
						contents: []
					};

					this.heading().each((i, header) => {
						obj.headers.push(header.innerHTML);
					});

					this.body_element.children().each((i, row) => {
						let r = [];
						$(row).children().each((i, cell) => {
							r.push(cell.innerHTML);
						});
						obj.contents.push(r);
					});
					
					return obj;
				},

				accordion: function (cb) {
					this.acc = cb;
				}
			};
		}
	},

	createTable: function (_container, _headers, _options = null) {
		let opt = this.impl.parseOptions(_options);
		
		let cont = _container;

		if (!(cont instanceof jQuery))
			cont = $(cont.startsWith('#') ? cont : "#" + cont);

		cont.append(
			Templates.render(opt.table_template, {
				id: opt.table_id,
				headers: _headers
			})
		);

		return this.impl.generateTable(opt);
	},

	fromDataset: function (_container, _dataset, _options = null) {
		let headers = [];
		_dataset.columns.forEach(col => {
			headers.push({ label: col });
		});

		let table = this.createTable(_container, headers, _options);

		_dataset.values.forEach(row => {
			let row_body = {};

			for (let [key, value] of Object.entries(row))
				row_body[key] = { body: value };

			table.push({
				id: row.id ? `${row.id}-row-${table.table_id}` : '',
				body: row_body
			});
		});
	}
}