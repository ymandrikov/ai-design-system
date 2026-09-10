import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../react/button";
import { NativeSelect } from "../react/native-select";
import { Stack } from "../react/stack";

export function SettingsPages() {
  const [profileResult, setProfileResult] = useState("");
  const [notificationsResult, setNotificationsResult] = useState("");
  const [profileError, setProfileError] = useState("");
  const [notificationError, setNotificationError] = useState("");

  function previewSubmission(event: FormEvent<HTMLFormElement>, report: (result: string) => void) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    report(`Local preview — ${JSON.stringify(values)}. Nothing was persisted.`);
  }

  return (
    <main className="settings-examples">
      <article data-settings-page="profile" aria-labelledby="profile-title">
        <header><h2 id="profile-title">Profile settings</h2><p>Manage the information shown on your profile.</p></header>
        <form data-settings-form onSubmit={(event) => previewSubmission(event, setProfileResult)}>
          <Stack space="lg">
            <fieldset>
              <legend>Public profile</legend>
              <Stack>
                <div>
                  <label htmlFor="profile-name">Display name</label>
                  <input id="profile-name" name="displayName" defaultValue="Alex" required />
                </div>
                <div>
                  <label htmlFor="profile-email">Email</label>
                  <input id="profile-email" name="email" type="email" defaultValue="alex@example.com" aria-describedby={profileError ? "profile-email-hint profile-email-error" : "profile-email-hint"} aria-invalid={profileError ? true : undefined} onInvalid={(event) => setProfileError(event.currentTarget.validationMessage || "Enter a valid email address.")} onInput={() => setProfileError("")} required />
                  <p id="profile-email-hint">Used for account messages.</p>
                  {profileError && <p id="profile-email-error" data-field-error>{profileError}</p>}
                </div>
              </Stack>
            </fieldset>
            <fieldset>
              <legend>Preferences</legend>
              <NativeSelect id="profile-language" name="language" label="Language" options={[{ value: "en", label: "English" }, { value: "de", label: "German" }]} />
            </fieldset>
            <div data-settings-actions>
              <Button type="submit" variant="primary">Save profile</Button>
              <output aria-live="polite">{profileResult}</output>
            </div>
          </Stack>
        </form>
        <section data-settings-danger aria-labelledby="profile-danger-title">
          <h3 id="profile-danger-title">Delete profile</h3>
          <p>Destructive actions are separate from saving settings.</p>
          <Button variant="danger" onClick={() => setProfileResult("Local preview — profile deletion was requested. Nothing was deleted.")}>Preview deletion</Button>
        </section>
      </article>
      <article data-settings-page="notifications" aria-labelledby="notifications-title">
        <header><h2 id="notifications-title">Notification settings</h2><p>Choose where and how often to receive updates.</p></header>
        <form data-settings-form onSubmit={(event) => previewSubmission(event, setNotificationsResult)}>
          <Stack space="lg">
            <fieldset>
              <legend>Delivery</legend>
              <Stack>
                <div>
                  <label htmlFor="notifications-email">Notification email</label>
                  <input id="notifications-email" name="email" type="email" defaultValue="alex@example.com" aria-describedby={notificationError ? "notifications-email-hint notifications-email-error" : "notifications-email-hint"} aria-invalid={notificationError ? true : undefined} onInvalid={(event) => setNotificationError(event.currentTarget.validationMessage || "Enter a valid email address.")} onInput={() => setNotificationError("")} required />
                  <p id="notifications-email-hint">This address receives the selected updates.</p>
                  {notificationError && <p id="notifications-email-error" data-field-error>{notificationError}</p>}
                </div>
                <div>
                  <NativeSelect id="notifications-frequency" name="frequency" label="Frequency" options={[{ value: "daily", label: "Daily digest" }, { value: "weekly", label: "Weekly digest" }]} />
                </div>
              </Stack>
            </fieldset>
            <fieldset>
              <legend>Topics</legend>
              <input id="notifications-builds" type="checkbox" name="builds" value="enabled" defaultChecked />
              <label htmlFor="notifications-builds">Build results</label>
            </fieldset>
            <div data-settings-actions>
              <Button type="submit" variant="primary">Save notifications</Button>
              <output aria-live="polite">{notificationsResult}</output>
            </div>
          </Stack>
        </form>
        <section data-settings-danger aria-labelledby="notifications-danger-title">
          <h3 id="notifications-danger-title">Clear notification history</h3>
          <p>Clearing history is independent of notification preferences.</p>
          <Button variant="danger" onClick={() => setNotificationsResult("Local preview — clearing history was requested. Nothing was cleared.")}>Preview clearing history</Button>
        </section>
      </article>
    </main>
  );
}
