## How to use
### build your own OCR server and set the end point to http://127.0.0.1:416/ (default)
### api doc
- method: GET
#### input
```
# type: query string
{
    "img":{base64 image string}
}
```
#### output
```
{
    "result": {ocr result} (string)
}
```
### option.html to setup config