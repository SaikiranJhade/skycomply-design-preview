# skyComply, Radix design system mockups

Static HTML mockups of the core compliance and ADR workflows, built with the
`radix-design-system` skill (`.claude/skills/radix-design-system/`).

Open [`index.html`](index.html) in a browser. No build step, no server, no dependencies
beyond the Inter webfont.

## Screens (30 + contact sheet)

**Core compliance**

| File | Screen | Archetype | Mirrors |
|---|---|---|---|
| `dashboard.html` | Executive Dashboard | KPI Overview | `pages/Dashboard.tsx` |
| `plan-of-corrections.html` | Plan of Corrections | Data Table | `pages/PlanOfCorrectiveActions.tsx` |
| `poc-builder.html` | POC Builder | Three-Pane | `pages/POCBuilder.tsx` |
| `insights-review.html` | Review Extracted Insights | Data Table | `pages/InsightsReviewScreen.tsx` |
| `task-management.html` | Task Management | List + Right Rail | `pages/TaskManagement.tsx` |
| `compliance-checklists.html` | Compliance Checklists | Card Gallery | `pages/ComplianceChecklists.tsx` |

**ADR (SNF pack)**

| File | Screen | Archetype | Mirrors |
|---|---|---|---|
| `adr-management.html` | ADR Management | KPI + Data Table | `pages/AdrManagement.tsx` |
| `adr-case-detail.html` | ADR Case Detail | List + Right Rail | `pages/AdrCaseDetail.tsx` |
| `adr-new-case.html` | New ADR Case | Guided form | `pages/AdrNewCase.tsx` |

**Reportables and licences**

| File | Screen | Archetype | Mirrors |
|---|---|---|---|
| `reportables.html` | Reportables | Data Table | `pages/Reportables.tsx` |
| `reportable-detail.html` | Review Reportable | List + Right Rail | `pages/ReportableDetail.tsx` |
| `reportable-bulk-upload.html` | Bulk Upload Reportables | Queue | `pages/ReportableBulkUpload.tsx` |
| `licenses.html` | Licenses | KPI + Data Table | `pages/Licenses.tsx` |
| `license-detail.html` | License Detail | List + Right Rail | `pages/LicenseDetail.tsx` |

**Insights and assistant**

| File | Screen | Archetype | Mirrors |
|---|---|---|---|
| `insights.html` | Insights | KPI Overview | `pages/PCAInsights.tsx` |
| `tag-analytics.html` | Tag Analytics | Card Gallery | `pages/TagAnalyticsDashboard.tsx` |
| `sky-agent.html` | skyAgent | Three-Pane | `pages/SkyAgent.tsx` |

**Account and settings**

| File | Screen | Archetype | Mirrors |
|---|---|---|---|
| `notifications.html` | Notifications | List + Right Rail | `pages/Notifications.tsx` |
| `help-support.html` | Help + Support | Card Gallery + Table | `pages/HelpSupport.tsx` |
| `settings-general.html` | Settings, General | Form | `pages/settings/GeneralSettings.tsx` |
| `settings-configurations.html` | Settings, Configurations | Form | `pages/settings/ConfigurationsSettings.tsx` |
| `settings-operators.html` | Settings, Operators | Data Table | `pages/settings/OperatorsSettings.tsx` |
| `settings-communities.html` | Settings, Communities | Data Table | `pages/settings/CommunitiesSettings.tsx` |
| `settings-users.html` | Settings, Access Management | Data Table | `pages/settings/UsersSettings.tsx` |
| `settings-regulations.html` | Settings, Regulations | Card Gallery | `pages/settings/RegulationsSettings.tsx` |
| `settings-policy-playbook.html` | Settings, Policy and Playbook | Data Table | `pages/settings/PolicyPlaybookSettings.tsx` |
| `settings-ai-agent.html` | Settings, AI Agent | Form | `pages/settings/AIAgentSettings.tsx` |

**Entry and edge states**

| File | Screen | Archetype | Mirrors |
|---|---|---|---|
| `login.html` | Sign in | Chromeless | `pages/Login.tsx` |
| `access-denied.html` | Access Denied | Empty state | `pages/AccessDenied.tsx` |
| `not-found.html` | Page Not Found | Empty state | `pages/not-found.tsx` |

Labels come from `client/src/i18n/locales/en.json`, table columns from the page
components, and the sidebar order from `shared/rbac/registry.ts`.

## Regenerating

The `.html` files are generated so the shell stays byte-identical everywhere.

```
node design/radix/_build.mjs
```

- `_shell.mjs` is the locked shell (header, sidebar, breadcrumbs, footer) plus the Lucide
  inliner and `barePage` for chromeless screens. Do not vary it per page.
- `_pages.mjs` / `_pages2.mjs` hold one entry per screen: nav id, breadcrumb trail, H1,
  description, one header-slot control, and the MAIN CONTENT body.
- `_ui.mjs` holds the shared presentation helpers (stat card, metric card, bar list, column
  chart, donut, sortable header, pagination) so every screen renders them identically.
- `_index.mjs` is the contact sheet. Add a screen there when you add one.
- `tokens.css` and `dashboard.css` are copies of the skill assets. Edit them in the skill,
  then re-copy, never fork them here.

## Sample data

No resident PHI. Residents are placeholders ("Resident A"), and every survey ID, case
number, community and staff name is invented.

## Known issue: `--accent-11` fails contrast in the light theme

`tokens.css` sets `--accent-11: #ffb31c`, and the system uses step 11 as **text** on step
1 to 3 backgrounds (`.badge`, `.btn-soft`, `.link`, `.pane-folder.is-active`, `.app-banner`).
Measured in the light theme:

| Pair | Ratio | WCAG AA (4.5:1) |
|---|---|---|
| `#ffb31c` on `--accent-3` `#fff0d1` | 1.59:1 | fails |
| `#ffb31c` on white | 1.79:1 | fails |
| `#9a5b00` on `--accent-3` | 4.82:1 | passes |

This contradicts `references/rules.md` section 7, which requires step 11 to clear 4.5:1 on
steps 1 to 2 of the same hue. The skill's older `references/tokens.css` had the accessible
value `#9a5b00`; the newer `assets/tokens.css` replaced it with the brand amber.

It now shows up in **43 places across the 30 screens**: every `.link` (including all 30 "Open
screen" links on the contact sheet), the active settings tab underline label, the active
`.pane-folder` in POC Builder and skyAgent, and the "Reviewing" badge on the ADR case. These
mockups prefer `.btn-surface` and status-scale badges to limit the blast radius, but the fix
belongs in the token:

```css
--accent-11: #9a5b00;   /* light theme only; the dark theme value is fine */
```

Left unchanged pending a decision from the design owner, since it is a brand call.
