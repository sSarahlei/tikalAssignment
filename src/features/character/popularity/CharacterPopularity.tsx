import { Box } from "@mui/material";
import PopularityItems from "./PopularityItems";

const CharacterPopularity: React.FC = () => {
  const graphNames: Array<string> = [
    "Abradolf Lincler",
    "Arcade Alien",
    "Morty Smith",
    "Birdperson",
    "Mr. Meeseeks",
  ];

  return (
    <Box sx={containerStyle} component="div">
      <Box sx={titleStyle}>Character Popularity</Box>
      <PopularityItems
        locationParams={{ name: "C-137" }}
        graphNames={graphNames}
      />
    </Box>
  );
};

const containerStyle = {
  height: "100%",
};

const titleStyle = {
  fontSize: { xs: "50px", md: "70px" },
  fontWeight: "bold",
  textAlign: "center",
  color: "#5b5b5b",
  margin: "50px",
};

export default CharacterPopularity;
