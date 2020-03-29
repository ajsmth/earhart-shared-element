import React from 'react';
import { Router, Route, Link, useParams, Navigator, useHistory, Tabs } from 'earhart';
import {
  SharedElement,
  SharedElements,
  useSharedElementInterpolation,
} from 'earhart-shared-element';
import { View, Text, Image, SafeAreaView, ScrollView } from './tailwind';
import { Animated } from 'react-native';

const imageUris = [
  'https://images.unsplash.com/photo-1583940447650-4ad880bec532?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
  'https://images.unsplash.com/photo-1558981000-f294a6ed32b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
  'https://images.unsplash.com/photo-1584036937843-e5fcfd590096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1511&q=80',
  'https://images.unsplash.com/photo-1584034256047-741246c713e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1581&q=80',
];

function Home({ root }) {
  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold">Home</Text>

      <ScrollView className="flex-1 p-2">
        {imageUris.map((uri, index) => {
          return (
            <View key={index} className="p-2 m-2">
              <Link to={`${root}/profile/${index}`}>
                <SharedElement id={`image-${index}`}>
                  <Image
                    source={{ uri }}
                    style={{ height: 300 }}
                    resizeMode="cover"
                  />
                </SharedElement>
              </Link>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function Profile({ root }) {
  const params = useParams();

  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold bg-white">Profile</Text>
      <SharedElement id={`image-${params.id}`}>
        <Image
          source={{ uri: imageUris[parseInt(params.id)] }}
          style={{ height: 400 }}
          resizeMode="cover"
        />
      </SharedElement>

      <TransitionBottom>
        <View className="p-4" style={{ minHeight: 400 }}>
          <Text className="text-2xl font-bold">Hello Joe</Text>
        </View>
      </TransitionBottom>
    </View>
  );
}

const transitionBottom = {
  transform: [
    {
      translateY: {
        inputRange: [-1, 0, 1],
        outputRange: [400, 0, 400],
      },
    },
  ],

  opacity: {
    inputRange: [-1, 0, 1],
    outputRange: [0, 1, 0],
  },
};

function TransitionBottom({ children }) {
  const style = useSharedElementInterpolation(transitionBottom);

  return (
    <Animated.View style={{ ...style, backgroundColor: 'white' }}>
      {children}
    </Animated.View>
  );
}

function SharedElementNavigator({ root }) {
  return (
    <View className="flex-1">
      <SharedElements>
        <Route path={`${root}/home`}>
          <Home root={root} />
        </Route>

        <Route path={`${root}/profile/:id`}>
          <Profile root={root} />
        </Route>
      </SharedElements>

      <View className="flex-row">
        <Link to={`${root}/home`}>
          <Text className="text-2xl font-medium">Home</Text>
        </Link>
      </View>
    </View>
  );
}

function App() {
  return (
    <SafeAreaView className="flex-1">
      <Router>
        <Navigator>
          <Tabs>
            <Route path="/one">
              <Navigator>
                <SharedElementNavigator root='/one' />
              </Navigator>
            </Route>

            <Route path="/two">
              <Navigator>
                <SharedElementNavigator root='/two' />
              </Navigator>
            </Route>
          </Tabs>
        </Navigator>

        <Location />
        <SafeAreaView />
      </Router>
    </SafeAreaView>
  );
}

function Location() {
  const history = useHistory();
  const [location, setLocation] = React.useState(history.location.pathname);

  React.useEffect(() => {
    return history.listen(location => {
      setLocation(location.pathname);
    });
  }, [history]);

  return <Text>{location}</Text>;
}

export default App;
