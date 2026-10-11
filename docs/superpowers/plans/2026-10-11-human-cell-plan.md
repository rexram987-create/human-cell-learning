# Human Cell Learning PWA — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for native execution, or superpowers:subagent-driven-development if the user chooses delegation. Track steps with checkboxes.

**Goal:** Build the approved Hebrew educational PWA about human cells, with separate pages, interactive learning, verified sources, and GitHub/Vercel delivery.

**Architecture:** A static React application routes content from typed local data. Interactive diagrams, lessons and quizzes share stable content IDs. A service worker provides a verified offline learning bundle; progress stays on the device.

**Tech Stack:** React, TypeScript, Vite, React Router, Vitest, Testing Library; browser end-to-end tests when the available browser environment supports them. Select current compatible stable dependency versions and retain a lockfile.

**Spec:** `docs/superpowers/specs/2026-10-11-human-cell-design.md`

## Global Constraints
- Hebrew, right-to-left, plain-language summaries and opt-in “להעמקה”.
- Separate category and detail pages; no sticky header.
- GitHub source repository and Vercel deployment; default private repository when supported.
- Wikipedia plus actual verification in open scientific sources; no OpenEvidence verification claims without actual access.
- At least 20 original questions and 25 glossary terms.
- Individual image license checks, attribution and local assets; schematic diagrams labeled as such.
- No server database, registration, API keys or live AI integration.
- Local progress, text size and color preferences; keyboard and touch support without required dragging.
- Manifest, PNG icons 192/512, safe icon padding, explicit offline readiness and noninterrupting updates.

## Review Focus
1. Direct detail-page URLs and refresh must preserve the route on Vercel (Task 2).
2. Corrupt or unavailable local storage must not prevent learning or pretend to persist progress (Task 4).
3. A failed offline asset fetch must not show “ready offline” (Task 5).
4. Reduced motion and keyboard-only operation must retain usable interactions (Task 3).
5. An unknown route or removed content ID must offer recovery rather than a blank page (Task 2).

## File Map
- `src/content/types.ts`, `sources.ts`, `categories.ts`, `organelles.ts`, `processes.ts`, `cell-types.ts`, `glossary.ts`, `questions.ts`, `assets.ts`: typed content and provenance.
- `src/App.tsx`, `src/main.tsx`, `src/components/Layout.tsx`, `LessonContent.tsx`, `SourceList.tsx`: application shell and shared reading components.
- `src/pages/Home.tsx`, `Category.tsx`, `Lesson.tsx`, `Glossary.tsx`, `Practice.tsx`, `Sources.tsx`, `Settings.tsx`, `NotFound.tsx`: distinct routed experiences.
- `src/features/cell/CellExplorer.tsx`, `src/features/process/ProcessPlayer.tsx`: interactive exploration.
- `src/features/quiz/quiz.ts`, `Quiz.tsx`, `MatchExercise.tsx`: learning exercises.
- `src/features/preferences/storage.ts`, `PreferencesProvider.tsx`: device-local state.
- `src/pwa/client.ts`, `src/pwa/InstallPanel.tsx`, `public/sw.js`, `public/manifest.webmanifest`, `scripts/generate-offline-list.mjs`: offline/install lifecycle.
- `src/styles.css`, `public/images/`, `public/icons/`, `vercel.json`, `README.md`, `ATTRIBUTION.md`: presentation, assets and publishing configuration.
- `tests/content.test.ts`, `routes.test.tsx`, `interactions.test.tsx`, `storage.test.ts`, `quiz.test.ts`, `offline.test.ts`, `e2e/learning.spec.ts`: focused regression coverage.

## Task 1: Source-backed content and licensed assets
**Files:** Content files, `public/images/`, `ATTRIBUTION.md`, `package.json`, `tsconfig.json`, `vite.config.ts`, `tests/content.test.ts`.

**Interfaces:** Export `Lesson = {id:string; categoryId:string; title:string; summary:string; simple:string[]; deeper:string[]; imageIds:string[]; sourceIds:string[]; verifiedAt:string; relatedIds:string[]}`; `Source = {id:string; title:string; url:string; checkedAt:string; revisionUrl?:string}`; `Asset = {id:string; path:string; creator:string; sourceUrl:string; license:string; licenseUrl:string; changes:string; alt:string}`. Export `lessons:Lesson[]`, `sources:Source[]`, `assets:Asset[]`, `categories:{id:string;title:string;description:string}[]`, `glossary:{id:string;term:string;definition:string;lessonId:string}[]`.

- [ ] Write content validation tests: unique IDs, resolvable categories/related/source/image references, at least 25 glossary items, nonempty simple/deeper explanations, valid ISO checked dates, complete image credits.
- [ ] Run `npm test -- tests/content.test.ts` and record the expected failure before populating content.
- [ ] Set up Vite/React/TypeScript and test dependencies with lockfile. Read sources for the approved 10 organelles, 5 processes, 9 cell types and introductory lessons. Record actual source dates and Wikipedia revision links. Cross-check numeric and exception claims against primary institutional/scientific sources.
- [ ] Download relevant Servier/Commons images only after individual license verification; record changes for any translated or adapted image. Populate content in original plain Hebrew and write credits, including applicable Wikipedia attribution/share-alike requirements. No fabricated source references.
- [ ] Run content validation and `npx tsc --noEmit`; commit this independently reviewable content deliverable.

## Task 2: Separate pages and accessible reading
**Files:** App entry points, shared reading components, routed pages except exercises/settings, styles, `vercel.json`, `tests/routes.test.tsx`.

**Interfaces:** `findLesson(id:string):Lesson|undefined`; `LessonContent({lesson}:{lesson:Lesson})`; `SourceList({sourceIds}:{sourceIds:string[]})`. Routes: `/`, `/category/:categoryId`, `/lesson/:lessonId`, `/explore`, `/practice`, `/glossary`, `/sources`, `/settings`, catch-all.

- [ ] Write route tests that open a known lesson directly, expand “להעמקה”, navigate to its category, and render a recovery link for unknown category/lesson IDs and unknown paths.
- [ ] Run `npm test -- tests/routes.test.tsx`; confirm meaningful failures before implementation.
- [ ] Implement route shell, breadcrumbs, nonsticky header, navigation menu, home with guided start and category cards, category lists, complete lesson reading, glossary search and source/credit pages. Apply RTL styles, visible focus, generous touch targets, responsive layout and no color-only meaning.
- [ ] Configure Vercel SPA fallback while serving existing static files normally. Verify direct URLs and refresh on the deployed app during Task 6.
- [ ] Run route tests and TypeScript check; commit the reading experience.

## Task 3: Cell exploration and process animations
**Files:** `CellExplorer.tsx`, `ProcessPlayer.tsx`, process display in `Lesson.tsx`, `tests/interactions.test.tsx`.

**Interfaces:** `CellExplorer({onSelect}:{onSelect?:(lessonId:string)=>void})`; `ProcessPlayer({processId}:{processId:string})`. Organelles use the lesson IDs from Task 1. Process step descriptions and associated source IDs live with process content rather than inside the animation code.

- [ ] Write interaction tests: keyboard selection reveals correct organelle title and lesson link; selecting by diagram and by button yields identical content; step-next advances one step; pause stops advancement; reduced-motion mode allows manual stepping.
- [ ] Run `npm test -- tests/interactions.test.tsx`; confirm failures.
- [ ] Build a labeled schematic with selectable organelles and equivalent buttons, visible selection state and accessible descriptions. Use licensed illustrations in lesson content; distinguish the schematic from actual microscopy.
- [ ] Implement process controls with start, pause, next and restart, with no unsolicited autoplay. Use simple accurate stages and respect reduced-motion preferences. Explicitly explain red-cell exceptions, cytosolic glycolysis and limits of generic-cell/division illustrations.
- [ ] Run interaction tests and inspect narrow-screen layout when browser support is available; commit.

## Task 4: Exercises and durable device-local preferences
**Files:** Quiz files, preferences files, Practice/Settings pages, `questions.ts`, `tests/quiz.test.ts`, `tests/storage.test.ts`.

**Interfaces:** `Question = {id:string; lessonId:string; prompt:string; options:string[]; correctIndex:number; explanation:string}`; `gradeAnswer(question:Question,index:number):{correct:boolean;explanation:string}`. `Progress = {version:1;learnedIds:string[];wrongQuestionIds:string[];answers:Record<string,{correct:boolean}>;textScale:number;theme:'light'|'dark'|'system'}`; `loadProgress(storage:Storage|null):{data:Progress;available:boolean}`; `saveProgress(storage:Storage|null,data:Progress):boolean`; `resetProgress(storage:Storage|null):boolean`.

- [ ] Write tests for correct/wrong answers and explanatory feedback; content tests require at least 20 questions with valid option indexes and linked lessons. Add storage tests for refresh round-trip, malformed JSON, unknown saved IDs, denied writes and successful reset.
- [ ] Run quiz/storage/content tests and confirm failures for missing behavior.
- [ ] Implement original questions, organelle identification and click-based matching with keyboard equivalents; track errors for repeat practice. Feedback must include explanation immediately after answering. No timers.
- [ ] Implement versioned, validated local state; provide defaults on corrupt data, tolerate removed IDs, and report storage failure without blocking lessons. Add learned-page toggle, progress display, text size, theme, reset and local-data explanation in settings.
- [ ] Run relevant tests and TypeScript check; commit.

## Task 5: Honest offline readiness and installation
**Files:** PWA files, icon assets, generated offline list, `tests/offline.test.ts`, index metadata.

**Interfaces:** `registerPwa():Promise<void>`; `requestOfflineBundle():Promise<{ready:boolean;error?:string}>`. Worker messages `CACHE_BUNDLE` and `BUNDLE_STATUS`; replies `{type:'BUNDLE_STATUS',ready:boolean,error?:string}`. `offline-assets.json` lists generated build outputs, content assets and icons; build script excludes service worker self-caching and external sources.

- [ ] Write worker/client tests simulating successful bundle caching, an asset returning HTTP 404, offline interruption, old-cache activation, and update waiting while practice remains mounted. Assert failed caching never sets readiness true.
- [ ] Run `npm test -- tests/offline.test.ts` and confirm failures.
- [ ] Add manifest/icons and install UI using the actual install event with instructions otherwise. Build a versioned worker with asset-cache validation, cache cleanup only after successful activation, same-origin page fallback, and external-source network behavior. Confirm every asset response is successful before recording readiness; discard an incomplete new bundle.
- [ ] Show download status, genuine readiness and recoverable failure. Detect waiting updates and apply only when the user chooses, without terminating a current exercise automatically.
- [ ] Build using `npm run build` with postbuild asset inventory generation; run tests. When supported, load online, download bundle, reload lesson/exercise offline and verify sources show internet requirement. Commit.

## Task 6: Integrated verification and GitHub/Vercel delivery
**Files:** `README.md`, `e2e/learning.spec.ts`, hosting configuration if verification discovers a necessary correction.

**Interfaces:** Built `dist/` static output; existing manifest and route contract. GitHub source and Vercel deployment identities are retained once created; never create duplicates on an uncertain response.

- [ ] Add end-to-end flow: home → category → lesson → deeper → learned toggle → practice → explanation → reload preserved state. Include direct route refresh, keyboard organelle selection, narrow viewport and offline reload. Run where browser infrastructure supports it; document unavailable checks instead of claiming they passed.
- [ ] Run `npm test`, `npx tsc --noEmit`, `npm run build`; fix demonstrated failures and rerun affected checks. Review scientific exceptions and all asset credits manually.
- [ ] Use available authenticated GitHub capability to create the repository and push source plus spec/plan. Prefer private visibility; if hosting constraints require a public repository, resolve that visibility requirement explicitly before publishing repository content publicly.
- [ ] Connect the retained GitHub repository to Vercel, using the actual installed connector/CLI capabilities, framework Vite and output `dist`. This project uses Vercel as requested, without creating an alternate Sites-hosted deployment.
- [ ] Verify the returned deployment reaches ready state, then check production home and a direct detail URL if available. Document PWA installation/offline checks completed and any remaining device-only validation.
- [ ] Update README with setup, learning categories, source policy, local storage, offline behavior, credits and verified deployment URL; push final changes and confirm the resulting deployment. Deliver literal GitHub/Vercel links and a concise verification report.

## Self-review
All approved content sections map to Tasks 1–4; accessibility spans Tasks 2–4; licensing/provenance is owned by Task 1; PWA and update behavior by Task 5; GitHub/Vercel by Task 6. Every Review Focus item has a named test in its owning task. Data types and lesson IDs are shared across tasks; product setup belongs to the content deliverable. No task requires automatic OpenEvidence access or background updates.

## Execution handoff
Recommended method: native execution in this session, because page data, selectable organelles and quiz references share the same content model. After user review and method selection, invoke the corresponding execution skill; complete each task and its verification before proceeding.
