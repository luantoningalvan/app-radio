import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";

import banner1 from "../../assets/ads/bannner1.png";
import banner2 from "../../assets/ads/bannner2.png";
import banner3 from "../../assets/ads/bannner3.png";
import banner4 from "../../assets/ads/bannner4.png";

import { styles } from "./styles";

const BANNER_WIDTH = Dimensions.get("screen").width - 48;

const banners = [banner1, banner2, banner3, banner4];

export function BannerSlider() {
  const sliderRef = useRef<ScrollView>(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((state) => {
        const nextBanner = state === banners.length - 1 ? 0 : state + 1;

        sliderRef.current?.scrollTo({
          x: nextBanner * BANNER_WIDTH,
          animated: true,
        });

        return nextBanner;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text style={styles.sectionTitle}>Patrocinadores</Text>
      <ScrollView
        style={styles.container}
        ref={sliderRef}
        disableIntervalMomentum
        snapToInterval={BANNER_WIDTH}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {banners.map((banner, index) => {
          return (
            <Image
              key={index}
              source={banner}
              style={styles.image}
              resizeMode="contain"
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
