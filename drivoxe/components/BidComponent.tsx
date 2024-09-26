// components/AuctionScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { socketService } from '../config/websocket';

interface BidUpdate {
  newBid: number;
  userName: string;
}

const AuctionScreen: React.FC = () => {
  const [lastBid, setLastBid] = useState<BidUpdate | null>(null);

  useEffect(() => {
    // Connect to WebSocket server
    socketService.connect('');

    // Join the auction room
    const roomId = 'auctionRoomId'; // Replace with actual room ID
    const userId = 'yourUserId'; // Replace with actual user ID
    socketService.joinRoom(roomId, userId);

    // Listen for bid updates
    socketService.onBidUpdate((data) => {
      setLastBid(data);
    });

    // Clean up the connection when component unmounts
    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      {lastBid ? (
        <>
          <Text style={styles.text}>Last Bidder: {lastBid.userName}</Text>
          <Text style={styles.text}>Bid Amount: ${lastBid.newBid}</Text>
        </>
      ) : (
        <Text style={styles.text}>Waiting for the first bid...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AuctionScreen;
