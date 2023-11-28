import { View, Text } from "react-native";
import React from "react";
import { Camera, CameraType } from "expo-camera";

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const toggleCamera = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };
  return (
    <View>
      <Camera type={type}>
        <View>
          <Pressable onPress={toggleCamera}>
            <Text>Flip Camera</Text>
          </Pressable>
        </View>
      </Camera>
    </View>
  );
};

export default CameraScreen;
