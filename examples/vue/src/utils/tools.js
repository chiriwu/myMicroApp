export const checkMobile = function () {
  const userAgent = window.navigator.userAgent.toLocaleLowerCase();
  if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
    return true;
  }
  return false;
};
