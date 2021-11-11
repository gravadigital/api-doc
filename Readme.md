# \@grava.io/api-doc

## Install from npm
```
npm install -g @grava.io/api-doc
```

## Run
Help:
```
apidoc --help
```
Result:
```
Usage: apidoc [options]

Transform commented documentation into markdown formatted documentation

Options:
  -V, --version        output the version number
  -f, --files <path>   File or folder to analize
  -o, --output <path>  Output path to save markdown documentation
  -h, --help           display help for command
```

## Comments format

**TODO**

Example:
```
/*
 * @name Get users by role
 * @description Get all users filtering sending role as parameter
 * @route {GET} /api/users/byrole
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
## Routes

### GET /api/users/byrole - Get users by role
Get all users filtering sending role as parameter

##### Parameters

| Name | Location | Data type | Required | Description |
| ---- | -------- | --------- | -------- | ----------- |
| role | query | string | True | Role to filter |
| limit | query | number | False | Limit results quantity by this number |

##### Responses

###### [200] OK

| Name | Data type | Description |
| ---- | --------- | ----------- |
| _id | string | Identifier |
| name | string | Name |
| age | number | Age |
| role | string | Role |

###### [400] Missing role parameter

| Name | Data type | Description |
| ---- | --------- | ----------- |
| code | string | Error code |
| message | string | Error message |
```
