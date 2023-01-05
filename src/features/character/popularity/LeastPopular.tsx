import isEmpty from "lodash.isempty";
import { useEffect, useState } from "react";
import { getBaseUrl } from "../../../api/Api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getLocationByParams } from "../../location/LocationsSlice";
import CharacterInfo from "../CharacterInfo";
import PopularityItem from "./PopularityItem";
import { getLeastPopular, reset } from "./PopularitySlice";

interface ContainerProps {
  locationParams: { [key: string]: string };
}

//creating ids o^n
//one api to fetch all and then run on charcters to see max
// on^2

//3 apis for episodes
//running over episodes and residents o^n*m  and saving on map
///getting max o(n)

const LeastPopular: React.FC<ContainerProps> = ({ locationParams }) => {
  const dispatch = useAppDispatch();
  const [hasError, setHasError] = useState(false);
  const locations: CharacterLocationInfo[] = useAppSelector(
    (state) => state.locations.info
  );
  const leastPopularCharacter = useAppSelector(
    (state) => state.popularity.leastPopularCharacter
  );

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (locations.length) {
      const ids = getResidentIds();
      dispatch(getLeastPopular(ids));
    }
  }, [locations.length]);

  const fetchData = async () => {
    try {
      await dispatch(getLocationByParams(locationParams));
    } catch {
      setHasError(true);
    }
  };

  const getResidentIds = () => {
    let residentIds: Array<number> = [];
    locations.forEach((location: CharacterLocationInfo) => {
      const { residents } = location;
      residents.forEach((resident) => {
        const characterBaseUrl = getBaseUrl() + "character/";
        let id = resident.replace(characterBaseUrl, "");
        residentIds.push(Number(id));
      });
    });

    return residentIds;
  };

  return (
    <PopularityItem title={"Least Popular Character"} hasError={hasError}>
      {!isEmpty(leastPopularCharacter) && (
        <CharacterInfo info={leastPopularCharacter} />
      )}
    </PopularityItem>
  );
};

export default LeastPopular;
