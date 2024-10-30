# ts-bitpin

[Bitpin](https://bitpin.ir/) is an Iranian cryptocurrency exchange that allows users to buy and sell cryptocurrencies
using Iranian Rial (IRR).

The purpose of this project is to provide a TypeScript client for the Bitpin API.

**This project is provided as is and is not affiliated with Bitpin in any way and is not an official Bitpin project.**

## Installation

### NPM

```bash
npm install ts-bitpin
```

### Yarn

```bash
yarn add ts-bitpin
```

### From Source

```bash
git clone https://github.com/amiwrpremium/ts-bitpin.git
cd ts-bitpin
npm install # or yarn
```

## Usage

### Import

```typescript
import { Client } from 'ts-bitpin';
```

### Create a Client

#### Simple

```typescript
const client = new Client();
```

#### With Options

```typescript
const client = new Client({
  apiKey: 'YOUR_API_KEY',
  secretKey: 'YOUR_SECRET_KEY',
});
```

#### Async factory

```typescript
const client = await Client.Create({
  apiKey: 'YOUR_API_KEY',
  secretKey: 'YOUR_SECRET_KEY',
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This project is provided as is and is not affiliated with Bitpin in any way and is not an official Bitpin project.

## Documentation

The documentation for this project can be found [here](https://amiwrpremium.github.io/ts-bitpin/).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see
the [tags on this repository](https://github.com/amiwrpremium/ts-bitpin/tags).

## Changelog

The changelog for this project can be found [here](CHANGELOG.md).

