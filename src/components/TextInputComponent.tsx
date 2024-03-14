import React from "react";
import { TextInput } from "react-native";

function TextInputComponent({ setText, value }: any) {
  return (
    <TextInput
      className="px-[16px] py-[12px] border-[#F4F4F4] border rounded-lg mb-[12px]"
      placeholder="Email"
      onChangeText={(text) => setText(text)}
      value={value}
    />
  );
}

export default TextInputComponent;
