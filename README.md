Cole Rieger (cole.rieger743@gmail.com)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# myshoku

> MyShoku was created as to give quick and simple information, including geolocation, regarding eateries in the local area, either based around the Cognet Lab home office or the user's own location.


## Basic routes

Currently only the base link to the home page

| View          | Pattern                                                   | Link                                                |
| ------------- | --------------------------------------------------------- | --------------------------------------------------- |
| SpashScreen   | `/home/`                                                  | http://localhost:{port}/home                        |


## Development

### Prerequisites

Please install at least NodeJS v20. If changing Node versions seems like a hassle, consider using a version manager, like 
NVM (MacOS) (https://github.com/nvm-sh/nvm) 
or 
NVM-Windows (https://github.com/coreybutler/nvm-windows)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Hot-Reload for Development with server API mocking

(TODO)

```sh
npm run dev:mock
```

### Run Unit Tests with [Vitest](https://vitest.dev/)
(TODO)
```sh
npm run test
```


### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Git, Commits & Changelog

Git commits are based on [Conventional Commits](https://www.conventionalcommits.org/) to be used as changelog.

```
<type>[optional task ID]: <description>

[optional body]

[optional footer(s)]
```

- Type: `feat` | `fix` | `refactor` | `docs` | `chore` |...
- JIRA ID: `myshoku-○○○○○`
- Description: `Commit message`
- Body: `Commit description`

### Examples

#### Adding a feature

```
feat(myshoku-1234): add new nav buttons

- Added lang change button
```

#### Fixing an issue

```
fix(myshoku-12345): fixed translation code typo
```

## Project structure

The project structure is inspired by the [vertical slice architecture](https://ddd-practitioners.com/home/glossary/vertical-slice-architecture). The project parts are organized into `framework` - shared code and `modules` - features or parts of the application.

```
./src
├── __tests__         # Unit and acceptance tests (TODO)
├── assets            # Project assets
├── mocks             # API (REST & GraphQL) mocks via MSW  (TODO)
├── <page name>       # per Nextjs' new App-Router model (https://nextjs.org/docs/app)
    ├── home          # main restaurant search
    └── ...           # etc.
├── stories           # Storybook folder (TODO)
├── layout.tsx        # Main component of the React/Next application
```

## React UI components

This project forgoes any UI libraries because of the small size. Based on Google's Material Design philosophies (https://m3.material.io). 

(TODO) 
Stories usually live next to components.
The project components can be previewed and expored by using [Storybook](https://storybook.js.org/).

### Storybook commands

#### Run Storybook during development on [http://localhost:6006/](http://localhost:6006/)

```sh
npm run storybook
```

#### Build Storybook (e.g. for deployment)

```sh
npm run build-storybook
```

## Backend

None currently as all data is encompassed in the 3rd-party Foursquare API's (https://foursquare.com)

## Testing
(TODO)
This project uses [Vitest](https://vitest.dev/) in combination with [React Testing Library](https://testing-library.com/) for **unit and component tests** as well as **integration** or **acceptance tests**.

[Vitest](https://vitest.dev/) is Vite-native test framework that's also very fast. Vitest can also be used in combination with [Testing Library](https://testing-library.com/) for [React](https://nextjs.org/docs/app/building-your-application/testing).

[Testing Library](https://testing-library.com/) is a simple and complete testing utility that encourage good testing practices and can be used across most JavaScript frontend frameworks. 

### Access HTML elements in the tests

The best practive to access the HTML elements for a test is using a `data-testid` property.
Please use the following pattern to name the test ids: `module-componentOrView-htmltype-labelOrAction`.

#### Examples

- `data-testid="dashboard-profile-link-logout"`: `Logout` action with a `link` HTML element in the `profile` component for the `dashboard` module.
- `data-testid="framework-base-input-label`: `Label` for a `base` component `input` HTML element in the `framework` module.

#### Commands:

- `npm run test` or `npm run test:unit` - Starts the unit tests and watches the changes

## Technical Considerations

### NextJS:

NextJS (https://nextjs.org/), with Typescript, was chosen as an attempt to both become more familiar with a popular React flavor, as well as for its routing (if the project is expanded on later) and strong documentation. 

### Tailwind:

Tailwind (https://tailwindcss.com/), a CSS framework, while likely not entirely encessary for a project of this size, was also used for the sake of testing it in a real project. Additionally, it was used to help enforce styling standards throughout the app.

### Leaflet:

Leaflet (https://leafletjs.com/), an open-source map Javascript library, was used conjunction with React Leaflet (https://react-leaflet.js.org/) for map rendinger.
Aside from the wide support of the library, it being open source was criticaly helpful due to this being mostly a free project.

### Foursquare

As a slghtly cheaper alternitive to Google's API's, while still providing relatively good information, this app makes heavy use of Foursquare's  place API (https://docs.foursquare.com/developer/reference/place-search).


## TODO's

Due to the time constraints of the project, there are still several things that should/would be nice to do

1. Implement Vitest/Testing Library. 
While testing was planned, there was no chance to implement it. Additionally, a heavy amount of component clean-up can still be done, which would heavily benefit testing later.

2. Better organize and narrow the scope of components and subcomponents. 
There is still a fair amount of condensing that could be done in the existing components, as well creating additional [Base] components for use across the project and in potential new features.

3. Add additional features.
While searching works fairly well and also allows some freedom on location, functionality could be added. E.g.
  a. Expanding the usage of Foursquare's API's, especially the user-based and crowd-sourcing functionality
  b. Adding some form of coupon tie-in to give users more choice insentives and rewards
  c. Add some form of monetization, e.g. via (transparent) result weighting

4. Bugs
While the project generally seems to work well without much issue or visual oddity, there are still some things related to Tailwind and React/NextJS that I don't sem to udnerstand, but would like to work through (tailwind styles applying unevenly to components in 3rd-level subdirectories, env variables not being picked up properly)

5. Improve UI/UX
At the least, adding animations would make the app feel much more engaging and elss robotic. These were originally planned, but ultimately had to be bypassed for now.