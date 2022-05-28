param(
    [ValidateSet("DEV", "PPE", "PROD")]
    [string]$DeploymentEnvironment = "DEV",
    [bool]$StartVisualStudio = $true
)

# The values of some settings in the different environments.
$environmentSettings = @{
    "DEV" = @{
        "resourceGroupName" =  "hazzat-api-dev";
        "keyvaultName"      = "hazzat-api-dev";
        "secretName"        = "hazzat-db-ro-connectionString";
    };
    "PPE" = @{
        "resourceGroupName" =  "hazzat-api-ppe";
        "keyvaultName"      = "hazzat-api-ppe";
        "secretName"        = "hazzat-db-ro-connectionString";
    };
    "PROD" = @{
        "resourceGroupName" =  "hazzat-api";
        "keyvaultName"      = "hazzat-api";
        "secretName"        = "hazzat-db-ro-connectionString";
    };
}

$slnPath = [System.IO.Path]::GetDirectoryName($myInvocation.MyCommand.Definition) + '\..\src\hazzat-api.sln'

<#
    .Synopsis
      Starts the solution in Visual Studio 2019
#>
function StartDevEnv([string]$dbConnectionString) {
    $env:CUSTOMCONNSTR_DBCONNECTIONSTRING=$dbConnectionString

    & 'C:\Program Files\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\devenv.exe' $slnPath
}

Write-Output "Using environment '$DeploymentEnvironment'"
$keyvaultName = $environmentSettings[$DeploymentEnvironment]["keyvaultName"]
$secretName = $environmentSettings[$DeploymentEnvironment]["secretName"]

Connect-AzureRmAccount
$dbConnectionString = (Get-AzureKeyVaultSecret -VaultName $keyvaultName -Name $secretName).SecretValueText
Write-Output "set CUSTOMCONNSTR_DBCONNECTIONSTRING=$dbConnectionString"

if ($StartVisualStudio) {
    Write-Output "Starting Visual Studio 2019 for $slnPath"
    StartDevEnv $dbConnectionString
}
