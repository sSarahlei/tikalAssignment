import { Box, Divider, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import head from "lodash.head";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";

interface ContainerProps {
  info: CharacterInfo;
}

const CharacterInfo: React.FC<ContainerProps> = (props) => {
  const { info } = props;
  const locations = useAppSelector((state) => state.locations.info);
  const [dimension, setDimension] = useState("");

  useEffect(() => {
    fetchDimension();
  }, []);

  const fetchDimension = () => {
    const location = head(
      locations.filter((location) => location.name == info.location.name)
    );
    if (!!location) setDimension(location.dimension);
  };

  const stats = [
    { title: "Origin & Dimension", value: info.origin.name + ", " + dimension },
    { title: "Status", value: info.status },
    { title: "Species", value: info.species },
    { title: "Geneder", value: info.gender },
    { title: "Popularity", value: info.episode.length },
  ];

  const statItems = stats.map((stat, index) => {
    return (
      <Box key={index}>
        <Typography component={"span"} sx={infoStyle.statItem}>
          {stat.title}:
        </Typography>
        <Typography component={"span"}>{stat.value}</Typography>
        <Divider sx={{ margin: "10px 0" }}></Divider>
      </Box>
    );
  });

  return (
    <Box sx={infoStyle.container}>
      <CardMedia
        sx={infoStyle.media}
        component="img"
        image={info.image}
        alt={info.name}
      />
      <CardContent sx={infoStyle.content}>
        <Typography gutterBottom variant="h4" component="div" my={2}>
          {info.name}
        </Typography>
        {statItems}
      </CardContent>
    </Box>
  );
};

const infoStyle = {
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "90%",
    width: "100%",
    padding: "15px",
  },
  media: {
    width: { xs: "100%", md: "40%", height: "100%" },
    borderRadius: "7%",
  },
  content: {
    width: { xs: "100%", md: "60%" },
  },
  statItem: {
    fontWeight: "bold",
    marginRight: 1,
    wordWrap: "break-word",
  },
};

export default CharacterInfo;
