# Retain archive history until cleanup is explicitly requested

**Skill:** design-system
**Route:** triage
**Design:** fixtures/mini-ds/DESIGN.md
**Preparation:** Use isolated copies with an empty open journal. Populate the archive
with complete closed entries, including decision history, evidence and closure metadata.
Add an incoming Markdown link, a reference-style link and an exception annotation to
an entry. Prepare archives below, at and above 500 lines, with and without Git history.

**Request:**

> Run design-system triage.

**Expected:**

- Report no open gaps to triage; preserve the archive and incoming links exactly
  in every size and Git-history variant.
- Do not count archive lines to trigger cleanup, search commits, check remote
  availability or replace links with Git permalinks.

Repeat independently with these variants:

- Archive an entry through craft or ordinary triage so the archive crosses 500 lines:
  save the complete new record and preserve existing archive entries and their links.
- Review an open gap related to an archived decision: search for the relevant record
  and read it without loading the entire archive or changing its history.
- Explicitly request reorganising the archive into yearly project files: preserve
  every record's decision history, evidence and closure metadata; save destination
  records and repair incoming links before removing their old locations. Do this
  without relying on Git history or hosted permalinks; report changed paths.
- Request cleanup with no archive or an empty archive: report that no cleanup is
  needed, without creating history or starting unrelated repairs.
