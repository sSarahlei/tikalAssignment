import { Box } from "@mui/system";
import { graphItems } from "../../../character/popularity/PopularityGraph";
import { getPrecentage, getRGBprecentage } from "../../utils/utils";
import BarChartItem from "./BarChartItem";

interface ContainerProps {
  max: number;
  items: graphItems;
}

const BarChart: React.FC<ContainerProps> = (props) => {
  const { max, items } = props;
  const itemValues = Object.values(items);

  const barChartItems = itemValues.map((item, index) => {
    const precentage = getPrecentage(item.value, max);
    const colorPrecentage = getRGBprecentage(index + 1, itemValues.length);
    let color = `rgba(0,${colorPrecentage},0)`;

    return (
      <BarChartItem
        key={item.id}
        precentage={precentage}
        color={`${color}`}
        name={item.name}
      />
    );
  });

  return (
    <Box sx={chartStyle.container}>
      <Box sx={chartStyle.chart}>{barChartItems}</Box>
    </Box>
  );
};

const chartStyle = {
  container: {
    padding: "20px",
    height: "inherit",
  },
  chart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-around",
    height: { md: "90%", xs: "100%" },
  },
};

export default BarChart;
