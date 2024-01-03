import { Paper, Box, Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme} from "@suid/material";
import { Button, ToggleButton, ToggleButtonGroup } from "@suid/material";
import RefreshIcon from "@suid/icons-material/Refresh";
import { createSignal, For, Show } from "solid-js";
import CloudSyncIcon from '@suid/icons-material/CloudSync';
import { data } from "./clientApi"

// To Handle Toggle Button
const [reservationType, setReservationType] = createSignal("All");

// To format Date
const formatDate = (dateString: string): string => {
  let date: Date = new Date(dateString)
  // Request a weekday along with a long date
  return date.toLocaleString("en-US", 
  {weekday: "short", year: "numeric", 
  month:"long", day:"numeric", 
  hour:"numeric", minute:"numeric", 
  second:"numeric", timeZoneName: "short"})
}

const theme = useTheme();

export default function MostRecentReservationsTable() {
  
  return (
    <Box maxWidth="xl">
      <Box sx={{ flexGrow: 1, my:2 }}>
      <Grid container spacing={5}>
  
        <Grid item xs={12} md={6}>
        <ToggleButtonGroup
          color="primary"
          value={reservationType()}
          exclusive
          fullWidth
          onChange={(event, newReservation) => {
            if (newReservation==null){
              setReservationType("All");
            } else {
            setReservationType(newReservation);
          }
          }}
          >
          <ToggleButton value="Priority">Priority</ToggleButton>
          <ToggleButton value="Standard">Standard</ToggleButton>
          <ToggleButton value="Partner">Partner</ToggleButton>
        </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12} md={2}></Grid>

        <Grid item  xs={6} md={2}>
        <Button 
          sx={{ backgroundColor: theme.palette.primary.dark}} 
          variant="contained"
          size="large" 
          fullWidth
          onClick={() => { setReservationType("All"); }}
          >
            Reset  <RefreshIcon sx={{pl: 1}}/></Button> 
        </Grid>  

        <Grid item  xs={6} md={2}>
        <Button 
          sx={{ backgroundColor: theme.palette.primary.dark}} 
          fullWidth 
          variant="contained" 
          size="large"
          onClick={() => history.go(0)}>
            Refresh <CloudSyncIcon sx={{pl: 1}}/></Button> 
        </Grid>  
      </Grid>
      </Box>
      <Show when={!data.loading} fallback={<LinearProgress/>}>
      <TableContainer component={Paper} sx={{ overflowX: "initial" }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Reservation ID</TableCell>
              <TableCell>Reservation Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Reservation Type</TableCell>
              <TableCell>Created Timestamp</TableCell>
              <TableCell>Modified Timestamp</TableCell>
              <TableCell>Payment Id</TableCell>
              <TableCell>Short Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={data()[reservationType()]}>
              {(reservation) => (
                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                  <TableCell component="th" scope="row"> {reservation.reservationId} </TableCell>
                  <TableCell>{reservation.reservationNumber}</TableCell>
                  <TableCell>{reservation.name}</TableCell>
                  <TableCell>{reservation.email}</TableCell>
                  <TableCell>{reservation.reservationType}</TableCell>
                  <TableCell>{formatDate(reservation.createdTimestamp)}</TableCell>
                  <TableCell>{formatDate(reservation.modifiedTimestamp)}</TableCell>
                  <TableCell>{reservation.paymentId.String}</TableCell>
                  <TableCell>{reservation.shortId}</TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
      </Show>
    </Box>
  );
  }
  