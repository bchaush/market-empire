# Market Empire

**Market Empire** is a beginner-friendly financial education game where players make simple investment decisions, observe the results, and learn through clear explanations.

This repository contains the completed **one-round, seven-screen playable demo** built with React and TypeScript.

> **Project status:** The demo is complete, tested, reviewed by the project team and course professor, and approved for presentation.  
> The larger future Market Empire product is separate work and is not claimed to be complete.

## Quick links

- **Live completed demo:** [https://market-empire.vercel.app](https://market-empire.vercel.app)
- **GitHub repository:** [https://github.com/bchaush/market-empire](https://github.com/bchaush/market-empire)
- **Final completed commit:** `b531acade51cbb2619a87c5575b1ad490ae54f62`

---

## What the demo does

The player begins with **$10,000 in available cash** and completes one scripted financial decision round.

During the demo, the player:

1. Learns the basic rules from the Market Coach.
2. Reviews market information.
3. Decides how much money to invest across four sectors.
4. Sees the calculated market result.
5. Reviews a fictional property opportunity.
6. Submits a sealed property bid.
7. Reaches a final round summary.

The demo is **deterministic**. This means the same decisions produce the same results. It allows the experience to be tested reliably and demonstrated consistently.

The Coach explains what each step means, but it does not choose investment amounts for the player or provide personalized financial advice.

---

## The seven-screen journey

| Screen | What happens |
|---|---|
| **1. Start** | Introduces Market Empire and begins the demo. |
| **2. Coach Tutorial** | Explains available cash, market information, investments and the property auction. |
| **3. Market Intelligence** | Presents the scripted market indicators used during the round. |
| **4. City Investment Decision** | Allows the player to divide available cash among four investment sectors. |
| **5. Market Result** | Shows the calculated gain or loss and explains the outcome. |
| **6. Property Opportunity** | Presents a fictional property and allows the player to submit a sealed bid. |
| **7. Round Summary** | Summarizes the player’s final financial position and provides restart or exit options. |

---

## What has been completed

The completed demo includes:

- A full playable flow from Start to Round Summary
- Four investment sectors
- Investment-allocation validation
- Property-bid validation
- Deterministic market calculations
- Deterministic property and auction calculations
- Market-result explanations
- Separate auction explanations for losing, tying and winning
- A Market Coach on every applicable screen
- Information popups for all four sectors
- Keyboard-operable controls
- A tested desktop presentation
- A successful Vercel production deployment

### Final verified results

| Verification | Result |
|---|---|
| Vitest unit and calculation tests | **32/32 passed across 7 files** |
| Playwright browser tests | **6/6 passed** |
| Complete seven-screen walkthrough | **Passed** |
| Production build | **Passed** |
| Vercel production deployment | **Successful** |
| Team and professor presentation review | **Approved** |

These results describe the verified completed version. Future changes should be tested again rather than assuming the same results will continue automatically.

---

## How the code works

The project separates the game’s calculations from the visual interface.

```text
Player action
    ↓
React screen or control
    ↓
Input validation or state transition
    ↓
Game engine calculation
    ↓
Result stored in application state
    ↓
Screen and Coach display the result
```

The **engine** is responsible for official calculations.

The **interface** displays the engine’s result. It should not recreate or independently change the official calculation rules.

This separation makes the game easier to test, understand and safely modify.

---

## Repository guide

| Path | What it contains | Look here when you need to… |
|---|---|---|
| `src/App.tsx` | Main application flow and screen wiring | Understand how the seven screens connect |
| `src/main.tsx` | React application entry point | Understand how the app starts |
| `src/screens/` | Individual game screens | Change a particular screen |
| `src/components/` | Shared interface elements | Change the shell, Coach, popups or common layout |
| `src/state/` | Game state and transitions | Change how the player moves between screens |
| `src/engine/` | Official calculations and validation | Change financial, auction or result logic |
| `src/content/` | Scripted wording and demo configuration | Change approved player-facing content or demo values |
| `e2e/` | Playwright browser tests | Test the full player journey |
| `docs/` | Scope, research, decisions and evidence | Understand why the project works this way |
| `docs/DECISIONS.md` | Official project decisions | Review approved rules and changes |
| `docs/DEMO_SPEC.md` | Exact demo requirements | Understand the intended seven-screen experience |
| `docs/PROJECT_FOUNDATION.md` | Project purpose and working rules | Understand the project before changing anything |
| `docs/finance/source-ledger.md` | Financial research and source status | Review financial evidence and limitations |
| `docs/testing/` | Test plan and acceptance evidence | Review what was tested and what remains limited |
| `package.json` | Project scripts and dependencies | See available development commands |
| `playwright.config.ts` | Browser-test configuration | Change Playwright setup carefully |
| `vite.config.ts` | Development and build configuration | Change Vite behavior carefully |

---

## What to edit for common changes

| Goal | Begin here | Also review |
|---|---|---|
| Change player-facing wording | `src/content/` | Relevant screen and tests |
| Change Coach wording | Coach guidance files in `src/content/` | Coach popup tests |
| Change one screen’s layout | Relevant file in `src/screens/` | Shared screen CSS and browser tests |
| Change the shared HUD or page shell | `src/components/AppShell.tsx` | `src/components/AppShell.css` |
| Change a sector value | `src/content/gameConfig.ts` | Engine tests, finance records and decisions |
| Change market calculations | `src/engine/` | Unit tests and documented examples |
| Change auction behavior | Property and bid files in `src/engine/` | Bid tests and Decision Records |
| Change input validation | Engine validation files | Boundary tests |
| Change screen order or navigation | `src/state/` and `src/App.tsx` | Transition and Playwright tests |
| Add or update a test | Relevant `*.test.ts` or `e2e/` file | Initial test plan and evidence |
| Record an approved project decision | `docs/DECISIONS.md` | Related specification and evidence |

Changing one number can affect calculations, tests, written examples and decision records. Review all related areas before committing the change.

---

## Files to change carefully

The following files are not forbidden to edit, but changes can affect the entire project:

- `src/engine/` — official calculations
- `src/state/` — navigation and saved game state
- `src/content/gameConfig.ts` — scripted demo values and configuration
- `docs/DECISIONS.md` — permanent project decision history
- `docs/testing/` — test requirements and evidence
- `package-lock.json` — exact dependency versions
- `playwright.config.ts` — browser-test configuration
- `vite.config.ts` — development and build configuration
- `.gitignore` — files Git should exclude
- `.claude/settings.json` — local Claude Code permissions; leave it untracked unless the project owner explicitly decides otherwise

After modifying calculations, state, configuration or shared components, run the complete test and build commands.

---

## Open the project without installing anything

The easiest way to inspect the project is through GitHub:

1. Open the [Market Empire repository](https://github.com/bchaush/market-empire).
2. Use the **Code** tab to browse folders and files.
3. Select a file to read it.
4. Use **History** to see earlier versions of that file.
5. Open **Issues** to see documented tasks.
6. Open **Pull requests** and select **Closed** to review completed changes and independent reviews.

GitHub is the permanent record of what was proposed, changed, tested and merged.

---

## Download the project as a ZIP

1. Open the GitHub repository.
2. Select the green **Code** button.
3. Select **Download ZIP**.
4. Extract the downloaded folder.

A ZIP copy is useful for reading or running the project, but it does not contain the full Git history.

Cloning or downloading the repository is safer than manually copying each code file. Manual copying can miss configuration files, the dependency lockfile or hidden project files.

---

## Clone the repository

Using Git:

```bash
git clone https://github.com/bchaush/market-empire.git
cd market-empire
```

You can also clone it through GitHub Desktop:

1. Install GitHub Desktop.
2. Select **File → Clone repository**.
3. Choose or paste `bchaush/market-empire`.
4. Select a local folder.
5. Select **Clone**.

---

## Run the demo locally

### Requirements

Install:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- Git, when cloning the repository

### Install the project

From the repository folder:

```bash
npm ci
```

This installs the exact dependency versions recorded in `package-lock.json`.

### Start the development server

```bash
npm run dev
```

Vite will display a local address in the terminal. Open that address in a web browser.

To stop the development server, return to the terminal and press:

```text
Ctrl + C
```

---

## Test and build the project

| Purpose | Command | Final verified result |
|---|---|---|
| Run calculation and state tests | `npx vitest run --reporter=verbose` | 32/32 passed |
| Run browser tests | `npm run e2e` | 6/6 passed |
| Create a production build | `npm run build` | Passed |
| Check Git whitespace errors | `git diff --check` | Passed |

If Playwright reports that its browser is missing, install the required browser files:

```bash
npx playwright install
```

Then run:

```bash
npm run e2e
```

A test result should always be recorded from the current version being reviewed. Do not assume that an older passing result proves a new change is safe.

---

## GitHub workflow for future changes

Use one controlled task at a time.

### 1. Create a GitHub issue

Explain:

- the goal
- why the change matters
- acceptance criteria
- what is out of scope
- required tests

### 2. Update local `main`

```bash
git checkout main
git pull --ff-only origin main
```

### 3. Create a branch

```bash
git checkout -b <issue-number>-short-description
```

Example:

```text
25-improve-round-summary-wording
```

### 4. Make the smallest required change

Do not include unrelated files.

### 5. Review the changed files

```bash
git status
git diff
git diff --check
```

### 6. Run the required tests

```bash
npx vitest run --reporter=verbose
npm run e2e
npm run build
```

### 7. Commit the specific files

```bash
git add <specific-files>
git commit -m "Clear description of the change"
```

### 8. Push the branch

```bash
git push -u origin <branch-name>
```

### 9. Open a draft pull request

A draft pull request means the work exists on GitHub but is not ready to merge.

Include:

- what changed
- why it changed
- test results
- known limitations
- the issue it closes

### 10. Request independent review

A different reviewer should compare the implementation with the issue, documentation and tests.

### 11. Correct required findings

Make corrections in a new commit. Do not hide or rewrite the earlier history.

### 12. Merge normally

After approval and successful checks:

- mark the pull request ready
- merge it
- confirm its issue closes
- update local `main`
- remove the merged branch

Avoid force pushing, squashing or rewriting history unless the project owner explicitly approves it.

---

## GitHub tabs explained

| Tab | Purpose |
|---|---|
| **Code** | Browse the current files and latest commit |
| **Issues** | See proposed, active and completed tasks |
| **Pull requests** | Review changes before and after merging |
| **Actions** | View automated workflows when configured |
| **Commits** | Review the project’s history |
| **Branches** | View development branches |
| **Insights** | View repository activity and contribution information |

A new contributor should begin with:

1. This README
2. `docs/PROJECT_FOUNDATION.md`
3. `docs/DEMO_SPEC.md`
4. `docs/DECISIONS.md`
5. The current closed issues and merged pull requests

---

## Deployment

Market Empire is deployed with Vercel.

Two deployment types may appear:

- **Preview:** created for a pull request so the change can be reviewed before merging
- **Production:** created from the merged `main` branch

A successful deployment means Vercel built and hosted the application successfully.

It does **not** automatically mean a human completed a walkthrough of that exact deployment.

The current presentation link is:

[https://market-empire.vercel.app](https://market-empire.vercel.app)

A separate fork normally needs its own Vercel account, project connection and repository permissions. Credentials are not stored in this repository.

---

## Important project documents

| Document | Question it answers |
|---|---|
| [`docs/PROJECT_FOUNDATION.md`](docs/PROJECT_FOUNDATION.md) | What is the project and how should work be managed? |
| [`docs/DEMO_SPEC.md`](docs/DEMO_SPEC.md) | What exactly must the seven-screen demo do? |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Which rules, values and implementation choices were approved? |
| [`docs/finance/source-ledger.md`](docs/finance/source-ledger.md) | Which financial statements have sources and which remain limited? |
| [`docs/ux/beginner-flow.md`](docs/ux/beginner-flow.md) | How should a beginner move through the experience? |
| [`docs/testing/initial-test-plan.md`](docs/testing/initial-test-plan.md) | What needs to be tested? |
| [`docs/testing/evidence/issue-11-final-acceptance.md`](docs/testing/evidence/issue-11-final-acceptance.md) | What acceptance evidence was recorded? |

---

## Known boundaries and limitations

The completed demo is approved for presentation, but it does not claim:

- completion of the larger future Market Empire product
- multiple rounds
- real multiplayer
- user accounts
- live artificial intelligence
- responsive mobile support
- formal testing by a screen-reader user
- formal contrast certification
- formal click-target certification
- final balance validation
- universal real-world accuracy for simplified demo values
- implementation of the separate future mock design
- final city artwork or animation

Historical specialist-review records remain preserved internally for traceability. They are not shown to players and are not represented as completed unless directly recorded.

---

## Troubleshooting

### `npm` is not recognized

Install Node.js, close the terminal, open a new terminal and try again.

### Dependencies are missing

Run:

```bash
npm ci
```

### The local port is already being used

Stop the other development server or use the alternative address Vite provides.

### Playwright cannot find a browser

Run:

```bash
npx playwright install
```

Then run the browser tests again.

### Tests fail

Read the first failure carefully. Confirm:

- dependencies were installed
- the branch is current
- no unrelated file changed
- the documented expected result still matches the implementation

Do not delete or weaken a test simply to make it pass.

### The browser shows an older version

Perform a hard refresh:

```text
Ctrl + Shift + R
```

Also confirm that the correct local server or Vercel deployment is open.

### The local branch is behind `main`

```bash
git checkout main
git pull --ff-only origin main
```

Then create a fresh branch for the new task.

### `.claude/settings.json` appears as untracked

Leave it untracked unless the project owner explicitly decides otherwise.

Do not commit or delete it as part of an unrelated change.

---

## Final handoff checklist

Before presenting or transferring the project, confirm:

- [ ] The GitHub repository opens
- [ ] The live demo opens
- [ ] The seven-screen journey can be completed
- [ ] Dependencies install successfully
- [ ] Vitest passes
- [ ] Playwright passes
- [ ] The production build succeeds
- [ ] Project documents are readable
- [ ] The latest `main` commit is recorded
- [ ] No unexpected issue or pull request is open
- [ ] No credentials or private tokens are committed
- [ ] Completed work and future work are clearly separated

---

## Beginner glossary

| Term | Meaning |
|---|---|
| **Repository** | The GitHub project containing the files and their history |
| **Commit** | A recorded group of file changes |
| **Branch** | A separate line of work created from the main project |
| **Issue** | A documented task, problem or proposal |
| **Pull request** | A request to review and merge branch changes |
| **Draft pull request** | A pull request that is not ready to merge |
| **Merge** | Adding approved branch changes into `main` |
| **Component** | A reusable part of the React interface |
| **State** | Information the application remembers during play |
| **Engine** | Code responsible for official game calculations |
| **Deterministic** | The same input always produces the same result |
| **Unit test** | A test of one calculation or small behavior |
| **Browser test** | An automated test that interacts with the application |
| **Build** | The optimized version prepared for deployment |
| **Deployment** | A hosted version of the application |
| **Preview** | A temporary deployment used to review a pull request |
| **Production** | The public deployment created from merged `main` |
| **Provisional** | Approved for the current demo but still carrying a documented limitation |

---

## Final summary

The completed Market Empire demo is a tested, deterministic seven-screen financial education experience.

It has been:

- implemented in React and TypeScript
- verified through unit and browser tests
- deployed successfully
- reviewed by the project team and course professor
- approved for presentation
- preserved with its scope, decisions and evidence in GitHub

The live demo is available at:

[https://market-empire.vercel.app](https://market-empire.vercel.app)

Future contributors should begin with this README, the Project Foundation and the Demo Specification before changing the application.

The completed one-round demo is ready to present. Expansion into the larger Market Empire product is separate future work.
