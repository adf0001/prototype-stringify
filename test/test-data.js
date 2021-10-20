// global, for html page
prototype_stringify = require("../prototype-stringify.js");

module.exports = {

	"prototype_stringify()": function (done) {
		var a = { b: 1, c: { d: 2 }, e: { f: 3 } };
		var aa = Object.create(a);

		aa.bb = 11;
		aa.c.dd = 22;
		aa.e = Object.create(a.e);
		aa.e.ff = 33;

		var s1 = JSON.stringify(aa);
		console.log("JSON.stringify():\n\t" + s1);		//JSON.stringify() exclude data in prototype
		//{"bb":11,"e":{"ff":33}}

		var s2 = prototype_stringify(aa);
		console.log("prototype_stringify():\n\t" + s2);		//to include data in prototypes
		//{"b":1,"bb":11,"c":{"d":2,"dd":22},"e":{"f":3,"ff":33}}

		var expect = {
			b: 1,
			bb: 11,
			c: {
				d: 2,
				dd: 22
			},
			e: {
				f: 3,
				ff: 33
			}
		};

		var s_expect = prototype_stringify(expect);
		console.log("expect:\n\t" + s_expect);

		done(!(s2 === s_expect));
	},

	"stringify duplicated": function (done) {

		var aa = { a: 1, bb: { b: 2 } };
		aa.bb.c = aa;	//circular duplicated
		aa.bb.d = aa.bb;	//circular duplicated

		var aa_expect = {
			a: 1,
			bb: {
				b: 2,
				c: "[duplicated:]",		//top key is ""
				d: "[duplicated:bb]",
			}
		}

		var s1 = prototype_stringify(aa);
		var s2 = prototype_stringify(aa_expect);

		console.log(s1);
		console.log(s2);

		done(!(s1 === s2));
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]); } });
