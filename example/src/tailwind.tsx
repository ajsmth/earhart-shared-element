import React from 'react';
import {
  View,
  Text,
  Image,
  ViewProps,
  TextProps,
  ScrollViewProps,
  ImageProps,
  TouchableOpacityProps,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn';

interface ITailwindViewProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

function generateStyles(className = '') {
  if (!className) {
    return undefined;
  }

  return tailwind(
    className
      .split(' ')
      .filter(Boolean)
      .join(' '),
  );
}

function TailwindSafeAreaView({
  className = '',
  style,
  ...rest
}: ITailwindViewProps) {
  const styles = generateStyles(className);

  return <SafeAreaView style={[styles, style]} {...rest} />;
}

const TailwindView = React.forwardRef(
  ({className = '', style, ...rest}: ITailwindViewProps, ref) => {
    const styles = generateStyles(className);
    return <View ref={ref} style={[styles, style]} {...rest} />;
  },
);

interface ITailwindTextProps extends TextProps {
  className?: string;
  children?: React.ReactNode;
}

function TailwindAnimatedText({className = '', style, ...rest}: any) {
  const styles = generateStyles(className);
  return <Animated.Text style={[styles, style]} {...rest} />;
}

function TailwindText({className = '', style, ...rest}: ITailwindTextProps) {
  const styles = generateStyles(className);
  return <Text style={[styles, style]} {...rest} />;
}

interface ITailwindScrollViewProps extends ScrollViewProps {
  className?: string;
  children?: React.ReactNode;
}

function TailwindScrollView({
  className = '',
  style,
  ...rest
}: ITailwindScrollViewProps) {
  const styles = generateStyles(className);
  return <ScrollView style={[styles, style]} {...rest} />;
}

interface ITailwindImageProps extends ImageProps {
  className?: string;
  children?: React.ReactNode;
}

function TailwindImage({className, style, ...rest}: ITailwindImageProps) {
  const styles = generateStyles(className);
  return <Image style={[styles, style]} {...rest} />;
}

interface ITailwindPressableProps extends TouchableOpacityProps {
  className?: string;
  children?: React.ReactNode;
}

function TailwindPressable({
  className = '',
  style,
  ...rest
}: ITailwindPressableProps) {
  const styles = generateStyles(className);
  return <TouchableOpacity style={[styles, style]} {...rest} />;
}

export {
  TailwindView as View,
  TailwindSafeAreaView as SafeAreaView,
  TailwindText as Text,
  TailwindScrollView as ScrollView,
  TailwindImage as Image,
  TailwindPressable as Pressable,
  TailwindAnimatedText as AnimatedText,
};
