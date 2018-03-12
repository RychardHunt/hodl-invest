
Resource Api Utils
============


Installation
------------

```sh
npm install resource-api-utils
```

Uses
----
```sh
var ResourceApiUtils = require('resource-api-utils/lib');

var Api = ResourceApiUtils.create('<route-name>');

```

Requests
--------

##Get:

```sh
Api.get(id, params).then(function(response) {
  //success 
}, function(error) {
  //error
});
```

##Post: 

```sh
Api.post(payload).then(function(response) {
  //success 
}, function(error) {
  //error
});

```

##Put:

```sh
Api.put(id, payload).then(function(response) {
  //success
}, function(error) {
  //error
});

```
##Get List: 

```sh
Api.getList().then(function(response) {
  //success 
}, function(error) {
  //error
});

```

##Remove: 

```sh
Api.remove(id).then(function(response) {
  //success 
}, function(error) {
  //error
});

```

##Custom Get: 

```sh
Api.customGet(suffix, params).then(function(response) {
  //success 
}, function(error) {
  //error
});

```

##Custom Delete: 

```sh
Api.customDelete(suffix, params).then(function(response) {
  //success 
}, function(error) {
  //error
});

```

##Custom Post: 

```sh
Api.customPost(suffix, payload, params).then(function(response) {
  //success 
}, function(error) {
  //error
});

```

##Custom Put: 

```sh
Api.customPut(suffix, payload, params).then(function(response) {
  //success 
}, function(error) {
  //error
});

```


