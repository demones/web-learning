## 资源链接

https://www.npmjs.com/package/crypto-js
https://cryptojs.gitbook.io/docs/
https://code.google.com/archive/p/crypto-js/

## 知识点

### Encoders
可逆转换，对于 Base64，必须是 Base64的数据才可以，同理 utf8 也一样
```JavaScript
var words = CryptoJS.enc.Base64.parse("SGVsbG8sIFdvcmxkIQ==");
var base64 = CryptoJS.enc.Base64.stringify(words);
var words = CryptoJS.enc.Latin1.parse("Hello, World!");
var latin1 = CryptoJS.enc.Latin1.stringify(words);
var words = CryptoJS.enc.Hex.parse("48656c6c6f2c20576f726c6421");
var hex = CryptoJS.enc.Hex.stringify(words);
var words = CryptoJS.enc.Utf8.parse("𔭢");
var utf8 = CryptoJS.enc.Utf8.stringify(words);
var words = CryptoJS.enc.Utf16.parse("Hello, World!");
var utf16 = CryptoJS.enc.Utf16.stringify(words);
var words = CryptoJS.enc.Utf16LE.parse("Hello, World!");
var utf16le= CryptoJS.enc.Utf16LE.stringify(words);
```
