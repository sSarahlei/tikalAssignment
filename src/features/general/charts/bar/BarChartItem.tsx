import { Box } from "@mui/system";

interface ContainerProps {
  precentage: number;
  name: string;
  color: string;
}

const BarChartItem: React.FC<ContainerProps> = (props) => {
  const { precentage, name, color: backgroundColor } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "inherit",
        width: "10%",
      }}
    >
      <div
        style={{
          height: `${precentage}%`,
          backgroundColor,
          display: "flex",
        }}
      ></div>
      <Box component="label" sx={itemStyle.legend}>
        {name}
      </Box>
    </div>
  );
};

const itemStyle = {
  legend: {
    textAlign: "center",
    fontSize: { xs: "smaller", md: "medium" },
  },
};

export default BarChartItem;
