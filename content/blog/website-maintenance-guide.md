---
title: "Website Maintenance: What Actually Needs Doing (And What Doesn't)"
metaTitle: "Website Maintenance: What Actually Needs Doing"
metaDescription: "Most maintenance retainers bill for reports nobody reads. What genuinely needs doing monthly, quarterly, and yearly — and how to judge whether yours is worth it."
date: "2026-08-18"
updated: "2026-08-20"
author: "Toqeer Shafique"
authorRole: "Founder & Lead Engineer, Digi Web Crew"
category: "Maintenance"
excerpt: "A lot of maintenance retainers are insurance policies that bill monthly and do little. Here's the work that genuinely matters, and how to check you're getting it."
coverImage: "/images/mockups/process-step-3.jpg"
keywords:
  - website maintenance
  - website maintenance plan
  - website security updates
  - wordpress maintenance services
---

Website maintenance is one of the easiest things in this industry to sell and one of the easiest to under-deliver on, because the client usually can't tell the difference between a retainer that's doing real work and one that's running an automated scan and emailing the PDF.

Here's what genuinely needs doing, how often, and how to check whether you're getting it.

## Why neglect gets expensive

Sites don't decay because the code changes — it doesn't. They decay because everything around them does. Browsers update, dependencies get security advisories, TLS certificates expire, payment providers deprecate API versions, and search engines change what they reward.

The cost curve is unfriendly. Twelve months of no maintenance is not twelve times one month of catching up — it's usually worse, because updates that would have been individually trivial now have to be applied together, with interacting breakages.

## What actually matters

### Security patching — genuinely urgent

The one thing with a real deadline. Known vulnerabilities in a CMS or a dependency get actively scanned for, at scale, within days of disclosure.

- **WordPress:** core, plugins, and themes. Plugins are the usual entry point, and abandoned ones are the worst offenders. If a plugin hasn't been updated in two years, replace it.
- **Custom applications:** dependency advisories. `npm audit` and Dependabot cover most of it, but somebody has to act on them.

**Cadence:** critical patches within days. Routine updates monthly.

### Backups you have actually restored

Everyone has backups. Far fewer have *tested* backups. An untested backup is a belief, not a safeguard, and people discover the difference at the worst possible moment.

- Automated daily, retained at least 30 days
- Stored somewhere other than the server they're backing up
- **Restored to a staging environment at least twice a year**

That last one is the whole point and it's the one that gets skipped.

### Uptime and error monitoring

You should learn your site is down from a monitor, not a customer. Basic uptime checks are nearly free. Error tracking that catches a broken form submission is more valuable and slightly more effort — a form that silently fails can cost weeks of leads before anyone notices.

**Check this yourself:** submit your own contact form today and confirm the email arrives. Broken forms are the single most common expensive fault we find on sites that appear fine.

### Certificate and domain renewals

Boring, automatable, catastrophic when missed. An expired certificate makes browsers show a full-page security warning. An expired domain can be bought by someone else.

Automate renewal, and set independent calendar reminders in case the automation fails silently.

### Performance checks

Sites get slower over time — added scripts, growing images, extra tracking tags. A quarterly check against real user data catches drift before it costs conversions. See the [Core Web Vitals guide](/blog/core-web-vitals-guide) for what to measure.

### Content and link integrity

Broken internal links, missing images, outdated pricing, staff who left two years ago. Quietly corrosive to trust, and easy to catch with a quarterly crawl.

## What's usually padding

- **Monthly "SEO reports" nobody reads.** A rankings PDF is not maintenance. If SEO work is happening, it should be described as actions taken, not positions charted. Real ongoing SEO is a [separate discipline with its own scope](/services/seo-growth-retainers).
- **Automated scan output forwarded without interpretation.** Anyone can run the scanner. The value is deciding what to act on.
- **"Unlimited small changes."** Usually capped in practice by an undefined notion of "small." Ask what happens in month three when you request the fourth change.
- **Plugin updates applied blindly.** Updating without checking the site still works afterwards is how maintenance causes outages rather than preventing them. Staging first.

## Realistic pricing

| Plan | Range | Reasonable expectation |
|---|---|---|
| Basic | $50–150/mo | Updates, backups, uptime monitoring |
| Standard | $150–500/mo | The above plus staging, testing, small content changes, quarterly performance review |
| Comprehensive | $500–2,000/mo | The above plus development hours, priority response, proactive improvements |

Ours start at $1,000/month, and that tier includes real development capacity — not just patching. For a straightforward brochure site, a basic plan from a competent provider is often the right call, and we'll say so.

## Five questions for your current provider

1. **When did you last restore a backup to verify it works?** The best single question. A vague answer tells you everything.
2. **What did you actually do last month?** Should be a list of specific actions, not a dashboard.
3. **Do you test updates on staging first?** If not, you're one plugin update from downtime.
4. **How fast do you respond when the site is down?** Get it in writing.
5. **If I leave, what do I take?** Code, backups, credentials, documentation — confirm it now, not during an argument.

## If you have no plan at all

Minimum viable, most of it free:

1. Automated daily backups to off-site storage
2. Uptime monitoring with alerts
3. Automatic security updates enabled
4. A calendar reminder to test your contact form monthly
5. Certificate and domain auto-renewal, with a manual reminder as backstop

That covers the failures that actually hurt. Everything beyond it is genuine improvement rather than protection — worth buying, but be clear which one you're paying for.

You can see [what our support plans cover](/services/maintenance-support), or [book a call](/book-consultation) if you want an honest read on whether your current arrangement is doing anything.
