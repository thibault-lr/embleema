# Embleema

Technical test for Embleema


## Getting started

### Prerequisites

- Node.js 20
- Yarn 4
- Docker

### Installation

Clone the project

```bash
git clone https://github.com/thibault-lr/embleema
```

Go to the project directory

```
cd embleema
```

Install dependencies

```shell
yarn install --immutable
```


### Project structure

```tree
packages
├── api                      # API applications
├── eslint-config-embleema   # Shared ESLint config
├── webapp                   # Patient front application
``` 


### Tooling 

#### Git hooks 

The hooks are located in the `.husky` folder : 

`git commit` will ensures that the linting pass.
`git push` will ensures that the build pass.