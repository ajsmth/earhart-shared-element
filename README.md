# earhart-shared-element

shared element transitions w/ earhart

## Installation

```bash
yarn add earhart-shared-element react-native-gesture-handler
cd ios && pod install
```

Follow the getting started instructions for Android builds:
https://software-mansion.github.io/react-native-gesture-handler/docs/getting-started.html#android

## Usage

```jsx
import { SharedElements, SharedElement } from 'earhart-shared-element';
import { Routere, Link, Route, Link } from 'earhart';

function App() {
  return (
    <Router>
      <SharedElements>
        <Scene1 path="/" />
        <Scene2 path="/next" />
      </SharedElements>
    </Router>
  );
}

function Scene1() {
  return (
    <View style={{ flex: 1 }}>
      <Link to="/next">
        // this image will be passed to Scene2 tweening to the new position and
        size
        <SharedElement id="image">
          <Image
            source={{ uri: 'https://my-image.jpg' }}
            style={{ height: 300 }}
          />
        </SharedElement>
      </Link>
    </View>
  );
}

function Scene2() {
  return (
    <View style={{ flex: 1 }}>
      <Link to={-1}>
        <SharedElement id="image">
          <Image
            source={{ uri: 'https://my-image.jpg' }}
            style={{ height: 500 }}
          />
        </SharedElement>
      </Link>
    </View>
  );
}
```

## Roadmap

- gesture handler support for dismissing views

## License

MIT
