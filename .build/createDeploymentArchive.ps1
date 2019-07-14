Get-ChildItem -Path $env:ENLISTMENT_ROOT -Recurse
Compress-Archive -Path $env:ENLISTMENT_ROOT\src\dist\*, $env:ENLISTMENT_ROOT\src\node_modules, $env:ENLISTMENT_ROOT\src\Web.config, $env:ENLISTMENT_ROOT\src\Web.Debug.config -CompressionLevel Optimal -DestinationPath $env:ARCHIVE_FILE_PATH
