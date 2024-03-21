import { Audio } from "expo-av";
import { useEffect, useState } from "react";

const useToggleMusic = () => {
  const [sound, setSound] = useState();
  const [musicSwitch, setMusicSwitch] = useState(false); // Initially music is on with false

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Music/VibeHai.mp3"),
      {
        progressUpdateIntervalMillis: 500,
        shouldPlay: musicSwitch, // Control whether the music should play or not based on the musicSwitch state
        shouldCorrectPitch: true,
        volume: 0.01,
        isMuted: musicSwitch, // Mute/unmute based on the musicSwitch state
        isLooping: true,
      }
    );
    setSound(sound);

    console.log("Playing Sound");
    if (musicSwitch === false) {
      await sound.playAsync();
    } else {
      return;
    }
  }

  useEffect(() => {
    console.log(musicSwitch);
  }, [musicSwitch]);

  const toggleMusic = async () => {
    setMusicSwitch(true); // Toggle the musicSwitch state
  };

  return { sound, toggleMusic, musicSwitch, playSound };
};

export default useToggleMusic;
