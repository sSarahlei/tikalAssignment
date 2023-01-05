import PopuplarityGraph from "./PopularityGraph";
import LeastPopular from "./LeastPopular";
import { Grid } from "@mui/material";

interface ContainerProps {
  locationParams: { [key: string]: string };
  graphNames: Array<string>;
}

const PopularityItems: React.FC<ContainerProps> = (props) => {
  const { locationParams, graphNames } = props;

  return (
    <Grid
      container
      direction={{ xs: "column", md: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      height={{ xs: "auto", md: "60%" }}
      gap={"50px"}
      margin={"auto"}
      maxWidth="1200px"
      padding={"20px"}
    >
      <LeastPopular locationParams={locationParams} />
      <PopuplarityGraph names={graphNames} />
    </Grid>
  );
};

export default PopularityItems;
