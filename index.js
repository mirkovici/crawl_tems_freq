import fs from "fs";

// Read files synchronously and remove carriage returns
let codes_local, codes_remote;
try {
  codes_local = fs.readFileSync("./data/local.txt", "utf8").replace(/\r/g, "");
  codes_remote = fs
    .readFileSync("./data/remote.txt", "utf8")
    .replace(/\r/g, "");
} catch (error) {
  console.error("Error reading files:", error);
  process.exit(1); // Exit if files cannot be read
}

const array_local = codes_local
  .split("\n")
  .filter((line) => line.trim() !== "");
const array_remote = codes_remote
  .split("\n")
  .filter((line) => line.trim() !== "");

function run() {
  let freq_local = {};
  let freq_remote = {};

  // Calculate frequency for local data
  for (let locator of array_local) {
    freq_local[locator] = (freq_local[locator] || 0) + 1;
  }

  // Calculate frequency for remote data
  for (let locator of array_remote) {
    freq_remote[locator] = (freq_remote[locator] || 0) + 1;
  }

  let diff = {};

  // Identify differences in frequencies
  const allLocators = new Set([
    ...Object.keys(freq_local),
    ...Object.keys(freq_remote),
  ]);

  for (let key of allLocators) {
    const localCount = freq_local[key] || 0;
    const remoteCount = freq_remote[key] || 0;

    if (localCount !== remoteCount) {
      diff[key] = {
        local: localCount,
        remote: remoteCount,
      };
    }
  }

  // Write results to files
  try {
    fs.writeFileSync("./data/local.json", JSON.stringify(freq_local, null, 2));
    fs.writeFileSync(
      "./data/remote.json",
      JSON.stringify(freq_remote, null, 2)
    );
    fs.writeFileSync("./data/diff.json", JSON.stringify(diff, null, 2));
  } catch (error) {
    console.error("Error writing to file:", error);
  }

  // Log results
  console.log("Local array:", array_local);
  console.log("Remote array:", array_remote);
  console.log("Differences in frequencies:", diff);
}

// Execute the run function
run();
