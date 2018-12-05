import gendoc from "./docgen.js";
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