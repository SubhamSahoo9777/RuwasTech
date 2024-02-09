import React, { useState } from "react";
import { View } from "react-native";
import RotatingImage from "../components/RotatingImage";
import { SubmitButton } from "../components/AllButtons";
import { LoaderModal } from "../components/AllModals";

const SyncData = () => {
  const [show, setShow] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SubmitButton onPress={() => setShow(!show)} />
      <LoaderModal
        show={show}
        setShow={setShow}
        title="Uploading Your Local Data"
        icon={
          <RotatingImage
            source={require("../assets/synchronize.png")}
            style={{ height: 50, width: 50 }}
          />
        }
      />
    </View>
  );
};

export default SyncData;
