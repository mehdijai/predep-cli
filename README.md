# PreDep CLI

Pre-deployment CLI, is software that help you transfer you files from working directory a pre-deployment directory, then deploy is through SFTP.

# Commands

## - Transfer
Transfer the files, ignoring the mentioned patters.

```shell
predep-cli transfer <destination> [options]
```

`<destination>`: Destination directory. if not set, it will check if preset is saved.

### Options

`--ignore <path>`: Path of the ignore file.
`--clear-dest`: Remove if exists the destination directory preset.

## Save Preset

Save destination preset. The preset will be used if `transfer <destination>` is not set.

```shell
predep-cli save-dest <path> [options]
```

`path`: The default path to save. If not set, it will save the current directory. However, if `--unset` flag is set, it won't have any effect.

### Options

`--unset`: if the flag is set. The preset will be cleared. This flag has higher priority. Meaning, if it's set, it will ignore saving the path.

## - Save ignore

ignrore file is `.gitignore`-like file. You can attach the file's link with `transfer` command. or, save it as a preset.

```shell
predep-cli save-ignore <path> [options]
```

`path`: The default path to save. if `--unset` flag is set, it won't have any effect.

### Options

`--unset`: if the flag is set. The ignore preset will be cleared. This flag has higher priority. Meaning, if it's set, it will ignore saving the path.

