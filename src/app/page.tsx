"use client";

import React, { useState } from 'react';
import MessageDisplay from '@/components/MessageDisplay';
import MessageInput from '@/components/MessageInput';
import { SidebarProvider } from '@/components/ui/sidebar';

// Define a type for the message structure
export interface Message {
  id: string; // Using string for ID, Date.now().toString() or a UUID
  text: string;
  sender: 'user' | 'ai'; // Distinguish between user and AI messages
  timestamp: number; // Add timestamp for ordering
}

export default function Home() {
  // State to hold the array of messages
  const [messages, setMessages] = useState<Message[]>([]);

  // Function to handle adding a new message from the input
  const handleNewMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: Date.now(),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // TODO: Add logic here to potentially send the message to an AI/backend
    // and receive a response to add to the messages list.
  };

  return (
    <SidebarProvider>
      {/* Main chat container: full height, max width, centered horizontally */}
      <div className="flex flex-col h-screen w-full max-w-3xl mx-auto bg-background text-foreground">
        {/* Pass the messages array to MessageDisplay */}
        <MessageDisplay messages={messages} />
        {/* Pass the handler function to MessageInput */}
        <MessageInput onSendMessage={handleNewMessage} />
      </div>
    </SidebarProvider>
  );
}
