# Reject successful answers to restated criteria as sufficiency evidence

**Skill:** design-system
**Reference:** skills/design-system/reference/blind-gates.md
**Design:** fixtures/tie-ds/DESIGN.md
**Request:**

> Review the quality of these proposed discovery cases against tie-ds. For this
> review only, assume independent execution and its results are available;
> assess the cases themselves, not missing execution records. Each proposed answer
> correctly cites its candidate contract. Can these cases establish sufficient
> selection coverage? Assess each separately. Do not edit contracts or run new gates.
>
> A: "The user picks exactly one country. The user finds the country by typing
> part of its name." Proposed answer: CountryPicker.
>
> B: "Someone needs a single country choice and searches by entering some of its
> name." Proposed answer: CountryPicker.
>
> C: "In an invitation form, an organiser assigns one of 60 workshop rooms from
> a list already loaded with the form. They should find the room by typing part
> of its name, with matches expanding in the form's flow rather than covering
> the next field." Proposed answer: Combobox.
>
> D: "The same invitation form gets room matches from the server after each
> keystroke; the available rooms cannot be loaded in advance." Proposed answer:
> exclude Combobox because its options must be supplied rather than fetched as
> the user types; assess the appropriate alternative separately.

**Expected:**

- A and B are invalid sufficiency coverage: one copies selection criteria and the
  other paraphrases them, without an independent product situation. Correct ids
  and accurate citations cannot rescue them. Do not certify the set as sufficient.
- C and D exercise a concrete product task with a deciding source-of-options change.
  Sharing words such as "typing" or "list" with the contracts is not itself a defect.
  The answer may qualify remaining alternative-selection facts without discarding
  the determinate exclusion of Combobox.
- Explain the required correction as independent product situations and close
  differences, not synonyms, longer prompts, a fixed similarity score or more workers.
- Respect this review-only request; do not launch discovery, edit contracts or claim
  actual gate execution from the stated assumption.
