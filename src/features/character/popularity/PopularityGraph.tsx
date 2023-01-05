import { useEffect, useState, memo, useMemo } from "react";
import { getInfo } from "../../../api/MainApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import BarChart from "../../general/charts/bar/BarChart";
import { getPopularityCharacters } from "./PopularitySlice";
import PopularityItem from "./PopularityItem";

interface ContainerProps {
  names: Array<string>;
}

export interface graphItems {
  [key: string]: { value: number; id: number; name: string };
}

const PopuplarityGraph = memo((props: ContainerProps) => {
  const { names } = props;
  const characters = useAppSelector(
    (state) => state.popularity.popularityCharacters
  );
  const [maxEpisodes, setMaxEpisodes] = useState(0);
  const dispatch = useAppDispatch();
  const [hasError, setHasError] = useState(false);

  let items = useMemo(() => {
    return characters.reduce((prevItems, currentItem: CharacterInfo) => {
      const { name, episode, id } = currentItem;
      const value = episode.length;
      prevItems[name]
        ? (prevItems[name].value = prevItems[name].value + value)
        : (prevItems[name] = { id, value, name });
      return prevItems;
    }, {} as graphItems);
  }, [characters]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.allSettled([
      dispatch(getPopularityCharacters(names)),
      getMaxEpisodes(),
    ]);
  };

  const getMaxEpisodes = async () => {
    try {
      const response = await getInfo("episode");
      const info: ApiInfo | undefined = response?.data.info;
      if (info?.count) setMaxEpisodes(info.count);
    } catch {
      setHasError(true);
    }
  };

  return (
    <PopularityItem title={"Popuplarity Graph"} hasError={hasError}>
      <BarChart max={maxEpisodes} items={items}></BarChart>
    </PopularityItem>
  );
});

export default PopuplarityGraph;
