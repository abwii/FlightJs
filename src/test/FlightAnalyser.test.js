import FlightAnalyser from "../main/FlightAnalyser";

test("Empty analysis when no input", () => {
  const result = FlightAnalyser.analyze([]);
  expect(result.length).toBe(0);
});
