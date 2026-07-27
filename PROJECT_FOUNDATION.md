MARKET EMPIRE

A multiplayer financial strategy game for beginners

PROJECT FOUNDATION

The one document to read before doing anything else

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>START HERE</strong></p>
<p>This document explains, in plain language, what we are building, what to do first, and why.</p>
<p>No prior knowledge of coding, game design, or this project is needed to follow it.</p>
<p>Every claim about a tool or method below can be checked at the source links on the last page.</p></td>
</tr>
</tbody>
</table>

Current stage: Research and one-round demo build • Status: Not yet balance-validated

1. What we are building

Market Empire is a short multiplayer game where players make simple investment decisions, see what happens as a result, and learn from clear explanations. It is designed first for people who have never invested money before — students and museum visitors — and later for more experienced players who want a faster, denser version.

The idea in one sentence

Players get cash, react to market information, invest across a few sectors, bid on property, and try to grow their position over a handful of short rounds — while the game explains, in plain language, why each result happened.

Why this project exists

Financial ideas are usually taught as definitions. This project turns them into decisions and consequences a person can feel and discuss.

It is built for people with no background - so every screen, rule and explanation must work without a teacher present.

It is not yet a finished game. It is currently a researched, documented plan being turned into one working demo round.

2. What we are building right now - the demo

We are not building the whole game yet. We are building one small, complete, clickable slice of it, so the team can see it, test it, and agree it feels right before doing more work. This is normal practice in software: prove the smallest real version first.

The one round, step by step

Start the demo

Read one market signal (a short clue about what might happen)

Decide how to split cash across four sectors

Confirm the decision

The game calculates the result

See the gain or loss, explained in plain words

Bid on one property

See who won the bid and why

Read a short, approved explanation of what happened

See the round summary

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>What the demo will NOT include yet</strong></p>
<p>Real online multiplayer, accounts, or logins</p>
<p>The full six-round game or the faster "Advanced" version</p>
<p>Final, validated financial formulas — all numbers are clearly marked provisional</p></td>
</tr>
</tbody>
</table>

3. What counts as done - the first milestone

The one-round demo is ready to show to the team, and to anyone outside it, only when every item below is true. This is the acceptance gate - the concrete finish line for the first piece of work.

☐ A user can start the demo without needing instructions.

☐ The market signal is understandable on its own.

☐ A player can allocate cash and confirm the choice.

☐ The engine produces the documented, expected result.

☐ The property bid resolves correctly.

☐ The explanation shown matches the confirmed result.

☐ The full round can be completed without a broken screen.

☐ Provisional formulas are visibly labelled as provisional.

☐ Automatic unit tests pass.

☐ One full browser walkthrough test passes.

☐ The demo is reachable through a working preview link.

☐ Known limitations are written down, not just remembered.

4. The three things that make this work

You do not need to remember many tools. You need to understand three ideas. Everything else in this document is built on top of these three.

1 - GitHub is our memory

Every decision, task, document and piece of code lives in one place: a GitHub repository called market-empire. Only information committed to the repository, or recorded in an issue, pull request or decision file, counts as shared project knowledge. A conversation with an AI or a teammate is not an accepted decision by itself — if it matters, it gets written down there.

2 - AGENTS.md is our shared instruction sheet

This is one short file that tells any AI coding tool (Claude Code, Cursor, Gemini) the same basic rules: how to run the project, what it must never invent, and how it should ask before building. We configure each AI coding tool to use this same short instruction file, so the project rules remain consistent across all of them.

3 - Every task is one GitHub issue

Nothing is built without first writing down: what we want, why it matters, and how we will know it is done. That written task is called an issue. One issue, one small piece of work, one review, one merge. This is what keeps four people from stepping on each other.

5. Who can approve what

Keeping this simple and clear prevents confusion about whose call something is.

Bora - product scope, integration and final demo direction

Pankuri - UX and interface recommendations

Hanyu - financial relationships, formulas and scoring

Leo - testing method, evidence and process integrity

6. What to do first - today

Follow this order. Skipping straight to coding before step 5 creates avoidable confusion and rework later.

Create one GitHub repository named market-empire.

Create a GitHub Project board with four columns only: Now, Next, Later, Done.

Add the shared instruction files: AGENTS.md (the rules) and CLAUDE.md (just points to AGENTS.md).

Write three starting issues: (a) finance evidence for the one-round demo, (b) the beginner clickable flow, (c) the initial test plan.

Write one page called DEMO_SPEC.md describing exactly the 10-step round in section 2.

Only after that: create the six Figma screens (see section 7). Do not write game code before this.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>STOP AND CHECK</strong></p>
<p>Before any code is written, the team should be able to look at DEMO_SPEC.md and the six Figma screens and agree: "yes, this is the round we are building."</p>
<p>If anyone is unsure what the demo does, fix that before coding — not after.</p></td>
</tr>
</tbody>
</table>

7. Tools - what each one is for, in plain words

You do not need to be technical to understand this table. Read the middle column only.

Tool

What it actually does for us

Cost

GitHub

Where the project lives - code, tasks, history, decisions.

Free

GitHub Projects

A simple board (Now / Next / Later / Done) to see what's happening.

Free

AGENTS.md

One short file that tells any AI the project's rules.

Free (just a text file)

Claude Code

The primary AI coding assistant. It proposes plans, edits code and runs tests, while a human reviews and approves the work.

Paid, usage-based

Cursor

The editor where a human reviews and tweaks code by hand.

Free tier / paid

Gemini CLI

A second, independent AI that checks Claude's work for mistakes.

Free tier available

Figma

Where the screens are sketched and clicked through before coding.

Free tier

React + TypeScript

The technology the actual game screens are built with.

Free (open source)

Vitest

Automatically checks that the game's maths gives correct results.

Free (open source)

Playwright

Automatically clicks through the game like a real player, to catch bugs.

Free (open source)

Vercel

Turns each version of the demo into a clickable web link to test.

Free tier

Supabase

Added later - lets multiple real players play together online.

Free tier

Pricing note: Tool plans and usage limits can change. Check the linked official pricing page before committing to a paid plan.

Pricing checked: 26 July 2026

8. How a piece of work actually gets done

Every single change - no matter how small — follows the same seven steps. This is what stops the project from becoming confusing as more people touch it.

Write the task as one GitHub issue: goal, why it matters, what "done" looks like.

Create a small, separate branch of the code just for that task.

Claude Code reads the task and the shared rules, proposes a short plan, and waits for approval.

Once approved, Claude Code builds it and runs the automatic tests.

A pull request is opened - this is a request to merge the new work into the main project.

Gemini (or a teammate) reviews the change without editing it, and lists any problems.

Once it looks right on the live preview link, it is merged - and the task moves to Done.

Nobody edits the main project directly. Everything passes through this loop, so there is always a record of what changed, why, and who checked it.

9. What to do when stuck

Use this exact loop instead of guessing or quietly deleting things.

Stop changing files.

Read the GitHub issue and DEMO_SPEC.md again.

Check the latest working commit.

Write down the expected result and the actual result.

Save the error message or a screenshot.

Ask the AI or a teammate, using that written evidence.

Create a separate fix branch if needed.

Do not delete working code to hide the problem.

Return to the last working commit if the change cannot be repaired safely.

10. Rules that never change

Never invent formulas, sources, test results, or approvals. If it isn't proven, label it "provisional."

The game engine calculates results. The screen only shows what the engine already decided.

One task (issue) at a time. No silent scope changes.

Every changed game rule needs an updated test.

Big decisions (scope, architecture, core rules) get written down in DECISIONS.md - not just said out loud.

Never commit passwords, API keys, or secrets to GitHub.

If something is unresolved or risky, say so in writing - do not hide it.

11. What we are deliberately not doing yet

Not finishing every research question before building anything - only what the one-round demo needs.

Not writing another full 39-page blueprint. Small, working documents only.

Not adding real multiplayer, accounts, or the Advanced experience until the local one-round demo works end to end.

Not treating the AI-generated interface as finished research - it is a starting hypothesis to test with a real person.

12. Where to check every claim in this document

Nothing above should be taken on trust. These are the same public, official sources this plan is based on — search or open them directly.

AGENTS.md - the open, shared AI-instructions format - <u>https://agents.md/</u>

GitHub Projects - planning and tracking work - <u>https://docs.github.com/en/issues/planning-and-tracking-with-projects</u>

GitHub Pull Requests - how review and merging works - <u>https://docs.github.com/en/pull-requests</u>

Claude Code documentation - <u>https://docs.claude.com/en/docs/claude-code/overview</u>

Vitest — testing framework - <u>https://vitest.dev/</u>

Playwright — browser testing - <u>https://playwright.dev/</u>

Vercel — preview deployments - <u>https://vercel.com/docs/deployments/preview-deployments</u>

Supabase — Realtime for multiplayer - <u>https://supabase.com/docs/guides/realtime</u>

Figma — prototyping and comments - <u>https://www.figma.com/prototyping/</u>

A link alone is not enough. When a source affects a project decision, record what it supports, what it does not support, the relevant page or section, the date checked, and whether the resulting project choice is verified or provisional.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Source-check template (copy for any claim that drives a decision)</strong></p>
<p>Claim:</p>
<p>Source:</p>
<p>Date checked:</p>
<p>Relevant section:</p>
<p>What it supports:</p>
<p>What it does not support:</p>
<p>Project simplification:</p>
<p>Status: Verified / Provisional</p></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>One-line summary of this whole document</strong></p>
<p>Write down the plan (GitHub). Give every AI the same short rulebook (AGENTS.md). Build one small, honest, clickable round before anything bigger. Check every change the same simple way, every time.</p></td>
</tr>
</tbody>
</table>
