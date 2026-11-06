# Prompt Library

Prompt Library is a polished, responsive web app for browsing and copying AI prompts across everyday use cases. It gives users a fast way to discover prompt ideas, filter by category, search by keyword, and copy any prompt into their clipboard with a single click.

The app is built with Next.js App Router, React, TypeScript, Tailwind CSS, and a set of reusable UI primitives styled to match a bold editorial design.

## Overview

This project is essentially a searchable prompt catalog for work, study, research, programming, creativity, and personal productivity. Each card contains:

- A title and short description
- A category label and icon
- The full prompt text
- A copy button for instant reuse

Users can narrow the library by category, use keyboard shortcuts to focus search, and switch between light and dark themes.

## Key features

- Search across prompt titles, descriptions, categories, and embedded keywords
- Filter by category using a desktop sidebar and mobile select menu
- Copy-ready prompt cards with clipboard fallback support
- Light and dark theme support persisted in localStorage
- Skip-to-content accessibility link and keyboard navigation support
- Responsive layout optimized for desktop and mobile browsing
- Built-in category counts to show how many prompts are in each area

## Prompt catalog structure

The application organizes prompts into these categories:

- School & Education
- Work & Productivity
- Programming & Development
- Research & Analysis
- Writing & Communication
- Math & Statistics
- Business & Finance
- Creative Ideas
- Problem Solving
- Personal Productivity

## Design system

The UI is intentionally high-contrast and tactile, using:

- thick borders and shadows for a card-like, paper-and-ink feel
- strong category color accents
- a warm neutral palette with a bright accent highlight
- a compact, readable layout inspired by dashboards and content libraries

The app uses CSS variables for theme switching, plus Tailwind's utility layer for layout and spacing.

## Technology stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React icons
- Radix Slot primitive for button composition
- Custom shadcn-inspired component patterns

## Summary

Prompt Library is a practical, content-driven web app that turns a simple prompt dataset into a useful discovery experience. It is designed for quick browsing, fast copying, and everyday AI task support across a broad set of categories.
