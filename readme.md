
## data-js-pack
Is a library that can generate minecraft datapacks based on the declarative js code.

**It is not a js->datapack compiler.**
**It is a js framework that can compile the datapack based on methods and objects you used.**

You can use all js features but keep in mind that They'll work only
at compile time. It can be usefull in some situations such as storing a const value in an accessible way. However mutability can be achieved only by using built-in methods such as `function.use.defineScore( 5, 'score-name')`

## Installation && Setup
1. Inside of your `datapacks` folder, create a new directory
1. Run `npm init -y`
1. Add Typescript to the project
1. Import data-js-pack by typing: `npm install data-js-pack`
1. Create a file: `src/index.ts`


## Creating an empty datapack
Copy and paste this code into your `src/index.ts` file:
```typescript
import Datapack from 'data-js-pack';

const firstDatapack = new Datapack({
  format: 9,
  name: 'first-datapack',
  creator: 'your name here',
  description: 'your description here',
}, []);

//In order to compile the datapack you need to use the compile() method

firstDatapack.compile();

```

The code above should create a `first-datapack` directory inside of your `datapacks` folder along with the pack.mcmeta file and some additional files that are needed for the data-js-pack to work.

## Creating a function
```ts
import Datapack, { Namespace, Module, FunctionCompiler } from 'data-js-pack';

const firstFunction = new FunctionCompiler('your_first_function', []);

const score = firstFunction.use.defineScore(5, 'my-score');
//logging score to the mc chat
firstFunction.use.run( 'My first score is: ' );


const firstModule = new Module('first_module', [ firstFunction ]);

const mainNampespace = new Namespace('main', [ firstModule ]);

const firstDatapack = new Datapack({
  format: 9,
  name: 'first-datapack',
  creator: 'your name here',
  description: 'your description here',
}, [ mainNamespace ]);

//In order to compile the datapack you need to use the compile() method

firstDatapack.compile();
```

Then you should be able to run the follwoing command on the chat:
`/function main:first_module/your-first-function`
The expected result is:
`My first score is: 5`.

There are more methods inside of the `use` namespace.
Check them out!
