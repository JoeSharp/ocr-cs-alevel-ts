import And from "./And";

import { PIN_A, PIN_B, PIN_OUTPUT, TwoInOneOutTestCase } from "../../types";
import PinSink from "../../PinSink";
import NandTestRunner from "../../NandTestScript/NandTestRunner";
import { FileLoader } from "../../../TestScripts/types";
import { readFileSync } from "fs";

const AND_TEST_CASES: TwoInOneOutTestCase[] = [
  {
    a: false,
    b: false,
    expected: false,
  },
  {
    a: false,
    b: true,
    expected: false,
  },
  {
    a: true,
    b: false,
    expected: false,
  },
  {
    a: true,
    b: true,
    expected: true,
  },
];

describe("AND", () => {
  const result = new PinSink();
  const myAnd = new And();
  myAnd.connectToOutputPin(PIN_OUTPUT, result.getPin());

  AND_TEST_CASES.forEach(({ a, b, expected }) => {
    test(`${a} AND ${b} = ${expected}`, () => {
      myAnd.sendToInputPin(PIN_A, a);
      myAnd.sendToInputPin(PIN_B, b);
      expect(result.getValue()).toBe(expected);
    });
  });

  test("Test Script", () => {
    const fileLoader: FileLoader = (filename: string) =>
      readFileSync(`src/computation/nand/Logic/And/${filename}`, "utf-8");
    const testScriptRaw = fileLoader("And.tst");
    const myAnd = new And();
    const runner = new NandTestRunner(myAnd, fileLoader);
    runner.loadScript(testScriptRaw);
    runner.runToEnd();
  });
});