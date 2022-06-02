
## data-js-pack
Is a library that can generate minecraft datapacks from

### Usage
1. Inside of your `datapacks` folder, create a new directory
1. Run `npm init -y`
1. Add Typescript to the project
1. Import data-js-pack by typing: `npm install data-js-pack`
1. Create a file: `src/index.ts`

### How to create an empty datapack
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

### Creating a function
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