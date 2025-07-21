import { Video } from 'expo-av';
import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../redux/reducers';

const { height, width } = Dimensions.get('window');

const ReelItem = ({ item, isVisible }) => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const likedReels = useSelector((state) => state.reels.likedReels);
  const isLiked = likedReels.includes(item.id);

  useEffect(() => {
    if (videoRef.current) {
      isVisible ? videoRef.current.playAsync() : videoRef.current.pauseAsync();
    }
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: item.video }}
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay={false}
      />

      {/* Overlay Content */}
      <View style={styles.overlay}>

        {/* Left Bottom: Profile and Caption */}
        <View style={styles.leftSection}>
          <Text style={styles.profile}>@{item.profile}</Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>

        {/* Right Bottom: Like, Comment, Share */}
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={() => dispatch(toggleLike(item.id))} style={styles.iconWrapper}>
            <Text style={[styles.icon, { color: isLiked ? 'red' : 'white' }]}>❤️</Text>
            <Text style={styles.iconLabel}>{isLiked ? 'Liked' : 'Like'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWrapper}>
            <Text style={styles.icon}>💬</Text>
            <Text style={styles.iconLabel}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconWrapper}>
            <Text style={styles.icon}>🔄</Text>
            <Text style={styles.iconLabel}>Share</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height, width, position: 'relative' },
  video: { height: '100%', width: '100%' },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
  },

  leftSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  profile: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  caption: { color: 'white', fontSize: 15 },

  rightSection: {
    width: 60,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
    gap: 25,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  icon: { fontSize: 28 },
  iconLabel: { color: 'white', fontSize: 12, marginTop: 5 },
});

export default ReelItem;
