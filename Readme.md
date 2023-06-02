# \@grava.io/api-doc

\@grava.io/api-doc is a module that allows you transform commented documentation into markdown formatted documentation.
Make comments in the code and export an markdown documentation!

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
  -f, --files <path>   Folder to analize
  -o, --output <path>  Output path to save markdown documentation. If is not defined, it will print on console
  -h, --help           display help for command
```

## Route definitions format

The definitions must be inside a "comment" with this format:
```
/*

*/
```

To make it preattier we use this convention:
```
/**
 * definition_line
 * definition_line
 * definition_line
 */
```

Inside this structure you can use different type of definitions:

### Name
In this definition you must define a title for your route.

Format:
```
@name ROUTE_NAME
```
For example:
```
@name List user posts
```

### Description
In this definition you must define a more specific description for your route.

Format:
```
@description ROUTE_DESCRIPTION
```
For example:
```
@name In this route you can get all post of an specific user. You must send a userId and you can filter post by some fields.
```

### Route
In this definition you must define a the method and path for your route.

Format:
```
@route {ROUTE_METHOD} ROUTE_COMPLETE_PATH
```
For example:
```
@route {GET} /users/:userId/posts
```

### Parameters
With this definitions you can specify the parameters of the route (both required and optional).
There are 4 types of parameters, but all have the same format:
```
@PARAMETER_TYPE (optional) {PARAMETER_FIELD_TYPE} [PARAMETER_FIELD_NAME] PARAMETER_FIELD_DESCRIPTION
```
with this options:
- `PARAMETER_TYPE`: could be "headerparam", "urlparam", "queryparam", "bodyparam"
- `(optional)`: it says that the parameter is optional. If the parameter is requered don't include this
- `PARAMETER_FIELD_TYPE`: the data type of the field. For example: "string", "number", "date", "array<string>", "object"
- `PARAMETER_FIELD_NAME`: the name of the field
- `PARAMETER_FIELD_DESCRIPTION`: a description of the field. Here you can explain posibles values, validations, etc

Examples of each parameter type:

#### headerparam
```
@headerparam {string} [Authorization] JWT token
```

#### urlparam
```
@urlparam {string} [userId] The user identifier
```

#### queryparam
```
@queryparam (optional) {date} [dateFrom] filter the results after this date
@queryparam {string} [category] filter the post category. Posibles values: "sports", "memes", "music"
```

#### bodyparam
```
@bodyparam {number} [age] User age
@bodyparam (optional) {string} [address] User full address with street, number and postal code
```

### Responses
With this definitions you can specify the posible responses of the route (with status).
Inside this definition you can spicify the body response.

Format:
```
@response {RESPONSE_STATUS} RESPONSE_TITLE
```
For example:
```
@response {201} User information was succesfully
```
or
```
@response {400} Invalid field value
```

#### Response body
After a "response" line you can add "responsebody" definitions. **IMPORTANT: the responsebody definitions must be following the response definition**.

Format:
```
@responsebody {RESPONSE_FIELD_TYPE} [RESPONSE_FIELD_NAME] RESPONSE_FIELD_DESCRIPTION
```

For example:
```
@responsebody {number} [age] User age
@responsebody {string} [address] User address
```

## Examples

You can find some examples in the ["examples" folder](./examples/Readme.md)

