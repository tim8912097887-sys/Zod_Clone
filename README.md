# Zod_Clone

## Description

A lightweight, type-safe schema declaration and validation library built from the ground up to explore TypeScript's type inference and recursive validation patterns.

# Key Features

- Zero Dependencies: Build entirely in TypeScript.
- Static Type Inference: Extract type information from schema using the `Infer<typeof schema>`.
- TDD Driven Development: 100% test coverage using Vitest to ensure runtime reliability.
- Composible: Nest object and array types to create complex schemas.
- Easy to Use: Simple and intuitive API for declaring and validating schemas.

# Get your own copy

```bash
pnpm clone https://github.com/kevinzli/zod_clone.git

pnpm install
```

# Usage

```ts
import { z } from 'zod_clone';

const schema = z.object({
    name: z.string(),
    age: z.number(),
});

const data = {
    name: 'John Doe',
    age: 30,
};

const result = schema.safeParse(data);

if (result.success) {
    console.log(result.data);
} else {
    console.error(result.error);
}
```
