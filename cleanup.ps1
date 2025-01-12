# Take ownership of node_modules
Take-Ownership -Path "d:/huggingface/Chat-AI/node_modules" -Recurse

# Grant full permissions
icacls "d:/huggingface/Chat-AI/node_modules" /grant "$env:USERNAME":F /T

# Take ownership of package-lock.json
Take-Ownership -Path "d:/huggingface/Chat-AI/package-lock.json"

# Grant full permissions
icacls "d:/huggingface/Chat-AI/package-lock.json" /grant "$env:USERNAME":F

# Remove files
Remove-Item -Recurse -Force "d:/huggingface/Chat-AI/node_modules"
Remove-Item -Force "d:/huggingface/Chat-AI/package-lock.json"

# Reinstall dependencies
npm install
