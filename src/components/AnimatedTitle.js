import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const AnimatedTitle = () => {
  /*
  const [title, setTitle] = useState("Let'sDOG");
  const switchAnim = useSharedValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      switchAnim.value = withTiming(1, { duration: 500 }, () => {
        switchAnim.value = withTiming(
          0,
          { duration: 50 },
          false,
          (isFinished) => {
            if (isFinished) {
              runOnJS(switchLetters)();
            }
          }
        );
      });
      console.log(switchAnim.value);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const switchLetters = () => {
    const newTitle = title.split("");
    const temp = newTitle[1];
    newTitle[1] = newTitle[2];
    newTitle[2] = temp;
    setTitle(newTitle.join(""));
    console.log(title);
  };

  return <Text style={{ fontSize: 24 }}>{title}</Text>;
};
*/
};
export default AnimatedTitle;
