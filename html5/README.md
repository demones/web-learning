# html5

## fetch 上传附件
https://davidwalsh.name/fetch

const formData = new FormData();
formData.append('imgFiles', imgFiles);
formData.append('thirdAccId', thirdAccId);
formData.append('accountType', accountType);

fetch('http://hongbao-api.jdpay.com:8099/redbag/uploadWishImg', {
  method: 'post',
  body: formData
});

## iframe sandbox

https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe
