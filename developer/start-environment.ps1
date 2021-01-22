$keyvaultName = 'hazzat-api-ppe'
$secretName = 'hazzat-db-dev-ro-connectionString'
$slnPath = [System.IO.Path]::GetDirectoryName($myInvocation.MyCommand.Definition) + '\..\src\hazzat-api.sln'

Connect-AzureRmAccount
$dbString = Get-AzureKeyVaultSecret -VaultName $keyvaultName -Name $secretName

$env:CUSTOMCONNSTR_DBCONNECTIONSTRING=$dbString.SecretValueText
Write-Output "set CUSTOMCONNSTR_DBCONNECTIONSTRING=$($env:CUSTOMCONNSTR_DBCONNECTIONSTRING)"

& 'C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\Common7\IDE\devenv.exe' $slnPath
