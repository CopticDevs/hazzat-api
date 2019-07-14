Get-ChildItem -Path $env:OUTPUT_ROOT\src -Recurse

Compress-Archive -Path $env:OUTPUT_ROOT\dist\*, $env:ENLISTMENT_ROOT\src\node_modules, $env:ENLISTMENT_ROOT\src\Web.config, $env:ENLISTMENT_ROOT\src\Web.Debug.config -CompressionLevel Optimal -DestinationPath $env:ARCHIVE_FILE_PATH
