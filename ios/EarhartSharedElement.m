#import "EarhartSharedElement.h"

@implementation EarhartSharedElement

RCT_EXPORT_MODULE()

// Example method
// See // https://facebook.github.io/react-native/docs/native-modules-ios
RCT_REMAP_METHOD(getDeviceName,
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  UIDevice *deviceInfo = [UIDevice currentDevice];

  resolve(deviceInfo.systemVersion);
}

@end
