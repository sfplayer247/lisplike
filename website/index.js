import gendoc from "./docgen.js";
import comparison from "../src/modules/comparison";
import operators from "../src/modules/operators";
import misc from "../src/modules/misc";
import builtins from "../src/modules/builtins";
import strings from "../src/modules/strings";

gendoc("Base", builtins);
gendoc("Comparison", comparison);
gendoc("Operators", operators);
gendoc("Misc", misc);
gendoc("Strings", strings);
