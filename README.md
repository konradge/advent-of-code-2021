# advent-of-code-2021

This is the repository for AoC2021, implemented in **TypeScript**

### Cloning the repository:

```
    git clone https://github.com/konradge/advent-of-code-2021.git
    npm install
    "export default '<your-session-cookie>'" > ./src/cookie.ts
```

You can get the session-cookie by logging in to adventofcode.com, opening the browser's developer-tools > Application > Storage > Cookies > https://adventofcode.com.

### Compiling:

Change the directory to the projects root-directory and type:

```
    tsc
```

### Initialize a new day

```
    npm run init -- <day to initialize>
```

This will initilize a folder for the given day with a

- `index.ts`, where the code will go
- `example`, where the example's input will go
- `input`, where the current day's input is automatically loaded to (should not be edited)
- `test.ts`, where the expected input for both parts for the example and the actual input needs to be given

### Run on example-data:

```
    npm run example -- <day to run>
```

### Run on actual data:

```
    npm start -- <day to run>
```

### Run tests

```
    npm run test -- <day to test>
```
