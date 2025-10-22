# SweepSteak Mock API Documentation

Generated: 2025-10-22T11:27:35.109Z

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

Share this documentation with your backend team to show:
- All available API endpoints
- Mock scenarios for each endpoint
- Expected status codes and response times
