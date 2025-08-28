"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ReusableCardProps = {
  name: string;
  walletAddress: string;
};

export default function ReusableCard({
  name,
  walletAddress,
}: ReusableCardProps) {
  return (
    <div>
      <Card
        sx={{
          minWidth: 120,
          minHeight: 120,
          maxWidth: 300,
          maxHeight: 180,
          background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
          color: "#fff",
          border: "3px solid #fff",
          borderRadius: 3,
          py: 3,
          px: 1,
          boxShadow: 6,
          position: "relative",
          overflow: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            top: 10,
            right: 10,
            width: 40,
            height: 40,
            background:
              'url("https://cdn-icons-png.flaticon.com/512/3523/3523887.png") no-repeat center/contain',
            opacity: 0.12,
            zIndex: 0,
          },
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
          >
            Wallet Information
          </Typography>
          <div className="flex flex-col gap-1">
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ fontSize: 13, fontWeight: "bold", color: "#fff" }}
            >
              Owner:
              <span style={{ fontWeight: "normal", color: "#fff" }}>
                {" "}
                {name}
              </span>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 12, color: "#fff" }}>
              <span style={{ fontWeight: "bold", color: "#fff" }}>
                Wallet Address:
              </span>
              <br />
              {walletAddress.slice(0, Math.ceil(walletAddress.length / 2))}
              <br />
              {walletAddress.slice(Math.ceil(walletAddress.length / 2))}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button size="small" sx={{ color: "#fff", fontWeight: "bold" }}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
