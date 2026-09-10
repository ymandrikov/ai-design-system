# mini-ds layouts

Layout components appear only in this index.

- **stack**
  - Purpose: Stack arranges its children in one vertical flow with one
    consistent space between adjacent children, preserving source order. It
    owns inter-child spacing and resets children's outer block margins; nested
    stacks support groups with different spacing. The surrounding host provides
    the surface, border and inset, while children retain their own semantics.
  - Contract: [contract](layouts/stack.md)
