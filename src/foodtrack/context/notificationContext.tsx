import React, { createContext, ReactNode, useContext, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface NotificationContextType {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const opacity = new Animated.Value(0);

  const showNotification = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setVisible(false));
      }, 3000);
    });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {visible && (
        <Animated.View style={[styles.toast, { opacity }]}>
          <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#E67E22",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#BF6510",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  toastText: {
    color: "#FFF8F1",
    fontWeight: "bold",
    fontSize: 16,
  },
});
