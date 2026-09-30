# CodeSync API

## Code execution setup

CodeSync sends solutions to a separate, isolated Piston-compatible execution sandbox. This is intentional: submitted code must never run directly in the Express server process.

1. Copy `.env.example` to `.env` and keep your existing database and JWT values.
2. Start the included sandbox from this directory with `docker compose up -d`.
3. Keep `EXECUTION_API_URL="http://localhost:2000/api/v2/execute"` in `.env`.
4. Start the API with `npm run dev`.

The first sandbox start may take a little time while Docker downloads the Piston image. Install the C++ runtime once with the official Piston CLI:

```powershell
git clone --depth 1 https://github.com/engineer-man/piston.git ..\piston
Push-Location ..\piston\cli
npm install
node index.js -u http://localhost:2000 ppman install gcc
Pop-Location
```

Verify it is ready with `Invoke-WebRequest http://localhost:2000/api/v2/runtimes` before pressing Run in a room. Run executes the visible examples; Submit executes the complete hidden test suite.

The public Piston endpoint is whitelist-only, so it is not a dependable option for a project demo. A self-hosted instance is the best college-project setup; it lets Run execute visible examples and Submit judge the server-only test cases. The API times out provider calls after 15 seconds and limits source code to 50,000 characters.
