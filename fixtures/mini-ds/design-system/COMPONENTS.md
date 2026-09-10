# mini-ds component inventory

Discovery reads this list, shortlists candidates by their purpose line, then
reads each shortlisted contract in full. Read id/status from linked contract frontmatter. Only `discoverable` components are
candidates; hidden, deprecated and unmanaged components are ignored.

- **button**
  - Purpose: Button lets the user invoke one immediate action or go to one
    destination with a native button or link.
  - Contract: [contract](components/button.md)
- **copy-button**
  - Purpose: CopyButton lets the user copy one known string to the clipboard
    with one activation, confirmed in place.
  - Contract: [contract](components/copy-button.md)
- **native-select**
  - Purpose: NativeSelect lets the user pick one option from a short, fixed
    list with the platform's own select control.
  - Contract: [contract](components/native-select.md)
- **select**
  - Purpose: Select lets the user pick one option from a moderate list by
    typing to filter and choosing a match.
  - Contract: [contract](components/select.md)
- **dropdown-menu**
  - Purpose: DropdownMenu lets the user open a short list of commands or
    destinations from one trigger.
  - Contract: [contract](components/dropdown-menu.md)
