import React from "react";
import { FlatList, View } from "react-native";

export default function List({ data, renderItem }) {
  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <View style={{ height: 1 }} className="bg-gray-200 mx-10"></View>
      )}
      data={data}
      renderItem={renderItem}
      
    ></FlatList>
  );
}
