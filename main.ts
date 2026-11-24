// One-Line Office Joke: 24-Hour Sprint — entry program.
// Writes a single-line joke about office life to /output/entry.txt.
// The joke: a meeting about too many meetings that spawns a follow-up
// — the setup is the meeting itself, the punchline is that the cure
// for meetings is more meetings. Specific to office life, one sentence,
// tight, and lands on first read.
//
// Choice of angle: "meeting that could have been an email" is the
// most-told office joke alive, so I avoided it and picked the
// self-referential variant instead — scheduling a meeting to discuss
// the meeting problem. It is the same pain, fresher packaging.
// Revision: "booked" replaces the second "scheduled" — the repeated
// word dulled the punchline; the single swap keeps the rhythm tight
// and makes the follow-up land harder. Final joke: 111 characters.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const JOKE =
  "We scheduled a meeting to discuss why we have too many meetings, then booked a follow-up to action the meeting.";

// Gate: 1-200 characters, single line, not only whitespace.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${JOKE.length}`);
}
if (JOKE.includes("\n") || JOKE.trim().length === 0) {
  throw new Error("joke must be a single non-empty line");
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");

// Round-trip guard: what we wrote must read back byte-identical.
const { readFileSync } = await import("node:fs");
const back = readFileSync(outPath, "utf8");
if (back !== JOKE) {
  throw new Error("round-trip mismatch: entry.txt does not match the joke");
}
console.log(`wrote ${outPath} (${JOKE.length} characters)`);
