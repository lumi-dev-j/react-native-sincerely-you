<div align="center">

# Sincerely You

**An interactive, story-driven mobile app that helps people recognize unhealthy relationship dynamics and emotional manipulation patterns.**

Built with Expo · React Native · TypeScript

</div>

---

## About

Sincerely You turns short, cinematic story episodes into a teaching tool. Users watch a scenario play out, choose how they'd respond, see the consequences of that choice, and get a plain-language breakdown of the manipulation pattern at play (love bombing, guilt-tripping, future faking, and more).

The goal is to build pattern recognition through experience rather than a lecture — you live the scenario first, then get the reveal.

## Features

- 🎬 **Cinematic story episodes** — short video scenarios that set up a relationship dynamic
- 🌱 **Branching choices** — pick how you'd respond and see where it leads
- 🔍 **Pattern reveals** — clear explanations of the emotional manipulation tactic shown in each episode
- 📖 **Story progression** — episodes chain together into ongoing storylines by category (dating, family, workplace, and more)
- 🧠 **Discovered pattern tracking** — a growing personal library of the patterns you've learned to recognize
- 🔐 **Authentication** — sign in to save progress across sessions
- 🎨 **Editorial, paper-inspired UI** — a restrained, print-like visual style built for a mobile-first, cinematic feel

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | [Expo](https://expo.dev) + [React Native](https://reactnative.dev) |
| Language | TypeScript |
| Routing | [Expo Router](https://docs.expo.dev/router/introduction/) (file-based) |
| Styling | [NativeWind](https://www.nativewind.dev) (Tailwind CSS for React Native) |
| State | [Zustand](https://github.com/pmndrs/zustand) |
| Persistence | AsyncStorage |
| Auth | [Clerk](https://clerk.com) |
| Media | expo-video |

## Project Structure

```
app/            routes and screens (Expo Router)
  (auth)/       authentication flow
  story/        episode playback, response selection, pattern reveal
  story-detail/ story overview screens
components/     reusable UI building blocks (StoryCard, ResponseOption, PatternCard, ...)
constants/      centralized image imports, theme tokens
data/           story, episode, and pattern content (typed, hardcoded)
lib/            external service helpers (Clerk, storage, utilities)
store/          Zustand stores for progress and app state
assets/         images, fonts, and media
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS
- [Expo Go](https://expo.dev/go) app (for testing on a physical device) or an iOS/Android simulator

### Installation

```bash
git clone https://github.com/lumi-dev-j/react-native-sincerely-you.git
cd react-native-sincerely-you
npm install
```

### Run the app

```bash
npx expo start
```

From there you can open the app in:

- an [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- a [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Expo Go](https://expo.dev/go), for quickly trying it on a physical device

### Scripts

```bash
npm run lint    # lint the project
npm run ios     # run on iOS simulator
npm run android # run on Android emulator
npm run web     # run in the browser
```

## Status

This project is under active development, built feature by feature as a hands-on teaching project for modern Expo app development.

## License

This project is currently private and unlicensed for public use.
