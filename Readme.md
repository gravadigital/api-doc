# \@grava.io/api-doc

## Install from npm
```
npm install -g @grava.io/api-doc
```

## Run
Help:
```
api-doc --help
```
Result:
```
Usage: api-doc [options]

Transform commented documentation into markdown formatted documentation

Options:
  -V, --version        output the version number
  -f, --files <path>   File or folder to analize
  -o, --output <path>  Output path to save markdown documentation. If is not defined, it will print on console
  -h, --help           display help for command
```

## Comments format

**TODO**

### GET example

Example:
```
/**
 * @name Get users by role
 * @description Get all users filtering sending role as parameter
 * @route {GET} /api/users/:organization/byrole
 * @urlparam {string} [organization] Organization to filter
 * @queryparam {string} [role] Role to filter
 * @queryparam (optional) {number} [limit] Limit results quantity by this number
 * @response {200} OK
 * @responsebody {string} [_id] Identifier
 * @responsebody {string} [name] Name
 * @responsebody {number} [age] Age
 * @responsebody {string} [role] Role
 * @response {400} Missing role parameter
 * @responsebody {string} [code] Error code
 * @responsebody {string} [message] Error message
 */
```
Result:
```
## GET /api/users/:organization/byrole - Get users by role
Get all users filtering sending role as parameter

#### Parameters

| Name | Location | Data type | Required | Description |
| ---- | -------- | --------- | -------- | ----------- |
| organization | url | string | True | Organization to filter |
| role | query | string | True | Role to filter |
| limit | query | number | False | Limit results quantity by this number |

#### Responses

##### [200] OK

| Name | Data type | Description |
| ---- | --------- | ----------- |
| _id | string | Identifier |
| name | string | Name |
| age | number | Age |
| role | string | Role |

##### [400] Missing role parameter

| Name | Data type | Description |
| ---- | --------- | ----------- |
| code | string | Error code |
| message | string | Error message |
```

### POST example

Example:
```
/**
 * @name Register new user
 * @description Register a new user. Should be admin
 * @route {POST} /api/users
 * @bodyparam {string} [name] User name
 * @bodyparam {string} [email] User email
 * @bodyparam {number} [age] User age
 * @bodyparam (optional) {string} [role] User role. Posibles values: "user", "admin". Default: "user"
 * @headerparam {string} [Authorization] User token. Must have admin rol
 * @response {201} OK
 * @responsebody {string} [_id] Identifier
 * @responsebody {string} [name] Name
 * @responsebody {string} [email] Email
 * @responsebody {number} [age] Age
 * @responsebody {string} [role] Role
 * @response {400} Missing data or invalid email
 * @responsebody {string} [code] Error code
 * @responsebody {string} [message] Error message
 */
```
Result:
```
## POST /api/users - Register new user
Register a new user. Should be admin

### Parameters

| Name | Location | Data type | Required | Description |
| ---- | -------- | --------- | -------- | ----------- |
| Authorization | header | string | True | User token. Must have admin rol |
| name | body | string | True | User name |
| email | body | string | True | User email |
| age | body | number | True | User age |
| role | body | string | False | User role. Posibles values: "user", "admin". Default: "user" |

### Responses

##### [201] OK

| Name | Data type | Description |
| ---- | --------- | ----------- |
| _id | string | Identifier |
| name | string | Name |
| email | string | Email |
| age | number | Age |
| role | string | Role |

##### [400] Missing data or invalid email

| Name | Data type | Description |
| ---- | --------- | ----------- |
| code | string | Error code |
| message | string | Error message |
```
