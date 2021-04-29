# Lerna Audit action

**This project is no longer maintained. Using npm@7 workspaces is recommended as it makes this action unnecessary.**

GitHub Action to run NPM audit on Lerna monorepo

Implements https://github.com/lerna/lerna/issues/1663#issuecomment-559010254 since there is currently no `lerna audit` command.

## Inputs

### `include-root`

Specifies whether the root level of the project should be included as a package to be audited.

Default: `true`

### `npm-audit-args`

Arguments that are passed on to the NPM audit command. See [NPM docs](https://docs.npmjs.com/cli/audit) for a list of supported arguments.

## Outputs

None

## Example usage

```yaml
uses: t1m0thyj/lerna-audit@master
with:
  npm-audit-args: --production --audit-level=moderate
```
