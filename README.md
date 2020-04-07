[svelte]: https://svelte.dev/

Front-end created using [Svelte][svelte].

### Folder structure

* `src/components/*`: Contains re-usable components that don't interact with any API(s).

* `src/routes/*`: Contains pages the pages of our app. They usually take care of calling the API(s) and using generic components.

* `src/stores/*`: Stores of our app.

* `src/*`: Contains main app setup and other utility libraries.

### Setup

Install npm dependencies:

```
npm install
```

Run project:

```
npm run dev
```

**Make sure** you have the backend HTTP server running.

