import { createRoot } from "react-dom/client";
import { Button, LinkButton } from "../react/button";
import { CopyButton } from "../react/copy-button";
import { DropdownMenu, MenuItem, MenuLink } from "../react/dropdown-menu";
import { NativeSelect } from "../react/native-select";
import { Select } from "../react/select";
import { Stack } from "../react/stack";
import { Toggle } from "../react/toggle";
import { SettingsPages } from "../product/settings-pages";

export function mountReactDemo(root: HTMLElement) {
  createRoot(root).render(
    <>
      <section>
        <Button variant="primary">Save</Button>
        <LinkButton href="/builds">View builds</LinkButton>
      </section>
      <section>
        <CopyButton value="bkua_1234">Copy token</CopyButton>
      </section>
      <section>
        <NativeSelect
          name="environment"
          label="Environment"
          options={[
            { value: "production", label: "Production" },
            { value: "staging", label: "Staging" },
          ]}
        />
      </section>
      <section>
        <Select
          name="country"
          label="Country"
          placeholder="Choose a country"
          options={[
            { value: "au", label: "Australia" },
            { value: "br", label: "Brazil" },
          ]}
        />
      </section>
      <section>
        <DropdownMenu label="Actions">
          <MenuItem onSelect={() => {}}>Rename</MenuItem>
          <MenuLink href="/builds/1">Open</MenuLink>
        </DropdownMenu>
      </section>
      <section>
        <Stack space="lg">
          <p>First</p>
          <p>Second</p>
        </Stack>
      </section>
      <section>
        <Toggle label="Enable notifications" defaultChecked />
      </section>
    </>,
  );
}

export function mountSettingsDemo(root: HTMLElement) {
  createRoot(root).render(<SettingsPages />);
}
