# SweepSteak Mock API Documentation

Generated: 2025-12-10T17:47:17.949Z

## Files

- **openapi.json** - OpenAPI 3.0 specification (import into Swagger UI, Postman, etc.)
- **mock-documentation.json** - Simplified documentation with all scenarios and response data

## Using OpenAPI Spec

Import `openapi.json` into:
- **Swagger UI**: View and test the API
- **Postman**: Generate collections
- **Backend Tools**: Validate implementation against contract

## Endpoints


### POST /api/bets/
**Create Bet**

Create Bet endpoint

**Default Scenario:** Success

**Scenarios:** 5
- Success (201) - 800ms
- data (200) - 800ms
- Insufficient Funds (400) - 500ms
- Invalid Data (400) - 500ms
- Server Error (500) - 1000ms


### GET /api/users/verify/gbg
**GBG Verification Status**

GBG Verification Status endpoint

**Default Scenario:** Pass

**Scenarios:** 5
- Pass (200) - 1000ms
- In Progress (200) - 500ms
- Manual Review Required (200) - 1000ms
- Fail (200) - 1000ms
- Server Error (500) (500) - 500ms


### GET /api/leaderboards/
**KMaster**

KMaster endpoint

**Default Scenario:** Success

**Scenarios:** 5
- Success (200) - 300ms
- Empty Leaderboard (200) - 300ms
- data (200) - 300ms
- Not Found (404) - 300ms
- Server Error (500) - 1000ms


### GET /api/leagues
**Get Leagues List**

Get Leagues List endpoint

**Default Scenario:** Success

**Scenarios:** 4
- Success (200) - 500ms
- Empty List (200) - 500ms
- data (200) - 500ms
- Server Error (500) - 1000ms


### GET /api/player-profiles/
**Get Player Profiles List**

Get Player Profiles List endpoint

**Default Scenario:** Success

**Scenarios:** 4
- Success (200) - 500ms
- Empty List (200) - 500ms
- data (200) - 500ms
- Server Error (500) - 1000ms


### POST /api/users
**Create User Profile**

Create User Profile endpoint

**Default Scenario:** Success

**Scenarios:** 4
- Success (201) - 1000ms
- Username Taken (400) - 500ms
- Invalid Data (400) - 500ms
- Server Error (500) (500) - 1000ms


### GET /api/teams
**Get Teams List**

Get Teams List endpoint

**Default Scenario:** Success

**Scenarios:** 4
- Success (200) - 500ms
- Empty List (200) - 500ms
- data (200) - 500ms
- Server Error (500) - 1000ms


### GET /api/tournaments
**Get Tournaments List**

Get Tournaments List endpoint

**Default Scenario:** Success

**Scenarios:** 4
- Success (200) - 500ms
- Empty List (200) - 500ms
- data (200) - 500ms
- Server Error (500) - 1000ms


### GET /api/users/me
**Get User Profile**

Get User Profile endpoint

**Default Scenario:** Complete Profile

**Scenarios:** 4
- Complete Profile (200) - 500ms
- Unverified Profile (200) - 500ms
- No Profile (404) (404) - 500ms
- Server Error (500) (500) - 1000ms


## Sharing with Backend Team

Share the `openapi.json` with your backend team so they can:
- Import it into their API development tools
- Use it as a contract for API implementation
- Validate their implementation against the spec
- See all mock scenarios and expected responses
