/**
 * Launch switches.
 *
 * FORMS_OPEN gates the two places the site collects personal data: the
 * community application form and the keep-in-touch (waitlist) form. While it
 * is false the pages show a short notice instead of the form, and the API
 * routes refuse submissions with a 503, so nothing can be posted even by
 * calling the endpoint directly.
 *
 * Why it exists: the ICO data protection fee is due once the site processes
 * personal data as a controller. The owner chose to keep both forms closed
 * until the fee is paid and the rest of the launch checklist is done.
 *
 * To open the forms: set FORMS_OPEN to true below and deploy, or set the
 * environment variable FORMS_OPEN=true in Vercel (Settings > Environment
 * Variables), which overrides the constant without a code change. Before
 * doing either: pay the ICO fee, fill the controller name and address in
 * src/lib/legal.ts, and have a mailbox to send invites from.
 *
 * The database has the same switch (public.app_flags, migration 0005) and
 * the submit functions refuse to write while it is off, so a leaked key
 * cannot open the forms early. Flip both in the same sitting:
 *
 *   update public.app_flags set enabled = true, updated_at = now()
 *    where key = 'forms_open';
 */

const FORMS_OPEN_DEFAULT = false;

export const FORMS_OPEN: boolean =
  process.env.FORMS_OPEN === "true"
    ? true
    : process.env.FORMS_OPEN === "false"
      ? false
      : FORMS_OPEN_DEFAULT;

/** Shown in place of a closed form. Plain, and no promise of a date. */
export const FORMS_CLOSED_NOTICE =
  "This form is not open yet. We will switch it on when the site launches.";

/** Returned by the API routes while the forms are closed. */
export const FORMS_CLOSED_API_MESSAGE = "This form is not open yet.";
