//npm i react-native-modal-datetime-picker expo-linear-gradient @react-native-community/datetimepicker @react-native-async-storage/async-storage
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Dimensions,
  TextInput,
  StatusBar,
  Animated,
  Vibration,
  FlatList,
  BackHandler,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
const { height, width } = Dimensions.get("window");
export {
  React,
  useState,
  useRef,
  Vibration,
  SafeAreaView,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Dimensions,
  TextInput,
  StatusBar,
  Animated,
  Pressable,
  ScrollView,
  DateTimePickerModal,
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  height,
  width,
  LinearGradient,
  useNavigation,
  useEffect,
};
