import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { View } from "react-native";

type Props = {
  maxHeight: string;
  children: React.ReactNode;
}

export const TemporaryModal = React.forwardRef(({maxHeight, children}: Props, ref) => {
 
  // variables
  const snapPoints = useMemo(() => [maxHeight], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <BottomSheetModal
      handleStyle={{ display: "none" }}
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View className="mt-4">{children}</View>
    </BottomSheetModal>
  );
});
