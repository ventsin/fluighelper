//This is useful for the backend

function validateStringArray(_strings) {
	let valid = true;
	_strings.forEach(function (s) {
		if (typeof(s) != 'string' ||
			s.length < 1)
			valid = false;
	});

	return valid;
}

function validateFields(_valids, _fields) {
	if (!validateStringArray(_valids) ||
		!validateStringArray(_fields))
		return false;
	
	let filtered = [];
	_fields.forEach(function (f) {
		let found = _valids.find(function (v) {
			return v === f.toLowerCase()
				.replace(/[^a-zA-Z0-9_]/g, '');
		});

		if (found)
			filtered.push(found);
	});

	return filtered;
}