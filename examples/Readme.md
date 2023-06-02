# Examples

In this example folder you can find:
- `get.js`: GET route with headers, queryparams, urlparams and responses

You can genererate the markdown document running:
```
../bin/api-doc -f ./ -o ./result.md
```

This will read all *.js files and generate a `result.md` file in this folder.


## Results of the examples

### get.js
```
## GET /api/users/:userId/events - Get user events {#GET-/api/users/:userId/events-title}
Get user profile information by id

### Parameters {#GET-/api/users/:userId/events-parameters}

| Name | Location | Data type | Required | Description |
| ---- | -------- | --------- | -------- | ----------- |
| Authorization | header | string | True | JWT token |
| userId | url | string | True | User unique identifier |
| type | query | string | False | Event type to filter |
| skip | query | number | False | Amount of results to skip |
| limit | query | number | False | Max amount of results to receive |

### Responses {#GET-/api/users/:userId/events-responses}

##### [200] OK

| Name | Data type | Description |
| ---- | --------- | ----------- |
| * | array<object> | Events |
| [].id | number | Unique event dentifier |
| [].type | string | Event type |
| [].description | string | Event description |
| [].createdAt | date | Event date |

##### [401] Unauthorized

| Name | Data type | Description |
| ---- | --------- | ----------- |
| code | string | unauthorized |
| message | string | Error message |

##### [400] Invalid user id

| Name | Data type | Description |
| ---- | --------- | ----------- |
| code | string | invalid_user_id |
| message | string | Invalid user id |
```

### post.js
```
## POST /api/users/:userId/events - Save new user event {#POST-/api/users/:userId/events-title}
Save a new event related to user

### Parameters {#POST-/api/users/:userId/events-parameters}

| Name | Location | Data type | Required | Description |
| ---- | -------- | --------- | -------- | ----------- |
| Authorization | header | string | True | JWT token |
| userId | url | string | True | User unique identifier |
| type | body | string | True | Event type |
| description | body | string | False | Event description |

### Responses {#POST-/api/users/:userId/events-responses}

##### [200] OK

| Name | Data type | Description |
| ---- | --------- | ----------- |
| id | number | Unique event dentifier |
| type | string | Event type |
| description | string | Event description |
| createdAt | date | Event date |

##### [401] Unauthorized

| Name | Data type | Description |
| ---- | --------- | ----------- |
| code | string | unauthorized |
| message | string | Error message |

##### [400] Invalid user id

| Name | Data type | Description |
| ---- | --------- | ----------- |
| code | string | invalid_user_id |
| message | string | Invalid user id |

##### [400] Invalid fields

| Name | Data type | Description |
| ---- | --------- | ----------- |
| code | string | invalid_fields |
| message | string | Invalid fields |
```
