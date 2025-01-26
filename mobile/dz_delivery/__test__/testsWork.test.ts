describe("Always Passing Tests", () => {
  it("should always pass", () => {
    expect(true).toBe(true);
  });

  it("should return the correct sum", () => {
    const sum = (a: number, b: number) => a + b;
    expect(sum(2, 3)).toBe(5);
  });
});
