import { PI, stub_PI } from './math';

export const PIBeforeStub = PI;
stub_PI(999);
export const PIAfterStub = PI;
