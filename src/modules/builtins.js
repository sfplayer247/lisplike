/* This file is used solely to generate documentation for functions that are built
  into the parser directly like while loops, functions and if statements */

export default {
  docfunc: {
    parameters: "name:symbol|code:expression`",
    returns: "void",
    desc:
      `Creates a function and automatically puts it in the look up table. Currently arguments are put in a variable called args, and there is no scoping. In a later version this will be changed. <br />
<b>Example:</b> <br />
<span class="code">(func sayHi (print 'hello'))</span>`
  },
  docif: {
    parameters: "condition:expression|code:expression`",
    returns: "void",
    desc:
      `Runs the <span class='code'>code</span> if the condition evaluates to true. <br />
<b>Example:</b> <br />
<span class="code">(if (< x 10) <br />
  (print 'less than ten') <br />
  ;else statement; <br />
  (print 'greater than or equal to ten') <br />
)
`
  },
  docwhile: {
    parameters: "condition:expression|code:expression`",
    returns: "void",
    desc:
      `Runs the <span class='code'>code</span> until the condition evaluates to false.<br />
<b>Example</b> <br />
<span class="code">
(void<br />
&nbsp(set 'x' 0) ;set x to zero;<br />
&nbsp(while (< x 10) <br />
&nbsp&nbsp(void <br />
&nbsp&nbsp&nbsp(+= x 1) ;increment x by one every iteration;<br />
&nbsp&nbsp&nbsp(print x) <br />
&nbsp&nbsp) <br />
&nbsp) <br />
) <br />
</span>`
  },
  doctry: {
    parameters: "try:expression|except:expression`",
    returns: "void",
    desc:
      "Runs the <span class='code'>try</span> expression and if it throws an expression it runs the second argument. The error can be accessed through the <span class='code'>error</span> variable."
  }
};
