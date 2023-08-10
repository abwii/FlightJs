import arg from "arg";
import * as fs from "fs";
import FlightAnalyser from "./FlightAnalyser";

const args = arg({
  // Types
  "--help": Boolean,
  "--verbose": arg.COUNT, // Counts the number of times --verbose is passed
  "--file": String, // --port <number> or --port=<number>
  "--output": String, // --port <number> or --port=<number>

  // Aliases
  "-f": "--file",
  "-o": "--output",
});

const outputFile = args["--output"];
const inputFile = args["--file"];
if (!inputFile) throw new Error("missing required argument: --file");

fs.readFile(inputFile, "utf-8", (err, data) => {
  if (err) {
    console.error(`Error reading file from disk: ${err}`);
  } else {
    const flights = JSON.parse(data);
    const results = FlightAnalyser.analyze(flights);
    if (outputFile) {
      fs.writeFile(outputFile, JSON.stringify(results), "utf-8", (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.info("File is successfully written");
        }
      });
    } else {
      console.log(results);
    }
  }
});
