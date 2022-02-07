# 加密

## 原理

前言

加密这方面nodejs自带原生的crypto模块，在开发中或多或少会牵涉到这块，大部分集中在des-ecb、aes的加密上

我们来熟悉熟悉一下crypto模块，以及了解加密和解密的一些基本知识。

1、nodejs的crypto模块(v11.10.0)

nodejs提供了众多和加密解密相关的封装器，比如OpenSSL的hash、HMAC（哈希信息验证码）、cipher（加密）、decipher（解密）、sign（签名）和校验函数。现在我们简单地学习一下这些对应的概念。

1.1、Certificate

所谓的SPKAC是由网景公司原始实现的一种CSR(Certificate Signing Request/证书注册请求)机制。crypto模块提供Certificate类来处理SPKAC数据。Nodejs内部使用的是OpenSSL's SPKAC实现方式。

1.2、Cipher

Cipher类实例用来加密数据。使用方式如下两种，任选其一即可：

作为一个可读可写的stream，这样可以将原生未加密的数据写入并在可读侧生成加密的数据
使用cipher.update和cipher.final方法来产生加密的数据
所谓的Cipher是加密的意思，自然就有加密的算法了，本身密码学就是一门复杂的学科，这里我们只会挑选几个比较常用的加密算法来简单解释。

首先我们可以查看nodejs支持的加密算法有哪些？因为nodejs内部是有使用到openssl，所以也可以通过电脑自带的openssl命令openssl list-cipher-algorithms获取，也可以使用下面的方式获取：

```javascript
const crypto = require('crypto')
crypto.getCiphers();
```

得到一个比较大的数组，都列举不完了：

```javascript
[ 'aes-128-cbc',
  'aes-128-cbc-hmac-sha1',
  'aes-128-cbc-hmac-sha256',
  'aes-128-ccm',
  'aes-128-cfb',
  'aes-128-cfb1',
  'aes-128-cfb8',
  'aes-128-ctr',
  'aes-128-ecb',
  'aes-128-gcm',
  'aes-128-ocb',
  'aes-128-ofb',
  'aes-128-xts',
  'aes-192-cbc',
  'aes-192-ccm',
  'aes-192-cfb',
  'aes-192-cfb1',
  'aes-192-cfb8',
  'aes-192-ctr',
  'aes-192-ecb',
  'aes-192-gcm',
  'aes-192-ocb',
  'aes-192-ofb',
  'aes-256-cbc',
  'aes-256-cbc-hmac-sha1',
  'aes-256-cbc-hmac-sha256',
  'aes-256-ccm',
  'aes-256-cfb',
  'aes-256-cfb1',
  'aes-256-cfb8',
  'aes-256-ctr',
  'aes-256-ecb',
  'aes-256-gcm',
  'aes-256-ocb',
  'aes-256-ofb',
  'aes-256-xts',
  'aes128',
  'aes128-wrap',
  'aes192',
  'aes192-wrap',
  'aes256',
  'aes256-wrap',
  'bf',
  'bf-cbc',
  'bf-cfb',
  'bf-ecb',
  'bf-ofb',
  'blowfish',
  ...
  'des',
  'des-cbc',
  'des-cfb',
  'des-cfb1',
  'des-cfb8',
  'des-ecb',
  ...
  'des3',
  ... 39 more items ]
```

我们挑选AES加密算法和DES加密算法来说说几个基本的加密概念

1.2.1、AES加密

高级加密标准（英语：Advanced Encryption Standard，缩写：AES），在密码学中又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的DES，已经被多方分析且广为全世界所使用。经过五年的甄选流程，高级加密标准由美国国家标准与技术研究院（NIST）于2001年11月26日发布于FIPS PUB 197，并在2002年5月26日成为有效的标准。2006年，高级加密标准已然成为对称密钥加密中最流行的算法之一。

AES使用的秘钥长度可以128位、192位或256位，所以你看到的加密算法：aes-128/196/256，表示的都是秘钥的位数。而最后的一段是AES的工作模式，最常用的工作模式是ECB、CBC、CFB和OFB四种。

ECB（电子密码本模式：Electronic codebook）是最简单的块密码加密模式，加密前根据加密块大小（如AES为128位）分成若干块，之后将每块使用相同的密钥单独加密，解密同理。ECB模式由于每块数据的加密是独立的因此加密和解密都可以并行计算，ECB模式最大的缺点是相同的明文块会被加密成相同的密文块，这种方法在某些环境下不能提供严格的数据保密性。

CBC模式对于每个待加密的密码块在加密前会先与前一个密码块的密文异或然后再用加密器加密。第一个明文块与一个叫初始化向量的数据块异或。CBC模式相比ECB有更高的保密性，但由于对每个数据块的加密依赖与前一个数据块的加密所以加密无法并行。与ECB一样在加密前需要对数据进行填充，不是很适合对流数据进行加密。

与ECB和CBC模式只能够加密块数据不同，CFB(密文反馈:Cipher feedback)能够将块密文（Block Cipher）转换为流密文（Stream Cipher）。

OFB（输出反馈：Output feedback）是先用块加密器生成密钥流（Keystream），然后再将密钥流与明文流异或得到密文流，解密是先用块加密器生成密钥流，再将密钥流与密文流异或得到明文，由于异或操作的对称性所以加密和解密的流程是完全一样的。

1.2.2、DES加密

des对称加密，是一种比较传统的加密方式，其加密运算、解密运算使用的是同样的密钥，信息的发送者和信息的接收者在进行信息的传输与处理时，必须共同持有该密码（称为对称密码），是一种对称加密算法。

DES使用一个56位的密钥以及附加的8位奇偶校验位，产生最大64位的分组大小。所以正常我们给DES加密的时候都是传递56位秘钥即可。同样DES也有几种工作模式：DES、ECB、CBC，工作模式基本和上面的一致。

1.2.3、nodejs的cipher的使用

nodejs使用crypto.createCipheriv()来创建加密实例，该函数的接受三个参数：algorithm、key、initialization vector（iv）。

那么问题来了，什么是初始化向量？什么时候需要使用到？

根据wiki的解释：

在密码学中，初始化向量(IV)或者起始变量(SV)是一段固定大小的到密码原语的输入，该原语通常要求是随机或伪随机的。随机化对于加密方案实现语义安全性至关重要，这种特性使得在相同密钥下重复使用该方案不允许攻击者推断加密消息片段之间的关系。对于分组密码，IV的使用由操作模式来描述。其他原语也需要随机化，例如通用哈希函数和基于此的消息身份验证代码。

一句话概括就是：为了保证每条消息的唯一性，需要使用初始化向量IV。

在上述的四种工作模式中，除了ECB不需要用到初始化向量，其他三种都需要用到IV。我们可以使用该方法生成IV： Crypto.randomBytes(16)

创建加密实例后，有可能会用到这个方法：setAutoPadding，那么为什么我们会需要padding呢？

首先我们先了解该方法的作用：当使用块加密算法的时候，Cipher类会自动地添加padding到输入块中达到合适的块大小。当我们调用该函数禁用掉这个的时候，整个输入块的长度必须为cipher块尺寸的整数倍，否则调用cipher.final的时候是会报错的。

接着回答刚才的问题：

由于被加密数据分组时，有可能不会正好为128bit的整数倍，所以需要padding(填充补齐)，填充的模式有以下几种：

* None //不填充。
* PKCS7 //填充字符串由一个字节序列组成，每个字节填充该字节序列的长度。
* Zeros //填充字符串由设置为零的字节组成。
* ANSIX923 //ANSIX923 填充字符串由一个字节序列组成，此字节序列的最后一个字节填充字节序列的长度，其余字节均填充数字零。
* ISO10126 //ISO10126 填充字符串由一个字节序列组成，此字节序列的最后一个字节填充字节序列的长度，其余字节填充随机数据。

这里还有一个问题是：Nodejs如何决定我们的padding使用的是哪种呢？这个问题待解！

另外一个问题是，调用完cipher.update之后还得调用一个cipher.final，这是为啥呢？因为final的作用是收尾，因为update之后会有一些剩余没有加密的数据，只有调用了这个才算是对整个数据源进行加密，因此我们看到代码都是二者的结果的一个拼接。

1.3、Decipher

Decipher类的实例用于解密数据。和Cipher一样的使用方法。就不再赘述了

1.4、DiffieHellman

DiffieHellman类是一个用来创建Diffie-Hellman键交换的工具。什么叫做Diffie-Hellman？Diffie-Hellman算法是第一个公开密钥算法，早在 1976 年就发现了。其安全性源于在有限域上计算离散对数，比计算指数更为困难。该算法可以使两个用户之间安全地交换一个密钥，但不能用于加密或解密信息。具体实现原理不赘述。

1.5、ECDH

ECDH类是创建椭圆曲线Diffie-Hellman（Elliptic Curve Diffie-Hellman (ECDH)）键交换的实用工具。ECDH是基于ECC（Elliptic Curve Cryptosystems，椭圆曲线密码体制，参看ECC）的DH（ Diffie-Hellman）密钥交换算法。交换双方可以在不共享任何秘密的情况下协商出一个密钥。

ECC是建立在基于椭圆曲线的离散对数问题上的密码体制，给定椭圆曲线上的一个点P，一个整数k，求解Q=kP很容易；给定一个点P、Q，知道Q=kP，求整数k确是一个难题。ECDH即建立在此数学难题之上。

1.6、Hash

Hash类是用于创建数据哈希值的工具类。使用方式如下两种，任选其一即可：

作为一个可读可写的stream，这样可以将原始数据写入并在可读侧生成Hash摘要

使用hash.update和hash.final方法来产生加密的数据

1.7、Hmac

Hmac类是用于创建加密Hmac摘要的工具。HMAC是密钥相关的哈希运算消息认证码(Hash-based Message Authentication Code)，HMAC运算利用哈希算法，以一个密钥和一个消息为输入，生成一个消息摘要作为输出。

1.8、Sign

Sign类是用于生成签名的实用工具。使用方式如下两种，任选其一即可：

作为一个可读可写流，这样可以将需要签名的数据写入，然后sign.sign()方法用来生成并返回签名

使用sign.update和sign.sign方法来产生加密的数据

1.9、Verify

Verify类是验证签名的工具。使用方式如下两种，任选其一即可：

作为可写的stream，使用书面数据来验证提供的签名

使用verify.update和verify.verify的方法来验证签名

2、awesome-crypto

基于上面的一些基本知识，我们在Nodejs的基础上封装了这么一个基本的工具库，供平时我们开始中使用，鉴于还有好多在平时中没有用到，这里先提供简单的一些封装，等后续有用到的时候在上面继续完善。

整个工具库根据crypto的功能分为以下文件：

```shell
├── test 单元测试文件
├── types typescript类型文件
├── lib
│   ├── cipher 封装了加密解密相关的方法类
│   ├── certificate 封装了证书相关的方法类
│   ├── diffieHellman 封装了Diffie-Hellman相关的方法类
│   ├── ecdh 封装了椭圆曲线Diffie-Hellman相关的方法类
│   ├── hash 封装了哈希相关的方法类
│   ├── hmac 封装了Hmac摘要相关的方法类
│   ├── sign 封装了签名相关的方法类
│   └── verify 封装了签名验证相关的方法类

```

## crypto-js 库

### 资源链接

* <https://www.npmjs.com/package/crypto-js>
* <https://cryptojs.gitbook.io/docs/>
* <https://code.google.com/archive/p/crypto-js/>

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

## 参考

<https://zhuanlan.zhihu.com/p/88702467>
