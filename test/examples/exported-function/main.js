import { fn, stub_fn } from './fn';

export const fnBeforeStub = fn;
stub_fn(() => 42);
export const fnAfterStub = fn;
