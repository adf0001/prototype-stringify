
// prototype-stringify @ npm, stringify simple object, including data in prototypes.

var is_simple_object = require("is-simple-object");

module.exports = function (obj, space) {
	var list = [], listName = [];	//to check duplicated

	var replacer = function (key, value) {
		if (!is_simple_object(value)) return value;

		var i = list.indexOf(value);
		if (i >= 0) return '[duplicated:' + listName[i] + ']';
		list.push(value);
		listName.push(key);

		//re-build not-prototype-chain object
		var a = [], o = {};
		for (i in value) { a.push(i); }
		a.sort();
		for (i = 0; i < a.length; i++) { o[a[i]] = value[a[i]]; }
		return o;
	}

	return JSON.stringify(obj, replacer, space);
}