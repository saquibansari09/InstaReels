import { useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import ReelItem from './src/components/ReelItem';
import reels from './src/data/reels';
import { store } from './src/redux/store';



export default function App() {
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  };

  return (
    <Provider store={store}>
      <StatusBar hidden />
      <FlatList
        data={reels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ReelItem item={item} isVisible={index === currentVisibleIndex} />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        pagingEnabled
      />
    </Provider>
  );
}
