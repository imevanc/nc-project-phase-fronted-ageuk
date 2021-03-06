import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Color from "color";

const VisiteeCard = (props) => {
  const lastVisit = props.user.lastVisit;
  const postCode = props.user.postcode;
  const lastVisitTime = lastVisit[lastVisit.length - 1];

  let lastTimeSeenColor;

  if (!lastVisitTime) {
    lastTimeSeenColor = "#A83F4D";
    // lastTimeSeenColor = "#FF0000";
  } else {
    const newTime = new Date(lastVisit[lastVisit.length - 1]).getTime();
    const nowTime = new Date().getTime();
    const countTimeDiff = (nowTime - newTime) / 1000;

    lastTimeSeenColor =
      countTimeDiff <= 86400
        ? "#388F60"
        : countTimeDiff > 86400 && countTimeDiff <= 259200
        ? "#9E7328"
        : "#A83F4D";
  }
  const transformedStartPC = postCode
    .split("")
    .slice(0, -3)
    .join("")
    .toUpperCase();

  const transformedEndPC = postCode.split("").slice(-3).join("").toUpperCase();
  const newPostCode = `${transformedStartPC} ${transformedEndPC}`;

  const styles =
    props.idx === props.clicked
      ? {
          display: "flex",
          border: `5px solid  ${Color(lastTimeSeenColor).alpha(1).string()}`,
          color: "white",
          borderRadius: "20px",
          alignItems: "center",
          backgroundColor: Color(lastTimeSeenColor).alpha(1).string(),
          "&:hover": {
            border: "1px dashed grey",
            opacity: [0.7, 0.7, 0.7],
          },
        }
      : {
          display: "flex",
          border: `5px solid  ${Color(lastTimeSeenColor).alpha(0.9).string()}`,
          borderRadius: "20px",
          alignItems: "center",
          backgroundColor: Color(lastTimeSeenColor).alpha(0.5).string(),
          "&:hover": {
            border: "1px dashed grey",
            opacity: [0.7, 0.7, 0.7],
          },
        };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <Card sx={styles}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "150px",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", textDecoration: "none" }}>
            <Typography component="div" variant="h6">
              {props.user.firstName}
            </Typography>
            <Typography component="div" variant="h6">
              {props.user.lastName}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {newPostCode}
            </Typography>
          </CardContent>
        </Box>

        <CardMedia
          component="img"
          sx={{
            width: "100px",
            height: "100px",
            margin: "-15px 15px 0 10px",
            borderRadius: "50%",
          }}
          variant="rounded"
          alt="Random Image"
          src={props.user.avatar_url}
        />
      </Card>
    </Box>
  );
};

export default VisiteeCard;
