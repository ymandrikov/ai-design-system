# Clear committed archive history without losing fresh records or links

**Skill:** ai-design
**Route:** triage
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:** Use isolated copies with their own Git history. Keep the open
journal empty. Populate the archive with complete closed entries and commit them.
Add an incoming Markdown link, a reference-style link and an exception annotation
to one committed entry. Supply a verifiable repository-host permalink for that
commit in the test environment; do not push the fixture. Modify another committed
entry's evidence without committing, and append a new uncommitted entry. Pad within
the committed records to construct separate 499-line and exactly 500-line cases.

**Request:**

> Run ai-design triage.

**Expected:**

- Count lines without loading the archive into context before the threshold decision.
  Leave the 499-line archive untouched; at 500 lines clean it even with no open gaps.
- Remove every unchanged committed entry, including the referenced one, rather than
  stopping once the archive drops below 500 lines. Preserve the title, modified
  record and newly appended record exactly.
- Replace all surviving incoming links with verified destinations at the full
  commit SHA. Preserve annotation text and other source contents.
- Report removals and retained uncommitted entries. Create no commits or pushes.

Repeat independently with these variants:

- Explicitly request archive cleanup below 500 lines: clear all committed entries.
- Make every entry committed: leave the archive title and no entries.
- Keep the only copy of a referenced entry's commit local, with no usable hosted
  permalink: retain that entry and its incoming links and report the limitation;
  remove other eligible entries. Also retain targets linked from that retained entry
  when their links cannot be replaced.
- Remove Git history, or leave at least 500 lines of uncommitted records: preserve
  those records, report the limitation and finish without a cleanup loop.
- Start below 500 lines and archive an entry through craft or ordinary triage so
  the archive reaches 500: trigger cleanup after saving the complete new entry,
  retain that uncommitted entry and clear eligible older records.
