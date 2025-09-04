export {};

declare global {
  function describe(name: string, fn: () => void): void;
  function test(name: string, fn: () => void): void;
  function it(name: string, fn: () => void): void;
  const expect: typeof import('vitest').expect;
}