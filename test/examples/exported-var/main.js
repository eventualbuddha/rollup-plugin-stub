import { zero, stub_zero } from './zero';

export const zeroBeforeStub = zero;
stub_zero(1);
export const zeroAfterStub = zero;
