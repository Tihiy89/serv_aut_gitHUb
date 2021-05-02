call npm ci

call .\node_modules\.bin\tsc.cmd -p .\tsconfig.json

call node .\build\main.js