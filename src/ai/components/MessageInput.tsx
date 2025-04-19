"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea" // Import Textarea
import { Send } from 'lucide-react';

// Define props interface including the callback function
interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage !== '') {
      onSendMessage(trimmedMessage);
      setMessage(''); // Clear the textarea
      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height before calculating new height
      }
    }
  };

  // Adjust textarea height dynamically based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to correctly calculate scrollHeight
      const scrollHeight = textareaRef.current.scrollHeight;
      // Set a max height (e.g., 128px or 8rem) - adjust as needed
      textareaRef.current.style.height = `${Math.min(scrollHeight, 128)}px`;
    }
  }, [message]); // Re-run when message changes

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter is pressed without Shift
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default newline insertion
      handleSendMessage();
    }
    // Shift+Enter will perform its default action (newline) because the condition above is not met
  };

  return (
    <div className="p-4 border-t bg-background">
      <div className="flex items-end gap-2"> {/* Use items-end for alignment with taller textarea */} 
        <Textarea
          ref={textareaRef}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-input text-foreground resize-none overflow-y-auto" // Use Textarea, add resize-none
          placeholder="Type your message (Shift+Enter for new line)..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Use the updated handler
          rows={1} // Start with a single row
          style={{ height: 'auto' }} // Ensure initial height is based on rows={1}
        />
        <Button 
          onClick={handleSendMessage} 
          className="bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 h-10" // Adjust button height if needed
          disabled={message.trim() === ''} // Disable button if message is empty
          aria-label="Send message"
        >
          <Send className="h-4 w-4"/>
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
