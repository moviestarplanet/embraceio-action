# EmbraceIO Github Action

* [Usage](#usage)
  * [Workflow](#workflow)
* [License](#license)

## Usage

Install EmbraceIO update cli for GitHub Action

**Options**

`version`: Specify the EmbraceIO version to install. Accepted values are any valid releases such as 5.12.2

### Workflow

```yaml
name: embraceio

on:
  workflow_dispatch:
jobs:
  embraceio:
    runs-on: macos-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install EmbraceIO cli in the runner
        uses: moviestarplanet/embraceio-action@v1

      - name: Embraceio upload debug symbols
        run: embrace-upload --app ${{ secrets.EMBRACE_APP_KEY }} --token ${{ secrets.EMBRACE_API_KEY }} --dsym ${{ env.DSYM_PATH }} --log-level debug
```

## License

MIT. See `LICENSE` for more details.
