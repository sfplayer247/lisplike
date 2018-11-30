## What happens when you  code?
For example lets use this code:
  (print (+ 2 2))
First we tokenize the code into an array:
  ['(', 'print', '(', '+', '2', '2', ')', ')']
Then we have to make atoms from the tokens. This is achived with a recursive function.
1. Encounter a parenthesis which means an expression is starting
  tokens = [ 'print', '(', '+', '2', '2', ')', ')']
  ast = {
    type: expression
    value: null
  }
Now we must find all of the symbols inside of the expression and insert them into the AST:
2. Encounter symbol print
  tokens = ['(', '+', '2', '2', ')', ')']
  ast = {
    type: expression
    value: [
      {type: symbol, value: null, ref: print}
    ]
  }
3. Encounter another parenthesis
  tokens = ['+', '2', '2', ')', ')']
  ast = {
    type: expression
    value: [
      {type: symbol, value: null, ref: print},
      {type: expression, value: null}
    ]
  }
4. Encounter symbol '+'
  tokens = ['2', '2', ')', ')']
  ast = {
    type: expression
    value: [
      {type: symbol, value: null, ref: print},
      {type: expression, value: [
        {type: symbol, value: null, ref: +}
      ]}
    ]
  }
5. Encounter number '2'
  tokens = ['2', ')', ')']
  ast = {
    type: expression
    value: [
      {type: symbol, value: null, ref: print},
      {type: expression, value: [
        {type: symbol, value: null, ref: +},
        {type: number, value: 2}
      ]}
    ]
  }
6. Encounter number '2'
  tokens = [')', ')']
  ast = {
    type: expression
    value: [
      {type: symbol, value: null, ref: print},
      {type: expression, value: [
        {type: symbol, value: null, ref: +},
        {type: number, value: 2},
        {type: number, value: 2}
      ]}
    ]
  }
Now that we have encountered a closing parenthesis we can put the expression (+ 2 2) inside
of the print expression:
7. Encounter closing parenthesisis
  tokens = []
  ast = {
    type: expression
    value: [
      {type: symbol, value: null, ref: print},
      {type: expression, value: [
        {type: symbol, value: null, ref: +},
        {type: number, value: 2},
        {type: number, value: 2}
      ]}
    ]
  }
Now we have a complete AST from (print (+ 2 2)).