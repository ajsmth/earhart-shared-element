import React from 'react';
import {
  NativeRouter,
  useRouter,
  Routes,
  Route,
  Link,
  useParams,
  useInterpolation,
  Tabs,
  Redirect,
} from 'earhart';

import { View, Text, Image, SafeAreaView, ScrollView } from './tailwind';

import { Animated, Button, StyleSheet } from 'react-native';

const imageUris = [
  'https://images.unsplash.com/photo-1583940447650-4ad880bec532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
  'https://images.unsplash.com/photo-1558981000-f294a6ed32b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
  'https://images.unsplash.com/photo-1584036937843-e5fcfd590096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1511&q=80',
  'https://images.unsplash.com/photo-1584034256047-741246c713e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1581&q=80',
];

import { SharedElement, SharedElements } from 'earhart-shared-element';

function ListScreen({}) {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1 p-2">
        {imageUris.map((uri, index) => (
          <Card key={uri} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

function Card({ index }) {
  const uri = imageUris[index];
  return (
    <Link to={`profile/${index}`} key={uri}>
      <View className="p-2">
        <View className="items-start">
          <SharedElement id={`${index}`} config={{ debug: true }}>
            <Image
              source={{ uri: imageUris[index] }}
              style={{
                width: 300,
                height: 200,
                borderWidth: 1,
              }}
              resizeMode="cover"
            />
          </SharedElement>
        </View>

        <SharedElement id={`${index}-x`}>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: 'transparent',
            }}
          />
        </SharedElement>
      </View>
    </Link>
  );
}

const profileStyles = {
  transform: [
    {
      translateY: {
        inputRange: [-1, 0, 1],
        outputRange: [-1000, 0, 1000],
      },
    },
  ],
};

function ProfileScreen({}) {
  const params = useParams();
  const styles = useInterpolation(profileStyles);

  return (
    <ScrollView className="flex-1">
      <View style={{ flex: 1, height: 400 }}>
        <SharedElement id={`${params.id}`} config={{ debug: true }}>
          <Image
            source={{ uri: imageUris[params.id] }}
            style={{ height: 400 }}
            resizeMode="cover"
          />
        </SharedElement>
      </View>

      {/* <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'white',
          minHeight: 700,
          ...styles,
        }}
      >
        <View className="p-12">
          <Text className="text-3xl font-bold text-center">Oh Hi Mark</Text>
        </View>
      </Animated.View> */}
    </ScrollView>
  );
}

function SharedExample() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <SharedElements transitionConfig={{ duration: 4000 }}>
        <Routes>
          <Route path="/*">
            <ListScreen />
          </Route>

          <Route path="profile/:id">
            <ProfileScreen />
          </Route>
        </Routes>

        <Link to="/">
          <Text>To /</Text>
        </Link>
        <Link to={-1}>
          <Text>Back</Text>
        </Link>
        <SafeAreaView />
      </SharedElements>
    </View>
  );
}

function App() {
  return (
    <AppProviders>
      <Tabs>
        <View style={{ height: 100, backgroundColor: 'white' }} />
        <Routes>
          <Route path="hey/*">
            <SharedExample />
          </Route>

          <Route path="hi/*">
            <SharedExample />
          </Route>

          {/* <Redirect to="/hey" /> */}
        </Routes>
      </Tabs>

      <Location />
    </AppProviders>
  );
}

function AppProviders({ children }) {
  return (
    <NativeRouter>
      <View style={{ flex: 1 }}>{children}</View>
    </NativeRouter>
  );
}

function Location() {
  const { location } = useRouter();
  return <Text>{location.pathname}</Text>;
}

export default App;
