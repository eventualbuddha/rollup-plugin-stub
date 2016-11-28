import { TestClass, stub_TestClass, reset_TestClass } from './class';

class OtherClass {
  constructor() {
		this.test = 42;
	}
	getTest() {
		return this.test;
	}
}

export const ClassBeforeStub = TestClass;
stub_TestClass(OtherClass);
export const ClassAfterStub = TestClass;
reset_TestClass();
export const ClassAfterReset = TestClass;
