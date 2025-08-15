import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ReusableCardProps = {
  
  name: string;
  walletAddress: string;
};

export default function ReusableCard({ name , walletAddress}: ReusableCardProps) {
  return (
    <div className='flex justify-center items-center min-h-screen '>
        <Card sx={{ minWidth: 280, border: '1px solid', borderColor: 'divider', borderRadius:4, padding: 2, boxShadow: 10}}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.foreground', fontSize: 18 }}>
          Wallet Information
        </Typography>
        <div className='flex flex-col gap-2'>
        <Typography variant="h5" component="div">
            Owner: {name}
        </Typography>
        <Typography variant="body2">
        Wallet Address: {walletAddress}
          <br />
        </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
  );
}
