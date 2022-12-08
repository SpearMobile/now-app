import { StyleSheet, View, Animated, PanResponder } from "react-native";
import { profiles as profilesArray } from "./assets/data/now";
import { useRef, useCallback, useState, useEffect } from "react";
import { ACTION_OFFSET, CARD } from "./constants";
import Bottom from "./Bottom";
import Card from "./Card";

const Body = () => {
  const [profiles, setProfiles] = useState(profilesArray);

  useEffect(() => {
    if (!profiles.length) {
      setProfiles(profilesArray);
    }
  }, [profiles.length]);

  console.log("profiles", profiles.length);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      console.log("isActionActive", isActionActive);
      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setProfiles((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );

  return (
    <>
      <View style={styles.container}>
        {profiles
          .map(({ name, photos }, index) => {
            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};
            return (
              <Card
                key={name}
                name={name}
                photos={photos}
                isFirst={isFirst}
                swipe={swipe}
                tiltSign={tiltSign}
                {...dragHandlers}
              />
            );
          })
          .reverse()}
      </View>
      <Bottom handleChoice={handleChoice} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
});

export default Body;
