import { one, stub_one, reset_one } from './numbers';

export const oneBeforeStub = one;
stub_one(734);
export const oneAfterStub = one;
reset_one();
export const oneAfterReset = one;
