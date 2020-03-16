# earhart-shared-element

shared element transitions w/ earhart

## Installation

```sh
npm install earhart-shared-element && cd ios && pod install
```

## Usage

```jsx
import { SharedElements, SharedElement } from 'earhart-shared-element';
import { NativeRouter, Link, Routes, Route, Link } from 'earhart';

function App() {
  return (
    <NativeRouter>
      <SharedElements>
        <Routes>
          <Route path="/">
            <Scene1 />
          </Route>

          <Route path="next">
            <Scene2 />
          </Route>
        </Routes>
      </SharedElements>
    </NativeRouter>
  );
}

function Scene1() {
  return (
    <View style={{ flex: 1 }}>
      <Link to="next">
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

## License

MIT
