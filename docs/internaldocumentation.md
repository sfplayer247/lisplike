##Types:
Most types are represented internally like such:
{type: number, value: 10}
However 2 types break this rule:

Symbols:
{type: symbol, value: null, ref: x}
The ref attribute is what the variable references in the lookup table.
Errors:
{type: error, value: message, index: 1}
The index corresponds with an error number in errorlist.txt

Objects/Property lists
{type: plist, value: {a: 2, b: 2}}

Accessing properties:
symbol:property
{type: symbol, value: , property: property, ref: test}
