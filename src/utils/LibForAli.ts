export interface AlipayLocationProps {
  longitude: string;
  latitude: string;
  country: string;
  city: string;
  pois: {
    address: string;
    name: string;
  }[];
  streetNumber: {
    number: string;
    street: string;
  };
}

class LibForAli {
  public static isIntalled(callback: () => void) {
    // -- 如果jsbridge已经注入则直接调用
    if (window.AlipayJSBridge) {
      callback && callback();
    } else {
      // -- 如果没有注入则监听注入的事件
      window.document.addEventListener('AlipayJSBridgeReady', callback, false);
    }
  }
}
export default LibForAli;
