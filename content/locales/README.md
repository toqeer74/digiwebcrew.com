# Localized Content Overrides

You can override homepage/trust/pricing content per locale by creating files at:

- `content/locales/<locale>/homepage.json`
- `content/locales/<locale>/testimonials.json`
- `content/locales/<locale>/client-logos.json`
- `content/locales/<locale>/team.json`
- `content/locales/<locale>/trusted-platforms.json`
- `content/locales/<locale>/pricing-home.json`

Example locale folder names used by the app:

- `en`
- `ur`
- `ar`

Behavior:

- If localized file exists, it is used.
- If localized file does not exist, loader falls back to default file in `content/`.
