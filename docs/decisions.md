# Project Decisions Log

This file records important architectural, design, and implementation decisions for the Task Tracker project. The goal is to make the reasoning behind changes explicit for future reference, portfolio review, or interviews.

## 2026-06-28: Add ability to mark tasks as complete

**Context**
- The Task model already included a `completed: Boolean` field (default: false) with timestamps.
- The UI and API only supported adding and listing tasks. There was no way to indicate completion.
- This was one of the most basic "real task app" features missing, making the current version feel incomplete for demonstration purposes.

**Decision**
- Implement a "toggle complete" feature using a checkbox in the task list.
- Use a PATCH /tasks/:id endpoint to update only the `completed` field.
- Apply optimistic UI updates on the frontend for better perceived performance, with rollback on failure.

**Rationale / Tradeoffs**
- PATCH was chosen over PUT because we only need to update one field (partial update is more appropriate and efficient).
- Optimistic update improves UX on slow connections (common with free-tier backends), but requires explicit error handling and state reversion.
- Kept the change minimal: no new routes for "complete/uncomplete" separately; the toggle is handled client-side and sent as the new state.
- Id handling: MongoDB uses `_id`, but frontend code was using `id`. Added normalization (`_id || id`) to avoid breakage while keeping backward compatibility.
- This feature demonstrates full-stack coordination (model was ready, backend + API + UI needed wiring) without over-engineering.

**Consequences**
- Backend now supports updating task completion status.
- Frontend visually reflects completed state (strikethrough + muted color) and allows toggling.
- Error states are handled (revert optimistic change and show alert).
- The live demo will require backend and frontend redeploy to reflect the change (due to free-tier hosting).

**Files Changed**
- `server/index.js`: Added PATCH /tasks/:id handler.
- `src/api.js`: Added `toggleTask(id, completed)` helper.
- `src/App.jsx`: Added checkbox UI, `handleToggle`, optimistic state management, completed styling, and id normalization.

**Alternatives Considered**
- Full "edit task" modal (bigger scope, deferred to later).
- Separate complete/uncomplete endpoints (unnecessary complexity).
- Server-driven refetch on every toggle instead of optimistic (would feel slower).

---

## Previous Decisions

(See README.md for earlier status and architecture notes, and AGENTS.md for ongoing project guidelines.)

## 2026-06-28: Added inline code comments and created decisions log

**Context**
- After implementing the task completion feature, we wanted better traceability for future maintenance and portfolio review.

**Decision**
- Create `docs/decisions.md` as a lightweight running log of significant decisions.
- Add explanatory comments in the changed source files (especially non-obvious logic like optimistic updates and _id/id normalization).

**Rationale**
- Helps the author (and future readers) remember *why* things were done a certain way.
- Supports the goal of being able to clearly explain engineering decisions.

**Files Affected**
- `docs/decisions.md` (new)
- `server/index.js`, `src/api.js`, `src/App.jsx` (added comments)
