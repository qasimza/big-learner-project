import { type Component } from 'solid-js';
import { Box, Container, Divider, Typography, useTheme} from "@suid/material"
import MostRecentReservationsTable from './components/Table'
import ReservationCountCards from './components/ReservationCountCards';

const App: Component = () => {
  const theme = useTheme();
  return (
    <Container maxWidth='xl'>
      <header>
        <Box>
        <Typography 
        variant="h2" 
        component="div" 
        gutterBottom align='center' 
        color={theme.palette.primary.dark}
        sx={{fontWeight: 800}}>
          RESERVATIONS
        </Typography>
        </Box>
      </header>
      <Divider sx={{ mt: 6, mb: 3 }}>
      <Typography variant="h2" sx={{ fontSize: 'h6.fontSize' }}>
      TOTAL RESERVATION COUNT BY RESERVATION TYPE
      </Typography>
      </Divider>
      <ReservationCountCards/>
      <Divider sx={{ mt: 8, mb: 3 }}>
      <Typography variant="h2" sx={{ fontSize: 'h6.fontSize' }}>
        TEN MOST RECENT RESERVATIONS
      </Typography>
      </Divider>
      <MostRecentReservationsTable/>  
    </Container>
  );
};

export default App;
