import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import * as Mui from '@mui/material';
import * as MuiIcons from '@mui/icons-material';

const {
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Button,
  Typography,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} = Mui;

const {
  Add,
  Chat,
  ChevronLeft,
  ChevronRight,
  DarkMode,
  Home,
  LightMode,
  Settings,
  History,
  Delete,
  Search,
  Sort,
  Close,
  Menu,
} = MuiIcons;

interface ChatHistory {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedHistory = localStorage.getItem('chatHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
      } catch (error) {
        console.error('Error retrieving chat history from localStorage:', error);
        return [];
      }
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title'>('title');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
      } catch (error) {
        console.error('Error saving chat history to localStorage:', error);
      }
    }
  }, [chatHistory]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error('Error retrieving theme from localStorage:', error);
      }
    }
  }, [setTheme]);

  const menuItems = [
    { id: 'home', text: 'Home', icon: <Home />, path: '/' },
    { id: 'chat', text: 'Chat', icon: <Chat />, path: '/chat' },
    { id: 'history', text: 'History', icon: <History fontSize="inherit" />, path: '/history' },
    { id: 'settings', text: 'Settings', icon: <Settings />, path: '/settings' },
    {
      id: 'theme',
      text: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      icon: theme === 'dark' ? <LightMode /> : <DarkMode />,
      path: '#',
      onClick: () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        try {
          localStorage.setItem('theme', newTheme);
        } catch (error) {
          console.error('Error saving theme to localStorage:', error);
        }
      },
    },
  ];

  const handleNewChat = () => {
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: 'New Chat',
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0,
    };
    setChatHistory([newChat, ...chatHistory]);
    router.push(`/chat/${newChat.id}`);
    setSnackbarMessage('New chat created!');
    setSnackbarOpen(true);
  };

  const handleDeleteChat = (id: string) => {
    setChatToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (chatToDelete) {
      setChatHistory(chatHistory.filter(chat => chat.id !== chatToDelete));
      setSnackbarMessage('Chat deleted!');
      setSnackbarOpen(true);
      setDeleteDialogOpen(false);
      setChatToDelete(null);
    }
  };

  const filteredChatHistory = useMemo(() => {
    return chatHistory.filter(chat =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chatHistory, searchQuery]);

  const sortedChatHistory = useMemo(() => {
    return filteredChatHistory.sort((a, b) => a.title.localeCompare(b.title));
  }, [filteredChatHistory]);

  const toggleHideSidebar = () => {
    setIsHidden(!isHidden);
  };

  return (
    <Box className="relative">
      {/* Floating Toggle Button */}
      {!isHidden && (
        <Box
          sx={{
            position: 'fixed',
            left: isOpen ? '190px' : '120px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1200,
            transition: 'left 0.3s ease-in-out',
          }}
        >
          <IconButton
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            onClick={onToggle}
            sx={{
              backgroundColor: 'background.paper',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
      )}

      {/* Show Sidebar Button (when hidden) */}
      {isHidden && (
        <Box
          sx={{
            position: 'fixed',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1200,
          }}
        >
          <IconButton
            aria-label="Show sidebar"
            onClick={toggleHideSidebar}
            sx={{
              backgroundColor: 'background.paper',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            <Menu />
          </IconButton>
        </Box>
      )}

      {/* Sidebar Drawer */}
      {!isHidden && (
        <Drawer
          variant="permanent"
          open={isOpen}
          onClose={onToggle}
          PaperProps={{
            className: `
              bg-white/80 dark:bg-gray-900/95 
              backdrop-blur-xl 
              transition-all duration-300 ease-in-out
              ${isOpen ? 'w-64' : 'w-[72px]'}
              border-r border-gray-200/50 dark:border-gray-700/30
            `,
            elevation: 0,
          }}
        >
          <Box className="flex flex-col h-full">
            {/* Header with logo and close button */}
            <Box className="p-4 flex justify-between items-center">
              <Link href="/" className="flex items-center">
                {isOpen ? (
                  <span className="text-xl font-bold">Chat AI</span>
                ) : (
                  <span className="text-xl font-bold">C</span>
                )}
              </Link>
              <IconButton onClick={toggleHideSidebar}>
                <Close />
              </IconButton>
            </Box>

            <Divider />

            {/* Main Navigation */}
            <List className="px-2">
              {menuItems.map((item) => (
                <Tooltip
                  key={item.id}
                  title={!isOpen ? item.text : ''}
                  placement="right"
                >
                  <ListItem
                    button
                    className={`
                      mb-1 rounded-lg
                      ${router.pathname === item.path ? 
                        'bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                        'hover:bg-gray-100/50 dark:hover:bg-gray-700/30'
                      }
                    `}
                    onClick={item.onClick || (() => router.push(item.path))}
                  >
                    <ListItemIcon className="min-w-[40px]">
                      {item.icon}
                    </ListItemIcon>
                    {isOpen && (
                      <ListItemText 
                        primary={item.text}
                        primaryTypographyProps={{
                          className: 'font-medium',
                        }}
                      />
                    )}
                  </ListItem>
                </Tooltip>
              ))}
            </List>

            <Divider className="my-2" />

            {/* Chat History */}
            {isOpen && (
              <Box className="flex-grow overflow-y-auto px-2">
                <Typography 
                  variant="subtitle2" 
                  className="px-2 mb-2 text-gray-500 dark:text-gray-400"
                >
                  Recent Chats
                </Typography>

                {/* Search and Sort */}
                <Box className="px-2 mb-2">
                  <TextField
                    fullWidth
                    placeholder="Search chats..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: <Search fontSize="small" />,
                    }}
                    size="small"
                  />
                  <Box className="mt-2">
                    <TextField
                      select
                      fullWidth
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as 'title')}
                      size="small"
                    >
                      <MenuItem value="title">Sort by Title</MenuItem>
                    </TextField>
                  </Box>
                </Box>

                <List>
                  {sortedChatHistory.map((chat) => (
                    <ListItem
                      key={chat.id}
                      button
                      className="mb-1 rounded-lg text-sm"
                      onClick={() => router.push(`/chat/${chat.id}`)}
                    >
                      <ListItemIcon className="min-w-[40px]">
                        <Chat fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={chat.title}
                        secondary={new Date(chat.createdAt).toLocaleDateString()}
                        secondaryTypographyProps={{
                          className: 'text-xs text-gray-500 dark:text-gray-400',
                        }}
                      />
                      <IconButton
                        aria-label="Delete chat"
                        onClick={() => handleDeleteChat(chat.id)}
                        size="small"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Bottom Actions */}
            <Box className="p-3">
              <Button
                variant="contained"
                fullWidth
                startIcon={<Add />}
                onClick={handleNewChat}
                sx={{
                  textTransform: 'none',
                  fontWeight: 'medium',
                  py: 1.5,
                  borderRadius: '12px',
                  '& .MuiButton-startIcon': {
                    mr: isOpen ? 1 : 0,
                  },
                }}
              >
                {isOpen && 'New Chat'}
              </Button>
            </Box>
          </Box>
        </Drawer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this chat? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Sidebar;
