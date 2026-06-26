# odevs-front

The frontend for next, open source, **odevs** website — a Next.js application that displays and surfaces community events through views including List, Calendar, Search, and Recommendations.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v24.18.0 (use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use`)
- [npm](https://www.npmjs.com/) v10+

### Installation

```bash
git clone https://github.com/erodriiguezz/odevs-front.git
cd odevs-front
npm install
```

### Running the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

### 1. Pick an issue

- Browse [open issues](../../issues) before starting work.
- If something isn't tracked yet, open an issue first and wait for a maintainer to confirm scope before writing code.
- Leave a comment on the issue to signal you're picking it up.

### 2. Create a branch from the issue

Use GitHub's **"Create a branch"** button under the **Development** section on the issue page. This automatically names and links the branch to the issue.

![Create branch from issue](https://docs.github.com/assets/cb-23065/mw-1440/images/help/issues/create-branch.webp)

The generated branch name will follow the pattern `<issue-number>-<slug>` (e.g. `42-add-calendar-view`). Use it as-is — don't rename it.

### 3. Make your changes

- Keep commits small and focused — one logical change per commit.
- Run `npm run lint` and `npm run build` locally before pushing.

### 4. Commit message format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary>

[optional body]

[optional footer: Closes #<issue-number>]
```

**Types:**

| Type       | Use for                              |
| ---------- | ------------------------------------ |
| `feat`     | New feature or UI addition           |
| `fix`      | Bug fix                              |
| `docs`     | Documentation only                   |
| `refactor` | Code change with no behavior change  |
| `chore`    | Tooling, dependencies, config        |
| `test`     | Adding or updating tests             |
| `perf`     | Performance improvements             |
| `style`    | Formatting, missing semicolons, etc. |

**Examples:**

```
feat: add calendar view page

Closes #12
```

```
fix: correct event date parsing for multi-day events

Closes #34
```

```
chore: upgrade Next.js to 15.2
```

> **Rules:**
>
> - Use imperative mood — "add feature" not "added feature"
> - Keep the first line under 72 characters
> - Always include `Closes #<n>` when the commit resolves an issue

### 5. Open a Pull Request

- Open your PR against `main`.
- Title must follow the same Conventional Commits format as your commits.
- In the PR description, explain what changed, why, and how to test it.
- Include `Closes #<issue-number>` in the body — GitHub will auto-close the issue on merge.
- **Assign at least one reviewer before requesting review.** PRs without an assigned reviewer will not be merged.

### 6. After review

- Address feedback with new commits — do not force-push while a review is in progress.
- Once approved, a maintainer will squash-merge into `main`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
