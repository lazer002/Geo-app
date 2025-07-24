// utils/collectUserInfo.ts
import * as Battery from "expo-battery";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as Network from "expo-network";
import * as Sensors from "expo-sensors";
// import * as Notifications from "expo-notifications";
import * as LocalAuthentication from "expo-local-authentication";

export const collectUserInfo = async () => {
  // Location
  const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
  const location = locationStatus === "granted"
    ? await Location.getCurrentPositionAsync({})
    : null;

  // Device Info
  const deviceInfo = {
    brand: Device.brand,
    modelName: Device.modelName,
    osName: Device.osName,
    osVersion: Device.osVersion,
    deviceName: Device.deviceName,
    totalMemory: Device.totalMemory,
    manufacturer: await Device.getManufacturerAsync(),
    deviceType: Device.deviceType,
    isDevice: Device.isDevice,
    supportedCpuArchitectures: Device.supportedCpuArchitectures,
  };

  // Network
  const network = await Network.getNetworkStateAsync();

  // Battery
  const batteryLevel = await Battery.getBatteryLevelAsync();
  const batteryState = await Battery.getBatteryStateAsync();
  const powerMode = await Battery.isLowPowerModeEnabledAsync();

  // Sensors - Example using Accelerometer
  const { Accelerometer } = Sensors;
  const accelerometerData = await new Promise((resolve) => {
    const subscription = Accelerometer.addListener((data) => {
      subscription.remove();
      resolve(data);
    });
  });

  // Permission
//   const { status: notificationStatus } = await Notifications.getPermissionsAsync();

  // Biometric Authentication
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  return {
    location,
    deviceInfo,
    network,
    battery: {
      level: batteryLevel,
      state: batteryState,
      lowPowerMode: powerMode,
    },
    sensors: {
      accelerometer: accelerometerData,
    },
    permissions: {
      location: locationStatus,
    //   notifications: notificationStatus,
    },
    biometric: {
      hasHardware,
      supportedAuthTypes,
      isEnrolled,
    },
    timestamp: new Date().toISOString(),
  };
};
