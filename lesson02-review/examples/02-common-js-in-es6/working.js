import { nanoid } from "nanoid";
import { helloFromCommonJS } from "./commonjs.cjs";

console.log(nanoid());
console.log(helloFromCommonJS());
