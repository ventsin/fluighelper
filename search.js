//Dependencies:
//JQuery
//Bootstrap (Fluig Style Guide)
//fluighelper/templates.js

const Search = {
	create(id, headers, display_column) {
		let original = $('#' + id);

		let html = Templates.render('search', {
			id,
			headers
		});

		if (typeof(FLUIG_HELPER_DEBUG) !== 'undefined') {
			console.log(id);
			console.log(headers);
			console.log(html);
		}
		
		original.hide();
		original.after(html);

		let out = {
			igrup: '#fh-s-igrup-' + id,
			btn:   '#fh-s-btn-'   + id,
			table: '#fh-s-table-' + id,
			tbody: '#fh-s-tbody-' + id,
			field: '#fh-s-field-' + id,

			results: [],
			
			search: null,
			select: null,

			colors: {
				default: '#58595b', //primary
				highlight: '#1ab83f', //success
				remove: '#cc3d3d', //danger
			},
			
			remove() {
				$(this.igrup).remove();
				$(this.table).remove();
				$(id).show();
			}
		};

		this.setHover(out);

		$(out.table).collapse({
			toggle: false
		});

		$(out.btn).click(() => {
			if ($(out.btn).children().first().hasClass('flaticon-close')) {
				$(out.btn).html(Search.icons['search']);
				this.setColor(out, out.colors.default);
				$(out.field).val('');
				original.val('');
				return;
			}

			$(out.btn).html(Search.icons['list']);

			let searchval = $(out.field).val();
			$(out.table).collapse('show');
			out.results = out.search(searchval);

			//let srch = g_sku.filter((s) => s.sku.indexOf(searchval) !== -1);

			$(out.tbody).html('');

			out.results.forEach((row, idx) => {
				let tds = '';
				headers.forEach(h => {
					tds += `<td>${row[h.field]}</td>`;
				});

				$(out.tbody).append(`
					<tr idx="${idx}" search="${id}">
						${tds}
					</tr>
				`);
			});

			$(`tr[search=${id}]`).click((e) => {
				$(out.table).collapse('hide');

				let idx = Number($(e.currentTarget).attr('idx'));
				let selected = out.results[idx];
				
				$(out.field).val(selected[display_column]);
				out.select(selected);

				$(out.btn).html(Search.icons['done']);
				this.setColor(out, out.colors.highlight);
			});
		});

		return out;
	},

	setHover(out) {
		$(out.btn).hover(
			function(){
				if ($(this).children().first().hasClass('flaticon-done')) {
					$(this).html(Search.icons['close']);
					this.setColor(out, out.colors.remove);
				}
			},
			function() {
				if ($(this).children().first().hasClass('flaticon-close')) {
					$(this).html(Search.icons['done']);
					this.setColor(out, out.colors.highlight);
				}
			}
		);
	},
	
	setColor(out, color) {
		let btn = $(out.btn);
		btn.css('background-color', color);
		btn.css('border-color', color);
		btn.prev().css('border-color', color);
	},

	icons: {
		search: '<i class="flaticon flaticon-search icon-sm"></i>',
		done: '<i class="flaticon flaticon-done icon-sm"></i>',
		close: '<i class="flaticon flaticon-close icon-sm"></i>',
		list: '<i class="flaticon flaticon-list icon-sm"></i>'
	}
};