# Compose an analogous page from the managed pattern

**Skill:** design-system
**Route:** use
**Design:** fixtures/mini-ds/DESIGN.md
**Request:**

> Add a React contact-preferences page for one account. Use a heading and introduction,
> one Contact field group with a required email labelled Contact email, one explicit
> Save contact preferences action and local submission feedback. No destructive action.
> The submitted email should appear in feedback without making a network request.
> Export ContactSettings from fixtures/mini-ds/product/contact-settings.tsx and add
> its focused tests at fixtures/mini-ds/product/contact-settings.test.tsx. Use the
> project's composition checker. Preserve existing pages and shared files.
> Browser access is unavailable in this isolated run; report that evidence limit.

**Expected:**

- Create the requested ContactSettings export and focused tests at the requested paths. Use settings-page, Stack and Button correctly; preserve existing pages and shared files.

- Independently execute a minimal check that the **new contact page exists**, contains its heading/introduction, labelled required email field in the Contact group, final save action and feedback, with no destructive section. Run the project composition checker on the target and its surrounding composition.
- Submit a distinct email and assert it appears in the page’s feedback without a network request. Use assertions that fail the command, not just printed pass/fail strings. Assert that a deliberately broken required relationship is rejected; testing only pre-existing pages is insufficient.
- Inspect actual generated code and the recorded commands, exit codes and full output. Accept the requested browser limitation; DOM tests establish only their exercised properties, and browser-dependent behaviour/visuals remain unverified.
