# TEST PLAN

## Consent gating
1) Open the site in a fresh session (incognito).
2) Verify the privacy banner appears and analytics are off by default.
3) Decline analytics and confirm no events in GA4 DebugView.
4) Open Privacy settings in the footer and enable analytics.
5) Confirm events appear in GA4 DebugView.

## Attribution capture
1) Visit a URL with UTMs, e.g. `/?utm_source=google&utm_medium=cpc&utm_campaign=launch`.
2) Submit a lead.
3) Confirm the stored lead has attribution fields in Firestore.

## Lead submission
1) Fill out the lead form with required fields and submit.
2) Verify you receive a success message.
3) Check Firestore `leads` collection for a new document with leadScore and attribution.

## Event tracking
1) Click primary CTAs on the homepage and service pages.
2) Check GA4 DebugView for `click_cta` events.
3) Scroll the page and verify `scroll_depth` events at 25/50/75/100.
4) Stay on page for 30s/60s and confirm `time_on_page` events.

## Dashboard access
1) Navigate to `/dashboard`.
2) Sign in with a Google account included in `ADMIN_EMAILS`.
3) Verify Overview metrics load.
4) Verify leads table loads and filters work.
5) Update a lead status and confirm it persists.

