# SweepSteak Mock API Documentation

Generated: 2025-10-22T12:54:43.754Z

## Files

- **openapi.json** - OpenAPI 3.0 specification (import into Swagger UI, Postman, etc.)
- **mock-documentation.json** - Simplified documentation with all scenarios and response data

## Using OpenAPI Spec

Import `openapi.json` into:
- **Swagger UI**: View and test the API
- **Postman**: Generate collections
- **Backend Tools**: Validate implementation against contract

## Endpoints


### GET /api/users/me
**Get User Profile**

Get User Profile endpoint

**Default Scenario:** Complete Profile

**Scenarios:** 3
- Complete Profile (200) - 500ms
- No Profile (404) (404) - 500ms
- Server Error (500) (500) - 1000ms


### POST /api/users/me
**Create User Profile**

Create User Profile endpoint

**Default Scenario:** Success

**Scenarios:** 4
- Success (200) - 1000ms
- Username Taken (400) - 500ms
- Invalid Data (400) - 500ms
- Server Error (500) (500) - 1000ms


## Sharing with Backend Team

Share the `openapi.json` with your backend team so they can:
- Import it into their API development tools
- Use it as a contract for API implementation
- Validate their implementation against the spec
- See all mock scenarios and expected responses
