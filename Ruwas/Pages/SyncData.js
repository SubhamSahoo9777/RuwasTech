import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import RotatingImage from "../components/RotatingImage";
import { SubmitButton } from "../components/AllButtons";
import { LoaderModal } from "../components/AllModals";
import colors from "../components/colors";
import VectorIcon from "../components/VectorIcon";
const SyncData = () => {
  const [updatedData, setUpdatedData] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  ]);
  const [show, setShow] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 20,
      }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          data={updatedData}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  alignSelf: "center",
                  backgroundColor: "#5b54ab",
                  marginTop: 10,
                  width: "90%",
                  paddingVertical: 5,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  height: "auto",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  Work Plan Id: {index}
                </Text>
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  comments: {"ruwas"}
                </Text>
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  status: {"ruwas"}
                </Text>
                <View
                  style={{ flexDirection: "row-reverse", paddingBottom: 5 }}
                >
                  <VectorIcon
                    type="AntDesign"
                    name="cloudupload"
                    size={27}
                    color="#fff"
                  />
               
                </View>
              </View>
            );
          }}
        />
      </View>
      <SubmitButton
        onPress={() => setShow(!show)}
        buttonStyle={{ width: "90%", alignSelf: "center" }}
        textStyle={{ fontSize: 22 }}
      />
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
