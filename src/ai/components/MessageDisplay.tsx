"use client";

import React, { useEffect, useRef } from 'react';
import { Message } from '@/app/page'; // Import the Message type
import { ScrollArea } from "@/components/ui/scroll-area";

// Define props interface
interface MessageDisplayProps {
  messages: Message[];
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when messages change or viewport size changes
  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      const handleScroll = () => {
          viewport.scrollTop = viewport.scrollHeight;
      };
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(viewport);

      // Initial scroll
      handleScroll();

      // Cleanup observer on component unmount
      return () => resizeObserver.disconnect();
    }
  }, []); // Run only once on mount

  // Effect specifically for scrolling when messages array updates
  useEffect(() => {
     if (viewportRef.current) {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea
      className="flex-1 bg-background"
      ref={scrollAreaRef}
      viewportRef={viewportRef}
    >
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex w-full ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Add whitespace-pre-wrap to preserve formatting */}
            <div
              className={`inline-block rounded-lg py-2 px-3 max-w-[80%] break-words shadow-sm whitespace-pre-wrap ${
                message.sender === 'user'
                  ? 'bg-teal-500 text-white' // Original teal for user (sent)
                  : 'bg-muted text-foreground' // Muted background for AI/received
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageDisplay;
