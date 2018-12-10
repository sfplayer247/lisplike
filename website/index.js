import gendoc from "./docgen.js";
import genexample from "./example.js";
import comparison from "../src/modules/comparison.js";
import operators from "../src/modules/operators.js";
import misc from "../src/modules/misc.js";
import builtins from "../src/modules/builtins.js";
import strings from "../src/modules/strings.js";
import json from "../src/modules/json.js";
import requests from "../src/modules/requests.js";

gendoc("Base", builtins);
gendoc("Comparison", comparison);
gendoc("Operators", operators);
gendoc("Misc", misc);
gendoc("Strings", strings);
gendoc("JSON", json);
gendoc("Requests", requests);

genexample("helloworld", "Hello World", "(print 'Hello World')");

genexample(
  "simpleMath",
  "Simple Math",
  `(void
 (print '2 times 2 equals: ' (* 2 2))
 (print '2 plus 2 equals: ' (+ 2 2))
 (print '2 minus 1 equals: ' (- 2 1))
 (print '8 divided by 2 equals: ' (/ 8 2))
 (print '2 to the power of 4 equals: ' (** 2 4))
)`
);

genexample(
  "countten",
  "Counting to ten",
  `(void
  (set x 0) ;set x to zero;
  (while (< x 10)
   (void
      (+= x 1) ;increment x by one every iteration;
      (print x)
    )
  )
)`
);

genexample(
  "webrequest",
  "Web Requests",
  `(void
 ;ask the user for a user to lookup;
 (set id (prompt 'user id:'))
 ;Make sure the ID is within bounds;
 (if (and (<= (toNum id) 10) (>= (toNum id) 0))
  (void
   ;Request the user data;
   (set user (decode (reqget (+ 'https://jsonplaceholder.typicode.com/users/' id))))

   ;Print out the user data;
   (print (+ 'ID: ' user:id))
   (print (+ 'Name: ' user:name))
   (print (+ 'Phone: ' user:phone))
   (print (+ 'Website: ' user:website))
   (print (+ 'Street: ' user:address:street))
   (print (+ 'City: ' user:address:city))
   (print (+ 'Zipcode: ' user:address:zipcode))
   (print (+ 'Suite: ' user:address:suite))
  )
  ;else statement;
  (
   print 'Invalid User ID'
  )
 )
)`
);
