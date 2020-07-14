# v21-geckos-team-03 <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [✅ Project Information](#-project-information)
  - [About](#about)
  - [MVP Definition](#mvp-definition)
  - [User Stories](#user-stories)
    - [MVP](#mvp)
    - [Mid-tier](#mid-tier)
    - [Stretch](#stretch)
  - [Tech Stack](#tech-stack)
  - [Design Mockup](#design-mockup)
- [🔀 Git Strategy](#-git-strategy)
  - [Pull Requests & Merging](#pull-requests--merging)
    - [Development Branch](#development-branch)
    - [Master Branch](#master-branch)
- [🚀 Development Workflow](#-development-workflow)
  - [Get Started Developing](#get-started-developing)
  - [Commit Messages](#commit-messages)
  - [Pushing Changes](#pushing-changes)
- [💅 Code Style Guide](#-code-style-guide)
  - [Formatting related scripts](#formatting-related-scripts)
  - [Pre-commit style check](#pre-commit-style-check)

## ✅ Project Information

### About

An app that allows the user to browse through a list of movies and create custom watch lists.

### MVP Definition

Users will be able to search through a library of movies and save movies to a private watch list.

### User Stories

#### MVP

- [ ] As **User**, I want to **be able to search for movies and get back the results**.

- [ ] As a **User**, I want to **be able to filter movie results by genre and year** so that **I can find movies that fit my criteria**.

- [ ] As a **User**, I want to **be able to save my liked movies to a watch list** so that **I can view them whenever I want**.

- [ ] As a **User**, I want to **store my watch list** so that **I can look at my watch list whenever I want**.

- [ ] As a **User**, I want to **remove movies from my watch list** so that **I can keep my watch list relevant**.

- [ ] As a **User**, I want to **be able to add movies to my list while searching** so that **I don't have to leave the page/stop scrolling through options**.

#### Mid-tier

- [ ] As a **User**, I want to **tag my movies** so that **I can search movies based on their genre and the main actors in them**.

- [ ] As a **User**, I want to **rate the movies I save** so that **I can filter movies by my own ratings**.

- [ ] As a **User**, I want to **be able to see reviews on a movie** so that **I can get a better understanding of the movie before watching it my self**.

- [ ] As a **User**, I want to **be able to create my own lists with their own names** so that **I can customize my movie organization. (Eg, 'to watch' and 'sci-fi movie night' and 'sad foreign films for when i'm feeling ennui')**

#### Stretch

- [ ] As a **User**, I want to be able to watch the trailer of the movie so i can see determine if its a movie i would invest my time into watching.

- [ ] As a **User**, I want to **be able to choose 'stay logged in'** so that **I can access my account easily on my own computer or be logged out on someone elses**.

- [ ] As a **User**, I want to **be able to switch between light and dark themes** so that **I can comfortably see my movies under most lighting conditions**.

### Tech Stack

- React
- Firebase (auth, database, hosting)
- Styled Components

### Design Mockup

Wireframes for the project can be viewed on [Sketch Cloud](https://www.sketch.com/s/7a10fe15-79a3-4bad-ac7c-a94f32a47494).

## 🔀 Git Strategy

### Pull Requests & Merging

- All Pull Requests and code merging will take place in the project's Github repo.
- To reduce merge conflicts, the destination branch should be pulled into the merging branch prior to opening a pull request.
- To test changes and review a PR locally before approving it, [read modifying an active pull request locally](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/checking-out-pull-requests-locally#modifying-an-active-pull-request-locally). For the purposes of testing, just use the commands in "Step 1" which brings the PR local. After testing, you can go back to Github and approve or comment on the PR.

#### Development Branch

- Working branches will be merged into the development branch during weekly development.
- At least one team member other than the requester must review and approve a request before it can be merged.
- After the merge has been approved, the requester will perform the merge on Github and delete the merged branch from the repository upon a successful merge.
- If any merge conflicts occur, the requester must work with the author of the conflicting code to resolve them and re-submit the PR for approval.

#### Master Branch

- A PR to merge to the master should reflect the goals of the prior week's sprint and produce an updated MVP. This PR will typically take place following the weekly sprint meeting.
- All team members must approve a request for merging into the master branch.

## 🚀 Development Workflow

A three-level hierarchy of branches is used, through which changes are promoted.

- **Working branches:** Individual branches created by each developer when they are working on changes and bug fixes. The type can be one of these types:

  - **feature:** a new feature
  - **fix:** a bug fix
  - **docs:** changes to documentation
  - **style:** formatting, missing semi colons, etc; no code change
  - **refactor:** refactoring production code
  - **test:** adding tests, refactoring test; no production code change
  - **chore:** updating build tasks, package manager configs, etc; no production code change
    basic types of branches:

- **Development:** Reflects the code for the next release. Developers work in working branches, which are then pulled into this branch. All code pulled into this branch must be tested and undergo peer review as part of the PR process.
- **Master:** Only updated from the development branch Pull Requests. This branch always reflects the current production release that is seen by live users.

### Get Started Developing

1. Clone the repo to your local computer.

   **Note**: this should be the only time you will be on the master branch locally, so immediately get to step #2 after cloning.

   ```text
   git clone https://github.com/chingu-voyages/v21-geckos-team-03 <custom-folder-name>
   ```

2. Checkout the development branch.

   ```text
     git checkout development
   ```

3. Create a working branch for a specific feature or task in the backlog (like bug fixes).

   ```text
   git checkout -b feature/course-review
   ```

4. Update project dependencies.

   ```text
     npm install
   ```

5. To set up linting and code formatting (VS Code)

   - Install Babel plugin
   - Install Prettier plugin
   - Install ESLint plugin

6. Start the development server

   ```text
     npm run start
   ```

7. Work and make commits on local feature branch.

### Commit Messages

All normal development activities occur on team members' individual computers. Commits should be frequent and each commit should have a discrete, atomic purpose.

The layout looks like this:

```text
type: subject
```

- The type is contained within the title and should be consistent with the working branches' type e.g **feature**, **bug** etc.

- Subjects should be no greater than 50 characters, should begin with a capital letter and do not end with a period. Use an imperative tone to describe what a commit does, rather than what it did. For example, use change; not changed or changes.

  ```text
  feat: Summarize changes in around 50 characters or less
  ```

### Pushing Changes

1. **Changes should be frequently pushed to the matching working branch on GitHub.** This ensures that if a computer is lost, stolen, or malfunctions, your work will still be available to the rest of your team. **Before every single push, the development branch needs to be pulled to make sure there is no conflict. If there is, conflicts should be resolved before the code is pushed to the matching working branch on GitHub.**

   ```text
   // we start from branch fix/my-branch
    git checkout development
    git pull origin development
    git checkout fix/my-branch
    git merge development

   // Then
   git push origin <working-branch>
   ```

2. Once a feature has been unit tested, a Pull Request (PR) should be created to fold it into the development branch. It's always a good idea to require that PR's be reviewed by another member of the team. This helps to ensure that the quality of the app is maintained.

3. When a group of features are ready to be promoted to Production, they should be thoroughly tested together. Then, a Pull Request should be created in order to move them into the master branch which reflects the code base that's in Production or soon to be promoted to Production.

4. Once the PR to the master branch has been completed, you are then ready to release its contents into your Production runtime environment.

![The Workflow](https://github.com/Chingu-cohorts/voyage-wiki/raw/development/images/Git%20Workflow.png)

## 💅 Code Style Guide

This project uses a Prettier configuration file for code style and follows the [Airbnb Style Guide](https://github.com/airbnb/javascript) for Javascript formatting.

### Formatting related scripts

```text
 npm run format // formats with Prettier
 npm run lint // lints with ESLint
 npm run lint:fix // lints and attempts to fix automatically
```

### Pre-commit style check

To prevent unformatted code from being checked in to source control a Husky hook will `npm run format` and `npm run lint:fix` after entering a commit message. Any errors found will need to be resolved before the commit will be accepted.

**Note**: thanks to the lint-staged package (and accompanying script), only changes that are staged in your current commit are checked against formatting and linting rules. This is so no ones commit is blocked for unformatted code you didn't write that may have slipped past linters in prior commits.
