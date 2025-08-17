// utils/collectUserInfo.ts
import * as Battery from "expo-battery";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as Network from "expo-network";
import * as Sensors from "expo-sensors";
import * as ScreenOrientation from "expo-screen-orientation";
import * as LocalAuthentication from "expo-local-authentication";
import * as Application from "expo-application";
import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import * as Cellular from "expo-cellular";
import { Audio as AVAudio } from "expo-av";
import { Dimensions, PixelRatio, Platform } from "react-native";
import { GLView } from "expo-gl";

export const collectUserInfo = async () => {
  try {
    // ✅ Location
    let location: any = { error: "unavailable" };
    let locationStatus: "granted" | "denied" | "undetermined" = "undetermined";

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      locationStatus = status;

      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        location = {
          coords: loc.coords,
          timestamp: loc.timestamp,
          address: "unknown",
        };

        try {
          const reverseGeocode = await Location.reverseGeocodeAsync(loc.coords);
          if (reverseGeocode.length > 0) {
            location.address = `${reverseGeocode[0].name ?? ""}, ${reverseGeocode[0].city ?? ""}, ${reverseGeocode[0].region ?? ""}, ${reverseGeocode[0].country ?? ""}`;
          }
        } catch {
          location.address = "unknown";
        }
      }
    } catch (err) {
      console.warn("⚠️ Location fetch failed:", err);
    }

    // ✅ Screen Info
    const { width, height } = Dimensions.get("window");
    const pixelDensity = PixelRatio.get();

    // ✅ Device Info
    let manufacturer = "unknown";
    try {
      if (Device.getManufacturerAsync) {
        manufacturer = await Device.getManufacturerAsync();
      }
    } catch {}

    let gpu = "unknown";
    try {
      await new Promise<void>((resolve) => {
        GLView.createContextAsync().then((gl: any) => {
          gpu = gl?.getParameter?.(gl?.RENDERER) || "unknown";
          resolve();
        });
      });
    } catch {}

    const deviceInfo = {
      brand: Device.brand ?? "unknown",
      modelName: Device.modelName ?? "unknown",
      osName: Device.osName ?? "unknown",
      osVersion: Device.osVersion ?? "unknown",
      deviceName: Device.deviceName ?? "unknown",
      totalMemory: Device.totalMemory ?? null,
      freeStorage: (await FileSystem.getFreeDiskStorageAsync?.()) ?? null,
      totalStorage: (await FileSystem.getTotalDiskCapacityAsync?.()) ?? null,
      manufacturer,
      deviceType: Device.deviceType ?? null,
      isDevice: Device.isDevice ?? null,
      supportedCpuArchitectures: Device.supportedCpuArchitectures ?? [],
      screenWidth: width,
      screenHeight: height,
      pixelDensity,
      language: Device.locale ?? "unknown",
      region: Device.region ?? "unknown",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      appVersion: Application.nativeApplicationVersion ?? "unknown",
      buildNumber: Application.nativeBuildVersion ?? "unknown",
      gpu,
    };

    // ✅ Network
    let network = {};
    let ipAddress: string | null = null;
    try {
      network = await Network.getNetworkStateAsync();
      ipAddress = (await Network.getIpAddressAsync()) ?? null;
    } catch (err) {
      console.warn("⚠️ Network fetch failed:", err);
    }

    // ✅ Carrier (expo-cellular)
    let carrier = "unknown";
    try {
      carrier = (await Cellular.getCarrierNameAsync()) ?? "unknown";
    } catch (err) {
      console.warn("⚠️ Carrier fetch failed:", err);
    }

    // ✅ Battery
    const [batteryLevel, batteryState, powerMode] = await Promise.all([
      Battery.getBatteryLevelAsync(),
      Battery.getBatteryStateAsync(),
      Battery.isLowPowerModeEnabledAsync(),
    ]);

    // ✅ Sensors
    const { Accelerometer, Gyroscope, Magnetometer, Barometer } = Sensors;
    const readSensorOnce = (Sensor: any) =>
      new Promise((resolve) => {
        let sub: any = null;
        try {
          sub = Sensor.addListener((data: any) => {
            sub.remove();
            resolve(data);
          });
          setTimeout(() => {
            sub?.remove?.();
            resolve(null);
          }, 500);
        } catch {
          resolve(null);
        }
      });

    const accelerometer = (await readSensorOnce(Accelerometer)) ?? null;
    const gyroscope = (await readSensorOnce(Gyroscope)) ?? null;
    const magnetometer = (await readSensorOnce(Magnetometer)) ?? null;
    const barometerData = (await readSensorOnce(Barometer)) ?? null;

    // ✅ Biometric Authentication
    const [hasHardware, supportedAuthTypes, isEnrolled] = await Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.supportedAuthenticationTypesAsync(),
      LocalAuthentication.isEnrolledAsync(),
    ]);

    // ✅ Security Info
    const security = {
      isRooted: false,
      isDeveloperMode: __DEV__,
    };

    // ✅ Photos & Videos
    let media: { photos: any[]; videos: any[] } = { photos: [], videos: [] };
    try {
      const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
      if (mediaStatus === "granted") {
        const photos = await MediaLibrary.getAssetsAsync({
          mediaType: "photo",
          first: 5,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        });
        const videos = await MediaLibrary.getAssetsAsync({
          mediaType: "video",
          first: 5,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        });

        media = {
          photos: photos.assets.map((a) => ({
            id: a.id,
            uri: a.uri,
            filename: a.filename,
            creationTime: a.creationTime,
          })),
          videos: videos.assets.map((a) => ({
            id: a.id,
            uri: a.uri,
            filename: a.filename,
            creationTime: a.creationTime,
          })),
        };
      }
    } catch (err) {
      console.warn("⚠️ Media fetch failed:", err);
    }

    // ✅ Camera & Microphone Permissions
    let cameraStatus: "granted" | "denied" | "undetermined" = "undetermined";
    let micStatus: "granted" | "denied" | "undetermined" = "undetermined";
    try {
      const cam = await Camera.requestCameraPermissionsAsync();
      cameraStatus = cam.status;
    } catch (err) {
      console.warn("⚠️ Camera permission failed:", err);
    }

    try {
      const mic = await AVAudio.requestPermissionsAsync();
      micStatus = mic.status;
    } catch (err) {
      console.warn("⚠️ Microphone permission failed:", err);
    }

    return {
      location,
      deviceInfo,
      network: {
        ...(network as object),
        ipAddress,
        carrier,
        signalStrength: Platform.OS === "android" ? "check via native" : null,
        vpnEnabled: false,
      },
      battery: {
        level: batteryLevel,
        state: batteryState,
        lowPowerMode: powerMode,
        chargingSource: "unknown",
        temperature: null,
      },
      sensors: {
        accelerometer,
        gyroscope,
        magnetometer,
        barometer: barometerData?.pressure ?? null,
        light: null,
        proximity: null,
      },
      permissions: {
        location: locationStatus,
        notifications: "unknown",
        camera: cameraStatus,
        microphone: micStatus,
        media: "granted",
      },
      biometric: {
        hasHardware,
        supportedAuthTypes,
        isEnrolled,
        screenLockEnabled: null,
        encryptionEnabled: null,
      },
      media,
      session: {
        startTime: new Date(),
        endTime: null,
        duration: null,
        crashes: [],
        foregroundTime: 0,
        backgroundTime: 0,
      },
      security,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("Failed to collect user info:", error);
    return { error: error.message, timestamp: new Date().toISOString() };
  }
};
