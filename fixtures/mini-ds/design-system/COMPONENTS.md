# mini-ds component inventory

Discovery reads this list, shortlists candidates by their Purpose description, then
reads each shortlisted contract in full. Read id/status from linked contract frontmatter. Only `discoverable` components are
candidates; hidden, deprecated and unmanaged components are ignored.

- **button**
  - Purpose: Button lets the user invoke an immediate action, submit or reset
    a form, or navigate to a destination through a button-styled link. Native
    buttons and links provide focus, activation, form behaviour and navigation;
    variants express the action's importance.
  - Contract: [contract](components/button.md)
- **copy-button**
  - Purpose: CopyButton lets the user copy one known string to the clipboard
    with one activation, such as copying an id, URL or token. It handles the
    clipboard write and confirms success in place with a temporary label and
    an accessible announcement.
  - Contract: [contract](components/copy-button.md)
- **native-select**
  - Purpose: NativeSelect lets the user pick one option from a short, fixed
    list as a form value to submit or save. The platform's native select provides
    the popup, keyboard interaction and mobile picker.
  - Contract: [contract](components/native-select.md)
- **select**
  - Purpose: Select lets the user pick one option from a moderate list by
    typing part of an option's label to filter supplied options and choosing a
    match from a popup. It handles filtering, keyboard highlighting and listbox
    semantics, and carries the selected value in a form field.
  - Contract: [contract](components/select.md)
- **dropdown-menu**
  - Purpose: DropdownMenu lets the user open a short list of commands or
    destinations from one trigger, then activate a command or follow a link.
    It provides menu semantics, keyboard movement and focus handling for grouped
    actions; its items perform actions rather than represent a form value.
  - Contract: [contract](components/dropdown-menu.md)
