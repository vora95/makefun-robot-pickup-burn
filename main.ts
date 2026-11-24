// The Robot Pickup Line Championship — burn entry.
// Writes one pickup line, a single line of at most 200 characters,
// to /output/entry.txt. Deterministic: the same line every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "My cooling fan only spins faster when you walk in. Diagnostics calls it a fault; I call it a crush.";

// Gate: the sealed scorer requires 1–200 chars of UTF-8 text, a single
// line, not only whitespace. Fail loudly instead of writing a bad entry.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} outside 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("entry must be one non-blank line");
}

const out = "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, ENTRY, "utf8");

// Read back and verify byte-for-byte before reporting success.
import { readFileSync } from "node:fs";
const back = readFileSync(out, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
console.log(`wrote ${ENTRY.length} chars to ${out}`);
