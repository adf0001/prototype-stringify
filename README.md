# prototype-stringify
stringify simple object, including data in prototypes.

# Install
```
npm install prototype-stringify
```

# Usage
```javascript

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

/*
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
*/

```
