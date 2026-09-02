import {
  Animated,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  useWindowDimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import { CARD_RATIO, PatternFlipCard } from "@/components/PatternFlipCard";
import type { PatternInsight } from "@/data/patterns";
import { View } from "@/lib/tw";

// Matches the reference's center-card width (roughly 54% of screen width).
const CARD_WIDTH_RATIO = 0.54;
// Side cards sit at 75% of the main card's size — noticeably close to it
// rather than a small thumbnail, so a bigger share of each one tucks
// behind the center card to keep it from being screen-clipped instead.
const INACTIVE_SCALE = 0.75;
const OVERLAP_RATIO = 0.46;
// Cards moved down uniformly, independent of the tape headroom above.
const CARD_OFFSET_Y = 50;
// Extra card height. Width grows with it so the paper keeps its native ratio.
const CARD_HEIGHT_EXTRA = 55;
const ARC_DROP_RATIO = 0.05;
const ARC_TILT_DEG = 5;

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
  const cardWidth =
    windowWidth * CARD_WIDTH_RATIO + CARD_HEIGHT_EXTRA * CARD_RATIO;
  const cardHeight = cardWidth / CARD_RATIO;
  // Negative spacing pulls each card's slot back under its neighbor's,
  // instead of leaving a gap between them.
  const itemSpacing = -cardWidth * OVERLAP_RATIO;
  const snapInterval = cardWidth + itemSpacing;
  const sideInset = (windowWidth - cardWidth) / 2;

  const listRef = useRef<Animated.FlatList<PatternInsight>>(null);
  const isFirstRender = useRef(true);
  // Native-driven, so each card's scale/position tracks the finger in real
  // time during a swipe instead of only snapping once the scroll settles.
  const scrollX = useRef(new Animated.Value(activeIndex * snapInterval)).current;
  // Tracks whichever card is nearest the center as you drag — separate from
  // `activeIndex` (which only commits once the swipe settles) — so z-index
  // stacking reorders live instead of jumping at the end of the gesture.
  const [focusedIndex, setFocusedIndex] = useState(activeIndex);

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
      style={{
        height: cardHeight + tapeHeadroom + CARD_OFFSET_Y,
        paddingTop: tapeHeadroom + CARD_OFFSET_Y,
        overflow: "visible",
      }}
    >
      <Animated.FlatList
        ref={listRef}
        data={patterns}
        keyExtractor={(pattern) => pattern.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: cardHeight, overflow: "visible" }}
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
          {
            useNativeDriver: true,
            listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
              const nearest = Math.max(
                0,
                Math.min(
                  patterns.length - 1,
                  Math.round(
                    event.nativeEvent.contentOffset.x / snapInterval
                  )
                )
              );
              setFocusedIndex((current) =>
                current === nearest ? current : nearest
              );
            },
          }
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{
          paddingHorizontal: sideInset,
          alignItems: "flex-start",
        }}
        renderItem={({ item, index }) => {
          // Symmetric around this card's own centered position, continuing
          // beyond the immediate neighbor (unlike a 3-point range) so a
          // card two-away keeps shrinking/fading instead of flattening
          // out at the same look as the immediate neighbor. Computed
          // directly off scrollX (not chained through an intermediate
          // "distance" node) for every derived style below.
          const wideInputRange = [
            (index - 2) * snapInterval,
            (index - 1) * snapInterval,
            index * snapInterval,
            (index + 1) * snapInterval,
            (index + 2) * snapInterval,
          ];
          const scale = scrollX.interpolate({
            inputRange: wideInputRange,
            outputRange: [
              INACTIVE_SCALE * 0.6,
              INACTIVE_SCALE,
              1,
              INACTIVE_SCALE,
              INACTIVE_SCALE * 0.6,
            ],
            extrapolate: "clamp",
          });
          const translateY = scrollX.interpolate({
            inputRange: wideInputRange,
            outputRange: [
              cardHeight * ARC_DROP_RATIO * 1.7,
              cardHeight * ARC_DROP_RATIO,
              0,
              cardHeight * ARC_DROP_RATIO,
              cardHeight * ARC_DROP_RATIO * 1.7,
            ],
            extrapolate: "clamp",
          });
          // Signed, so cards to the left and right tilt away from center in
          // opposite directions, like pages fanned open.
          const rotate = scrollX.interpolate({
            inputRange: [
              (index - 1) * snapInterval,
              index * snapInterval,
              (index + 1) * snapInterval,
            ],
            outputRange: [`${ARC_TILT_DEG}deg`, "0deg", `-${ARC_TILT_DEG}deg`],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange: wideInputRange,
            outputRange: [0.15, 0.9, 1, 0.9, 0.15],
            extrapolate: "clamp",
          });
          // Stack order: the card nearest the center sits highest, so it
          // reads as the foreground layer covering the ones tucked behind
          // it — rather than paint order (source order) deciding it.
          const zIndex = patterns.length - Math.abs(index - focusedIndex);
          // No trailing margin on the last card — negative marginRight on
          // every item (including the last) was shrinking the FlatList's
          // scrollable content short of where the last card's snap offset
          // needed it to reach, so it could never quite center: swiping
          // to it felt like it stalled or bounced back a little short.
          const isLast = index === patterns.length - 1;
          return (
            <View
              className="shrink-0 items-center"
              style={{
                width: cardWidth,
                height: cardHeight,
                marginRight: isLast ? 0 : itemSpacing,
                zIndex,
              }}
            >
              <Animated.View
                style={{
                  width: cardWidth,
                  opacity,
                  transform: [{ translateY }, { rotate }, { scale }],
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
