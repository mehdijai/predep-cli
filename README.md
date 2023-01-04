# PreDep CLI

Pre-deployment CLI, is software that help you transfer you files from working directory a pre-deployment directory, then deploy is through SFTP.

# Commands

## - Transfer
Transfer the files, ignoring the mentioned patters.

```shell
predep-cli transfer <destination> [ignorePatterns]
```

`<destination>`: Destination directory. if not set, it will transfer the current directory (CWD|CD).

`[ignorePatterns]`: (optional) the path to Ignore Patterns file, to override the default one.

## - Deploy

> NOT YET DEVELOPED