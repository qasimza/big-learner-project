import { Box, Card, CardContent, Grid, LinearProgress, Paper, Typography } from "@suid/material";
import useTheme from "@suid/material/styles/useTheme";
import { Show } from "solid-js";
import { data } from "./clientApi"

//For Storing Card Properties
interface IReservationCountCard{
  reservationType: string
  reservationCount: number
}

class ReservationCountCard implements IReservationCountCard{
  reservationType: string;
  reservationCount: number;
  constructor(reservationType: string){
    this.reservationType = reservationType;
    this.reservationCount = -1;
  }

  getCountCard(){
    switch (this.reservationType){
      case 'PRIORITY (BLUE)':
        this.reservationCount = data().PriorityCount
        break;
      case 'STANDARD (BIG)':
        this.reservationCount = data().StandardCount
        break;
      case 'PARTNER':
        this.reservationCount = data().PartnerCount
        break;
      case 'TOTAL':
        this.reservationCount = data().TotalCount
        break;
      default:
        
    }
    const theme = useTheme();
    return (
      <Show when={!data.loading} fallback={<LinearProgress/>}>
        <Card sx={{ minWidth: 275, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText}}>
          <CardContent>
            <Typography variant="h3" component="div" align="center">{this.reservationCount}</Typography>
            <Typography variant="h6" component="div" align="center">{this.reservationType}</Typography>
          </CardContent>
        </Card>
      </Show>
    );
  }
}
  
export default function ReservationCountCards(){
  
  const priority = new ReservationCountCard('PRIORITY (BLUE)')
  const standard = new ReservationCountCard('STANDARD (BIG)')
  const partner = new ReservationCountCard('PARTNER')
  const total = new ReservationCountCard('TOTAL')
  
  return(
    <Box>
      <Show when={!data.loading} fallback={<LinearProgress/>}>
        <Box sx={{ flexGrow: 1, my:2 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              {priority.getCountCard()}
            </Grid>
            <Grid item xs={12} md={3}>
            {standard.getCountCard()}
            </Grid>
            <Grid item xs={12} md={3}>
            {partner.getCountCard()}
            </Grid>
            <Grid item xs={12} md={3}>
            {total.getCountCard()}
            </Grid>
          </Grid>
        </Box>
      </Show>
      </Box>
)}