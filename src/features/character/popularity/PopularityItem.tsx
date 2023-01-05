import { Card, CardHeader } from "@mui/material";

interface ContainerProps {
  children?: React.ReactNode;
  title: string;
  hasError?: boolean;
}

const PopularityItem: React.FC<ContainerProps> = (props) => {
  const { children, title, hasError } = props;
  return (
    <Card sx={itemStyle.card}>
      <CardHeader title={title} sx={itemStyle.header}></CardHeader>
      {!!hasError ? <h2>No Data</h2> : children}
    </Card>
  );
};

const itemStyle = {
  card: {
    flex: 1,
    height: "400px",
  },
  header: {
    backgroundColor: "black",
    height: "10%",
    color: "white",
  },
};

export default PopularityItem;
