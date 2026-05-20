# Effective Unit Testing in Java

Slide deck and reference material for establishing senior-team standards for effective unit testing, test smells, and code review in Java.

## Purpose

This repository contains a presentation intended to help senior engineering teams improve how they write and review unit tests.

The focus is not on increasing coverage for its own sake. The goal is to create a shared standard for tests that:

- protect business behavior and contracts
- produce trustworthy feedback in CI
- remain stable through harmless refactoring
- improve design by exposing poor seams and mixed responsibilities
- support consistent, rigorous code reviews

## Audience

This material is aimed at experienced software engineers and reviewers who already write tests, but want a clearer and more disciplined standard for what good unit testing looks like in practice.

## Content Overview

The deck is principle-first and uses Java examples.

It covers:

- why senior teams pay a real cost for low-quality tests
- what unit tests should and should not protect
- readability, AAA, and tests as living documentation
- common test smells such as brittle tests, over-mocking, weak assertions, assertion roulette, logic in tests, and bloated setup
- fixture strategy and test data builders
- mocking rules and partial mocking
- design feedback from tests
- a code review checklist and a team-level definition of done
- further reading for test smells and refactoring references

## Project Structure

- [index.html](index.html): presentation shell
- [script.js](script.js): slide loader and deck navigation
- [styles.css](styles.css): presentation styling
- [content](content): slide content files and manifest

## Running Locally

Open [index.html](index.html) in your local browser.

## How To Use This Repository

Use this repository as:

- a presentation for a team discussion or internal tech talk
- a shared reference when writing new tests
- a review aid when evaluating pull requests
- a starting point for defining team testing standards

## Notes

The content is intentionally opinionated. It is optimized for teams that want higher-signal tests, more credible CI, and stronger review discipline rather than more testing ceremony.
