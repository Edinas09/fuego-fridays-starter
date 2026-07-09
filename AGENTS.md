# AGENTS.md

Guidance for AI coding agents working in this repo.

## What this is

Fuego Fridays starter: a front-end-only React app for building "humorphic"
AI-teammate interactions. There is no backend and no real model. The goal is the
UI/UX of how an AI teammate collaborates with a human. `src/App.tsx` is a landing
screen that is meant to be replaced with the build.

## The challenge

Pick one humorphic interaction pattern and build it into an experience that's
relevant to the builder, personally or at work. The humorphism foundations are:
Notice, Align, Delegate, Execute, Decide, Communicate, Coach, Verify, Consent,
and Escalate. See [humorphism.com/foundations](https://humorphism.com/foundations)
for examples.

## Run it

- `npm install`
- `npm run dev` (serves on http://localhost:3000)
- `npm run build` (runs `tsc --noEmit`, then `vite build`)

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui (new-york), Framer Motion.

## Layout

- `src/components/ui`: stock shadcn/ui primitives and the chat kit (message,
  message-scroller, bubble, attachment, marker)
- `src/data`: mock data (tasks, messages, documents, calendar)
- `src/App.tsx`: the landing screen to replace
- `src/index.css`: Tailwind v4 theme tokens

## Conventions

- No backend. Mock or simulate AI with `setTimeout`, hardcoded sequences, or the
  mock data. The UX is the deliverable.
- Creating custom components is fine, but prefer the shadcn/ui primitives where
  they fit, especially the chat kit for chat or agent surfaces, instead of
  rebuilding them from scratch.
- Add more shadcn components with `npx shadcn@latest add <name>`.
- Keep it front-end only. Don't introduce a backend or a different UI library.
