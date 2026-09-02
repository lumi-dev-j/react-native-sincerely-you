import {
  Animated,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";
import { useEffect, useRef } from "react";

import { CARD_RATIO, PatternFlipCard } from "@/components/PatternFlipCard";
import type { PatternInsight } from "@/data/patterns";
import { View } from "@/lib/tw";

const CARD_WIDTH_RATIO = 0.6;
const ITEM_SPACING = 14;
// Unfocused cards in the deck sit smaller than the focused one, leaving a
// visible gap on each side — matching the reference design's carousel.
const INACTIVE_SCALE = 0.74;

type PatternDeckProps = {
  patterns: PatternInsight[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

export function PatternDeck({
  patterns,
  activeIndex,
  onActiveIndexChange,
}: PatternDeckProps) {
  const { width: windowWidth } = useWindowDimensions();
  const cardWidth = windowWidth * CARD_WIDTH_RATIO;
  const cardHeight = cardWidth / CARD_RATIO;
  const snapInterval = cardWidth + ITEM_SPACING;
  const sideInset = (windowWidth - cardWidth) / 2;
  // How far a shrunk card is nudged toward whichever side the focused card
  // is on, so its visible peek is its own content-bearing inner half
  // instead of an evenly-cropped sliver from its centered middle.
  const inwardShift = (cardWidth * (1 - INACTIVE_SCALE)) / 2;

  const listRef = useRef<Animated.FlatList<PatternInsight>>(null);
  const isFirstRender = useRef(true);
  // Native-driven, so each card's scale/position tracks the finger in real
  // time during a swipe instead of only snapping once the scroll settles.
  const scrollX = useRef(new Animated.Value(activeIndex * snapInterval)).current;

  // Keep the list in sync when Previous/Next (or a deep link) changes the
  // active index from outside a swipe gesture.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    listRef.current?.scrollToOffset({
      offset: activeIndex * snapInterval,
      animated: true,
    });
  }, [activeIndex, snapInterval]);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / snapInterval
    );
    const clamped = Math.max(0, Math.min(patterns.length - 1, index));
    if (clamped !== activeIndex) onActiveIndexChange(clamped);
  };

  // A bit of headroom above the card's own bounds so the masking tape
  // (which pokes above the card's top edge) never gets clipped.
  const tapeHeadroom = cardHeight * 0.1;

  return (
    <View
      className="w-full"
      style={{ height: cardHeight + tapeHeadroom, paddingTop: tapeHeadroom }}
    >
      <Animated.FlatList
        ref={listRef}
        data={patterns}
        keyExtractor={(pattern) => pattern.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        initialScrollIndex={activeIndex}
        getItemLayout={(_, index) => ({
          length: snapInterval,
          offset: snapInterval * index,
          index,
        })}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{ paddingHorizontal: sideInset }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * snapInterval,
            index * snapInterval,
            (index + 1) * snapInterval,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [INACTIVE_SCALE, 1, INACTIVE_SCALE],
            extrapolate: "clamp",
          });
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-inwardShift, 0, inwardShift],
            extrapolate: "clamp",
          });
          return (
            <View
              className="shrink-0 items-center justify-center"
              style={{
                width: cardWidth,
                height: cardHeight + tapeHeadroom,
                marginRight: ITEM_SPACING,
              }}
            >
              <Animated.View
                style={{
                  width: cardWidth,
                  transform: [{ translateX }, { scale }],
                }}
              >
                <PatternFlipCard
                  pattern={item}
                  active={index === activeIndex}
                  onPressInactive={() => onActiveIndexChange(index)}
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}
