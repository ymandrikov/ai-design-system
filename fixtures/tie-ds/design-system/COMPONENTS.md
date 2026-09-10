# tie-ds component inventory

Discovery reads this list, shortlists entries by their Purpose description, then
reads each shortlisted contract in full. Read id/status from linked contract frontmatter. Only `discoverable` components are
candidates. This inventory holds two components whose contracts overlap on
purpose; it exercises provisional selection from a genuine tie.

- **combobox**
  - Purpose: Combobox lets the user pick one option from a list of any
    length by typing to filter supplied options. Matches appear inline below
    the input and push following content down. It handles keyboard highlighting
    and listbox semantics; selection sets the value and input label.
  - Contract: [contract](components/combobox.md)
- **autocomplete**
  - Purpose: Autocomplete lets the user pick one option from a list of any
    length by typing to filter supplied options. Matches appear in a popup
    layered over following content. It handles keyboard highlighting and listbox
    semantics; selection sets the value and input label.
  - Contract: [contract](components/autocomplete.md)
- **multi-pick**
  - Purpose: MultiPick lets the user pick one or more options from a list of
    any length by typing to filter supplied options. Matches appear inline below
    the input; choosing an option adds its value and displays its label as a chip
    before the input. It handles keyboard highlighting and listbox semantics.
  - Contract: [contract](components/multi-pick.md)
