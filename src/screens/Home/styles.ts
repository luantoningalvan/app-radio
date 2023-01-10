import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 32,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  currentPlayingContainer: {
    flex: 1,
  },
  playingNow: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainButton: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
  },
  secondaryButton: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  playingNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 24,
  },
  playingNowSong: {
    color: "#fff",
    fontSize: 14,
    marginTop: 6,
  },
  player: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  playerButtons: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginTop: 24,
  },
  songCover: {
    width: 180,
    height: 180,
    borderRadius: 4,
  },
  whatsappButton: {
    height: 48,
    borderRadius: 48,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    flexDirection: "row",
    paddingHorizontal: 24,
    marginTop: 24,
  },
  whatsappButtonText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 8,
  },
  logo: {
    width: 116,
    height: 116,
    marginBottom: 24,
  },
  safeArea: { flex: 0, backgroundColor: "rgba(0, 0, 0, 0.3)" },
});
